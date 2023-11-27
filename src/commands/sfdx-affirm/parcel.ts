import { Ux, Flags, SfCommand } from '@salesforce/sf-plugins-core'
import { Messages, SfProjectJson } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import * as inquirer from 'inquirer'
import { gitDiffSum, getRemoteInfo, getCurrentBranchName } from '../../affirm-lib/affirm_git';
import { fsCopyChangesToNewDir, fsCleanupTempDirectory, fsCreateDestructiveChangeFile, fsCleanProvidedOutputDir } from '../../affirm-lib/affirm_fs';
import { sfcoreGetDefaultPath, sfcoreIsPathProject, sfcoreFindOrAddReleasePath, sfcoreRemoveReleasePath } from '../../affirm-lib/affirm_sfcore';
import { runCommand } from '../../affirm-lib/sfdx';
import { AffirmSettings, DescribeMetadata, DiffObj } from '../../affirm-lib/affirm_interfaces';
import { printBranchesCompared, getYNString, verifyUsername } from '../../affirm-lib/affirm_lift';
import { getAffirmSettings } from '../../affirm-lib/affirm_settings';
import { describeMetadata } from '../../affirm-lib/affirm_sfdx';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('sfdx-affirm', 'parcel');

export type ParcelResult = { status: string };

export default class Parcel extends SfCommand<ParcelResult> {

  public static readonly summary = messages.getMessage('commandDescription');
  public static readonly description = messages.getMessage('commandDescription');
  public static readonly aliases = ['affirm:parcel'];
  public static readonly examples = [
    `$ sfdx affirm:parcel
      Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
      Diff Against: remotes/origin/main...pilot/affirm... Success:
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
      Diff Against: remotes/origin/main...pilot/affirm... Success:
      Changes: 5, Insertions: 93, Destructive: 7
      Cloning Files... Success: 100 files ready for convert
      Converting... Success
      Creating Destructive Package... Success: Created at releaseArtifacts/parcel/destructiveChangesPre.xml
      Cleaning Up... Success
    `
  ];

  // public static args = [{ branch: 'file' }];

  public static readonly flags = {
    branch: Flags.string({ char: 'b', description: messages.getMessage('branchFlagDescription') }),
    inputdir: Flags.string({ char: 'i', description: messages.getMessage('inputdirFlagDescription') }),
    outputdir: Flags.string({ char: 'o', description: messages.getMessage('outputdirFlagDescription') }),
    includedestructive: Flags.boolean({ char: 'd', description: messages.getMessage('includedestructiveFlagDescription') }),
    destructivetiming: Flags.string({ char: 't', description: messages.getMessage('destructivetimingFlagDescription'), options: ['before', 'after'] }),
    verbose: Flags.boolean({ summary: messages.getMessage('flags.verbose'), deprecateAliases: true, default: false, hidden: true }),
    targetusername: Flags.requiredOrg({ char: 'u', required: false }),
    apiversion: Flags.orgApiVersion({ description: 'api version for the org', required: false })
  };
  // eslint-disable-next-line complexity
  public async run(): Promise<ParcelResult> {
    const { flags } = await this.parse(Parcel);
    const settings: AffirmSettings = await getAffirmSettings();
    // make sure we are in a repo and that it has a remote set
    await getRemoteInfo(new Ux({jsonEnabled: this.jsonEnabled()}));
    const branch = flags.branch || settings.primaryBranch;
    // get the default sfdx project path and use it or the users provided path, check that the path is in the projects sfdx-project.json file
    const projectJson: SfProjectJson = await this.project.retrieveSfProjectJson();
    const defaultPath = await sfcoreGetDefaultPath(projectJson);
    const verbose = flags.verbose ? new Ux({jsonEnabled: this.jsonEnabled()}) : undefined;
    const inputdir = flags.inputdir || defaultPath;
    await sfcoreIsPathProject(projectJson, inputdir);
    // use the users provided dir name or the default of parcel for saving the package.
    const outputdir = flags.outputdir ? `${settings.buildDirectory}/${flags.outputdir}` : `${settings.buildDirectory}/${settings.packageDirectory}`;
    // tell user what we are going to run git diff on and do it
    const currentBranch = await getCurrentBranchName();
    await printBranchesCompared(new Ux({jsonEnabled: this.jsonEnabled()}), branch, currentBranch);
    const diffResult: DiffObj = await gitDiffSum(branch, inputdir);
    this.log(`Changes: ${chalk.yellow(diffResult.changed.size)}, Insertions: ${chalk.green(diffResult.insertion.size)}, Destructive: ${chalk.red(diffResult.destructive.size)}`);
    this.spinner.start('Cloning Files');
    // ensure that the users provided dir name doesn't contain an existing files. We don't want any left over metadata from previous converts
    await fsCleanProvidedOutputDir(outputdir);
    // overwrite the sfdx project settings to include the temp directory.
    // force:source:convert requires that the folder being converted is in the sfdx-project.json file
    await sfcoreFindOrAddReleasePath(projectJson, settings.buildDirectory);
    const username = flags.targetusername.getUsername();
    // clone the files to a temp folder for convert... will clean this up later
    const metaDataTypes: DescribeMetadata = await describeMetadata(username, verbose);
    const fsFilesMoved: number = await fsCopyChangesToNewDir(diffResult, metaDataTypes, new Ux({jsonEnabled: this.jsonEnabled()}));
    const logYN = await getYNString();
    // convert the temp folder to a package
    if (fsFilesMoved > 0) {
      this.spinner.stop(`Success: ${chalk.greenBright(fsFilesMoved)} files ready for convert`);
      this.spinner.start('Converting');
      const inputDir = `${settings.buildDirectory}/tempParcel/force-app`;
      await runCommand(`sfdx force:source:convert -d ${outputdir} -r ${inputDir}`, verbose);
      this.spinner.stop(`Success: Package Created at ${chalk.underline.blue(outputdir)}`);
    } else {
      this.spinner.stop('Success: zero files needed to be cloned');
    }
    // get destructive package flags and create the destructive package if needed
    const includedestructive = flags.includedestructive;
    let includeDestructivePrompt;
    if (diffResult.destructive.size > 0) {
      if (!includedestructive) {
        const destructiveChangeMessage = `${logYN} There are ${chalk.red(diffResult.destructive.size)} destructive changes. Create destructive changes xml file?`;
        includeDestructivePrompt = await this.confirm(destructiveChangeMessage);
      }
      if (includedestructive || includeDestructivePrompt) {
        let destructivetiming = flags.destructivetiming;
        if (!destructivetiming) {
          const responses = await this.prompt<{ destructivetiming: string }>([{
            name: 'destructivetiming',
            message: 'Select when the destructive changes should be deployed:',
            type: 'list',
            choices: [{ name: 'before' }, { name: 'after' }],
          }])
          destructivetiming = responses.destructivetiming
        }
        const destructiveafter = destructivetiming === 'after';
        this.spinner.start('Creating Destructive Package');
        const outputFileName = await fsCreateDestructiveChangeFile(diffResult.destructive, metaDataTypes, outputdir, destructiveafter);
        this.spinner.stop('Success: Created at ' + chalk.underline.blue(outputFileName));
      }
    }
    // delete the temp folder that we made before and remove the temp folder from the sfdx-project.json file
    this.spinner.start('Cleaning Up');
    await fsCleanupTempDirectory();
    await sfcoreRemoveReleasePath(projectJson, settings.buildDirectory);
    this.spinner.stop('Success');
    return { localBranch: currentBranch, inputBranch: branch, outputDir: outputdir, inputDir: inputdir, filesMoved: fsFilesMoved, includeDestructive: includedestructive || includeDestructivePrompt };
  }
}
