import { flags, SfdxCommand, TableOptions } from '@salesforce/command';
import { Messages, SfdxError, SfdxProject, SfdxProjectJson } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { getCurrentBranchName } from '../../affirm_git';
import { liftShortBranchName, liftCleanProvidedTests, getYNString, liftPrintTable } from '../../affirm_lift';
import { fsCheckForExistingSuite, fsGetTestStringFromSuiteXml } from '../../affirm_fs';
import { sfcoreGetDefaultPath } from '../../affirm_sfcore';
import { sfdxTestRun } from '../../affirm_sfdx';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme
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
      (y/n) Are you sure you want to run tests against myOrg@example.com.sandbox?: y
      Selected Org: myOrg@example.com.sandbox
      (y/n) Could not find test suite for the current branch. Would you like to provide a list of test classes now?: y
      Please provide a comma separated list of tests names: MyTestClassName,OtherTestClassName
      Count of Test Classes: 2
      Test Classes: MyTestClassName,OtherTestClassName
      Running Tests... Done
      Outcome: Passed
      Tests Ran: 10
      Passing: 10
      Failing: 0
      Skipped: 0
      PassRate: 100%
      FailRate: 0%
      Test Total Time: 27317 ms
      (y/n) Would you like to print the results of each test?: n
    `,
    `$ sfdx affirm:tests -u myOrg@example.com.sandbox
      Selected Org: myOrg@example.com.sandbox
      Found Test Suite for Current Branch: testSuites/pjname_XXXX_name_of_branch.testSuite-meta.xml
      Count of Test Classes: 2
      Test Classes: MyTestClassName,OtherTestClassName
      Running Tests... Done
      Outcome: Passed
      Tests Ran: 16
      Passing: 16
      Failing: 0
      Skipped: 0
      PassRate: 100%
      FailRate: 0%
      Test Total Time: 72004 ms
      (y/n) Would you like to print the results of each test?: n
    `,
  ];

  protected static flagsConfig = {
    list: flags.string({ char: 'l', description: messages.getMessage('listFlagDescription') }),
    waittime: flags.integer({ char: 'w', description: messages.getMessage('waittimeFlagDescription') }),
    printresults: flags.boolean({ char: 'r', description: messages.getMessage('printresultsFlagDescription') })
  };

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  // Comment this out if your command does not require an org username
  protected static supportsUsername = true;

  public async run(): Promise<AnyJson> {
    const inputUsername = this.flags.targetusername;
    const logYN = await getYNString();
    let username;
    if (!inputUsername) {
      const project = await SfdxProject.resolve();
      const pjtJson = await project.resolveProjectConfig();
      const confirmUserName = logYN + ' Are you sure you want to run tests against ' + chalk.cyanBright(pjtJson.defaultusername) + '?';
      const proceedWithDefault = await this.ux.confirm(confirmUserName);
      if (!proceedWithDefault) return { packageValidated: false, message: 'user said no to default username' };
      username = pjtJson.defaultusername;
    } else {
      username = inputUsername;
    }
    this.ux.log('Selected Org: ' + chalk.greenBright(username));
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
      const defaultOutputDir = defaultPath + '/main/default/testSuites/';
      const suiteExists = await fsCheckForExistingSuite(defaultOutputDir, defaultFileName);
      // if a suite doesn't exist prompt the user for tests
      if (!suiteExists) {
        const provideList = await this.ux.confirm(logYN + ' Could not find test suite for the current branch. Would you like to provide a list of test classes now?');
        if (provideList) {
          const providedTests = await this.ux.prompt('Please provide a comma separated list of tests names');
          testsToUse = await liftCleanProvidedTests(providedTests);
        } else {
          this.ux.log('End Command');
          return { result: 'User ended Command' };
        }
      } else {
        this.ux.log('Found Test Suite for Current Branch: ' + chalk.underline.blue(suiteExists.substring(suiteExists.indexOf('t/') + 2, suiteExists.length)));
        // if a test suite exists then parse the tests out
        testsToUse = await fsGetTestStringFromSuiteXml(suiteExists);
      }
    } else {
      testsToUse = await liftCleanProvidedTests(list);
    }
    const numberOfTests = testsToUse.split(',').length;
    this.ux.log('Count of Test Classes: ' + chalk.green(numberOfTests));
    if (numberOfTests > 10) {
      const youSure = await this.ux.confirm(logYN + ' You are about to run all the test methods in all ' + chalk.yellow(numberOfTests) + ' test classes?');
      if (!youSure) return { result: 'User ended Command' };
    } else {
      this.ux.log('Test Classes: ' + chalk.cyan(testsToUse));
    }
    const waittime = this.flags.waittime;
    // run force:apex:test:run command
    this.ux.startSpinner('Running Tests');
    const testResults = await sfdxTestRun(username, testsToUse, waittime);
    this.ux.stopSpinner('Done');
    // this.ux.logJson(testResults.tests);
    if (!testResults.status) {

      this.ux.log('Outcome: ' + chalk.cyanBright(testResults.summary.outcome));
      this.ux.log('Tests Ran: ' + chalk.cyan(testResults.summary.testsRan));
      this.ux.log('Passing: ' + chalk.green(testResults.summary.passing));
      this.ux.log('Failing: ' + chalk.red(testResults.summary.failing));
      this.ux.log('Skipped: ' + chalk.yellow(testResults.summary.skipped));
      this.ux.log('PassRate: ' + chalk.green(testResults.summary.passRate));
      this.ux.log('FailRate: ' + chalk.red(testResults.summary.failRate));
      this.ux.log('Test Total Time: ' + chalk.cyan(testResults.summary.testTotalTime));
      const printresults = this.flags.printresults;
      let printTestResults;
      if (!printresults) {
        const printMore = await this.ux.confirm(logYN + ' Would you like to print the results of each test?');
        printTestResults = printMore;
      } else {
        printTestResults = printresults;
      }
      if (printTestResults) {
        const whatToPrint: TableOptions = {
          columns: [
            { key: 'FullName', label: 'Name' },
            { key: 'Outcome', label: 'Outcome' },
            { key: 'RunTime', label: ' Run Time (ms)' },
            { key: 'StackTrace', label: 'Stack Trace' },
            { key: 'Message', label: 'Message' }
          ]
        };
        await liftPrintTable('Test Results', testResults.tests, whatToPrint, this.ux);
      }
    } else {
      this.ux.log(chalk.redBright('sfdx force:apex:test:run Failed to run Successfully'));
      this.ux.log('Error Message: ' + testResults.message);
      const printErrorDetails = await this.ux.confirm(logYN + ' Print full error details?');
      if (printErrorDetails) {
        this.ux.logJson(testResults);
      }
    }
    return testResults;
  }
}
