import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError, SfdxProject, SfdxProjectJson } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { getCurrentBranchName } from '../../affirm_git';
import { liftShortBranchName, liftCleanProvidedTests } from '../../affirm_lift';
import { fsCheckForExistingSuite, fsGetTestsFromSuiteXml } from '../../affirm_fs';
import { sfcoreGetDefaultPath } from '../../affirm_sfcore';
import { sfdxTestRun } from '../../affirm_sfdx';
// import * as fs from 'fs-extra' // Docs: https://github.com/jprichardson/node-fs-extra

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('affirm', 'tests');

export default class Tests extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
    `$ sfdx affirm:tests

    `,
  ];

  // TODO: add flag to auto print test results
  protected static flagsConfig = {
    list: flags.string({ char: 'l', description: messages.getMessage('listFlagDescription') }),
    waittime: flags.integer({ char: 'w', description: messages.getMessage('waittimeFlagDescription') })
  };

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  // Comment this out if your command does not require an org username
  protected static supportsUsername = true;

  public async run(): Promise<AnyJson> {
    const inputUsername = this.flags.targetusername;
    let username;
    if (!inputUsername) {
      const project = await SfdxProject.resolve();
      const pjtJson = await project.resolveProjectConfig();
      const confirmUserName = '(y/n) Are you sure you want to run tests against ' + pjtJson.defaultusername + '?';
      const proceedWithDefault = await this.ux.confirm(confirmUserName);
      if (!proceedWithDefault) return { packageValidated: false, message: 'user said no to default username' };
      username = pjtJson.defaultusername;
    } else {
      username = inputUsername;
    }
    this.ux.log('Selected Org: ' + username);
    // if the user provides tests then skip getting them from the suite
    const list = this.flags.list;
    let testsToUse;
    if (!list) {
      // get current branch name
      const currentBranch = await getCurrentBranchName();
      const defaultFileName = await liftShortBranchName(currentBranch, 25);
      // look for test suite with the current name
      const project = await SfdxProject.resolve();
      const pjtJson: SfdxProjectJson = await project.retrieveSfdxProjectJson();
      const defaultPath = await sfcoreGetDefaultPath(pjtJson);
      const defaultOutputDir = defaultPath + '/main/default/testSuites';
      const suiteExists = await fsCheckForExistingSuite(defaultOutputDir, defaultFileName);
      // if a suite doesn't exist prompt the user for tests
      if (!suiteExists) {
        const provideList = await this.ux.confirm('(y/n) Could not find test suite for the current branch. Would you like to provide a list of test classes now?');
        if (provideList) {
          const providedTests = await this.ux.prompt('Please provide a comma separated list of tests names');
          testsToUse = await liftCleanProvidedTests(providedTests);
        } else {
          this.ux.log('End Command');
          return { result: 'User ended Command' };
        }
      } else {
        this.ux.log('Found Test Suite for Current Branch: ' + suiteExists.substring(suiteExists.indexOf('t/')+2, suiteExists.length));
        // if a test suite exists then parse the tests out
        testsToUse = await fsGetTestsFromSuiteXml(suiteExists);
      }
    } else {
      testsToUse = await liftCleanProvidedTests(list);
    }
    const numberOfTests = testsToUse.split(',').length;
    this.ux.log('Count of Test Classes: ' + numberOfTests);
    if(numberOfTests > 10) {
      const youSure = await this.ux.confirm('(y/n) You are about to run all the test methods in all ' + numberOfTests + ' test classes?' );
      if(!youSure) return { result: 'User ended Command' };
    } else {
      this.ux.log('Test Classes: ' + testsToUse);
    }
    const waittime = this.flags.waittime;
    // run force:apex:test:run command
    this.ux.startSpinner('Running Tests');
    const testResults = await sfdxTestRun(username, testsToUse, waittime);
    this.ux.stopSpinner('Done');
    console.log(testResults);
    // TODO: print summary results
    // TODO: prompt user if they would like more details on the test results

    return testResults;
    // return { result: 'done'}
  }
}
