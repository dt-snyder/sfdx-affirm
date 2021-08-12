import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError, SfdxProject, SfdxProjectJson } from '@salesforce/core';
import * as fs from 'fs-extra';
import { AnyJson } from '@salesforce/ts-types';
import { gitDiffSum, getRemoteInfo, getCurrentBranchName } from '../../lib/affirm_git';
import { showDiffSum, createWhatToPrint, printBranchesCompared, getYNString, verifyUsername } from '../../lib/affirm_lift';
import { fsSaveJson, getPrintableDiffObject } from '../../lib/affirm_fs';
import { sfcoreGetDefaultPath, sfcoreIsPathProject } from '../../lib/affirm_sfcore';
import { AffirmSettings, DiffObj, PrintableDiffObj } from '../../lib/affirm_interfaces';
import { getAffirmSettings } from '../../lib/affirm_settings';
import chalk = require('chalk');

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-affirm', 'place');

export default class Place extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');
  public static aliases = ['affirm:place'];
  // TODO: document
  public static examples = [
    `$ sfdx affirm:place`
  ];


  protected static flagsConfig = {
    packagedir: flags.string({ char: 'd', description: messages.getMessage('packagedirFlagDescription') }),
    testclasses: flags.string({ char: 't', description: messages.getMessage('testclassesFlagDescription') }),
    silent: flags.boolean({ char: 's', description: messages.getMessage('silentFlagDescription'), default: false }),
    waittime: flags.integer({ char: 'w', description: messages.getMessage('waittimeFlagDescription') }),
    noresults: flags.boolean({ char: 'r', description: messages.getMessage('noresultsFlagDescription') }),
    openstatus: flags.boolean({ char: 'o', description: messages.getMessage('openstatusFlagDescription') }),
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
    this.ux.log(`Selected Org: ${chalk.greenBright(username)}`);
    // get the package directory provided by the user or the default, have them confirm it's use if it exists, if it doesn't throw an error.
    const packagedir = this.flags.packagedir || `${settings.buildDirectory}/${settings.packageDirectory}`;
    const parcelExists = await fs.pathExists(packagedir);
    if (parcelExists && silent === false) {
      const proceedWithDefault = await this.ux.confirm(`${logYN} Are you sure you want to deploy the package located in the "${chalk.underline.blue(packagedir)}" folder?`);
      if (!proceedWithDefault) return { packageValidated: false, message: `user said no to ${packagedir} folder` };
    } else if (parcelExists === false) {
      const errorType = packagedir === `${settings.buildDirectory}/${settings.packageDirectory}` ? 'errorDefaultPathPackageMissing' : 'errorPackageMissing';
      throw SfdxError.create('sfdx-affirm', 'place', errorType);
    }
    this.ux.log(`Package Directory: "${chalk.underline.blue(packagedir)}"`);
    return { status: 'complete' };
  }
}
