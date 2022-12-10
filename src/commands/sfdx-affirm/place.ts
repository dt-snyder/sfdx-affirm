import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfError } from '@salesforce/core';
import * as fs from 'fs-extra';
import {
  AnyJson,
  // ensureAnyJson
} from '@salesforce/ts-types';
// import { gitDiffSum, getRemoteInfo, getCurrentBranchName } from '../../lib/affirm_git';
import { getYNString, verifyUsername, getTestsFromPackageSettingsOrUser, liftCleanProvidedTests } from '../../lib/affirm_lift';
// import { fsSaveJson, getPrintableDiffObject } from '../../lib/affirm_fs';
// import { sfcoreGetDefaultPath, sfcoreIsPathProject } from '../../lib/affirm_sfcore';
import { AffirmSettings } from '../../lib/affirm_interfaces';
import { getAffirmSettings } from '../../lib/affirm_settings';
import chalk = require('chalk');
import { sfdxGetIsSandbox, sfdxOpenToPath } from '../../lib/affirm_sfdx';
// import { MetadataApiDeployStatus } from '@salesforce/source-deploy-retrieve';
// import { runCommand } from '../../lib/sfdx';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-affirm', 'place');

export default class Place extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');
  public static aliases = ['affirm:place'];
  // TODO: document examples
  public static examples = [
    `$ sfdx affirm:place`
  ];

  // TODO: document flagsConfig
  protected static flagsConfig = {
    packagedir: flags.string({ char: 'd', description: messages.getMessage('packagedirFlagDescription') }),
    testclasses: flags.string({ char: 't', description: messages.getMessage('testclassesFlagDescription') }),
    silent: flags.boolean({ char: 's', description: messages.getMessage('silentFlagDescription'), default: false }),
    waittime: flags.integer({ char: 'w', description: messages.getMessage('waittimeFlagDescription') }),
    noresults: flags.boolean({ char: 'r', description: messages.getMessage('noresultsFlagDescription') }),
    openstatus: flags.boolean({ char: 'o', description: messages.getMessage('openstatusFlagDescription') }),
    saveresults: flags.boolean({ char: 'e', description: messages.getMessage('saveresultsFlagDescription') }),
    printall: flags.boolean({ char: 'p', description: messages.getMessage('printallFlagDescription') }),
    notestsrun: flags.boolean({ char: 'n', description: messages.getMessage('notestsrunFlagDescription') }),
  };

  // Comment this out if your command does not require an org username
  static supportsUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    // get project settings
    const settings: AffirmSettings = await getAffirmSettings();
    const logYN = await getYNString();
    // get default username and verify that the user wants to use that one unless silent is true
    const silent: boolean = this.flags.silent;
    const username = await verifyUsername(this.flags.targetusername, (silent == true ? this.ux : undefined));
    const orgIsSandbox: boolean = await sfdxGetIsSandbox(username);
    const orgType = (!orgIsSandbox) ? chalk.redBright('Production') : chalk.blueBright('Sandbox');
    this.ux.log(`Selected ${orgType} Instance: ${chalk.greenBright(username)}`);
    // get the package directory provided by the user or the default, have them confirm it's use if it exists, if it doesn't throw an error.
    const packagedir = this.flags.packagedir || `${settings.buildDirectory}/${settings.packageDirectory}`;
    const parcelExists = await fs.pathExists(packagedir);
    if (parcelExists && silent === false) {
      const proceedWithDefault = await this.ux.confirm(`${logYN} Are you sure you want to deploy the package located in the "${chalk.underline.blue(packagedir)}" folder?`);
      if (!proceedWithDefault) return { packageValidated: false, message: `user said no to ${packagedir} folder` };
    } else if (parcelExists === false) {
      const errorType = packagedir === `${settings.buildDirectory}/${settings.packageDirectory}` ? 'errorDefaultPathPackageMissing' : 'errorPackageMissing';
      throw new SfError(messages.getMessage(errorType));
    }
    this.ux.log(`Package Directory: "${chalk.underline.blue(packagedir)}"`);
    // TODO: add logic to get the default test class for production deployments
    const testclasses = this.flags.testclasses;
    let useTestClasses;
    if (!testclasses && !this.flags.notestsrun) {
      useTestClasses = await getTestsFromPackageSettingsOrUser(this.ux, settings, packagedir, orgIsSandbox, silent);
    } else if (!this.flags.notestsrun && testclasses) {
      useTestClasses = await liftCleanProvidedTests(testclasses);
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
    // const waittime = this.flags.waittime || settings.waitTime;
    // const tests = useTestClasses ? ` -l RunSpecifiedTests -r ${useTestClasses}` : ' -l NoTestRun';
    if (this.flags.openstatus) {
      this.ux.log(`Opening Deployment Status page in ${chalk.greenBright(username)}`);
      await sfdxOpenToPath(username, 'lightning/setup/DeployStatus/home', false);
    }
    this.ux.startSpinner('Validating Package');
    // const command = `sfdx force:mdapi:deploy -u ${username} -d ${packagedir} ${tests} -w ${waittime}`;
    // TODO: handle timeout more gracefully by implementing @salesforce/source-deploy-retrieve
    // TODO: v3: add verbose flag that prints each of the sfdx commands that are run by this command.
    // const validationResult: MetadataApiDeployStatus = ensureAnyJson(await runCommand(command))['result'] as unknown as MetadataApiDeployStatus;
    // TODO: finish this
    return { status: 'complete', classes: useTestClasses };
  }
}

