import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError, SfdxProject, SfdxProjectJson } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { gitDiffSum, getRemoteInfo, getCurrentBranchName } from '../../affirm_simple_git';
import { fsCopyChangesToNewDir, fsCleanupTempDirectory, fsCreateDescructiveChangeFile } from '../../affirm_fs_extra';
import { getDefaultPath, checkProvidedPathIsProject, findOrCreateReleasePath, cleanUpReleasePath } from '../../affirm_sfpjt';
import { sfdxMdapiConvert, sfdxMdapiDescribeMetadata } from '../../affirm_sfdx_commands';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('affirm', 'parcel');
export default class Parcel extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
    `$ sfdx affirm:parcel
      Files being Converted to Package:
      CHANGED: MyClass.cls,MySecondClass.cls
      INSERTION: MyTestClass.cls
      DESTRUCTIVE: MyOldClass.cls,MyOldTestClass.cls
      Converting...Done
    `,
    `$ sfdx affirm:parcel -d
      Files being Converted to Package:
      CHANGED: MyClass.cls,MySecondClass.cls
      INSERTION: MyTestClass.cls
      DESTRUCTIVE: MyOldClass.cls,MyOldTestClass.cls
      Converting...Done
    `
  ];

  public static args = [{ branch: 'file' }];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    branch: flags.string({ char: 'b', description: messages.getMessage('branchFlagDescription') }),
    inputdir: flags.string({ char: 'n', description: messages.getMessage('inputdirFlagDescription') }),
    outputdir: flags.string({ char: 'o', description: messages.getMessage('outputdirFlagDescription') }),
    includetructive: flags.boolean({ char: 'd', description: messages.getMessage('includetructiveFlagDescription') })
  };

  // command requires a project workspace
  protected static requiresProject = true;
  // command requires an org username
  protected static requiresUsername = true;

  public async run(): Promise<AnyJson> {
    // make sure we are in a repo and that it has a remote set
    await getRemoteInfo(this.ux);
    const branch = this.flags.branch || 'remotes/origin/master';
    // get the default sfdx project path and use it or the users provided path, check that the path is in the projects sfdx-project.json file
    const project = await SfdxProject.resolve();
    const pjtJson: SfdxProjectJson = await project.retrieveSfdxProjectJson();
    const defaultPath = await getDefaultPath(pjtJson);
    const inputdir = this.flags.inputdir || defaultPath;
    await checkProvidedPathIsProject(pjtJson, inputdir);
    // use the users provided dir name or the default of parcel for saving the package
    const outputdir = this.flags.outputdir ? '.releaseArtifacts/' + this.flags.outputdir : '.releaseArtifacts/parcel';
    // tell user what we are going to run git diff on and do it
    const currentBranch = await getCurrentBranchName();
    const beingCompared = branch + '...' + currentBranch;
    this.ux.startSpinner('Diff Against: ' + beingCompared);
    const diffResult = await gitDiffSum(branch, inputdir);
    this.ux.stopSpinner('Success');
    // overwrite the sfdx project settings to include the temp directory.
    // force:source:convert requires that the folder being converted is in the sfdx-project.json file
    await findOrCreateReleasePath(pjtJson);
    // clone the files to a temp folder for convert... will clean this up later
    this.ux.startSpinner('Cloning Files');
    const metaDataTypes = await sfdxMdapiDescribeMetadata(this.ux, true);
    await fsCopyChangesToNewDir(diffResult, metaDataTypes);
    this.ux.stopSpinner('Success');
    // convert the temp folder to a package
    // TODO: add support for deploying destructive changes first or last
    this.ux.startSpinner('Converting to Package');
    const convertResult = await sfdxMdapiConvert(this.ux, outputdir);
    // TODO: add support for creating the destructive package.
    if (diffResult.destructive.size > 0) {
      await fsCreateDescructiveChangeFile(diffResult.destructive, metaDataTypes, outputdir);
    }
    // TODO: add support for zipping the package
    // delete the temp folder that we made before and remove the temp folder from the sfdx-project.json file
    this.ux.startSpinner('Cleaning Up');
    await fsCleanupTempDirectory();
    await cleanUpReleasePath(pjtJson);
    // TODO: delete the package folder if it's zipped cause we don't need two folders
    this.ux.stopSpinner('Success');
    return convertResult;
  }
}
