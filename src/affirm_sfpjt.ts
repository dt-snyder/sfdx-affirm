
import { SfdxProjectJson, SfdxError } from '@salesforce/core';

export async function cleanUpReleasePath(projectJson: SfdxProjectJson) {
  const newConfig = projectJson.getContents();
  let newPaths = [];
  newConfig.packageDirectories.forEach(element => {
    if (element.path === '.releaseArtifacts/tempParcel/force-app' || element.path === '.releaseArtifacts\\tempParcel\\force-app')
      return;
    newPaths = [...newPaths, element];
  });
  newConfig.packageDirectories = newPaths;
  projectJson.setContents(newConfig);
  await projectJson.write();
}

export async function findOrCreateReleasePath(projectJson: SfdxProjectJson) {
  const dirs = await projectJson.getPackageDirectories();
  let foundTempdir: Boolean = false;
  dirs.forEach(element => {
    if (element.path === '.releaseArtifacts/tempParcel/force-app' || element.path === '.releaseArtifacts\\tempParcel\\force-app')
      foundTempdir = true;
  });
  if (foundTempdir) return;
  const newConfig = projectJson.getContents();
  const newPath = { path: '.releaseArtifacts/tempParcel/force-app', default: false };
  newConfig.packageDirectories = [...newConfig.packageDirectories, newPath];
  projectJson.setContents(newConfig);
  await projectJson.write();
}

export async function getDefaultPath(projectJson: SfdxProjectJson) {
  const dirs = await projectJson.getPackageDirectories();
  let defaultPath;
  dirs.forEach(element => {
    if (element.default) defaultPath = element.path;
  });
  if (defaultPath) return defaultPath;
  throw SfdxError.create('affirm', 'helper_files', 'errorNoDefaultPath');
}

export async function checkProvidedPathIsProject(projectJson: SfdxProjectJson, providedPath: string) {
  const dirs = await projectJson.getPackageDirectories();
  let foundPath: boolean = false;
  dirs.forEach(element => {
    if (element.path === providedPath) foundPath = true;
  });
  if (foundPath) return;
  throw SfdxError.create('affirm', 'helper_files', 'errorPathIsNotProject');
}
