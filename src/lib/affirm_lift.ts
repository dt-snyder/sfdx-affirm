// use this file to store all helper methods that doesn't have a specific dependency or can't be grouped into the other helper files.
import { SfError, SfProject, SfProjectJson, Messages, ConfigAggregator } from '@salesforce/core';
import { UX, TableColumns } from '@salesforce/command';
import { AffirmSettings, DiffObj, PrintableDiffObj, WhatToPrint } from './affirm_interfaces';
import { getCurrentBranchName } from './affirm_git';
import { sfcoreGetDefaultPath } from './affirm_sfcore';
import { fsCheckForExistingSuite, fsGetSuitesInParcel, fsGetTestSetFromSuiteXml, fsGetTestStringFromSuiteXml, fsCheckPathExists, fsGetTestsStringFromTestSuiteFolder } from './affirm_fs';
import { runCommand } from './sfdx';
import { ensureAnyJson } from '@salesforce/ts-types';
import { DeployMessage, RunTestResult } from '@salesforce/source-deploy-retrieve';
import { componentTable, codeCoverageTable, successesTable, failuresTable } from './affirm_tables';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme
Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('sfdx-affirm', 'helper_files');
const charToRemove: Array<string> = ['.', '!', '?', ')', '(', '&', '^', '%', '$', '#', '@', '~', '`', '+', '=', '>', '<', ',', ']', '[', '{', '}', ':', ';', '*', '|', '--'];
const logYN = '(' + chalk.green('y') + '/' + chalk.red('n') + ')';
export async function liftShortBranchName(currentBranch: string, topCharCount: number, keepBranchType?: boolean): Promise<string> {
  let branchName: string;
  if (keepBranchType === true) {
    branchName = currentBranch.replace('/', '_');
  } else {
    branchName = currentBranch.substring(currentBranch.indexOf('/') + 1, currentBranch.length);
  }
  const cleanBranchName = await cleanSuiteName(branchName);
  const nameArray = cleanBranchName.split('_');
  let shortFileName: string;
  let charCount = 0;
  nameArray.forEach(element => {
    charCount = charCount + element.length;
    if (charCount >= topCharCount) return;
    if (shortFileName) {
      shortFileName = `${shortFileName}_${element}`;
    } else {
      shortFileName = element;
    }
  });
  return shortFileName;
}

export async function cleanSuiteName(currentBranch: string): Promise<string> {
  for (const char of charToRemove) {
    if (currentBranch.indexOf(char) >= 0) {
      while (currentBranch.indexOf(char) >= 0) {
        currentBranch = currentBranch.replace(char, '-');
      }
    }
  }
  while (currentBranch.indexOf('-') >= 0) {
    currentBranch = currentBranch.replace('-', '_');
  }
  return currentBranch;
}

export async function checkName(name: string, ux?: UX): Promise<void> {
  const letterNumberUnderScore = new RegExp(/^[a-zA-Z0-9_]*$/);
  const startsWithLetter = new RegExp(/^[a-zA-Z]/);
  if (!letterNumberUnderScore.test(name)) {
    if (ux) ux.log('Affirm created name from Branch: ' + chalk.red(name))
    throw new SfError(messages.getMessage('alphanumericSuiteNameIssue'));
  } else if (!startsWithLetter.test(name)) {
    if (ux) ux.log('Affirm created name from Branch: ' + chalk.red(name))
    throw new SfError(messages.getMessage('startswithLetterSuiteNameIssue'));
  }
}
export async function liftCleanProvidedTests(tests: string): Promise<string> {
  if (tests.includes('.cls')) {
    throw new SfError(messages.getMessage('errorNoToFileName'));
  }
  // clear the value provided by the user; remove white space and .cls
  return tests.trim().replace(/\s+/g, '');
}

export async function liftPrintTable(tableName: string, data: any[], options: TableColumns, ux: UX): Promise<void> {
  const start = '_______________________Start ' + tableName + '_______________________';
  const end = '_______________________End ' + tableName + '_______________________';
  ux.log(chalk.green(start));
  ux.table(data, options);
  ux.log(chalk.red(end));
}

export async function liftPrintComponentTable(tableName: string, data: DeployMessage | DeployMessage[], ux: UX): Promise<void> {
  const start = `_______________________Start ${tableName}_______________________`;
  const end = `_________________________End ${tableName}_______________________`;
  let dataArray: any[] = [];
  if (Array.isArray(data)) {
    dataArray = data as any[];
  } else {
    dataArray = [data];
  }
  ux.log(chalk.green(start));
  ux.table(dataArray, componentTable);
  ux.log(chalk.red(end));
}

export async function liftPrintTestResultTable(data: RunTestResult | RunTestResult[], ux: UX): Promise<void> {

  const keysToPrint: string[] = ['codeCoverage', 'failures', 'successes'];
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key) && keysToPrint.includes(key)) {
      const element = data[key];
      const printResultType = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      const start = `_______________________Start ${printResultType}_______________________`;
      const end = `__________________________End ${printResultType}_______________________`;
      if (key === 'codeCoverage' && Array.isArray(element)) {
        let locationsNotCovered = [];
        for (const coverage of element) {
          if (coverage['locationsNotCovered'] && Array.isArray(coverage['locationsNotCovered'])) {
            for (const lines of coverage['locationsNotCovered']) {
              locationsNotCovered = [...locationsNotCovered, lines.line];
            }
            coverage['listLocationsNotCovered'] = locationsNotCovered.join(',');
          } else {
            coverage['listLocationsNotCovered'] = coverage['locationsNotCovered'].line;
          }
        }
      }
      let dataArray: any[] = [];
      if (Array.isArray(element)) {
        dataArray = element as any[];
      } else {
        dataArray = [element];
      }
      const columnsToUse = key === 'codeCoverage' ? codeCoverageTable : key === 'failures' ? failuresTable : successesTable;
      ux.log(chalk.green(start));
      ux.table(dataArray, columnsToUse);
      ux.log(chalk.red(end));
    }
  }
}

export async function showDiffSum(ux: UX, diff: PrintableDiffObj, whatToPrint: WhatToPrint): Promise<void> {
  Object.keys(diff).forEach(key => {
    const colorKey = (key === 'changed') ? chalk.yellow(key) : (key === 'insertion') ? chalk.green(key) : chalk.red(key);
    if (diff[key].length === 0 && (whatToPrint[key] || whatToPrint.showAll)) {
      ux.log(colorKey + ': None Found')
    } else if (whatToPrint[key] || whatToPrint.showAll) {
      ux.log(colorKey + ': ');
      diff[key].forEach(file => {
        ux.log(chalk.underline.blue(file));
      });
    }
  });
}

export async function createWhatToPrint(onlyChanged: Boolean, onlyInsertion: Boolean, onlyDestructive: Boolean): Promise<WhatToPrint> {
  const whatToPrint: WhatToPrint = {
    changed: onlyChanged,
    insertion: onlyInsertion,
    destructive: onlyDestructive,
    showAll: !onlyChanged && !onlyInsertion && !onlyDestructive
  };
  return whatToPrint;
}

export async function printBranchesCompared(ux: UX, providedBranch: string, currentBranch: string): Promise<void> {
  const beingCompared = chalk.magenta(providedBranch) + '...' + chalk.cyan(currentBranch);
  ux.log('Git Diff For: ' + beingCompared);
}

export async function getYNString(): Promise<string> {
  return logYN;
}


export async function getTestsFromParcel(ux: UX, silent?: boolean): Promise<string> {
  let testsToReturn: string;
  const defaultPath = 'releaseArtifacts/parcel';
  const defaultOutputDir = defaultPath + '/testSuites/';
  const testSuiteFolderExists = await fsCheckPathExists(defaultOutputDir);

  if (!testSuiteFolderExists && !silent) {
    const provideList = await ux.confirm(logYN + ' Could not find testSuites folder in the releaseArtifact/parcel location. Would you like to provide a list of test classes now?');
    if (provideList) {
      const providedTests = await ux.prompt('Please provide a comma separated list of tests names');
      testsToReturn = await liftCleanProvidedTests(providedTests);
    }
  } else if (testSuiteFolderExists) {
    const proceedWithTests = await ux.confirm(logYN + ' Found TestSuites from the releaseArtifact/parcel, do you wish to run the testSuite(s)?');
    if (proceedWithTests) {
      // if a test suite exists then parse the tests out
      testsToReturn = await fsGetTestsStringFromTestSuiteFolder(defaultOutputDir);
    }
  }
  return testsToReturn;
}

export async function getTestsFromSuiteOrUser(ux: UX, silent?: boolean): Promise<string> {
  let testsToReturn: string;
  // get current branch name
  const currentBranch = await getCurrentBranchName();
  const defaultFileName = await liftShortBranchName(currentBranch, 25);
  // look for test suite with the current name
  const project = await SfProject.resolve();
  const pjtJson: SfProjectJson = await project.retrieveSfProjectJson();
  const defaultPath = await sfcoreGetDefaultPath(pjtJson);
  const defaultOutputDir = defaultPath + '/main/default/testSuites/';
  const defaultSuiteExists = await fsCheckForExistingSuite(defaultOutputDir, defaultFileName);
  // if a suite doesn't exist prompt the user for tests
  let mergedSuiteExists;
  if (!defaultSuiteExists) {
    const mergedFileName = await liftShortBranchName(currentBranch, 25, true);
    mergedSuiteExists = await fsCheckForExistingSuite(defaultOutputDir, mergedFileName);
  }
  const suiteExists = defaultSuiteExists || mergedSuiteExists;
  if (!suiteExists && !silent) {
    const provideList = await ux.confirm(logYN + ' Could not find test suite for the current branch. Would you like to provide a list of test classes now?');
    if (provideList) {
      const providedTests = await ux.prompt('Please provide a comma separated list of tests names');
      testsToReturn = await liftCleanProvidedTests(providedTests);
    }
  } else if (suiteExists) {
    ux.log('Found Test Suite for Current Branch: ' + chalk.underline.blue(suiteExists.substring(suiteExists.indexOf('t/') + 2, suiteExists.length)));
    // if a test suite exists then parse the tests out
    testsToReturn = await fsGetTestStringFromSuiteXml(suiteExists);
  }
  return testsToReturn;
}

export async function getTestsFromPackageSettingsOrUser(ux: UX, settings: AffirmSettings, packagedir: string, isSandbox: boolean, silent?: boolean, forDeployment?: boolean): Promise<string> {
  let testsToReturn: string;
  // find tests from package
  const suitesToMerge: Set<string> = await fsGetSuitesInParcel(packagedir);
  const allTests: Set<String> = await liftGetTestsFromSuites(suitesToMerge);
  if (allTests.size > 0) { // use found tests
    testsToReturn = Array.from(allTests).join(',');
    ux.log(chalk.yellow(`Found test suite(s) in ${packagedir}`));
  } else {
    if (isSandbox) { // org is sandbox
      if (!settings.declarativeTestClass && silent === false) { // no default... ask
        const proceedWithoutTests = await ux.confirm(`${logYN} Are you sure you want to validate without running any tests?`);
        if (!proceedWithoutTests) {
          const providedTestClasses = await ux.prompt('Provide the test classes as a comma separated string');
          testsToReturn = await liftCleanProvidedTests(providedTestClasses);
          if (!testsToReturn) {
            throw new SfError(messages.getMessage('noTestProvidedAfterRequest'));
          }
        }
      } else if (settings.declarativeTestClass && silent === false) { // has default... ask
        const proceedWithDefault = await ux.confirm(`${logYN} Would you like to use the default declarative test class? "${settings.declarativeTestClass}"`);
        if (proceedWithDefault) { // use default
          testsToReturn = await liftCleanProvidedTests(settings.declarativeTestClass);
        } else { // do not use default... ask for list of tests
          const proceedWithoutTests = await ux.confirm(`${logYN} Are you sure you want to validate without running any tests?`);
          if (!proceedWithoutTests) {
            const providedTestClasses = await ux.prompt('Provide the test classes as a comma separated string');
            testsToReturn = await liftCleanProvidedTests(providedTestClasses);
            if (!testsToReturn) {
              throw new SfError(messages.getMessage('noTestProvidedAfterRequest'));
            }
          }
        }
      } else if (settings.declarativeTestClass && silent) { // has default... just use it
        testsToReturn = await liftCleanProvidedTests(settings.declarativeTestClass);
        ux.log(chalk.yellow('Found default declarative test class in AffirmSettings'));
      }
    } else if (!isSandbox) { // is production
      if (silent === false) ux.log(chalk.redBright('The selected org is a production org. You must provide test classes to proceed.'));
      if (!settings.declarativeTestClass && silent === false) { // no default... ask
        const providedTestClasses = await ux.prompt('Provide the test classes as a comma separated string');
        testsToReturn = await liftCleanProvidedTests(providedTestClasses);
      } else if (settings.declarativeTestClass && silent === false) { // has default... ask
        const proceedWithDefault = await ux.confirm(`${logYN} Would you like to use the default declarative test class? "${settings.declarativeTestClass}"`);
        if (proceedWithDefault) { // use default
          testsToReturn = await liftCleanProvidedTests(settings.declarativeTestClass);
        } else { // ask for list of tests
          const providedTestClasses = await ux.prompt('Provide the test classes as a comma separated string');
          testsToReturn = await liftCleanProvidedTests(providedTestClasses);
        }
      } else if (settings.declarativeTestClass && silent && !forDeployment) { // has default and is validation... just use it
        testsToReturn = await liftCleanProvidedTests(settings.declarativeTestClass);
        ux.log(chalk.yellow('Found default declarative test class(s) in AffirmSettings'));
      } else if (settings.declarativeTestClass && silent && forDeployment) { // has default and is deployment... throw error
        ux.log(chalk.brightRed('The Default Declaritve Test found in AffirmSettings will NOT be used for this silent deployment.'));
        ux.log(chalk.brightRed('Add test suites to your package or use the --testclasses flag and try again.'));
      }
      if (!testsToReturn) { // no tests provided for prod.... throw error
        throw new SfError(messages.getMessage('productionRequiresTestClasses'));
      }
    }
  }
  return testsToReturn;
}

export async function liftGetAllSuitesInBranch(diff: DiffObj, existingMergedSuite?: string): Promise<Set<string>> {
  let tests: Set<string> = new Set();
  Object.keys(diff).forEach(key => {
    if (key === 'destructive') return;
    diff[key].forEach(element => {
      const filePath: string = element;
      if (filePath.includes('/main/default/testSuites/') && filePath !== existingMergedSuite) {
        tests.add(filePath);
      }
    });
  });
  return tests;
}

export async function liftGetTestsFromSuites(suitesToMerge: Set<string>): Promise<Set<string>> {
  let allTests: Set<string> = new Set();
  for (const suite of suitesToMerge) {
    const currentTests: Set<string> = await fsGetTestSetFromSuiteXml(suite);
    currentTests.forEach(test => {
      allTests.add(test);
    });
  }
  return allTests;
}

export async function verifyUsername(username?: string, interactiveUx?: UX, verboseUx?: UX): Promise<string> {
  let usernameToReturn;
  if (!username) {
    const aggregator = await ConfigAggregator.create();
    const defaultUsername = aggregator.getPropertyValue('target-org');
    if (defaultUsername && interactiveUx) {
      const proceedWithDefault = await interactiveUx.confirm(`${logYN} Are you sure you want to use the "${chalk.cyanBright(defaultUsername)}" org ?`);
      if (!proceedWithDefault) {
        throw new SfError(messages.getMessage('noToDefaultUserName'));
      }
    } else if (!defaultUsername) {
      throw new SfError(messages.getMessage('noToDefaultUserName'));
    }
    usernameToReturn = defaultUsername;
  } else {
    const orgList: object = ensureAnyJson((await runCommand(`sfdx force:org:list --json`, verboseUx))) as object;
    let foundUsername = false;
    orgList['result']['nonScratchOrgs'].forEach(org => {
      if (org['alias'] === username || org['username'] === username) {
        foundUsername = true;
      }
    });
    if (!foundUsername) {
      throw new SfError(messages.getMessage('couldNotFindProvidedUsername'));
    }
    usernameToReturn = username;
  }
  return usernameToReturn;
}

export function sleep(ms: number, ux?: UX) {
  if (ux) { ux.log(chalk.dim.yellow(`Sleep for ${ms} ms`)); }
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getAffirmFormattedDate(): Promise<string> {
  const date = new Date();
  return `${date.getFullYear()}_${date.getMonth()}_${date.getDate()}-${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
}
