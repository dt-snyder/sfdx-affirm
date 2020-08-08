import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError, SfdxProject, SfdxProjectJson } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import * as inquirer from 'inquirer'
// import simpleGit, { SimpleGit, StatusResult } from 'simple-git'; // Docs: https://github.com/steveukx/git-js#readme
import * as fs from 'fs-extra' // Docs: https://github.com/jprichardson/node-fs-extra
import { sfdxMdapiValidatePackage } from '../../affirm_sfdx_commands';


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
      const confirmUserName = 'Are you sure you want to validate against ' + pjtJson.defaultusername + ' (y/n)';
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
      const confirmParcelDir = 'Are you sure you want to validate the package located in the "' + packagedirector + '" folder (y/n)';
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
      const confirmTestClasses = 'Are you sure you want to validate without running any tests? (y/n)';
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
    this.ux.startSpinner('Starting Validation');
    const validationResult = await sfdxMdapiValidatePackage(username, packagedirector, testclasses, waittime, this.ux, true);
    this.ux.stopSpinner(validationResult.status);
    this.ux.log('Deployment Status Id: ' + validationResult.id);
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
      const printDetails = await this.ux.confirm('Would you like to print the component details? (y/n): ');
      if (printDetails) {
        // TODO: change to table
        validationResult.details.componentSuccesses.forEach(element => {
          this.ux.log(element);
        });
      }
      const printTestResults = await this.ux.confirm('Would you like to print the test result details? (y/n): ');
      if (printTestResults) {
        // TODO: change to table
        this.ux.log(validationResult.details.runTestResult);
      }
      if(validationResult.numberComponentErrors > 0){
        const printErrorDetails = await this.ux.confirm('Would you like to print the component details? (y/n): ');
        if (printErrorDetails) {
          // TODO: make this work
          this.ux.table(validationResult.details.componentFailures);
        }
      }
    }
    return validationResult;
  }
}
