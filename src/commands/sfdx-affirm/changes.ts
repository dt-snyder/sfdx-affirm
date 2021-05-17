import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxProject, SfdxProjectJson } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { gitDiffSum, getRemoteInfo, getCurrentBranchName } from '../../lib/affirm_git';
import { showDiffSum, createWhatToPrint, printBranchesCompared } from '../../lib/affirm_lift';
import { fsSaveJson, getPrintableDiffObject } from '../../lib/affirm_fs';
import { sfcoreGetDefaultPath, sfcoreIsPathProject } from '../../lib/affirm_sfcore';
import { AffirmSettings, DiffObj, PrintableDiffObj } from '../../lib/affirm_interfaces';
import { getAffirmSettings } from '../../lib/affirm_settings';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-affirm', 'changes');

export default class Changes extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');
  public static aliases = ['affirm:changes'];
  public static examples = [
    `$ sfdx affirm:changes
            Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
            Git Diff For: remotes/origin/master...pilot/affirm
            CHANGED: MyClass.cls,MySecondClass.cls
            INSERTION: MyTestClass.cls
            DESTRUCTIVE: MyOldClass.cls,MyOldTestClass.cls
        `,
    `$ sfdx affirm:changes --showdestructive
            Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
            Git Diff For: remotes/origin/master...pilot/affirm
            DESTRUCTIVE: MyOldClass.cls
        `,
    `$ sfdx affirm:changes --showinsertion
            Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
            Git Diff For: remotes/origin/master...pilot/affirm
            INSERTION: MyTestClass.cls
        `,
    `$ sfdx affirm:changes --showchanged
            Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
            Git Diff For: remotes/origin/master...pilot/affirm
            CHANGED: MyClass.cls
        `
  ];

  // public static args = [{ branch: 'file', silent: 'boolean', outfilename: 'file' }];
  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    branch: flags.string({ char: 'b', description: messages.getMessage('branchFlagDescription') }),
    inputdir: flags.string({ char: 'n', description: messages.getMessage('inputdirFlagDescription') }),
    showdestructive: flags.boolean({ char: 'd', description: messages.getMessage('showdestructiveFlagDescription') }),
    showinsertion: flags.boolean({ char: 'i', description: messages.getMessage('showinsertionFlagDescription') }),
    showchanged: flags.boolean({ char: 'c', description: messages.getMessage('showchangedFlagDescription') }),
    silent: flags.boolean({ char: 's', description: messages.getMessage('silentFlagDescription') }),
    outfilename: flags.string({ char: 'o', description: messages.getMessage('outfilenameFlagDescription') })
  };

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    const settings: AffirmSettings = await getAffirmSettings();
    // make sure we are in a repo and that it has a remote set
    await getRemoteInfo(this.ux);
    // get the default sfdx project path and use it or the users provided path, check that the path is in the projects sfdx-project.json file
    const project = await SfdxProject.resolve();
    const pjtJson: SfdxProjectJson = await project.retrieveSfdxProjectJson();
    const defaultPath = await sfcoreGetDefaultPath(pjtJson);
    const inputdir = this.flags.inputdir || defaultPath;
    await sfcoreIsPathProject(pjtJson, inputdir);
    // compare the current branch to the provided or default branch
    const branch = this.flags.branch || settings.primaryBranch;
    const currentBranch = await getCurrentBranchName();
    await printBranchesCompared(this.ux, branch, currentBranch);
    const result: DiffObj = await gitDiffSum(branch, inputdir);
    const printableDiff: PrintableDiffObj = await getPrintableDiffObject(result);
    // print the changes
    const print = !this.flags.silent;
    if (print) {
      const whatToPrint = await createWhatToPrint(this.flags.showchanged, this.flags.showinsertion, this.flags.showdestructive);
      await showDiffSum(this.ux, printableDiff, whatToPrint);
    }
    // save the changes to a json file if the user tell us to
    const saveToFile = this.flags.outfilename;
    if (saveToFile) {
      await fsSaveJson(saveToFile, printableDiff, this.ux);
    }
    return JSON.stringify(result);
  }
}
