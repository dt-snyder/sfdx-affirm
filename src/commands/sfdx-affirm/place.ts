import { flags, FlagsConfig, SfdxCommand } from '@salesforce/command';
import { Messages, SfError } from '@salesforce/core';
import * as inquirer from 'inquirer'
import * as fs from 'fs-extra';
import { AnyJson, ensureAnyJson, ensureJsonMap, getJsonMap, JsonMap } from '@salesforce/ts-types';
import { getYNString, verifyUsername, getTestsFromPackageSettingsOrUser, liftCleanProvidedTests, liftPrintTestResultTable, liftPrintComponentTable } from '../../lib/affirm_lift';
import { AffirmSettings } from '../../lib/affirm_interfaces';
import { getAffirmSettings } from '../../lib/affirm_settings';
import chalk = require('chalk');
import { sfdxGetIsSandbox, sfdxOpenToPath } from '../../lib/affirm_sfdx';
import { runAsynCommand, runCommand } from '../../lib/sfdx';
import { MetadataApiDeployStatus } from '@salesforce/source-deploy-retrieve';
import { openLocations } from '../../lib/affirm_openLocations';
import { fsSaveJson } from '../../lib/affirm_fs';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-affirm', 'place');

export default class Place extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');
  public static aliases = ['affirm:place'];
  public static examples = [
    `$ sfdx affirm:place
      Selected Production Instance: personalDev
      (y/n) Are you sure you want to deploy the package located in the "releaseArtifacts/parcel" folder?: y
      Package Directory: "releaseArtifacts/parcel"
      Found test suite(s) in releaseArtifacts/parcel
      Deployment Test Classes:
      MyExampleClassTest
      Validation started in personalDev with Deployment Id: 0Af6S00000qVCieSAG
      Deploying Package... Completed
      Deployment Status Date_Time_Id: 2023-03-31_18_05_43_0Af6S00000qVCieSAG
      Total Components: 10
      Component Deployed: 10
      Component With Errors: 0
      Total Tests Run: 1
      Successful Tests: 1
      Test Errors: 0
      ? Would you like to print or save the any of the validation results? save: all
      File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_18_05_43_0Af6S00000qVCieSAG.json`,
    `$ sfdx affirm:place -s -o -e
      Selected Production Instance: personalDev
      Package Directory: "releaseArtifacts/parcel"
      Found test suite(s) in releaseArtifacts/parcel
      Deployment Test Classes:
      MyExampleClassTest
      Opening Deployment Status page in personalDev for deployment: 0Af6S00000qVCjcSAG
      Deploying Package... Completed
      Deployment Status Date_Time_Id: 2023-03-31_18_14_08_0Af6S00000qVCjcSAG
      Total Components: 10
      Component Deployed: 10
      Component With Errors: 0
      Total Tests Run: 1
      Successful Tests: 1
      Test Errors: 0
      File Saved to: ./releaseArtifacts/deploymentResults/personalDev/2023-03-31_18_14_08_0Af6S00000qVCjcSAG.json`
  ];

  protected static flagsConfig: FlagsConfig = {
    packagedir: flags.string({ char: 'd', description: messages.getMessage('packagedirFlagDescription') }),
    testclasses: flags.string({ char: 't', description: messages.getMessage('testclassesFlagDescription') }),
    silent: flags.boolean({ char: 's', description: messages.getMessage('silentFlagDescription'), default: false }),
    waittime: flags.integer({ char: 'w', description: messages.getMessage('waittimeFlagDescription') }),
    noresults: flags.boolean({ char: 'r', description: messages.getMessage('noresultsFlagDescription') }),
    openstatus: flags.boolean({ char: 'o', description: messages.getMessage('openstatusFlagDescription') }),
    saveresults: flags.boolean({ char: 'e', description: messages.getMessage('saveresultsFlagDescription') }),
    printall: flags.boolean({ char: 'p', description: messages.getMessage('printallFlagDescription') }),
    notestsrun: flags.boolean({ char: 'n', description: messages.getMessage('notestsrunFlagDescription') }),
    verbose: flags.builtin()
  };

  // Comment this out if your command does not require an org username
  static supportsUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {

    if (this.flags.testclasses && this.flags.notestsrun) {
      throw new SfError(messages.getMessage('errorNoTestAndTestList'));
    }
    // * get project settings
    const settings: AffirmSettings = await getAffirmSettings();
    const logYN = await getYNString();
    // * get default username and verify that the user wants to use that one unless silent is true
    const silent: boolean = this.flags.silent;
    const silentUx = this.flags.silent ? this.ux : undefined;
    const verbose = this.flags.verbose ? this.ux : undefined;
    const username = await verifyUsername(this.flags.targetusername, silentUx, verbose);
    const orgIsSandbox: boolean = await sfdxGetIsSandbox(username);
    if (!orgIsSandbox && this.flags.notestsrun) {
      throw new SfError(messages.getMessage('errorMustRunTestsInProd'));
    }
    const orgType = (!orgIsSandbox) ? chalk.redBright('Production') : chalk.blueBright('Sandbox');
    this.ux.log(`Selected ${orgType} Instance: ${chalk.greenBright(username)}`);
    // * get the package directory provided by the user or the default, have them confirm it's use if it exists, if it doesn't throw an error.
    const packageDir = this.flags.packagedir || `${settings.buildDirectory}/${settings.packageDirectory}`;
    const parcelExists = await fs.pathExists(packageDir);
    if (parcelExists && silent === false) {
      const proceedWithDefault = await this.ux.confirm(`${logYN} Are you sure you want to deploy the package located in the "${chalk.underline.blue(packageDir)}" folder?`);
      if (!proceedWithDefault) return { packageValidated: false, message: `user said no to ${packageDir} folder` };
    } else if (parcelExists === false) {
      const errorType = packageDir === `${settings.buildDirectory}/${settings.packageDirectory}` ? 'errorDefaultPathPackageMissing' : 'errorPackageMissing';
      throw new SfError(messages.getMessage(errorType));
    }
    this.ux.log(`Package Directory: "${chalk.underline.blue(packageDir)}"`);
    // * resolve test classes either, from the package, AffirmSettings, or the user
    // ! for production deployments AffirmSettings will be ignored intentionally.
    const testclasses = this.flags.testclasses;
    let useTestClasses;
    if (!testclasses && !this.flags.notestsrun) {
      useTestClasses = await getTestsFromPackageSettingsOrUser(this.ux, settings, packageDir, orgIsSandbox, silent, true);
    } else if (!this.flags.notestsrun && testclasses) {
      useTestClasses = await liftCleanProvidedTests(testclasses);
    }
    const numberOfTests = (useTestClasses) ? useTestClasses.split(",").length : 0;
    if (numberOfTests === 0 && !orgIsSandbox) {
      throw new SfError(messages.getMessage('errorNoTestsFoundProdBuild'));
    }
    // TODO: add flag and method that allows user to use a specific test suite
    const testClassLog = useTestClasses ? 'Deployment Test Classes: ' : chalk.red('Deployment Will Not Run Tests!');
    this.ux.log(testClassLog);
    if (useTestClasses) {
      const testClasses = useTestClasses.split(',');
      for (const test of testClasses) {
        this.ux.log(chalk.green(test));
      }
    }
    // * build and call the deployment command
    let commandResult: MetadataApiDeployStatus;
    const waitTime: number = this.flags.waittime === undefined ? settings.waitTime : this.flags.waittime;
    const tests = useTestClasses ? ` -l RunSpecifiedTests -r ${useTestClasses}` : ' -l NoTestRun';
    const startCommand = `sfdx force:mdapi:deploy -u ${username} -d ${packageDir} ${tests}`;

    // TODO: handle timeout more gracefully by implementing @salesforce/source-deploy-retrieve
    const validationStartMap = getJsonMap((await runCommand(startCommand, verbose)), 'result');

    commandResult = validationStartMap as unknown as MetadataApiDeployStatus;
    const validtionId = validationStartMap['id'];
    let date = new Date().toJSON();
    let currentRunName = `${date.substring(0, date.indexOf('.')).replace('T', '_').split(':').join('_')}_${validtionId}`;
    if (this.flags.openstatus) {
      this.ux.log(`Opening Deployment Status page in ${chalk.greenBright(username)} for deployment: ${validtionId}`);
      await sfdxOpenToPath(username, `${openLocations.deployment.lightningIdPath}${validtionId}`, false, verbose);
    } else {
      this.ux.log(`Deployment started in ${chalk.greenBright(username)} with Deployment Id: ${validtionId}`);
    }
    if (waitTime > 0 && validtionId) {
      const reportCommand = `sfdx force:mdapi:deploy:report -i ${validtionId} -u ${username}`;
      const validationCommandResult: JsonMap = getJsonMap((await runAsynCommand(reportCommand, waitTime, this.ux, 'Deploying Package', 15000, this.flags.verbose)), 'result');
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
          message: 'Would you like to print or save the any of the deployment results?',
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
        const fileName = `${settings.buildDirectory}/deploymentResults/${username}/${currentRunName}`;
        await fsSaveJson(fileName, ensureAnyJson(commandResult), this.ux);
      }
    }
    if (!Object.prototype.hasOwnProperty.call(commandResult, 'details')) {
      this.ux.log('Since a waittime of zero (0) was provided only initial results are printed');
      this.ux.log(`Deployment Status: ${chalk.cyanBright(commandResult.status)}`);
      if (this.flags.printall) this.ux.logJson(ensureJsonMap(ensureAnyJson(commandResult)));
      this.ux.log(`Run "sfdx force:mdapi:deploy:cancel -i ${validtionId} -u ${username}" to cancel the deployment.`);
      this.ux.log(`Run "sfdx force:mdapi:deploy:report -i ${validtionId} -u ${username}" to get the latest status.`);
    }
    return ensureAnyJson(commandResult);
  }
}

