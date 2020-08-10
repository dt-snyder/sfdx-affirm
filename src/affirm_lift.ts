// use this file to store all helper methods that doesn't have a specific dependency or can't be grouped into the other helper files.
import { SfdxError } from '@salesforce/core';
// import { UX } from '@salesforce/command';

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
