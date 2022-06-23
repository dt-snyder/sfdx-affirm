import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxProjectJson } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { gitDiffSum, getRemoteInfo, getCurrentBranchName } from '../../lib/affirm_git';
import { fsCopyChangesToNewDir, fsCleanupTempDirectory, fsCreateDestructiveChangeFile, fsCleanProvidedOutputDir } from '../../lib/affirm_fs';
import { sfcoreGetDefaultPath, sfcoreIsPathProject, sfcoreFindOrAddReleasePath, sfcoreRemoveReleasePath } from '../../lib/affirm_sfcore';
import { runCommand } from '../../lib/sfdx';
import { AffirmSettings, DescribeMetadata, DiffObj } from '../../lib/affirm_interfaces';
import { printBranchesCompared, getYNString } from '../../lib/affirm_lift';
import * as inquirer from 'inquirer'
import { getAffirmSettings } from '../../lib/affirm_settings';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme
// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-affirm', 'parcel');
export default class Parcel extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');
  public static aliases = ['affirm:parcel'];
  public static examples = [
    `$ sfdx affirm:parcel
      Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
      Diff Against: remotes/origin/master...pilot/affirm... Success:
      Changes: 5, Insertions: 93, Destructive: 7
      Cloning Files... Success: 100 files ready for convert
      Converting... Success
      (y/n) There are 7 destructive changes. Create destructive changes xml file? y
      ? Select when the destructive changes should be deployed: before
      Creating Destructive Package... Success: Created at releaseArtifacts/parcel/destructiveChangesPre.xml
      Cleaning Up... Success
    `,
    `$ sfdx affirm:parcel -d -t before
      Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
      Diff Against: remotes/origin/master...pilot/affirm... Success:
      Changes: 5, Insertions: 93, Destructive: 7
      Cloning Files... Success: 100 files ready for convert
      Converting... Success
      Creating Destructive Package... Success: Created at releaseArtifacts/parcel/destructiveChangesPre.xml
      Cleaning Up... Success
    `
  ];

  // public static args = [{ branch: 'file' }];

  protected static flagsConfig = {
    branch: flags.string({ char: 'b', description: messages.getMessage('branchFlagDescription') }),
    inputdir: flags.string({ char: 'i', description: messages.getMessage('inputdirFlagDescription') }),
    outputdir: flags.string({ char: 'o', description: messages.getMessage('outputdirFlagDescription') }),
    includedestructive: flags.boolean({ char: 'd', description: messages.getMessage('includedestructiveFlagDescription') }),
    destructivetiming: flags.string({ char: 't', description: messages.getMessage('destructivetimingFlagDescription'), options: ['before', 'after'] })
  };

  // command requires a project workspace
  protected static requiresProject = true;
  // command requires an org username
  protected static requiresUsername = true;
  protected static supportsUsername = true;

  public async run(): Promise<AnyJson> {
    const settings: AffirmSettings = await getAffirmSettings();
    // make sure we are in a repo and that it has a remote set
    await getRemoteInfo(this.ux);
    const branch = this.flags.branch || settings.primaryBranch;
    // get the default sfdx project path and use it or the users provided path, check that the path is in the projects sfdx-project.json file
    const pjtJson: SfdxProjectJson = await this.project.retrieveSfdxProjectJson();
    const defaultPath = await sfcoreGetDefaultPath(pjtJson);
    const inputdir = this.flags.inputdir || defaultPath;
    await sfcoreIsPathProject(pjtJson, inputdir);
    // use the users provided dir name or the default of parcel for saving the package.
    const outputdir = this.flags.outputdir ? `${settings.buildDirectory}/${this.flags.outputdir}` : `${settings.buildDirectory}/${settings.packageDirectory}`;
    // tell user what we are going to run git diff on and do it
    const currentBranch = await getCurrentBranchName();
    await printBranchesCompared(this.ux, branch, currentBranch);
    const diffResult: DiffObj = await gitDiffSum(branch, inputdir);
    this.ux.log(`Changes: ${chalk.yellow(diffResult.changed.size)}, Insertions: ${chalk.green(diffResult.insertion.size)}, Destructive: ${chalk.red(diffResult.destructive.size)}`);
    this.ux.startSpinner('Cloning Files');
    // ensure that the users provided dir name doesn't contain an existing files. We don't want any left over metadata from previous converts
    await fsCleanProvidedOutputDir(outputdir);
    // overwrite the sfdx project settings to include the temp directory.
    // force:source:convert requires that the folder being converted is in the sfdx-project.json file
    await sfcoreFindOrAddReleasePath(pjtJson, settings.buildDirectory);
    // clone the files to a temp folder for convert... will clean this up later
    // TODO: v3: add verbose flag that prints each of the sfdx commands that are run by this command.
    const metaDataTypes: DescribeMetadata = (await runCommand('sfdx force:mdapi:describemetadata')).result as unknown as DescribeMetadata;
    const fsFilesMoved: number = await fsCopyChangesToNewDir(diffResult, metaDataTypes, this.ux);
    const logYN = await getYNString();
    // convert the temp folder to a package
    if (fsFilesMoved > 0) {
      this.ux.stopSpinner(`Success: ${chalk.greenBright(fsFilesMoved)} files ready for convert`);
      this.ux.startSpinner('Converting');
      const inputDir = `${settings.buildDirectory}/tempParcel/force-app`;
      // TODO: v3: add verbose flag that prints each of the sfdx commands that are run by this command.
      await runCommand(`sfdx force:source:convert -d ${outputdir} -r ${inputDir}`, this.ux);
      this.ux.stopSpinner(`Success: Package Created at ${chalk.underline.blue(outputdir)}`);
    } else {
      this.ux.stopSpinner('Success: zero files needed to be cloned');
    }
    // get destructive package flags and create the destructive package if needed
    const includedestructive = this.flags.includedestructive;
    let includeDestructivePrompt;
    if (diffResult.destructive.size > 0) {
      if (!includedestructive) {
        const destructiveChangeMessage = `${logYN} There are ${chalk.red(diffResult.destructive.size)} destructive changes. Create destructive changes xml file?`;
        includeDestructivePrompt = await this.ux.confirm(destructiveChangeMessage);
      }
      if (includedestructive || includeDestructivePrompt) {
        let destructivetiming = this.flags.destructivetiming;
        if (!destructivetiming) {
          let responses: any = await inquirer.prompt([{
            name: 'destructivetiming',
            message: 'Select when the destructive changes should be deployed:',
            type: 'list',
            choices: [{ name: 'before' }, { name: 'after' }],
          }])
          destructivetiming = responses.destructivetiming
        }
        const destructiveafter = destructivetiming === 'after';
        this.ux.startSpinner('Creating Destructive Package');
        const outputFileName = await fsCreateDestructiveChangeFile(diffResult.destructive, metaDataTypes, outputdir, destructiveafter);
        this.ux.stopSpinner('Success: Created at ' + chalk.underline.blue(outputFileName));
      }
    }
    // delete the temp folder that we made before and remove the temp folder from the sfdx-project.json file
    this.ux.startSpinner('Cleaning Up');
    await fsCleanupTempDirectory();
    await sfcoreRemoveReleasePath(pjtJson, settings.buildDirectory);
    this.ux.stopSpinner('Success');
    return { localBranch: currentBranch, inputBranch: branch, outputDir: outputdir, inputDir: inputdir, filesMoved: fsFilesMoved, includeDestructive: includedestructive || includeDestructivePrompt };
  }
}
