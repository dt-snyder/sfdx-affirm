import { flags, SfdxCommand } from '@salesforce/command';
import { AnyJson } from '@salesforce/ts-types';
import { AffirmSettings } from '../../../lib/affirm_interfaces';
import * as fs from 'fs-extra';
import { getYNString } from '../../../lib/affirm_lift';
import { Messages } from '@salesforce/core';
import { getAffirmSettings, getDefaultAffirmSettings } from '../../../lib/affirm_settings';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-affirm', 'setup');

export default class Setup extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');
  public static aliases = ['affirm:config:setup'];
  public static examples = [
    `$ sfdx affirm:config:setup
    Provide name of remote branch related to your Production Instance  [remotes/origin/master]: remotes/origin/main
    Provide location where temp build folders and packages will be created and stored [.releaseArtifacts]: .superArtifacts
    Provide default directory name for new packages  [parcel]: pack
    Provide default wait time for async commands  [10]: 5
    (y/n) Are you sure you want to overwrite the existing settings?: y
    Settings Saved to: ./sfdx-affirm.json
    `,
    `$ affirm:config:setup -

    `,
  ];

  protected static flagsConfig = {
    primarybranch: flags.string({ char: 'b', description: messages.getMessage('primarybranchFlagDescription') }),
    builddir: flags.string({ char: 'd', description: messages.getMessage('builddirFlagDescription') }),
    packagedir: flags.string({ char: 'p', description: messages.getMessage('packagedirFlagDescription') }),
    waittime: flags.string({ char: 'w', description: messages.getMessage('waittimeFlagDescription') }),
    acceptdefaults: flags.boolean({ char: 'a', description: messages.getMessage('acceptdefaultsFlagDescription'), default: false }),
    overwrite: flags.boolean({ char: 'o', description: messages.getMessage('overwriteFlagDescription'), default: false })
  };

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    const logYN = await getYNString();
    const saveToFile = './sfdx-affirm.json';
    const acceptDefaults = this.flags.acceptdefaults;
    const defaultSettings: AffirmSettings = await getDefaultAffirmSettings();
    const settings: AffirmSettings = await getAffirmSettings();

    if (!this.flags.primarybranch && !acceptDefaults) {
      settings.primaryBranch = await this.ux.prompt('Provide name of remote branch related to your Production Instance ', { default: 'remotes/origin/master', required: false });
    } else if (!this.flags.overwrite && acceptDefaults && !this.flags.primarybranch && defaultSettings.primaryBranch !== settings.primaryBranch) {
      this.ux.log(chalk.green('Current Primary Branch: ') + settings.primaryBranch);
      this.ux.log(chalk.green('Default Primary Branch: ') + defaultSettings.primaryBranch);
      const youSure = await this.ux.confirm(logYN + ' Are you sure you want to overwrite the existing Primary Branch setting to default?');
      if (youSure) {
        settings.primaryBranch = defaultSettings.primaryBranch;
      }
    } else if (this.flags.primarybranch) {
      settings.primaryBranch = this.flags.primarybranch;
    }
    this.ux.log(chalk.blue('Primary Branch set to: ') + settings.primaryBranch);
    if (!this.flags.builddir && !acceptDefaults) {
      settings.buildDirectory = await this.ux.prompt('Provide location where temp build folders and packages will be created and stored', { default: '.releaseArtifacts', required: false });
    } else if (!this.flags.overwrite && acceptDefaults && !this.flags.builddir && defaultSettings.buildDirectory !== settings.buildDirectory) {
      this.ux.log(chalk.green('Current Build Directory: ') + settings.buildDirectory);
      this.ux.log(chalk.green('Default Build Directory: ') + defaultSettings.buildDirectory);
      const youSure = await this.ux.confirm(logYN + ' Are you sure you want to overwrite the existing Build Directory setting to default?');
      if (youSure) {
        settings.buildDirectory = defaultSettings.buildDirectory;
      }
    } else if (this.flags.builddir) {
      settings.buildDirectory = this.flags.builddir;
    }
    this.ux.log(chalk.blue('Build Directory set to: ') + settings.buildDirectory);
    if (!this.flags.packagedir && !acceptDefaults) {
      settings.packageDirectory = await this.ux.prompt('Provide default directory name for new packages ', { default: 'parcel', required: false });
    } else if (!this.flags.overwrite && acceptDefaults && !this.flags.packagedir && defaultSettings.packageDirectory !== settings.packageDirectory) {
      this.ux.log(chalk.green('Current Package Directory: ') + settings.packageDirectory);
      this.ux.log(chalk.green('Default Package Directory: ') + defaultSettings.packageDirectory);
      const youSure = await this.ux.confirm(logYN + ' Are you sure you want to overwrite the existing Package Directory setting to default?');
      if (youSure) {
        settings.packageDirectory = defaultSettings.packageDirectory;
      }
    } else if (this.flags.packagedir) {
      settings.packageDirectory = this.flags.packagedir;
    }
    this.ux.log(chalk.blue('Package Directory set to: ') + settings.packageDirectory);
    if (!this.flags.waittime && !acceptDefaults) {
      settings.waitTime = await this.ux.prompt('Provide default wait time for async commands ', { default: '10', required: false });
    } else if (!this.flags.overwrite && acceptDefaults && !this.flags.waittime && defaultSettings.waitTime !== settings.waitTime) {
      this.ux.log(chalk.green('Current Wait Time: ') + settings.waitTime);
      this.ux.log(chalk.green('Default Wait Time: ') + defaultSettings.waitTime);
      const youSure = await this.ux.confirm(logYN + ' Are you sure you want to overwrite the existing Wait Time setting to default?');
      if (youSure) {
        settings.waitTime = defaultSettings.waitTime;
      }
    } else if (this.flags.waittime) {
      settings.waitTime = this.flags.waittime;
    }
    this.ux.log(chalk.blue('Wait Time set to: ') + settings.waitTime);
    const dirExists = await fs.pathExists(saveToFile);
    if (dirExists && !this.flags.overwrite && (settings.primaryBranch !== defaultSettings.primaryBranch || settings.buildDirectory !== defaultSettings.buildDirectory || settings.packageDirectory !== defaultSettings.packageDirectory || settings.waitTime !== defaultSettings.waitTime)) {
      const youSure = await this.ux.confirm(logYN + ' Are you sure you want to overwrite the existing settings with the selections you have made?');
      if (!youSure) return { result: 'User ended Command' };
    }
    await fs.outputJson(saveToFile, settings);
    this.ux.log('Settings Saved to: ' + chalk.underline.blue(saveToFile));
    return settings as unknown as AnyJson;
  }
}
