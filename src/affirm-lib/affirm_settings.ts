import { Ux } from '@salesforce/sf-plugins-core'
import chalk = require('chalk');
import * as fs from 'fs-extra';
import { AffirmSettings } from './affirm_interfaces';

const pathToSettingsFile = './sfdx-affirm.json';
const logYN = `(${chalk.green('y')}/${chalk.red('n')})`;

const defaultSettings: AffirmSettings = {
  primaryBranch: 'remotes/origin/main',
  buildDirectory: 'releaseArtifacts',
  packageDirectory: 'parcel',
  waitTime: 10,
  declarativeTestClass: undefined
};

const settingsLabels = {
  primaryBranch: {
    name: 'Primary Branch',
    prompt: 'Provide name of remote branch related to your Production Instance '
  },
  buildDirectory: {
    name: 'Build Directory',
    prompt: 'Provide location where temp build folders and packages will be created and stored '
  },
  packageDirectory: {
    name: 'Package Directory',
    prompt: 'Provide default directory name for new packages '
  },
  waitTime: {
    name: 'Wait Time',
    prompt: 'Provide default wait time for async commands '
  },
  declarativeTestClass: {
    name: 'Declarative Test Class',
    prompt: 'Provide the name of a test class you would like to run for declarative dev by default if no test suite is created '
  }
};

export async function getAffirmSettings(): Promise<AffirmSettings> {
  const dirExists = await fs.pathExists(pathToSettingsFile);
  let settings: AffirmSettings;
  if (dirExists) {
    settings = await fs.readJson(pathToSettingsFile);
  } else {
    settings = defaultSettings;
  }
  return settings;
}
export async function getDefaultAffirmSettings(): Promise<AffirmSettings> {
  return defaultSettings;
}

export async function confirmAndUpdateSettings(settings: AffirmSettings, settingsKey: string, ux: Ux, acceptDefaults: boolean, overWrite: boolean, providedSetting?: string): Promise<string | undefined> {
  let returnVal: string | undefined;
  if (!providedSetting && !acceptDefaults) {
    returnVal = await ux.prompt(settingsLabels[settingsKey].prompt, { default: defaultSettings[settingsKey], required: false });
  } else if (!overWrite && acceptDefaults && !providedSetting && defaultSettings[settingsKey] !== settings[settingsKey]) {
    ux.log(`${chalk.green(`Current ${settingsLabels[settingsKey].name}: `)} ${settings[settingsKey]}`);
    ux.log(`${chalk.green(`Default ${settingsLabels[settingsKey].name}: `)} ${defaultSettings[settingsKey]}`);
    const youSure = await ux.confirm(`${logYN} Are you sure you want to overwrite the existing ${settingsLabels[settingsKey].name} setting to default?`);
    if (youSure) {
      returnVal = defaultSettings[settingsKey];
    }
  } else if (providedSetting) {
    returnVal = providedSetting;
  }
  if (returnVal) {
    ux.log(`${chalk.blue(`${settingsLabels[settingsKey].name} set to: `)} ${returnVal}`);
  } else {
    ux.log(`${chalk.blue(`${settingsLabels[settingsKey].name} was not changed. Current Value: `)} ${settings[settingsKey]}`);
  }
  return returnVal;
}
