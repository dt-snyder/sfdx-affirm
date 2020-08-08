import { flags, SfdxCommand, TableOptions } from '@salesforce/command';
import { Messages, SfdxError, SfdxProject, SfdxProjectJson } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import * as inquirer from 'inquirer'
// import simpleGit, { SimpleGit, StatusResult } from 'simple-git'; // Docs: https://github.com/steveukx/git-js#readme
import * as fs from 'fs-extra' // Docs: https://github.com/jprichardson/node-fs-extra
import { sfdxMdapiValidatePackage } from '../../affirm_sfdx_commands';
import { fsSaveJson } from '../../affirm_fs_extra';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('affirm', 'quality');

export default class Quality extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
    `$ sfdx affirm:quality --targetusername myOrg@example.com --targetdevhubusername devhub@org.com
  Hello world! This is org: MyOrg and I will be around until Tue Mar 20 2018!
  My hub org id is: 00Dxx000000001234
  `,
    `$ sfdx affirm:quality --name myname --targetusername myOrg@example.com
  Hello myname! This is org: MyOrg and I will be around until Tue Mar 20 2018!
  `
  ];

  // public static args = [{ name: 'file' }];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    packagedirectory: flags.string({ char: 'd', description: messages.getMessage('packagedirectoryFlagDescription') }),
    testclasses: flags.string({ char: 't', description: messages.getMessage('testclassesFlagDescription') }),
    waittime: flags.integer({ char: 'o', description: messages.getMessage('waittimeFlagDescription') }),
    noresults: flags.boolean({ char: 'r', description: messages.getMessage('noresultsFlagDescription') })
  };

  // Comment this out if your command does not require an org username
  static supportsUsername = true;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    const inputUsername = this.flags.targetusername;
    let username;
    if (!inputUsername) {
      const project = await SfdxProject.resolve();
      const pjtJson = await project.resolveProjectConfig();
      const confirmUserName = '(y/n) Are you sure you want to validate against ' + pjtJson.defaultusername + '?';
      const proceedWithDefault = await this.ux.confirm(confirmUserName);
      if (!proceedWithDefault) return { packageValidated: false, message: 'user said no to default username' };
      username = pjtJson.defaultusername;
    } else {
      username = inputUsername;
    }
    this.ux.log('Selected Org: ' + username);
    const packagedirector = this.flags.packagedirector || '.releaseArtifacts/parcel';
    const parcelExists = await fs.pathExists(packagedirector);
    if (parcelExists) {
      const confirmParcelDir = '(y/n) Are you sure you want to validate the package located in the "' + packagedirector + '" folder?';
      const proceedWithDefault = await this.ux.confirm(confirmParcelDir);
      if (!proceedWithDefault) return { packageValidated: false, message: 'user said no to ' + packagedirector + ' folder' };
    } else {
      const errorType = packagedirector === '.releaseArtifacts/parcel' ? 'errorDefaultPathPackageMissing' : 'errorPackageMissing';
      throw SfdxError.create('affirm', 'quality', errorType);
    }
    this.ux.log('Package Directory: "' + packagedirector + '"');
    const testclasses = this.flags.testclasses;
    let useTestClasses;
    if (!testclasses) {
      const confirmTestClasses = '(y/n) Are you sure you want to validate without running any tests?';
      const proceedWithoutTests = await this.ux.confirm(confirmTestClasses);
      if (!proceedWithoutTests) {
        const providedTestClasses = await this.ux.prompt('Provide the test classes as a comma separated string');
        const finalTestClasses = providedTestClasses.trim().replace(/\s+/g, '');
        useTestClasses = finalTestClasses;
      }
    } else {
      useTestClasses = testclasses;
    }
    if (useTestClasses) {
      this.ux.log('Validating Using Provided Classes: ' + useTestClasses);
    } else {
      this.ux.log('Validating without test classes!');
    }
    const waittime = this.flags.waittime;
    this.ux.startSpinner('Validating Package');
    const validationResult = await sfdxMdapiValidatePackage(username, packagedirector, testclasses, waittime, this.ux, true);
    this.ux.stopSpinner(validationResult.status);
    const currentRunName = validationResult.startDate.substring(0, validationResult.startDate.indexOf('.')).replace(':','-').replace(':','-').replace('T','_') + '_'+ validationResult.id;
    this.ux.log('Deployment Status Date_Time_Id: ' + currentRunName);
    this.ux.log('Total Components: ' + validationResult.numberComponentsTotal);
    this.ux.log('Component Deployed: ' + validationResult.numberComponentsDeployed);
    this.ux.log('Component With Errors: ' + validationResult.numberComponentErrors);
    if (useTestClasses) {
      this.ux.log('Total Tests Run: ' + validationResult.numberTestsTotal);
      this.ux.log('Successful Tests: ' + validationResult.numberTestsCompleted);
      this.ux.log('Test Errors: ' + validationResult.numberTestErrors);
    }

    const noresults = this.flags.noresults;
    if (!noresults) {
      const displayResults: any = await inquirer.prompt([{
        name: 'selected',
        message: 'Would you like to print or save the any of the validation results?',
        type: 'list',
        choices: [{ name: 'No' }, { name: 'print: choose' }, { name: 'save: choose' }, { name: 'print: all' }, { name: 'save: all' }],
      }]);

      if (displayResults.selected !== 'no') {
        const columns = {
          componentSuccesses: ['componentType', 'fullName', 'fileName', 'id'],
          runTestResultSuccess: ['name', 'methodName', 'time'],
          runTestResultFailure: ['name', 'methodName', 'time', 'stackTrace', 'message'],
          componentFailures: ['componentType', 'fullName', 'fileName', 'problem', 'problemType']
        }
        const displayType = displayResults.selected.substring(0, displayResults.selected.indexOf(':'));
        for (const resultType of Object.keys(validationResult.details)) {
          if (validationResult.details[resultType].length <= 0) continue;
          const printResultType = resultType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          let displayNext = true;
          if (displayResults.selected === 'print: choose' || displayResults.selected === 'save: choose') {
            displayNext = await this.ux.confirm('(y/n) Would you like to ' + displayType + ' the ' + printResultType + '?');
          }
          if (displayNext && displayType === 'print') {
            if (resultType === 'runTestResult') {
              this.ux.log('_______________________Start Test Result Successes_______________________');
              this.ux.table(validationResult.details[resultType].successes, columns.runTestResultSuccess);
              this.ux.log('_______________________End Test Result Successes_______________________');
              if (validationResult.details[resultType].numFailures > 0) {
                this.ux.log('_______________________Start Test Result Failures_______________________');
                this.ux.table(validationResult.details[resultType].failures, columns.runTestResultFailure);
                this.ux.log('_______________________End Test Result Failures_______________________');
              }
            } else {
              this.ux.log('_______________________Start ' + printResultType + '_______________________');
              await this.ux.table(validationResult.details[resultType], columns[resultType]);
              this.ux.log('_______________________End ' + printResultType + '_______________________');
            }
          }
          if (displayNext && displayType === 'save') {
            const fileName = '.releaseArtifacts/validationResults/' + currentRunName + '/' + resultType;
            await fsSaveJson(fileName, validationResult.details[resultType]);
          }
        }
      }
    }
    return validationResult;
  }
}
