import { flags, SfdxCommand, FlagsConfig } from '@salesforce/command';
import { Messages, SfError } from '@salesforce/core';
import { AnyJson, ensureAnyJson, ensureJsonMap, getJsonMap, JsonMap } from '@salesforce/ts-types';
import * as inquirer from 'inquirer'
import * as fs from 'fs-extra' // Docs: https://github.com/jprichardson/node-fs-extra
import { liftCleanProvidedTests, getYNString, getTestsFromPackageSettingsOrUser, verifyUsername, liftPrintComponentTable, liftPrintTestResultTable } from '../../lib/affirm_lift';
import { fsSaveJson } from '../../lib/affirm_fs';
import { runAsynCommand, runCommand } from '../../lib/sfdx';
import { getAffirmSettings } from '../../lib/affirm_settings';
import { AffirmSettings } from '../../lib/affirm_interfaces';
import { sfdxGetIsSandbox, sfdxOpenToPath } from '../../lib/affirm_sfdx';
import { MetadataApiDeployStatus } from '@salesforce/source-deploy-retrieve';
import { openLocations } from '../../lib/affirm_openLocations';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-affirm', 'quality');

export default class Quality extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');
  public static aliases = ['affirm:quality'];
  public static examples = [
    `$ sfdx affirm:quality
      (y/n) Are you sure you want to validate against myOrg@example.com.sandbox?: y
      Selected Org: myOrg@example.com.sandbox
      (y/n) Are you sure you want to validate the package located in the "releaseArtifacts/parcel" folder?: y
      Package Directory: "releaseArtifacts/parcel"
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
      (y/n) Are you sure you want to validate the package located in the "releaseArtifacts/parcel" folder?: y
      Package Directory: "releaseArtifacts/parcel"
      Validating Using Provided Classes: MyTestClass,OtherTestClass
      Validating Package... Succeeded
      Deployment Status Date_Time_Id: 2020-08-09_14-21-23_0Af05000000iub1CAA
      Total Components: 761
      Component Deployed: 761
      Component With Errors: 0
    `
  ];

  protected static flagsConfig: FlagsConfig = {
    packagedir: flags.string({ char: 'd', description: messages.getMessage('packagedirFlagDescription') }),
    testclasses: flags.string({ char: 't', description: messages.getMessage('testclassesFlagDescription') }),
    silent: flags.boolean({ char: 's', description: messages.getMessage('silentFlagDescription'), default: false }),
    waittime: flags.number({ char: 'w', description: messages.getMessage('waittimeFlagDescription') }),
    noresults: flags.boolean({ char: 'r', description: messages.getMessage('noresultsFlagDescription') }),
    saveresults: flags.boolean({ char: 'e', description: messages.getMessage('saveresultsFlagDescription') }),
    printall: flags.boolean({ char: 'p', description: messages.getMessage('printallFlagDescription') }),
    openstatus: flags.boolean({ char: 'o', description: messages.getMessage('openstatusFlagDescription') }),
    notestsrun: flags.boolean({ char: 'n', description: messages.getMessage('notestsrunFlagDescription') }),
    verbose: flags.builtin()
  };

  // Comment this out if your command does not require an org username
  static supportsUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    if (this.flags.noresults && this.flags.saveresults && this.flags.printall) {
      throw new SfError(messages.getMessage('errorResultsFlags'));
    } else if (this.flags.testclasses && this.flags.notestsrun) {
      throw new SfError(messages.getMessage('errorTestFlags'));
    }
    let commandResult: MetadataApiDeployStatus;
    const settings: AffirmSettings = await getAffirmSettings();
    const logYN = await getYNString();
    // if the user provides a target user name set it, if they don't get the default username and have them confirm it's use.
    const silent: boolean = this.flags.silent;
    const verbose = this.flags.verbose ? this.ux : undefined;
    const username = await verifyUsername(this.flags.targetusername, (silent === true ? undefined : this.ux));
    const orgIsSandbox: boolean = await sfdxGetIsSandbox(username, verbose);
    const orgType = (!orgIsSandbox) ? chalk.redBright('Production') : chalk.blueBright('Sandbox');
    this.ux.log(`Selected ${orgType} Org: ${chalk.greenBright(username)}`);
    // get the package directory provided by the user or the default, have them confirm it's use if it exists, if it doesn't throw an error.
    const packagedir = this.flags.packagedir || `${settings.buildDirectory}/${settings.packageDirectory}`;
    const parcelExists = await fs.pathExists(packagedir);
    if (parcelExists && silent === false) {
      const confirmParcelDir = `${logYN} Are you sure you want to validate the package located in the "${chalk.underline.blue(packagedir)}" folder?`;
      const proceedWithDefault = await this.ux.confirm(confirmParcelDir);
      if (!proceedWithDefault) return { packageValidated: false, message: `user said no to ${packagedir} folder` };
    } else if (parcelExists === false) {
      const errorType = packagedir === (`${settings.buildDirectory}/${settings.packageDirectory}`) ? 'errorDefaultPathPackageMissing' : 'errorPackageMissing';
      throw new SfError(messages.getMessage(errorType));
    }
    this.ux.log(`Package Directory: "${chalk.underline.blue(packagedir)}"`);
    // get the test classes provided by the user, if they didn't provide any tests prompt them to confirm, and allow them to enter tests
    const testclasses = this.flags.testclasses;
    let useTestClasses;
    if (!testclasses && !this.flags.notestsrun) {
      useTestClasses = await getTestsFromPackageSettingsOrUser(this.ux, settings, packagedir, orgIsSandbox, silent);
    } else if (testclasses) {
      useTestClasses = await liftCleanProvidedTests(testclasses);
    } else if (this.flags.notestsrun && !orgIsSandbox) {
      throw new SfError(messages.getMessage('errorNoTestProvidedForProd'));
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
    const waitTime: number = this.flags.waittime === undefined ? settings.waitTime : this.flags.waittime;
    const tests = useTestClasses ? ` -l RunSpecifiedTests -r ${useTestClasses}` : ' -l NoTestRun';
    const startCommand = `sfdx force:mdapi:deploy -c  -u ${username} -d ${packagedir} ${tests}`;
    // TODO: handle timeout more gracefully by implementing @salesforce/source-deploy-retrieve
    const validationStartMap = getJsonMap((await runCommand(startCommand, verbose)), 'result');
    commandResult = validationStartMap as unknown as MetadataApiDeployStatus;
    const validtionId = validationStartMap['id'];
    let date = new Date().toJSON();
    let currentRunName = `${date.substring(0, date.indexOf('.')).replace('T', '_').split(':').join('_')}_${validtionId}`;
    if (this.flags.openstatus) {
      this.ux.log(`Opening Deployment Status page in ${chalk.greenBright(username)} for validation: ${validtionId}`);
      await sfdxOpenToPath(username, `${openLocations.deployment.lightningIdPath}${validtionId}`, false, verbose);
    } else {
      this.ux.log(`Validation started in ${chalk.greenBright(username)} with Deployment Id: ${validtionId}`);
    }
    if (waitTime > 0 && validtionId) {
      const reportCommand = `sfdx force:mdapi:deploy:report -i ${validtionId} -u ${username}`;
      const validationCommandResult: JsonMap = getJsonMap((await runAsynCommand(reportCommand, waitTime, this.ux, 'Validating Package', 15000, this.flags.verbose)), 'result');
      commandResult = validationCommandResult as unknown as MetadataApiDeployStatus;
      currentRunName = `${commandResult.createdDate.substring(0, commandResult.createdDate.indexOf('.')).replace('T', '_').split(':').join('_')}_${validtionId}`;
      this.ux.log(`Deployment Status Date_Time_Id: ${chalk.cyanBright(currentRunName)}`);
      this.ux.log(`Total Components: ${chalk.cyan(commandResult.numberComponentsTotal)}`);
      this.ux.log(`Component Deployed: ${chalk.green(commandResult.numberComponentsDeployed)}`);
      this.ux.log(`Component With Errors: ${chalk.red(commandResult.numberComponentErrors)}`);
      if (useTestClasses) {
        this.ux.log(`Total Tests Run: ${chalk.cyan(commandResult.numberTestsTotal)}`);
        this.ux.log(`Successful Tests: ${chalk.green(commandResult.numberTestsCompleted)}`);
        this.ux.log(`Test Errors: ${chalk.red(commandResult.numberTestErrors)}`);
      }
    }

    if (!this.flags.noresults) {
      let resultHandlerType: string | undefined;
      if (this.flags.saveresults) {
        resultHandlerType = 'save';
      } else if (this.flags.printall) {
        resultHandlerType = 'printAll';
      } else if (silent === false) {
        const displayResults: any = await inquirer.prompt([{
          name: 'selected',
          message: 'Would you like to print or save the any of the validation results?',
          type: 'list',
          choices: [{ name: 'No' }, { name: 'print: choose' }, { name: 'print: all' }, { name: 'save: all' }],
        }]);
        resultHandlerType = (displayResults.selected === 'print: all') ? 'printAll' : (displayResults.selected === 'save: all') ? 'save' : (displayResults.selected === 'print: choose') ? 'choose' : undefined;
      }
      if (resultHandlerType && Object.prototype.hasOwnProperty.call(commandResult, 'details') && (resultHandlerType === 'choose' || resultHandlerType === 'printAll')) {
        const printAll = resultHandlerType === 'printAll';
        for (const resultType of Object.keys(commandResult.details)) {
          const printResultType = resultType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          let displayNext: boolean = false;
          if ((resultType === 'runTestResult' && commandResult.details[resultType].numTestsRun !== '0') || commandResult.details[resultType]) {
            if (printAll) {
              displayNext = true;
            } else {
              displayNext = await this.ux.confirm(`${logYN} Would you like to print the ${printResultType}?`);
            }
          }
          if (displayNext === false) continue;
          if (resultType === 'runTestResult') {
            await liftPrintTestResultTable(commandResult.details[resultType], this.ux);
          } else if (resultType === 'componentFailures' || resultType === 'componentSuccesses') {
            await liftPrintComponentTable(printResultType, commandResult.details[resultType], this.ux);
          }
        }
      } else if (resultHandlerType === 'save') {
        const fileName = `${settings.buildDirectory}/validationResults/${username}/${currentRunName}`;
        await fsSaveJson(fileName, ensureAnyJson(commandResult), this.ux);
      }
    }
    if (!Object.prototype.hasOwnProperty.call(commandResult, 'details')) {
      this.ux.log('Since a waittime of zero (0) was provided only initial results are printed');
      this.ux.log(`Validation Status: ${chalk.cyanBright(commandResult.status)}`);
      if (this.flags.printall) this.ux.logJson(ensureJsonMap(ensureAnyJson(commandResult)));
      this.ux.log(`Run "sfdx force:mdapi:deploy:cancel -i ${validtionId} -u ${username}" to cancel the validation deployment.`);
      this.ux.log(`Run "sfdx force:mdapi:deploy:report -i ${validtionId} -u ${username}" to get the latest status.`);
    }
    return ensureAnyJson(commandResult);
  }
}
