// use this file to store all helper methods that doesn't have a specific dependency or can't be grouped into the other helper files.
import { SfdxError, SfdxProject, SfdxProjectJson } from '@salesforce/core';
import { UX, TableOptions } from '@salesforce/command';
import { DiffObj, PrintableDiffObj, WhatToPrint } from './affirm_interfaces';
import { getCurrentBranchName } from './affirm_git';
import { sfcoreGetDefaultPath } from './affirm_sfcore';
import { fsCheckForExistingSuite, fsGetTestStringFromSuiteXml } from './affirm_fs';

const chalk = require('chalk'); // https://github.com/chalk/chalk#readme
const charToRemove: Array<string> = ['.', '!', '?', ')', '(', '&', '^', '%', '$', '#', '@', '~', '`', '+', '=', '>', '<', ',', ']', '[', '{', '}', ':', ';', '*', '|', '--'];
const logYN = '(' + chalk.green('y') + '/' + chalk.red('n') + ')';

export async function liftShortBranchName(currentBranch: string, topCharCount: number, keepBranchType?: boolean) {
  let branchName: string;
  if (keepBranchType === true) {
    branchName = currentBranch.replace('/', '_');
  } else {
    branchName = currentBranch.substring(currentBranch.indexOf('/') + 1, currentBranch.length);
  }
  const cleanBranchName = await cleanSuiteName(branchName);
  const nameArray = cleanBranchName.split('_');
  let shortFileName;
  let charCount = 0;
  nameArray.forEach(element => {
    charCount = charCount + element.length;
    if (charCount >= topCharCount) return;
    if (shortFileName) {
      shortFileName = shortFileName + '_' + element;
    } else {
      shortFileName = element;
    }
  });
  return shortFileName;
}

export async function cleanSuiteName(currentBranch: string) {
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

export async function checkName(name: string, ux?: UX) {
  const letterNumberUnderScore = new RegExp(/^[a-zA-Z0-9_]*$/);
  const startsWithLetter = new RegExp(/^[a-zA-Z]/);
  if (!letterNumberUnderScore.test(name)) {
    if (ux) ux.log('Affirm created name from Branch: ' + chalk.red(name))
    throw SfdxError.create('sfdx-affirm', 'helper_files', 'alphanumericSuiteNameIssue');
  } else if (!startsWithLetter.test(name)) {
    if (ux) ux.log('Affirm created name from Branch: ' + chalk.red(name))
    throw SfdxError.create('sfdx-affirm', 'helper_files', 'startswithLetterSuiteNameIssue');
  }
}
export async function liftCleanProvidedTests(tests: string) {
  if (tests.includes('.cls')) {
    throw SfdxError.create('sfdx-affirm', 'helper_files', 'errorNoToFileName');
  }
  // clear the value provided by the user; remove white space and .cls
  return tests.trim().replace(/\s+/g, '');
}

export async function liftPrintTable(tableName: string, data: any[], options: TableOptions, ux: UX) {
  const start = '_______________________Start ' + tableName + '_______________________';
  const end = '_______________________End ' + tableName + '_______________________';
  ux.log(chalk.green(start));
  ux.table(data, options);
  ux.log(chalk.red(end));
}

export async function showDiffSum(ux: UX, diff: PrintableDiffObj, whatToPrint: WhatToPrint) {
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

export async function createWhatToPrint(onlyChanged: Boolean, onlyInsertion: Boolean, onlyDestructive: Boolean) {
  const whatToPrint: WhatToPrint = {
    changed: onlyChanged,
    insertion: onlyInsertion,
    destructive: onlyDestructive,
    showAll: !onlyChanged && !onlyInsertion && !onlyDestructive
  };
  return whatToPrint;
}

export async function printBranchesCompared(ux: UX, providedBranch: string, currentBranch: string) {
  const beingCompared = chalk.magenta(providedBranch) + '...' + chalk.cyan(currentBranch);
  ux.log('Git Diff For: ' + beingCompared);
}

export async function getYNString() {
  return logYN;
}

export async function getTestsFromSuiteOrUser(ux: UX, silent?: boolean) {
  let testsToReturn;
  // get current branch name
  const currentBranch = await getCurrentBranchName();
  const defaultFileName = await liftShortBranchName(currentBranch, 25);
  // look for test suite with the current name
  const project = await SfdxProject.resolve();
  const pjtJson: SfdxProjectJson = await project.retrieveSfdxProjectJson();
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

export async function liftGetAllSuitesInBranch(diff: DiffObj, existingMergedSuite?: string) {
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

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
