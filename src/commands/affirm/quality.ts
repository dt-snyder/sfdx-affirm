import { flags, SfdxCommand, TableOptions } from '@salesforce/command';
import { Messages, SfdxError, SfdxProject } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import * as inquirer from 'inquirer'
import * as fs from 'fs-extra' // Docs: https://github.com/jprichardson/node-fs-extra
import { sfdxMdapiValidatePackage } from '../../affirm_sfdx';
import { liftCleanProvidedTests, liftPrintTable, getYNString, getTestsFromSuiteOrUser } from '../../affirm_lift';
import { fsSaveJson } from '../../affirm_fs';
import affirm_tables from '../../affirm_tables';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('affirm', 'quality');

export default class Quality extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
    `$ sfdx affirm:quality
      (y/n) Are you sure you want to validate against myOrg@example.com.sandbox?: y
      Selected Org: myOrg@example.com.sandbox
      (y/n) Are you sure you want to validate the package located in the ".releaseArtifacts/parcel" folder?: y
      Package Directory: ".releaseArtifacts/parcel"
      (y/n) Are you sure you want to validate without running any tests?: y
      Validating without test classes!
      Validating Package... Succeeded
      Deployment Status Date_Time_Id: 2020-08-09_14-21-23_0Af05000000iub1CAA
      Total Components: 761
      Component Deployed: 761
      Component With Errors: 0
      ? Would you like to print or save the any of the validation results? No
  `,
    `$ sfdx affirm:quality -u myOrg@example.com.sandbox -t MyTestClass,OtherTestClass -r
      Selected Org: myOrg@example.com.sandbox
      (y/n) Are you sure you want to validate the package located in the ".releaseArtifacts/parcel" folder?: y
      Package Directory: ".releaseArtifacts/parcel"
      Validating Using Provided Classes: MyTestClass,OtherTestClass
      Validating Package... Succeeded
      Deployment Status Date_Time_Id: 2020-08-09_14-21-23_0Af05000000iub1CAA
      Total Components: 761
      Component Deployed: 761
      Component With Errors: 0
    `
  ];

  // public static args = [{ name: 'file' }];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    packagedir: flags.string({ char: 'd', description: messages.getMessage('packagedirFlagDescription') }),
    testclasses: flags.string({ char: 't', description: messages.getMessage('testclassesFlagDescription') }),
    waittime: flags.integer({ char: 'w', description: messages.getMessage('waittimeFlagDescription') }),
    noresults: flags.boolean({ char: 'r', description: messages.getMessage('noresultsFlagDescription') })
  };

  // Comment this out if your command does not require an org username
  static supportsUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    // if the user provides a target user name set it, if they don't get the default username and have them confirm it's use.
    const inputUsername = this.flags.targetusername;
    let username;
    const logYN = await getYNString();
    if (!inputUsername) {
      const project = await SfdxProject.resolve();
      const pjtJson = await project.resolveProjectConfig();
      const confirmUserName = logYN + ' Are you sure you want to validate against ' + chalk.cyanBright(pjtJson.defaultusername) + '?';
      const proceedWithDefault = await this.ux.confirm(confirmUserName);
      if (!proceedWithDefault) return { packageValidated: false, message: 'user said no to default username' };
      username = pjtJson.defaultusername;
    } else {
      username = inputUsername;
    }
    this.ux.log('Selected Org: ' + chalk.greenBright(username));
    // get the package directory provided by the user or the default, have them confirm it's use if it exists, if it doesn't throw an error.
    const packagedir = this.flags.packagedir || '.releaseArtifacts/parcel';
    const parcelExists = await fs.pathExists(packagedir);
    if (parcelExists) {
      const confirmParcelDir = logYN + ' Are you sure you want to validate the package located in the "' + chalk.underline.blue(packagedir) + '" folder?';
      const proceedWithDefault = await this.ux.confirm(confirmParcelDir);
      if (!proceedWithDefault) return { packageValidated: false, message: 'user said no to ' + packagedir + ' folder' };
    } else {
      const errorType = packagedir === '.releaseArtifacts/parcel' ? 'errorDefaultPathPackageMissing' : 'errorPackageMissing';
      throw SfdxError.create('affirm', 'quality', errorType);
    }
    this.ux.log('Package Directory: "' + chalk.underline.blue(packagedir) + '"');
    // get the test classes provided by the user, if they didn't provide any tests prompt them to confirm, and allow them to enter tests
    // TODO: add logic to get tests from the current branch suite like in affirm:tests
    const testclasses = this.flags.testclasses;
    let useTestClasses;
    if (!testclasses) {
      useTestClasses = await getTestsFromSuiteOrUser(this.ux);
      if (!useTestClasses) {
        const proceedWithoutTests = await this.ux.confirm(logYN + ' Are you sure you want to validate without running any tests?');
        if (!proceedWithoutTests) {
          const providedTestClasses = await this.ux.prompt('Provide the test classes as a comma separated string');
          useTestClasses = await liftCleanProvidedTests(providedTestClasses);
        }
      }
    } else {
      useTestClasses = await liftCleanProvidedTests(testclasses);
    }
    const testClassLog = useTestClasses ? 'Validating Using Provided Test Classes: ' : chalk.red('Validating without test classes!');
    this.ux.log(testClassLog);
    if (useTestClasses) {
      const testClasses = useTestClasses.split(',');
      for (const test of testClasses) {
        this.ux.log(chalk.green(test));
      }
    }
    // start the validation of the package
    const waittime = this.flags.waittime;
    this.ux.startSpinner('Validating Package');
    const validationResult = await sfdxMdapiValidatePackage(username, packagedir, useTestClasses, waittime, this.ux, true);
    const validationStatus = (validationResult.status == 1) ? chalk.redBright('Error') : chalk.cyanBright(validationResult.status);
    this.ux.stopSpinner(validationStatus);
    if (validationStatus !== 'Error') {
      const currentRunName = validationResult.startDate.substring(0, validationResult.startDate.indexOf('.')).replace('T', '_').split(':').join('_') + '_' + validationResult.id;
      this.ux.log('Deployment Status Date_Time_Id: ' + chalk.cyanBright(currentRunName));
      this.ux.log('Total Components: ' + chalk.cyan(validationResult.numberComponentsTotal));
      this.ux.log('Component Deployed: ' + chalk.green(validationResult.numberComponentsDeployed));
      this.ux.log('Component With Errors: ' + chalk.red(validationResult.numberComponentErrors));
      if (useTestClasses) {
        this.ux.log('Total Tests Run: ' + chalk.cyan(validationResult.numberTestsTotal));
        this.ux.log('Successful Tests: ' + chalk.green(validationResult.numberTestsCompleted));
        this.ux.log('Test Errors: ' + chalk.red(validationResult.numberTestErrors));
      }

      const noresults = this.flags.noresults;
      if (!noresults) {
        const displayResults: any = await inquirer.prompt([{
          name: 'selected',
          message: 'Would you like to print or save the any of the validation results?',
          type: 'list',
          choices: [{ name: 'No' }, { name: 'print: choose' }, { name: 'save: choose' }, { name: 'print: all' }, { name: 'save: all' }],
        }]);
        if (displayResults.selected !== 'No') {
          const selected = displayResults.selected.split(': ');
          const selectedType = selected[0];
          const selectedCount = selected[1];

          const columns = {
            componentSuccesses: affirm_tables.componentSuccesses,
            runTestResultSuccess: affirm_tables.runTestResultSuccess,
            runTestResultFailure: affirm_tables.runTestResultFailure,
            componentFailures: affirm_tables.componentFailures
          };

          for (const resultType of Object.keys(validationResult.details)) {
            if (resultType === 'runTestResult') {
              if (!validationResult.details[resultType].successes && !validationResult.details[resultType].failures)
                continue;
            }
            if ((Array.isArray(validationResult.details[resultType]) && validationResult.details[resultType].length === 0)) continue;
            const printResultType = resultType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            let displayNext = selectedCount === 'all';
            if (displayNext === false) {
              displayNext = await this.ux.confirm(logYN + ' Would you like to ' + selectedType + ' the ' + printResultType + '?');
            }
            if (displayNext === false) continue;
            if (resultType === 'runTestResult' && selectedType === 'print') {
              if (validationResult.details[resultType].successes.length > 0) {
                await liftPrintTable('Test Result Successes', validationResult.details[resultType].successes, columns.runTestResultSuccess, this.ux);
              }
              if (validationResult.details[resultType].numFailures.length > 0) {
                await liftPrintTable('Test Result Failures', validationResult.details[resultType].failures, columns.runTestResultFailure, this.ux);
              }
            } else if (resultType !== 'runTestResult' && selectedType === 'print') {
              await liftPrintTable(printResultType, validationResult.details[resultType], columns[resultType], this.ux);
            } else if (selectedType === 'save') {
              const fileName = '.releaseArtifacts/validationResults/' + currentRunName + '/' + resultType;
              await fsSaveJson(fileName, validationResult.details[resultType], this.ux);
            }
          }
        }
      }
    } else {
      this.ux.log('sfdx force:mdapi:deploy Failed to run Successfully');
      this.ux.log('Error Message: ' + validationResult.message);
      const printErrorDetails = await this.ux.confirm(logYN + 'Print full error details?');
      if (printErrorDetails) {
        this.ux.logJson(validationResult);
      }
    }
    return validationResult;
  }
}
