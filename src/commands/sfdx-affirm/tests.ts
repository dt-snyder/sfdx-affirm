import { flags, FlagsConfig, SfdxCommand } from '@salesforce/command';
import { Messages, SfError, SfProjectJson } from "@salesforce/core";
import { AnyJson, ensureAnyJson, getJsonMap } from "@salesforce/ts-types";
import { fsSaveJson } from "../../lib/affirm_fs";
import { getCurrentBranchName, getRemoteInfo, gitDiffSum } from "../../lib/affirm_git";
import { AffirmSettings, DiffObj, SfdxTestResult } from "../../lib/affirm_interfaces";
import { CliUx } from '@oclif/core';
import {
  liftCleanProvidedTests, getYNString, liftPrintTable, getTestsFromSuiteOrUser, liftGetAllSuitesInBranch, liftGetTestsFromSuites, getAffirmFormattedDate, verifyUsername
} from "../../lib/affirm_lift";
import { getAffirmSettings } from "../../lib/affirm_settings";
import { sfcoreGetDefaultPath } from "../../lib/affirm_sfcore";
import { runCommand } from "../../lib/sfdx";
import { sfdxGetIsSandbox } from '../../lib/affirm_sfdx';
const chalk = require("chalk"); // https://github.com/chalk/chalk#readme
// import * as fs from 'fs-extra' // Docs: https://github.com/jprichardson/node-fs-extra

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages("sfdx-affirm", "tests");

export default class Tests extends SfdxCommand {
  public static description = messages.getMessage("commandDescription");
  public static aliases = ["affirm:tests"];
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

  protected static flagsConfig: FlagsConfig = {
    list: flags.string({ char: "l", description: messages.getMessage("listFlagDescription"), }),
    waittime: flags.integer({ char: "w", description: messages.getMessage("waittimeFlagDescription"), }),
    printresults: flags.boolean({ char: "r", description: messages.getMessage("printresultsFlagDescription"), }),
    alltestsuites: flags.boolean({ char: "a", description: messages.getMessage("alltestsuitesFlagDescription"), default: false, }),
    saveresults: flags.boolean({ char: "e", description: messages.getMessage("saveresultsFlagDescription"), }),
    silent: flags.boolean({ char: 's', description: messages.getMessage('silentFlagDescription'), default: false }),
    verbose: flags.builtin()
  };

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  // Comment this out if your command does not require an org username
  protected static supportsUsername = true;

  public async run(): Promise<AnyJson> {
    if (this.flags.saveresults && this.flags.printall) {
      throw new SfError(messages.getMessage('errorConflictingResultsFlags'));
    } else if (this.flags.alltestsuites && this.flags.list) {
      throw new SfError(messages.getMessage('errorConflictingUseTestFlags'));
    }
    const settings: AffirmSettings = await getAffirmSettings();

    const verbose = this.flags.verbose ? this.ux : undefined;
    const logYN = await getYNString();
    // get the default sfdx project path and use it or the users provided path, check that the path is in the projects sfdx-project.json file

    const silent = this.flags.silent;
    const username = await verifyUsername(this.flags.targetusername, (silent === true ? undefined : this.ux));
    const orgIsSandbox: boolean = await sfdxGetIsSandbox(username, verbose);
    const orgType = (!orgIsSandbox) ? chalk.redBright('Production') : chalk.blueBright('Sandbox');
    this.ux.log(`Selected ${orgType} Org: ${chalk.greenBright(username)}`);
    // if the user provides tests then skip getting them from the suite
    const list = this.flags.list;
    let testsToUse;
    if (!list) {
      if (this.flags.alltestsuites) {
        // make sure we are in a repo and that it has a remote set
        await getRemoteInfo();
        // get the default sfdx project path and use it or the users provided path, check that the path is in the projects sfdx-project.json file
        const pjtJson: SfProjectJson = await this.project.retrieveSfProjectJson();
        const defaultPath = await sfcoreGetDefaultPath(pjtJson);
        const diffResult: DiffObj = await gitDiffSum(settings.primaryBranch, defaultPath);
        const suitesToMerge: Set<string> = await liftGetAllSuitesInBranch(diffResult);
        const allTests: Set<String> = await liftGetTestsFromSuites(suitesToMerge);
        testsToUse = Array.from(allTests).join(",");
      } else {
        testsToUse = await getTestsFromSuiteOrUser(this.ux, silent);
        if (!testsToUse) {
          this.ux.log("End Command. No Tests Provided");
          return { result: "User ended Command" };
        }
      }
    } else {
      testsToUse = await liftCleanProvidedTests(list);
    }
    const numberOfTests = (testsToUse) ? testsToUse.split(",").length : 0;
    this.ux.log("Count of Test Classes: " + chalk.green(numberOfTests));
    if (numberOfTests > 10 && !silent) {
      const youSure = await this.ux.confirm(`${logYN} Are you sure that you want to run the test methods in all ${chalk.yellow(numberOfTests)} test classes?`);
      if (!youSure) return { result: "User ended Command" };
    } else if (numberOfTests === 0) {
      this.ux.log("End Command. No Tests Provided or Found");
      return { result: "NO TESTS PROVIDED OR FOUND" };
    } else {
      this.ux.log("Test Classes: " + chalk.cyan(testsToUse));
    }
    const waitTime = this.flags.waittime === undefined ? settings.waitTime : this.flags.waittime;
    // run force:apex:test:run command
    this.ux.startSpinner("Running Tests");
    const testCommand = `sfdx force:apex:test:run -l RunSpecifiedTests -c -n ${testsToUse} -u ${username} -w ${waitTime}`;
    const testCommandResults = getJsonMap((await runCommand(testCommand, verbose)), 'result');
    const testResults: SfdxTestResult = testCommandResults as unknown as SfdxTestResult;

    this.ux.stopSpinner("Done");
    // this.ux.logJson(testResults.tests);
    this.ux.log("Outcome: " + chalk.cyanBright(testResults.summary.outcome));
    this.ux.log("Tests Ran: " + chalk.cyan(testResults.summary.testsRan));
    this.ux.log("Passing: " + chalk.green(testResults.summary.passing));
    this.ux.log("Failing: " + chalk.red(testResults.summary.failing));
    this.ux.log("Skipped: " + chalk.yellow(testResults.summary.skipped));
    this.ux.log("PassRate: " + chalk.green(testResults.summary.passRate));
    this.ux.log("FailRate: " + chalk.red(testResults.summary.failRate));
    this.ux.log(
      "Test Total Time: " + chalk.cyan(testResults.summary.testTotalTime)
    );
    const printResults = this.flags.printresults;
    const saveResults = this.flags.saveresults;
    let printTestResults;
    if (!printResults && !saveResults && !silent) {
      const printMore = await this.ux.confirm(
        logYN + " Would you like to print the results of each test?"
      );
      printTestResults = printMore;
    } else if (printResults) {
      printTestResults = printResults;
    }
    if (printTestResults) {
      const whatToPrint: CliUx.Table.table.Columns<any> = {
        "FullName": { header: "Name" },
        "Outcome": { header: "Outcome" },
        "RunTime": { header: " Run Time (ms)" },
        "StackTrace": { header: "Stack Trace" },
        "Message": { header: "Message" },
      };
      await liftPrintTable(
        "Test Results",
        testResults.tests,
        whatToPrint,
        this.ux
      );
    } else if (saveResults) {
      const dateString = await getAffirmFormattedDate();
      const currentBranchName = await getCurrentBranchName();
      const fileName = `${settings.buildDirectory}/testResults/${username}/${dateString}_${currentBranchName}`;
      await fsSaveJson(fileName, ensureAnyJson(testResults), this.ux);
    }
    return testResults as unknown as AnyJson;
  }
}
