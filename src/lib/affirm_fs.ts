// Use this file to store all fs-extra helper methods
/// <reference types="fs-extra" />
import * as fs from 'fs-extra'; // Docs: https://github.com/jprichardson/node-fs-extra
const { create, convert } = require('xmlbuilder2'); // Docs: https://oozcitak.github.io/xmlbuilder2/
import { UX } from '@salesforce/command';
import { SfdxError } from '@salesforce/core';
import { DiffObj, DestructiveXMLMain, DestructiveXMLType, DestructiveXMLTypeEntry, PrintableDiffObj, TestSuiteXMLMain, TestSuiteXMLTests, DescribeMetadata } from './affirm_interfaces';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme
// TODO: add https://www.npmjs.com/package/extract-zip for zipping and unzipping packages

const foldersNeedingFolder = ['aura', 'lwc', 'documents', 'bots'];
const foldersThatShouldBeReviewed = ['staticresources'];
const ignoreMissingFile = ['emailFolder'];
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

export async function fsSaveJson(fileName: string, json: object, ux?: UX) {
  const saveToFile = './' + fileName + '.json';
  await fs.outputJson(saveToFile, json);
  if (ux) ux.log('File Saved to: ' + chalk.underline.blue(saveToFile));
  return saveToFile;
}

export async function fsCopyChangesToNewDir(diff: DiffObj, mdtJson: DescribeMetadata, ux?: UX) {
  let fileSet: Set<string> = new Set();
  Object.keys(diff).forEach(key => {
    if (key === 'destructive') return;
    diff[key].forEach(fileName => {
      fileSet.add(fileName);
    });
  });
  let copiedPaths: Set<string> = new Set();
  for (const file of fileSet.values()) {
    const fileString: String = file as string;
    const pathCrums = fileString.split('/');
    const folder = pathCrums[3];
    const folderMdtInfo = mdtJson.metadataObjects.find(mdt => mdt.directoryName === folder);
    const fileName = pathCrums[pathCrums.length - 1];
    let enableLogging = false;
    if (foldersThatShouldBeReviewed.includes(folder)) {
      const resourceFile = await fsGetResourceFileFromXML(file, fileName);
      if (!resourceFile) {
        ux.log(chalk.red('Warning:') + ' A file was found in a folder that needs manual review: "' + chalk.underline.blue(file) + '" Make sure it was copied to the package folder or your package could fail.');
      }
      if (resourceFile && !copiedPaths.has(resourceFile)) copiedPaths.add(resourceFile);
      if (!copiedPaths.has(file)) copiedPaths.add(file);
      continue;
    }
    if (foldersNeedingFolder.includes(folder)) {
      const newPath = file.substring(0, file.indexOf(fileName));
      if (!copiedPaths.has(newPath)) copiedPaths.add(newPath);
      if (enableLogging) console.log('if 1: continue' + file);
      continue;
    }
    if (folderMdtInfo.metaFile && file.indexOf('-meta.xml') < 0 && !foldersThatShouldBeReviewed.includes(folder)) {
      if (enableLogging) console.log('if 2: enter' + file);
      if (folderMdtInfo.suffix && file.indexOf(folderMdtInfo.suffix.toLowerCase()) < 0) {
        if (enableLogging) console.log('if 2.1' + file);
        const metaDataPath = file + folderMdtInfo.suffix.toLowerCase() + '-meta.xml';
        if (!copiedPaths.has(metaDataPath)) copiedPaths.add(metaDataPath);
      } else {
        if (enableLogging) console.log('if 2.2' + file);
        const metaDataPath = file + '-meta.xml';
        if (!copiedPaths.has(metaDataPath)) copiedPaths.add(metaDataPath);
      }
      if (!copiedPaths.has(file)) copiedPaths.add(file);
      if (enableLogging) console.log('if 2.3' + file);
      continue;
    } else if (folderMdtInfo.metaFile && file.indexOf('-meta.xml') >= 0 && !foldersThatShouldBeReviewed.includes(folder)) {
      const parentFile = file.replace('-meta.xml', '');
      const fileType = parentFile.substring((parentFile.indexOf('.') + 1));
      if (enableLogging) console.log('if 3' + file);
      if (!copiedPaths.has(parentFile) && !ignoreMissingFile.includes(fileType)) copiedPaths.add(parentFile);
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
  for (const filePath of copiedPaths) {
    // TODO: replace with settings default paths
    const newLocation = '.releaseArtifacts/tempParcel/' + filePath;
    const fileEsits = await fs.pathExists(filePath);
    if (fileEsits) {
      fs.copySync(filePath, newLocation);
    } else {
      ux.log(chalk.red('Warning:') + ' Could not find file "' + chalk.underline.blue(filePath) + '" when copying files for conversion. Your package may not deploy successfully.');
    }
  }
  return copiedPaths.size || 0;
}

// TODO: don't assume specific lengths for checking metadata type and subfolder. Pipelines adds path values
// TODO: break this out into smaller methods and add more error handling
export async function fsCreateDestructiveChangeFile(files: Set<String>, metaDataTypes: DescribeMetadata, savePath: string, deployAfter: boolean) {
  const shouldBeAfter: boolean = deployAfter || false;
  let destructiveChanges = {};
  for (const file of files.values()) {
    const pathCrums = file.split('/');
    const fileName = pathCrums[pathCrums.length - 1];
    const folder = pathCrums[3];
    const folderMdtInfo = metaDataTypes.metadataObjects.find(mdt => mdt.directoryName === folder);
    if (!folderMdtInfo) throw SfdxError.create('sfdx-affirm', 'helper_files', 'errorMdapiFindFailed');
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
        version: '50.0'
      }
    };
    const emptyPackageFile = create({ version: '1.0', encoding: 'UTF-8' }, JSON.stringify(emptyPackageObj));
    await fs.outputFile(savePath + '/package.xml', emptyPackageFile.end({ prettyPrint: true, group: true }));
  }
  return outputFileName;
}

export async function fsCleanupTempDirectory() {
  // TODO: replace with settings default paths
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

export async function fsUpdateExistingTestSuite(newTests: string, outputDir: string, fileName: string) {
  await fs.ensureDir(outputDir);
  const outputFileName: string = outputDir + fileName + '.testSuite-meta.xml';
  let allTests = await fsGetTestSetFromSuiteXml(outputFileName);
  newTests.split(',').forEach(test => {
    if (!allTests.has(test)) allTests.add(test);
  });
  const testArray = [...allTests];
  const testSuite: TestSuiteXMLTests = { testClassName: testArray, '@xmlns': "http://soap.sforce.com/2006/04/metadata" };
  const xmlFile: TestSuiteXMLMain = { ApexTestSuite: testSuite };
  const newTestSuite = create({ version: '1.0', encoding: 'UTF-8' }, JSON.stringify(xmlFile));
  await fs.outputFile(outputFileName, newTestSuite.end({ prettyPrint: true, group: true }));
  return outputFileName;
}

export async function fsCheckForExistingSuite(outputDir: string, fileName: string): Promise<string | null> {
  const outputFileName: string = outputDir + fileName + '.testSuite-meta.xml';
  const folderStillExists = await fs.pathExists(outputFileName);
  if (!folderStillExists) return null;
  return outputFileName;
}

export async function fsGetTestStringFromSuiteXml(pathToSuite: string): Promise<string> {
  const testSuite = await fs.readFile(pathToSuite, 'utf8');
  const obj = convert({ encoding: 'UTF-8' }, testSuite, { format: 'object' });
  // console.log(obj);
  let tests: string;
  if (Array.isArray(obj.ApexTestSuite.testClassName)) {
    tests = obj.ApexTestSuite.testClassName.join(',');
  } else {
    tests = obj.ApexTestSuite.testClassName;
  }
  return tests;
}

export async function fsGetTestSetFromSuiteXml(pathToSuite: string): Promise<Set<string>> {
  const testSuite = await fs.readFile(pathToSuite, 'utf8');
  const obj = convert({ encoding: 'UTF-8' }, testSuite, { format: 'object' });
  let tests: Set<string> = new Set();
  if (Array.isArray(obj.ApexTestSuite.testClassName)) {
    obj.ApexTestSuite.testClassName.forEach(test => {
      if (!tests.has(test)) tests.add(test);
    });
  } else {
    if (!tests.has(obj.ApexTestSuite.testClassName)) tests.add(obj.ApexTestSuite.testClassName);
  }
  return tests;
}

export async function fsGetResourceFileFromXML(pathToResourceXML: string, fileName: string) {
  const resourceXml = await fs.readFile(pathToResourceXML, 'utf8');
  const obj = convert({ encoding: 'UTF-8' }, resourceXml, { format: 'object' });
  let resourcePath;
  let fileExtention;
  if (obj.StaticResource.contentType !== 'application/zip') {
    if (obj.StaticResource.contentType === 'image/png') {
      fileExtention = '.png';
    } else if (obj.StaticResource.contentType === 'image/svg+xml') {
      fileExtention = '.svg';
    } else if (obj.StaticResource.contentType === 'text/javascript') {
      fileExtention = '.js';
    }
    if (fileExtention) {
      const fileToFind = pathToResourceXML.replace('.resource-meta.xml', fileExtention);
      const exists = await fs.pathExists(fileToFind);
      if (exists) {
        resourcePath = fileToFind;
      }
    }
  } else {
    const fileToFind = pathToResourceXML.substring(0, pathToResourceXML.indexOf(fileName));
    const exists = await fs.pathExists(fileToFind);
    if (exists) {
      resourcePath = fileToFind;
    }
  }
  return resourcePath;
}
export async function fsGetSuitesInParcel(packageDir: string): Promise<Set<string>> {
  const pathExists = await fs.pathExists(`${packageDir}/testSuites`);
  let setOfFiles: Set<string> = new Set();
  if (pathExists) {
    const listOfFiles = await fs.readdir(`${packageDir}/testSuites`);
    listOfFiles.forEach(file => {
      const filePath: string = `${packageDir}/testSuites/${file}`;
      if (!setOfFiles.has(filePath)) setOfFiles.add(filePath);
    });
  }
  return setOfFiles;
}
// TODO: create method that zips the provided folderPath and deletes the folderPath when done.
// export async function zipPackageAndDeleteFolder(folderPath: string) {
//   //
// }
