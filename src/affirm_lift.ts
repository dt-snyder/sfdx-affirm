// use this file to store all helper methods that doesn't have a specific dependency or can't be grouped into the other helper files.
import { SfdxError } from '@salesforce/core';
import { UX, TableOptions } from '@salesforce/command';
import { PrintableDiffObj, WhatToPrint } from './affirm_interfaces';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme

export async function liftShortBranchName(currentBranch: string, topCharCount: number) {
  const nameArray = currentBranch.substring(currentBranch.indexOf('/'), currentBranch.length).split('-');
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

export async function liftCleanProvidedTests(tests: string) {
  if (tests.includes('.cls')) {
    throw SfdxError.create('affirm', 'helper_files', 'errorNoToFileName');
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
  return '(' + chalk.green('y') + '/' + chalk.red('n') + ')';
}
