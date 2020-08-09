import * as fs from 'fs-extra'; // Docs: https://github.com/jprichardson/node-fs-extra
const { create } = require('xmlbuilder2'); // Docs: https://oozcitak.github.io/xmlbuilder2/
import { SfdxError } from '@salesforce/core';
import { DiffObj, DestructiveXMLMain, DestructiveXMLType, DestructiveXMLTypeEntry, PrintableDiffObj, TestSuiteXMLMain, TestSuiteXMLTests } from './affirm_interfaces';

const foldersNeedingFolder = ['aura', 'lwc'];
const customObjectChildren = {
  fields: "CustomField",
  businessProcesses: "BusinessProcess",
  recordTypes: "RecordType",
  compactLayouts: "CompactLayout",
  webLinks: "WebLink",
  validationRules: "ValidationRule",
  sharingReasons: "SharingReason",
  listViews: "ListView",
  fieldSets: "FieldSet"
};

export async function getPrintableDiffObject(diff: DiffObj) {
  const printableDiff: PrintableDiffObj = {
    changed: Array.from(diff.changed),
    insertion: Array.from(diff.insertion),
    destructive: Array.from(diff.destructive)
  };
  return printableDiff;
}

export async function fsSaveJson(fileName: string, json: object) {
  const saveToFile = './' + fileName + '.json';
  await fs.outputJson(saveToFile, json);
}

export async function fsCopyChangesToNewDir(diff: DiffObj, mdtJson: object) {
  let fileSet = new Set();
  Object.keys(diff).forEach(key => {
    if (key === 'destructive') return;
    diff[key].forEach(fileName => {
      fileSet.add(fileName);
    });
  });
  let copiedPaths = new Set();
  for (const file of fileSet.values()) {
    const pathCrums = file.split('/');
    const folder = pathCrums[3];
    const folderMdtInfo = mdtJson.metadataObjects.find(mdt => mdt.directoryName === folder);
    const fileName = pathCrums[pathCrums.length - 1];
    if (foldersNeedingFolder.includes(folder)) {
      const newPath = file.substring(0, file.indexOf(fileName));
      if (!copiedPaths.has(newPath)) copiedPaths.add(newPath);
      continue;
    }
    if (folderMdtInfo.metaFile && file.indexOf('-meta.xml') < 0) {
      const metaDataPath = file + '-meta.xml';
      if (!copiedPaths.has(metaDataPath)) copiedPaths.add(metaDataPath);
      if (!copiedPaths.has(file)) copiedPaths.add(file);
      continue;
    }
    if (!copiedPaths.has(file)) copiedPaths.add(file);
  };
  const checkDirs: Set<string> = new Set();
  for (const file of diff.destructive.values()) {
    const pathCrums = file.split('/');
    const folder = pathCrums[3];
    const fileName = pathCrums[pathCrums.length - 1];
    if (pathCrums.length === 6 && foldersNeedingFolder.includes(folder)) {
      const newPath = file.substring(0, file.indexOf(fileName));
      if (checkDirs.has(newPath) || copiedPaths.has(newPath)) continue;
      const folderStillExists = await fs.pathExists(newPath);
      if (!folderStillExists) {
        checkDirs.add(newPath);
        continue;
      }
      const files = await fs.readdir(newPath);
      console.log(files);
      if (files.length > 0) {
        copiedPaths.add(newPath);
        checkDirs.has(newPath)
      }
    }
  }
  copiedPaths.forEach(element => {
    const newLocation = '.releaseArtifacts/tempParcel/' + element;
    fs.copySync(element, newLocation);
  });
  return copiedPaths.size || 0;
}

// TODO: don't assume specific lengths for checking metadata type and subfolder. Pipelines adds path values
// TODO: break this out into smaller methods and add more error handling
export async function fsCreateDestructiveChangeFile(files: Set<String>, metaDataTypes: object, savePath: string, deployAfter: boolean) {
  const shouldBeAfter: boolean = deployAfter || false;
  let destructiveChanges = {};
  for (const file of files.values()) {
    const pathCrums = file.split('/');
    const fileName = pathCrums[pathCrums.length - 1];
    const folder = pathCrums[3];
    const folderMdtInfo = metaDataTypes.metadataObjects.find(mdt => mdt.directoryName === folder);
    if (!folderMdtInfo) throw SfdxError.create('affirm', 'helper_files', 'errorMdapiFindFailed');
    if (fileName.indexOf('-meta.xml') >= 0 && folderMdtInfo.metaFile) continue;
    let xmlName;
    let newMembers;
    if (pathCrums.length === 6 && foldersNeedingFolder.includes(folder)) {
      // check if the folder still exists
      const pathToBundle = file.substring(0, file.indexOf(fileName));
      const exists = await fs.pathExists(pathToBundle);
      // if it does and there are files in it then this is a change not destructive: return
      if (exists) {
        const files = await fs.readdir(pathToBundle);
        if (files.length > 0) continue;
      }
      const bundleName = pathCrums[pathCrums.length - 2];
      // add the subfolder name to types array by name
      xmlName = folderMdtInfo.xmlName;
      newMembers = [bundleName];
    } else if (folder === 'objects' && pathCrums.length === 6) {
      // get name of object
      const objName = pathCrums[pathCrums.length - 2];
      xmlName = folderMdtInfo.xmlName;
      // add the object name to type array by name CustomObject
      newMembers = [objName];
    } else if (folder === 'objects' && pathCrums.length === 7) {
      // get name of object
      const objName = pathCrums[pathCrums.length - 3];
      // get name of metaData Type using subObjFolder ie fields = CustomField
      xmlName = customObjectChildren[pathCrums[pathCrums.length - 2]];
      // get name of metaData combined with object name
      const memberName = objName + '.' + fileName.substring(0, fileName.indexOf('.'));
      // add combined name to types array by name
      newMembers = [memberName];
    } else {
      //  get name of metaData
      xmlName = folderMdtInfo.xmlName;
      //  add file name to types array by name.
      const memberName = fileName.substring(0, fileName.indexOf('.'));
      newMembers = [memberName];
    }

    if (xmlName && newMembers && Object.keys(destructiveChanges).includes(xmlName)) {
      if (destructiveChanges[xmlName].includes(newMembers[0])) continue;
      const members = [...destructiveChanges[xmlName], ...newMembers];
      destructiveChanges[xmlName] = members;
    } else if (xmlName && newMembers) {
      const members = [...newMembers];
      destructiveChanges[xmlName] = members;
    }
  }
  const newTypes: DestructiveXMLType = { types: [], '@xmlns': "http://soap.sforce.com/2006/04/metadata" };
  Object.keys(destructiveChanges).forEach(mdt => {
    const entry: DestructiveXMLTypeEntry = { name: mdt, members: [] };
    destructiveChanges[mdt].forEach(file => {
      entry.members = [...entry.members, file];
    });
    newTypes.types = [...newTypes.types, entry];
  });
  const xmlFile: DestructiveXMLMain = { package: newTypes };
  const newDestructivePackage = create({ version: '1.0', encoding: 'UTF-8' }, JSON.stringify(xmlFile));
  await fs.ensureDir(savePath);
  const outputFileName: string = shouldBeAfter ? savePath + '/destructiveChangesPost.xml' : savePath + '/destructiveChangesPre.xml';
  await fs.outputFile(outputFileName, newDestructivePackage.end({ prettyPrint: true, group: true }));
  const packageExists = await fs.pathExists(savePath + '/package.xml');
  if (!packageExists) {
    // TODO: get the api version from SfdxProjectJson instead of hard coding here
    const emptyPackageObj = {
      package: {
        '@xmlns': 'http://soap.sforce.com/2006/04/metadata',
        version: '49.0'
      }
    };
    const emptyPackageFile = create({ version: '1.0', encoding: 'UTF-8' }, JSON.stringify(emptyPackageObj));
    await fs.outputFile(savePath + '/package.xml', emptyPackageFile.end({ prettyPrint: true, group: true }));
  }
  return outputFileName;
}

export async function fsCleanupTempDirectory() {
  await fs.remove('.releaseArtifacts/tempParcel/');
}

export async function fsCleanProvidedOutputDir(outputDir: string) {
  const dirExists = await fs.pathExists(outputDir);
  if (dirExists) {
    await fs.remove(outputDir);
  }
}

export async function fsCreateNewTestSuite(tests: string, outputDir: string, fileName: string) {
  const testArray = tests.split(',');
  const newTests: TestSuiteXMLTests = { testClassName: testArray, '@xmlns': "http://soap.sforce.com/2006/04/metadata" };
  const xmlFile: TestSuiteXMLMain = { ApexTestSuite: newTests };
  const newTestSuite = create({ version: '1.0', encoding: 'UTF-8' }, JSON.stringify(xmlFile));
  await fs.ensureDir(outputDir);
  const outputFileName: string = outputDir + fileName + '.testSuite-meta.xml';
  await fs.outputFile(outputFileName, newTestSuite.end({ prettyPrint: true, group: true }));
  return outputFileName;
}

export async function fsCheckForExistingSuite(outputDir: string, fileName: string) {
  const outputFileName: string = outputDir + fileName + '.testSuite-meta.xml';
  const folderStillExists = await fs.pathExists(outputFileName);
  return folderStillExists;
}

// TODO: create method that zips the provided folderPath and deletes the folderPath when done.
// export async function zipPackageAndDeleteFolder(folderPath: string) {
//   //
// }
