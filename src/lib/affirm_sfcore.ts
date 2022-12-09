// Use this file to store all @salesforce/core helper methods
import { SfdxProjectJson, SfdxError, ConfigValue } from '@salesforce/core';
import { PackageDir } from '@salesforce/core/lib/sfdxProject';

export async function sfcoreGetDefaultPath(projectJson: SfdxProjectJson) {
  const dirs = await projectJson.getPackageDirectories();
  let defaultPath;
  dirs.forEach(element => {
    if (element.default) defaultPath = element.path;
  });
  if (defaultPath) return defaultPath;
  throw SfdxError.create('sfdx-affirm', 'helper_files', 'errorNoDefaultPath');
}

export async function sfcoreIsPathProject(projectJson: SfdxProjectJson, providedPath: string) {
  const dirs = await projectJson.getPackageDirectories();
  let foundPath: boolean = false;
  dirs.forEach(element => {
    if (element.path === providedPath) foundPath = true;
  });
  if (foundPath) return;
  throw SfdxError.create('sfdx-affirm', 'helper_files', 'errorPathIsNotProject');
}

export async function sfcoreFindOrAddReleasePath(projectJson: SfdxProjectJson) {
  const dirs = await projectJson.getPackageDirectories();
  let foundTempdir: Boolean = false;
  dirs.forEach(element => {
    if (element.path === 'releaseArtifacts/tempParcel/force-app' || element.path === 'releaseArtifacts\\tempParcel\\force-app')
      foundTempdir = true;
  });
  if (foundTempdir) return;
  const newConfig = await projectJson.read();
  const newPath: PackageDir = { path: 'releaseArtifacts/tempParcel/force-app', default: false };
  let packageDirectories: Array<PackageDir> = newConfig.packageDirectories as Array<PackageDir>;
  packageDirectories = [...packageDirectories, newPath];
  const finalConfig = projectJson.set('packageDirectories', packageDirectories as ConfigValue);
  await projectJson.write(finalConfig);
}

export async function sfcoreRemoveReleasePath(projectJson: SfdxProjectJson) {
  const newConfig = await projectJson.read();
  let newPaths: Array<PackageDir> = [];
  let packageDirectories: Array<PackageDir> = newConfig.packageDirectories as Array<PackageDir>;
  packageDirectories.forEach(element => {
    if (element.path === 'releaseArtifacts/tempParcel/force-app' || element.path === 'releaseArtifacts\\tempParcel\\force-app')
      return;
    newPaths = [...newPaths, element];
  });
  const finalConfig = projectJson.set('packageDirectories', newPaths as ConfigValue);
  await projectJson.write(finalConfig);
}
