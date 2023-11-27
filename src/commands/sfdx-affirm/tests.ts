import { Ux, Flags, SfCommand } from '@salesforce/sf-plugins-core';
import { Messages, SfProjectJson } from '@salesforce/core';
import { AnyJson, ensureAnyJson, getJsonMap } from '@salesforce/ts-types';
import { CliUx } from '@oclif/core';
import { fsSaveJson } from '../../lib/affirm_fs';
import { getCurrentBranchName, getRemoteInfo, gitDiffSum } from '../../lib/affirm_git';
import { AffirmSettings, DiffObj, SfdxTestResult } from '../../lib/affirm_interfaces';
import {
  liftCleanProvidedTests, getYNString, liftPrintTable, getTestsFromSuiteOrUser, liftGetAllSuitesInBranch, liftGetTestsFromSuites, getAffirmFormattedDate, verifyUsername
} from '../../lib/affirm_lift';
import { getAffirmSettings } from '../../lib/affirm_settings';
import { sfcoreGetDefaultPath } from '../../lib/affirm_sfcore';
import { runCommand } from '../../lib/sfdx';
import { sfdxGetIsSandbox } from '../../lib/affirm_sfdx';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme
// import * as fs from 'fs-extra' // Docs: https://github.com/jprichardson/node-fs-extra

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('sfdx-affirm', 'tests');

export type TestsResult = { status: string };

export default class Tests extends SfCommand<TestsResult> {
  public static readonly summary = messages.getMessage('commandDescription');
  public static readonly description = messages.getMessage('commandDescription');
  public static readonly aliases = ['affirm:tests'];
  public static readonly examples = [
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

  public static readonly flags = {
    list: Flags.string({ char: "l", description: messages.getMessage("listFlagDescription"), }),
    waittime: Flags.integer({ char: "w", description: messages.getMessage("waittimeFlagDescription"), }),
    printresults: Flags.boolean({ char: "r", description: messages.getMessage("printresultsFlagDescription"), }),
    alltestsuites: Flags.boolean({ char: "a", description: messages.getMessage("alltestsuitesFlagDescription"), default: false, }),
    saveresults: Flags.boolean({ char: "e", description: messages.getMessage("saveresultsFlagDescription"), }),
    silent: Flags.boolean({ char: 's', description: messages.getMessage('silentFlagDescription'), default: false }),
    verbose: Flags.boolean({ summary: messages.getMessage('flags.verbose'), deprecateAliases: true, default: false, hidden: true }),
    targetusername: Flags.requiredOrg({ char: 'u', required: false }),
    apiversion: Flags.orgApiVersion({ description: 'api version for the org', required: false })
  };
  // eslint-disable-next-line complexity
  public async run(): Promise<TestsResult> {
    const { flags } = await this.parse(Tests);
    if (flags.saveresults && flags.printall) {
      throw messages.createError('errorConflictingResultsFlags');
    } else if (flags.alltestsuites && flags.list) {
      throw messages.createError('errorConflictingUseTestFlags');
    }
    const settings: AffirmSettings = await getAffirmSettings();

    const verbose = flags.verbose ? new Ux({ jsonEnabled: this.jsonEnabled() }) : undefined;
    const logYN = await getYNString();
    // get the default sfdx project path and use it or the users provided path, check that the path is in the projects sfdx-project.json file

    const silent = flags.silent;
    const silentUx = flags.silent ? new Ux({ jsonEnabled: this.jsonEnabled() }) : undefined;
    const username = flags.targetusername.getUsername();
    const orgIsSandbox: boolean = await sfdxGetIsSandbox(username, verbose);
    const orgType = (!orgIsSandbox) ? chalk.redBright('Production') : chalk.blueBright('Sandbox');
    this.log(`Selected ${orgType} Org: ${chalk.greenBright(username)}`);
    // if the user provides tests then skip getting them from the suite
    const list = flags.list;
    let testsToUse;
    if (!list) {
      if (flags.alltestsuites) {
        // make sure we are in a repo and that it has a remote set
        await getRemoteInfo();
        // get the default sfdx project path and use it or the users provided path, check that the path is in the projects sfdx-project.json file
        const projectJson: SfProjectJson = await this.project.retrieveSfProjectJson();
        const defaultPath = await sfcoreGetDefaultPath(projectJson);
        const diffResult: DiffObj = await gitDiffSum(settings.primaryBranch, defaultPath);
        const suitesToMerge: Set<string> = await liftGetAllSuitesInBranch(diffResult);
        const allTests: Set<string> = await liftGetTestsFromSuites(suitesToMerge);
        testsToUse = Array.from(allTests).join(',');
      } else {
        testsToUse = await getTestsFromSuiteOrUser(new Ux({ jsonEnabled: this.jsonEnabled() }), silent);
        if (!testsToUse) {
          this.log('End Command. No Tests Provided');
          return { result: 'User ended Command' };
        }
      }
    } else {
      testsToUse = await liftCleanProvidedTests(list);
    }
    const numberOfTests = (testsToUse) ? testsToUse.split(',').length : 0;
    this.log('Count of Test Classes: ' + chalk.green(numberOfTests));
    if (numberOfTests > 10 && !silent) {
      const youSure = await this.confirm(`${logYN} Are you sure that you want to run the test methods in all ${chalk.yellow(numberOfTests)} test classes?`);
      if (!youSure) return { result: 'User ended Command' };
    } else if (numberOfTests === 0) {
      this.log('End Command. No Tests Provided or Found');
      return { result: 'NO TESTS PROVIDED OR FOUND' };
    } else {
      this.log('Test Classes: ' + chalk.cyan(testsToUse));
    }
    const waitTime = flags.waittime === undefined ? settings.waitTime : flags.waittime;
    // run force:apex:test:run command
    this.spinner.start('Running Tests');
    const testCommand = `sfdx force:apex:test:run -l RunSpecifiedTests -c -n ${testsToUse} -u ${username} -w ${waitTime}`;
    const testCommandResults = getJsonMap((await runCommand(testCommand, verbose)), 'result');
    const testResults: SfdxTestResult = testCommandResults as unknown as SfdxTestResult;

    this.spinner.stop('Done');
    // this.ux.logJson(testResults.tests);
    this.log('Outcome: ' + chalk.cyanBright(testResults.summary.outcome));
    this.log('Tests Ran: ' + chalk.cyan(testResults.summary.testsRan));
    this.log('Passing: ' + chalk.green(testResults.summary.passing));
    this.log('Failing: ' + chalk.red(testResults.summary.failing));
    this.log('Skipped: ' + chalk.yellow(testResults.summary.skipped));
    this.log('PassRate: ' + chalk.green(testResults.summary.passRate));
    this.log('FailRate: ' + chalk.red(testResults.summary.failRate));
    this.log(
      'Test Total Time: ' + chalk.cyan(testResults.summary.testTotalTime)
    );
    const printResults = flags.printresults;
    const saveResults = flags.saveresults;
    let printTestResults;
    if (!printResults && !saveResults && !silent) {
      const printMore = await this.confirm(
        logYN + ' Would you like to print the results of each test?'
      );
      printTestResults = printMore;
    } else if (printResults) {
      printTestResults = printResults;
    }
    if (printTestResults) {
      const whatToPrint: CliUx.Table.table.Columns<any> = {
        'FullName': { header: 'Name' },
        'Outcome': { header: 'Outcome' },
        'RunTime': { header: ' Run Time (ms)' },
        'StackTrace': { header: 'Stack Trace' },
        'Message': { header: 'Message' },
      };
      await liftPrintTable(
        'Test Results',
        testResults.tests,
        whatToPrint,
        new Ux({ jsonEnabled: this.jsonEnabled() })
      );
    } else if (saveResults) {
      const dateString = await getAffirmFormattedDate();
      const currentBranchName = await getCurrentBranchName();
      const fileName = `${settings.buildDirectory}/testResults/${username}/${dateString}_${currentBranchName}`;
      await fsSaveJson(fileName, ensureAnyJson(testResults), new Ux({ jsonEnabled: this.jsonEnabled() }));
    }
    return testResults as unknown as AnyJson;
  }
}
