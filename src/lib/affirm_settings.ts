import * as fs from 'fs-extra';
import { AffirmSettings } from './affirm_interfaces';

const pathToSettingsFile = './sfdx-affirm.json';

const defaultSettings: AffirmSettings = {
  primaryBranch: 'remotes/origin/master',
  buildDirectory: '.releaseArtifacts',
  packageDirectory: 'parcel',
  waitTime: '10'
}

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
