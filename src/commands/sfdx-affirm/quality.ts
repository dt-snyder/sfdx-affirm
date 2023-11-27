import { Ux, Flags, SfCommand } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
import { AnyJson, ensureAnyJson, ensureJsonMap, getJsonMap, JsonMap } from '@salesforce/ts-types';
import * as inquirer from 'inquirer'
import * as fs from 'fs-extra' // Docs: https://github.com/jprichardson/node-fs-extra
import { MetadataApiDeployStatus } from '@salesforce/source-deploy-retrieve';
import { liftCleanProvidedTests, getYNString, getTestsFromPackageSettingsOrUser, verifyUsername, liftPrintComponentTable, liftPrintTestResultTable } from '../../lib/affirm_lift';
import { fsSaveJson } from '../../lib/affirm_fs';
import { runAsynCommand, runCommand } from '../../lib/sfdx';
import { getAffirmSettings } from '../../lib/affirm_settings';
import { AffirmSettings } from '../../lib/affirm_interfaces';
import { sfdxGetIsSandbox, sfdxOpenToPath } from '../../lib/affirm_sfdx';
import { openLocations } from '../../lib/affirm_openLocations';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('sfdx-affirm', 'quality');


export type QualityResult = { status: string };

export default class Quality extends SfCommand<QualityResult> {

  public static readonly summary = messages.getMessage('commandDescription');
  public static readonly description = messages.getMessage('commandDescription');
  public static readonly aliases = ['affirm:quality'];
  public static readonly examples = [
    `$ sfdx affirm:quality
      (y/n) Are you sure you want to use the "personalDev" org ?: y
      Selected Production Org: personalDev
      (y/n) Are you sure you want to validate the package located in the "releaseArtifacts/parcel" folder?: y
      Package Directory: "releaseArtifacts/parcel"
      Found test suite(s) in releaseArtifacts/parcel
      Validating Using Provided Test Classes:
      MyExampleClassTest
      Validation started in personalDev with Deployment Id: 0Af6S00000qVCjwSAG
      Validating Package... Completed
      Deployment Status Date_Time_Id: 2023-03-31_19_36_13_0Af6S00000qVCjwSAG
      Total Components: 10
      Component Deployed: 10
      Component With Errors: 0
      Total Tests Run: 1
      Successful Tests: 1
      Test Errors: 0
      ? Would you like to print or save the any of the validation results? save: all
      File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_19_36_13_0Af6S00000qVCjwSAG.json
  `,
    `$ sfdx affirm:quality -s -o -e
      Selected Production Org: personalDev
      Package Directory: "releaseArtifacts/parcel"
      Found test suite(s) in releaseArtifacts/parcel
      Validating Using Provided Test Classes:
      MyExampleClassTest
      Opening Deployment Status page in personalDev for validation: 0Af6S00000qVCkGSAW
      Validating Package... Completed
      Deployment Status Date_Time_Id: 2023-03-31_19_38_01_0Af6S00000qVCkGSAW
      Total Components: 10
      Component Deployed: 10
      Component With Errors: 0
      Total Tests Run: 1
      Successful Tests: 1
      Test Errors: 0
      File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_19_38_01_0Af6S00000qVCkGSAW.json
    `
  ];

  public static readonly flags = {
    packagedir: Flags.string({ char: 'd', description: messages.getMessage('packagedirFlagDescription') }),
    testclasses: Flags.string({ char: 't', description: messages.getMessage('testclassesFlagDescription') }),
    silent: Flags.boolean({ char: 's', description: messages.getMessage('silentFlagDescription'), default: false }),
    waittime: Flags.integer({ char: 'w', description: messages.getMessage('waittimeFlagDescription') }),
    noresults: Flags.boolean({ char: 'r', description: messages.getMessage('noresultsFlagDescription') }),
    saveresults: Flags.boolean({ char: 'e', description: messages.getMessage('saveresultsFlagDescription') }),
    printall: Flags.boolean({ char: 'p', description: messages.getMessage('printallFlagDescription') }),
    openstatus: Flags.boolean({ char: 'o', description: messages.getMessage('openstatusFlagDescription') }),
    notestsrun: Flags.boolean({ char: 'n', description: messages.getMessage('notestsrunFlagDescription') }),
    verbose: Flags.boolean({ summary: messages.getMessage('flags.verbose'), deprecateAliases: true, default: false, hidden: true }),
    targetusername: Flags.requiredOrg({ char: 'u', required: false }),
    apiversion: Flags.orgApiVersion({ description: 'api version for the org', required: false })
  };
  // eslint-disable-next-line complexity
  public async run(): Promise<QualityResult> {
    const result: QualityResult = {
      status: 'Processing'
    };
    const { flags } = await this.parse(Quality);
    if (flags.noresults && flags.saveresults && flags.printall) {
      result.status = 'failed';
      throw messages.createError('errorResultsFlags');
    } else if (flags.testclasses && flags.notestsrun) {
      result.status = 'failed';
      throw messages.createError('errorTestFlags');
    }
    let commandResult: MetadataApiDeployStatus;
    const settings: AffirmSettings = await getAffirmSettings();
    const logYN = await getYNString();
    // if the user provides a target user name set it, if they don't get the default username and have them confirm it's use.
    const silent: boolean = flags.silent;
    const silentUx = flags.silent ? new Ux({ jsonEnabled: this.jsonEnabled() }) : undefined;
    const verbose = flags.verbose ? new Ux({ jsonEnabled: this.jsonEnabled() }) : undefined;
    const username = flags.targetusername.getUsername();
    const orgIsSandbox: boolean = await sfdxGetIsSandbox(username, verbose);
    const orgType = (!orgIsSandbox) ? chalk.redBright('Production') : chalk.blueBright('Sandbox');
    this.log(`Selected ${orgType} Org: ${chalk.greenBright(username)}`);
    // get the package directory provided by the user or the default, have them confirm it's use if it exists, if it doesn't throw an error.
    const packagedir = flags.packagedir || `${settings.buildDirectory}/${settings.packageDirectory}`;
    const parcelExists = await fs.pathExists(packagedir);
    if (parcelExists && silent === false) {
      const confirmParcelDir = `${logYN} Are you sure you want to validate the package located in the "${chalk.underline.blue(packagedir)}" folder?`;
      const proceedWithDefault = await this.confirm(confirmParcelDir);
      if (!proceedWithDefault) {
        result.status = 'exit';
        return result;
      }
    } else if (parcelExists === false) {
      const errorType = packagedir === (`${settings.buildDirectory}/${settings.packageDirectory}`) ? 'errorDefaultPathPackageMissing' : 'errorPackageMissing';
      result.status = 'failed';
      throw messages.createError(errorType);
    }
    this.log(`Package Directory: "${chalk.underline.blue(packagedir)}"`);
    // get the test classes provided by the user, if they didn't provide any tests prompt them to confirm, and allow them to enter tests
    const testclasses = flags.testclasses;
    let useTestClasses;
    if (!testclasses && !flags.notestsrun) {
      useTestClasses = await getTestsFromPackageSettingsOrUser(new Ux({ jsonEnabled: this.jsonEnabled() }), settings, packagedir, orgIsSandbox, silent);
    } else if (testclasses) {
      useTestClasses = await liftCleanProvidedTests(testclasses);
    } else if (flags.notestsrun && !orgIsSandbox) {
      result.status = 'failed';
      throw messages.createError('errorNoTestProvidedForProd');
    }

    const testClassLog = useTestClasses ? 'Validating Using Provided Test Classes: ' : chalk.red('Validating without test classes!');
    this.log(testClassLog);
    if (useTestClasses) {
      const testClasses = useTestClasses.split(',');
      for (const test of testClasses) {
        this.log(chalk.green(test));
      }
    }

    // start the validation of the package
    const waitTime: number = flags.waittime === undefined ? settings.waitTime : flags.waittime;
    const tests = useTestClasses ? ` -l RunSpecifiedTests -r ${useTestClasses}` : ' -l NoTestRun';
    const startCommand = `sfdx force:mdapi:deploy -c  -u ${username} -d ${packagedir} ${tests}`;
    // TODO: handle timeout more gracefully by implementing @salesforce/source-deploy-retrieve
    const validationStartMap = getJsonMap((await runCommand(startCommand, verbose)), 'result');
    commandResult = validationStartMap as unknown as MetadataApiDeployStatus;
    const validtionId = validationStartMap['id'];
    const date = new Date().toJSON();
    let currentRunName = `${date.substring(0, date.indexOf('.')).replace('T', '_').split(':').join('_')}_${validtionId}`;
    if (flags.openstatus) {
      this.log(`Opening Deployment Status page in ${chalk.greenBright(username)} for validation: ${validtionId}`);
      await sfdxOpenToPath(username, `${openLocations.deployment.lightningIdPath}${validtionId}`, false, verbose);
    } else {
      this.log(`Validation started in ${chalk.greenBright(username)} with Deployment Id: ${validtionId}`);
    }
    if (waitTime > 0 && validtionId) {
      const reportCommand = `sfdx force:mdapi:deploy:report -i ${validtionId} -u ${username}`;
      const validationCommandResult: JsonMap = getJsonMap((await runAsynCommand(reportCommand, waitTime, new Ux({ jsonEnabled: this.jsonEnabled() }), 'Validating Package', 15000, flags.verbose)), 'result');
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
            await liftPrintTestResultTable(commandResult.details[resultType], new Ux({ jsonEnabled: this.jsonEnabled() }));
          } else if (resultType === 'componentFailures' || resultType === 'componentSuccesses') {
            await liftPrintComponentTable(printResultType, commandResult.details[resultType], new Ux({ jsonEnabled: this.jsonEnabled() }));
          }
        }
      } else if (resultHandlerType === 'save') {
        const fileName = `${settings.buildDirectory}/validationResults/${username}/${currentRunName}`;
        await fsSaveJson(fileName, ensureAnyJson(commandResult), new Ux({ jsonEnabled: this.jsonEnabled() }));
      }
    }
    if (!Object.prototype.hasOwnProperty.call(commandResult, 'details')) {
      this.log('Since a waittime of zero (0) was provided only initial results are printed');
      this.log(`Validation Status: ${chalk.cyanBright(commandResult.status)}`);
      if (flags.printall) this.logJson(ensureJsonMap(ensureAnyJson(commandResult)));
      this.log(`Run "sfdx force:mdapi:deploy:cancel -i ${validtionId} -u ${username}" to cancel the validation deployment.`);
      this.log(`Run "sfdx force:mdapi:deploy:report -i ${validtionId} -u ${username}" to get the latest status.`);
    }
    return result;
  }
}
