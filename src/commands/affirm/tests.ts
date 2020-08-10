import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError, SfdxProject, SfdxProjectJson } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
// import { gitDiffSum, createWhatToPrint, showDiffSum, getRemoteInfo, getCurrentBranchName } from '../../affirm_git';
// import { fsSaveJson, getPrintableDiffObject } from '../../affirm_fs';
// import { sfcoreGetDefaultPath, sfcoreIsPathProject } from '../../affirm_sfcore';
// import { DiffObj, PrintableDiffObj } from '../../affirm_interfaces';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('affirm', 'tests');

export default class Tests extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
    `$ sfdx affirm:tests

    `,
  ];

  // public static args = [{ branch: 'file', silent: 'boolean', outfilename: 'file' }];
  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    branch: flags.string({ char: 'b', description: messages.getMessage('branchFlagDescription') })
  };

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {

    return {result: 'I do nothing'};
  }
}
