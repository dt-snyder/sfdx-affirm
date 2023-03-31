// Use this file to store all simple-git helper methods
import { simpleGit, SimpleGit, StatusResult, DiffResult, DiffResultTextFile, DiffResultBinaryFile } from 'simple-git';// Docs: https://github.com/steveukx/git-js#readme
import { SfError, Messages } from '@salesforce/core';
import { UX } from '@salesforce/command';
import { DiffObj } from './affirm_interfaces';
const GIT_SSH_COMMAND = "ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no";
const git: SimpleGit = simpleGit();
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme
Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('sfdx-affirm', 'helper_files');
const filesToIgnore = ['**/jsconfig.json', '**/.eslintrc.json'];

function ignoreFile(file: string): boolean {
  if (filesToIgnore.includes(file)) return true;
  const fileNameOnly = '**' + file.substring(file.lastIndexOf('/'));
  if (filesToIgnore.includes(fileNameOnly)) return true;
  return false;
}

export async function checkForRepoAndRemote() {
  const isRepo = git.checkIsRepo();
  if (!isRepo) {
    throw new SfError(messages.getMessage('errorNoGitRepo'));
  }
}

export async function getCurrentBranchName(ux?: UX): Promise<string> {
  await checkForRepoAndRemote();
  const repoStatus: StatusResult = await git.status();
  const currentBranch = repoStatus.current;
  if (ux) ux.log('Current Branch: ' + chalk.cyan(currentBranch));
  return currentBranch;
}

export async function getRemoteInfo(ux?: UX): Promise<string> {
  await checkForRepoAndRemote();
  const remotes = await git.getRemotes(true);

  if (!remotes) throw new SfError(messages.getMessage('errorNoGitRemote'));
  const currentRemote = remotes[0].name + ' => ' + remotes[0].refs.push;
  if (ux) ux.log('Current Remote: ' + chalk.greenBright(currentRemote));
  return currentRemote;
}

export async function gitDiffSum(branch: string, inputdir: string): Promise<DiffObj> {
  // get the diff sum of $branch...$currentBranch minus deleted files
  await git.env('GIT_SSH_COMMAND', GIT_SSH_COMMAND).status();
  const diffSum: DiffResult = await git.env({ ...process.env, GIT_SSH_COMMAND }).diffSummary([branch, '--diff-filter=d']);
  // construct the object that will store the diff sum results
  const result: DiffObj = {
    changed: new Set(),
    insertion: new Set(),
    destructive: new Set()
  };
  // sort the changed files into their specific location
  diffSum.files.forEach(file => {
    if (!isDiffResultTextFile(file)) return;
    if (!file.file.startsWith(inputdir) || ignoreFile(file.file)) return;
    if (file.changes === file.insertions && file.deletions === 0 && !file.file.includes('=>')) {
      result.insertion.add(file.file);
    } else if (file.file.includes('=>')) {
      const path = file.file.substring(0, file.file.indexOf('{'));
      const files = file.file.substring(file.file.indexOf('{'));
      const oldFile = path + files.substring(0, files.indexOf('=')).replace('{', '').trim();
      const newFile = path + files.substring(files.indexOf('>') + 1).replace('}', '').trim();
      result.destructive.add(oldFile);
      result.insertion.add(newFile);
    } else {
      result.changed.add(file.file);
    }
  });
  // get the diff sum of $branch...$currentBranch - only deleted files
  const diffSumDeletions: DiffResult = await git.env({ ...process.env, GIT_SSH_COMMAND }).diffSummary([branch, '--diff-filter=D']);
  if (diffSumDeletions.files && diffSumDeletions.files.length > 0) {
    diffSumDeletions.files.forEach(file => {
      if (!file.file.startsWith(inputdir) || ignoreFile(file.file)) return;
      result.destructive.add(file.file);
    });
  }
  return result;
}


function isDiffResultTextFile(file: DiffResultTextFile | DiffResultBinaryFile): file is DiffResultTextFile {
  return (file as DiffResultTextFile).changes !== undefined;
}
