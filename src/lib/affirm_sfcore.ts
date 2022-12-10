// Use this file to store all @salesforce/core helper methods
import { SfProjectJson, SfError, ConfigValue, Messages } from '@salesforce/core';
import { PackageDir } from '@salesforce/core/lib/sfProject';
Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('sfdx-affirm', 'helper_files');
export async function sfcoreGetDefaultPath(projectJson: SfProjectJson) {
  const dirs = await projectJson.getPackageDirectories();
  let defaultPath;
  dirs.forEach(element => {
    if (element.default) defaultPath = element.path;
  });
  if (defaultPath) return defaultPath;
  throw new SfError(messages.getMessage('errorNoDefaultPath'));
}

export async function sfcoreIsPathProject(projectJson: SfProjectJson, providedPath: string) {
  const dirs = await projectJson.getPackageDirectories();
  let foundPath: boolean = false;
  dirs.forEach(element => {
    if (element.path === providedPath) foundPath = true;
  });
  if (foundPath) return;
  throw new SfError(messages.getMessage('errorPathIsNotProject'));
}

export async function sfcoreFindOrAddReleasePath(projectJson: SfProjectJson, buildDirectory: string) {
  const dirs = await projectJson.getPackageDirectories();
  let foundTempdir: Boolean = false;
  dirs.forEach(element => {
    if (element.path === `${buildDirectory}/tempParcel/force-app` || element.path === `${buildDirectory}\\tempParcel\\force-app`)
      foundTempdir = true;
  });
  if (foundTempdir) return;
  const newConfig = await projectJson.read();
  const newPath: PackageDir = { path: `${buildDirectory}/tempParcel/force-app`, default: false };
  let packageDirectories: Array<PackageDir> = newConfig.packageDirectories as Array<PackageDir>;
  packageDirectories = [...packageDirectories, newPath];
  projectJson.set('packageDirectories', packageDirectories as ConfigValue);
  await projectJson.write();
}

export async function sfcoreRemoveReleasePath(projectJson: SfProjectJson, buildDirectory: string) {
  const newConfig = await projectJson.read();
  let newPaths: Array<PackageDir> = [];
  let packageDirectories: Array<PackageDir> = newConfig.packageDirectories as Array<PackageDir>;
  packageDirectories.forEach(element => {
    if (element.path === `${buildDirectory}/tempParcel/force-app` || element.path === `${buildDirectory}\\tempParcel\\force-app`)
      return;
    newPaths = [...newPaths, element];
  });
  projectJson.set('packageDirectories', newPaths as ConfigValue);
  await projectJson.write();
}
