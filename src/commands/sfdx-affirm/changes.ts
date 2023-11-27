import { Ux, Flags, SfCommand } from '@salesforce/sf-plugins-core';
import { Messages, SfProjectJson } from '@salesforce/core';
import { AnyJson, ensureAnyJson } from '@salesforce/ts-types';
import { gitDiffSum, getRemoteInfo, getCurrentBranchName } from '../../lib/affirm_git';
import { showDiffSum, createWhatToPrint, printBranchesCompared } from '../../lib/affirm_lift';
import { fsSaveJson, getPrintableDiffObject } from '../../lib/affirm_fs';
import { sfcoreGetDefaultPath, sfcoreIsPathProject } from '../../lib/affirm_sfcore';
import { AffirmSettings, DiffObj, PrintableDiffObj } from '../../lib/affirm_interfaces';
import { getAffirmSettings } from '../../lib/affirm_settings';


Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('sfdx-affirm', 'changes');

export type ChangesResult = { status: string; };

export default class Changes extends SfCommand<ChangesResult> {

  public static description = messages.getMessage('commandDescription');
  public static aliases = ['affirm:changes'];
  public static examples = [
    `$ sfdx affirm:changes
            Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
            Git Diff For: remotes/origin/main...pilot/affirm
            CHANGED: MyClass.cls,MySecondClass.cls
            INSERTION: MyTestClass.cls
            DESTRUCTIVE: MyOldClass.cls,MyOldTestClass.cls
        `,
    `$ sfdx affirm:changes --showdestructive
            Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
            Git Diff For: remotes/origin/main...pilot/affirm
            DESTRUCTIVE: MyOldClass.cls
        `,
    `$ sfdx affirm:changes --showinsertion
            Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
            Git Diff For: remotes/origin/main...pilot/affirm
            INSERTION: MyTestClass.cls
        `,
    `$ sfdx affirm:changes --showchanged
            Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
            Git Diff For: remotes/origin/main...pilot/affirm
            CHANGED: MyClass.cls
        `
  ];

  // public static args = [{ branch: 'file', silent: 'boolean', outfilename: 'file' }];
  public static readonly flags = {
    branch: Flags.string({ char: 'b', description: messages.getMessage('branchFlagDescription') }),
    inputdir: Flags.string({ char: 'n', description: messages.getMessage('inputdirFlagDescription') }),
    showdestructive: Flags.boolean({ char: 'd', description: messages.getMessage('showdestructiveFlagDescription') }),
    showinsertion: Flags.boolean({ char: 'i', description: messages.getMessage('showinsertionFlagDescription') }),
    showchanged: Flags.boolean({ char: 'c', description: messages.getMessage('showchangedFlagDescription') }),
    silent: Flags.boolean({ char: 's', description: messages.getMessage('silentFlagDescription') }),
    outfilename: Flags.string({ char: 'o', description: messages.getMessage('outfilenameFlagDescription') }),
    targetusername: Flags.requiredOrg({ char: 'u', required: false }),
    apiversion: Flags.orgApiVersion({ description: 'api version for the org', required: false })
  };

  public async run(): Promise<ChangesResult> {
    const { flags } = await this.parse(Changes);
    const settings: AffirmSettings = await getAffirmSettings();
    // make sure we are in a repo and that it has a remote set
    await getRemoteInfo(new Ux({jsonEnabled: this.jsonEnabled()}));
    // get the default sfdx project path and use it or the users provided path, check that the path is in the projects sfdx-project.json file
    const projectJson: SfProjectJson = await this.project.retrieveSfProjectJson();
    const defaultPath = await sfcoreGetDefaultPath(projectJson);
    const inputdir = flags.inputdir || defaultPath;
    await sfcoreIsPathProject(projectJson, inputdir);
    // compare the current branch to the provided or default branch
    const branch = flags.branch || settings.primaryBranch;
    const currentBranch = await getCurrentBranchName();
    await printBranchesCompared(new Ux({jsonEnabled: this.jsonEnabled()}), branch, currentBranch);
    const result: DiffObj = await gitDiffSum(branch, inputdir);
    const printableDiff: PrintableDiffObj = await getPrintableDiffObject(result);
    // print the changes
    const print = !flags.silent;
    if (print) {
      const whatToPrint = await createWhatToPrint(flags.showchanged, flags.showinsertion, flags.showdestructive);
      await showDiffSum(new Ux({jsonEnabled: this.jsonEnabled()}), printableDiff, whatToPrint);
    }
    // save the changes to a json file if the user tell us to
    const saveToFile = flags.outfilename;
    if (saveToFile) {
      await fsSaveJson(saveToFile, ensureAnyJson(printableDiff), new Ux({jsonEnabled: this.jsonEnabled()}));
    }
    return JSON.stringify(result);
  }
}
