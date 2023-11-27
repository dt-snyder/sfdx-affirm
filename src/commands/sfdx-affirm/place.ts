import { Ux, Flags, SfCommand } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
import * as inquirer from 'inquirer'
import * as fs from 'fs-extra';
import { AnyJson, ensureAnyJson, ensureJsonMap, getJsonMap, JsonMap } from '@salesforce/ts-types';
import chalk = require('chalk');
import { MetadataApiDeployStatus } from '@salesforce/source-deploy-retrieve';
import { getYNString, verifyUsername, getTestsFromPackageSettingsOrUser, liftCleanProvidedTests, liftPrintTestResultTable, liftPrintComponentTable } from '../../lib/affirm_lift';
import { AffirmSettings } from '../../lib/affirm_interfaces';
import { getAffirmSettings } from '../../lib/affirm_settings';
import { sfdxGetIsSandbox, sfdxOpenToPath } from '../../lib/affirm_sfdx';
import { runAsynCommand, runCommand } from '../../lib/sfdx';
import { openLocations } from '../../lib/affirm_openLocations';
import { fsSaveJson } from '../../lib/affirm_fs';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('sfdx-affirm', 'place');

export type PlaceResult = { status: string };

export default class Place extends SfCommand<PlaceResult> {

  public static readonly summary = messages.getMessage('commandDescription');
  public static readonly description = messages.getMessage('commandDescription');
  public static readonly aliases = ['affirm:place'];
  public static readonly examples = [
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

  public static readonly flags = {
    packagedir: Flags.string({ char: 'd', description: messages.getMessage('packagedirFlagDescription') }),
    testclasses: Flags.string({ char: 't', description: messages.getMessage('testclassesFlagDescription') }),
    silent: Flags.boolean({ char: 's', description: messages.getMessage('silentFlagDescription'), default: false }),
    waittime: Flags.integer({ char: 'w', description: messages.getMessage('waittimeFlagDescription') }),
    noresults: Flags.boolean({ char: 'r', description: messages.getMessage('noresultsFlagDescription') }),
    openstatus: Flags.boolean({ char: 'o', description: messages.getMessage('openstatusFlagDescription') }),
    saveresults: Flags.boolean({ char: 'e', description: messages.getMessage('saveresultsFlagDescription') }),
    printall: Flags.boolean({ char: 'p', description: messages.getMessage('printallFlagDescription') }),
    notestsrun: Flags.boolean({ char: 'n', description: messages.getMessage('notestsrunFlagDescription') }),
    verbose: Flags.boolean({ summary: messages.getMessage('flags.verbose'), deprecateAliases: true, default: false, hidden: true }),
    targetusername: Flags.requiredOrg({ char: 'u', required: false }),
    apiversion: Flags.orgApiVersion({ description: 'api version for the org', required: false })
  };

  // eslint-disable-next-line complexity
  public async run(): Promise<PlaceResult> {
    const { flags } = await this.parse(Place);
    if (flags.testclasses && flags.notestsrun) {
      throw messages.createError('errorNoTestAndTestList');
    }
    // * get project settings
    const settings: AffirmSettings = await getAffirmSettings();
    const logYN = await getYNString();
    // * get default username and verify that the user wants to use that one unless silent is true
    const silent: boolean = flags.silent;
    const verbose = flags.verbose ? new Ux({jsonEnabled: this.jsonEnabled()}) : undefined;
    const username = flags.targetusername;
    const orgIsSandbox: boolean = await sfdxGetIsSandbox(username);
    if (!orgIsSandbox && flags.notestsrun) {
      throw messages.createError('errorMustRunTestsInProd');
    }
    const orgType = (!orgIsSandbox) ? chalk.redBright('Production') : chalk.blueBright('Sandbox');
    this.log(`Selected ${orgType} Instance: ${chalk.greenBright(username)}`);
    // * get the package directory provided by the user or the default, have them confirm it's use if it exists, if it doesn't throw an error.
    const packageDir = flags.packagedir || `${settings.buildDirectory}/${settings.packageDirectory}`;
    const parcelExists = await fs.pathExists(packageDir);
    if (parcelExists && silent === false) {
      const proceedWithDefault = await this.confirm(`${logYN} Are you sure you want to deploy the package located in the "${chalk.underline.blue(packageDir)}" folder?`);
      if (!proceedWithDefault) return { packageValidated: false, message: `user said no to ${packageDir} folder` };
    } else if (parcelExists === false) {
      const errorType = packageDir === `${settings.buildDirectory}/${settings.packageDirectory}` ? 'errorDefaultPathPackageMissing' : 'errorPackageMissing';
      throw messages.createError(errorType);
    }
    this.log(`Package Directory: "${chalk.underline.blue(packageDir)}"`);
    // * resolve test classes either, from the package, AffirmSettings, or the user
    // ! for production deployments AffirmSettings will be ignored intentionally.
    const testclasses = flags.testclasses;
    let useTestClasses;
    if (!testclasses && !flags.notestsrun) {
      useTestClasses = await getTestsFromPackageSettingsOrUser(new Ux({jsonEnabled: this.jsonEnabled()}), settings, packageDir, orgIsSandbox, silent, true);
    } else if (!flags.notestsrun && testclasses) {
      useTestClasses = await liftCleanProvidedTests(testclasses);
    }
    const numberOfTests = (useTestClasses) ? useTestClasses.split(',').length : 0;
    if (numberOfTests === 0 && !orgIsSandbox) {
      throw messages.createError('errorNoTestsFoundProdBuild');
    }
    // TODO: add flag and method that allows user to use a specific test suite
    const testClassLog = useTestClasses ? 'Deployment Test Classes: ' : chalk.red('Deployment Will Not Run Tests!');
    this.log(testClassLog);
    if (useTestClasses) {
      const testClasses = useTestClasses.split(',');
      for (const test of testClasses) {
        this.log(chalk.green(test));
      }
    }
    // * build and call the deployment command
    let commandResult: MetadataApiDeployStatus;
    const waitTime: number = flags.waittime === undefined ? settings.waitTime : flags.waittime;
    const tests = useTestClasses ? ` -l RunSpecifiedTests -r ${useTestClasses}` : ' -l NoTestRun';
    const startCommand = `sfdx force:mdapi:deploy -u ${username} -d ${packageDir} ${tests}`;

    // TODO: handle timeout more gracefully by implementing @salesforce/source-deploy-retrieve
    const validationStartMap = getJsonMap((await runCommand(startCommand, verbose)), 'result');

    commandResult = validationStartMap as unknown as MetadataApiDeployStatus;
    const validtionId = validationStartMap['id'];
    const date = new Date().toJSON();
    let currentRunName = `${date.substring(0, date.indexOf('.')).replace('T', '_').split(':').join('_')}_${validtionId}`;
    if (flags.openstatus) {
      this.log(`Opening Deployment Status page in ${chalk.greenBright(username)} for deployment: ${validtionId}`);
      await sfdxOpenToPath(username, `${openLocations.deployment.lightningIdPath}${validtionId}`, false, verbose);
    } else {
      this.log(`Deployment started in ${chalk.greenBright(username)} with Deployment Id: ${validtionId}`);
    }
    if (waitTime > 0 && validtionId) {
      const reportCommand = `sfdx force:mdapi:deploy:report -i ${validtionId} -u ${username}`;
      const validationCommandResult: JsonMap = getJsonMap((await runAsynCommand(reportCommand, waitTime, this.ux, 'Deploying Package', 15000, flags.verbose)), 'result');
      commandResult = validationCommandResult as unknown as MetadataApiDeployStatus;
      currentRunName = `${commandResult.createdDate.substring(0, commandResult.createdDate.indexOf('.')).replace('T', '_').split(':').join('_')}_${validtionId}`;
      this.log(`Deployment Status Date_Time_Id: ${chalk.cyanBright(currentRunName)}`);
      this.log(`Total Components: ${chalk.cyan(commandResult.numberComponentsTotal)}`);
      this.log(`Component Deployed: ${chalk.green(commandResult.numberComponentsDeployed)}`);
      this.log(`Component With Errors: ${chalk.red(commandResult.numberComponentErrors)}`);
      if (useTestClasses) {
        this.log(`Total Tests Run: ${chalk.cyan(commandResult.numberTestsTotal)}`);
        this.log(`Successful Tests: ${chalk.green(commandResult.numberTestsCompleted)}`);
        this.log(`Test Errors: ${chalk.red(commandResult.numberTestErrors)}`);
      }
    }

    if (!flags.noresults) {
      let resultHandlerType: string | undefined;
      if (flags.saveresults) {
        resultHandlerType = 'save';
      } else if (flags.printall) {
        resultHandlerType = 'printAll';
      } else if (silent === false) {
        const displayResults = await this.prompt<{ selected: string }>([{
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
          let displayNext = false;
          if ((resultType === 'runTestResult' && commandResult.details[resultType].numTestsRun !== '0') || commandResult.details[resultType]) {
            if (printAll) {
              displayNext = true;
            } else {
              displayNext = await this.confirm(`${logYN} Would you like to print the ${printResultType}?`);
            }
          }
          if (displayNext === false) continue;
          if (resultType === 'runTestResult') {
            await liftPrintTestResultTable(commandResult.details[resultType], new Ux({jsonEnabled: this.jsonEnabled()}));
          } else if (resultType === 'componentFailures' || resultType === 'componentSuccesses') {
            await liftPrintComponentTable(printResultType, commandResult.details[resultType], new Ux({jsonEnabled: this.jsonEnabled()}));
          }
        }
      } else if (resultHandlerType === 'save') {
        const fileName = `${settings.buildDirectory}/deploymentResults/${username}/${currentRunName}`;
        await fsSaveJson(fileName, ensureAnyJson(commandResult), new Ux({jsonEnabled: this.jsonEnabled()}));
      }
    }
    if (!Object.prototype.hasOwnProperty.call(commandResult, 'details')) {
      this.log('Since a waittime of zero (0) was provided only initial results are printed');
      this.log(`Deployment Status: ${chalk.cyanBright(commandResult.status)}`);
      if (flags.printall) this.styledJSON(ensureJsonMap(ensureAnyJson(commandResult)));
      this.log(`Run "sfdx force:mdapi:deploy:cancel -i ${validtionId} -u ${username}" to cancel the deployment.`);
      this.log(`Run "sfdx force:mdapi:deploy:report -i ${validtionId} -u ${username}" to get the latest status.`);
    }
    return ensureAnyJson(commandResult);
  }
}

