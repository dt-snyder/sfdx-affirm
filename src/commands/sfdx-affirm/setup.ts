import { Ux, Flags, SfCommand } from '@salesforce/sf-plugins-core';
import { AnyJson } from '@salesforce/ts-types';
import { AffirmSettings } from '../../lib/affirm_interfaces';
import * as fs from 'fs-extra';
import { getYNString } from '../../lib/affirm_lift';
import { Messages } from '@salesforce/core';
import { confirmAndUpdateSettings, getAffirmSettings, getDefaultAffirmSettings } from '../../lib/affirm_settings';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('sfdx-affirm', 'setup');

export type SetupResult = { status: string; };

export default class Setup extends SfCommand<SetupResult> {

  public static description = messages.getMessage('commandDescription');
  public static aliases = ['affirm:setup'];
  public static examples = [
    `$ sfdx affirm:setup
      Provide name of remote branch related to your Production Instance  [remotes/origin/main]: remotes/origin/master
      Primary Branch set to:  remotes/origin/master
      Provide location where temp build folders and packages will be created and stored  [releaseArtifacts]: .superArtifacts
      Build Directory set to:  .superArtifacts
      Provide default directory name for new packages  [parcel]: pack
      Package Directory set to:  pack
      Provide default wait time for async commands  [10]: 5
      Wait Time set to:  5
      Provide the name of a test class you would like to run for declarative dev by default if no test suite is created : Test_DeclarativeDefault
      Declarative Test Class set to:  Test_DeclarativeDefault
      Settings Saved to: ./sfdx-affirm.json
    `,
    `$ sfdx affirm:setup -b remotes/origin/master -d .superArtifacts -p pack -w 5 -t Test_DeclarativeDefault -o
      Primary Branch set to:  remotes/origin/master
      Build Directory set to:  .superArtifacts
      Package Directory set to:  pack
      Wait Time set to:  5
      Declarative Test Class set to:  Test_DeclarativeDefault
      Settings Saved to: ./sfdx-affirm.json
    `,
  ];
  public static readonly flags = {
    primarybranch: Flags.string({ char: 'b', description: messages.getMessage('primarybranchFlagDescription') }),
    builddir: Flags.string({ char: 'd', description: messages.getMessage('builddirFlagDescription') }),
    packagedir: Flags.string({ char: 'p', description: messages.getMessage('packagedirFlagDescription') }),
    waittime: Flags.integer({ char: 'w', description: messages.getMessage('waittimeFlagDescription') }),
    declarativetestclass: Flags.string({ char: 't', description: messages.getMessage('declarativetestclassFlagDescription') }),
    acceptdefaults: Flags.boolean({ char: 'a', description: messages.getMessage('acceptdefaultsFlagDescription'), default: false }),
    overwrite: Flags.boolean({ char: 'o', description: messages.getMessage('overwriteFlagDescription'), default: false }),
    targetusername: Flags.requiredOrg({ char: 'u', required: false }),
    apiversion: Flags.orgApiVersion({ description: 'api version for the org', required: false })
  };


  public async run(): Promise<SetupResult> {
    const { flags } = await this.parse(Setup);
    const logYN = await getYNString();
    const saveToFile = './sfdx-affirm.json';
    const defaultSettings: AffirmSettings = await getDefaultAffirmSettings();
    const settings: AffirmSettings = await getAffirmSettings();
    const primaryBranch = await confirmAndUpdateSettings(settings, 'primaryBranch', new Ux({jsonEnabled: this.jsonEnabled()}), flags.acceptdefaults, flags.overwrite, flags.primarybranch);
    if (primaryBranch) {
      settings.primaryBranch = primaryBranch;
    }
    const buildDirectory = await confirmAndUpdateSettings(settings, 'buildDirectory', new Ux({jsonEnabled: this.jsonEnabled()}), flags.acceptdefaults, flags.overwrite, flags.builddir);
    if (buildDirectory) {
      settings.buildDirectory = buildDirectory;
    }
    const packageDirectory = await confirmAndUpdateSettings(settings, 'packageDirectory', new Ux({jsonEnabled: this.jsonEnabled()}), flags.acceptdefaults, flags.overwrite, flags.packagedir);
    if (packageDirectory) {
      settings.packageDirectory = packageDirectory;
    }
    const waitTimeString = await confirmAndUpdateSettings(settings, 'waitTime', new Ux({jsonEnabled: this.jsonEnabled()}), flags.acceptdefaults, flags.overwrite, flags.waittime);
    const waitTime: number = +waitTimeString;
    if (waitTime) {
      settings.waitTime = waitTime;
    }
    const declarativeTestClass = await confirmAndUpdateSettings(settings, 'declarativeTestClass', new Ux({jsonEnabled: this.jsonEnabled()}), flags.acceptdefaults, flags.overwrite, flags.declarativetestclass);
    if (declarativeTestClass) {
      settings.declarativeTestClass = declarativeTestClass;
    }

    const dirExists = await fs.pathExists(saveToFile);
    if (dirExists && !flags.overwrite && (settings.primaryBranch !== defaultSettings.primaryBranch || settings.buildDirectory !== defaultSettings.buildDirectory || settings.packageDirectory !== defaultSettings.packageDirectory || settings.waitTime !== defaultSettings.waitTime)) {
      const youSure = await this.confirm(logYN + ' Are you sure you want to overwrite the existing settings with the selections you have made?');
      if (!youSure) return { result: 'User ended Command' };
    }
    await fs.outputJson(saveToFile, settings);
    this.log('Settings Saved to: ' + chalk.underline.blue(saveToFile));
    return settings as unknown as AnyJson;
  }
}
