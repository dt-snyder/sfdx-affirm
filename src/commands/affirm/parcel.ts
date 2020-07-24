import { flags, SfdxCommand, SfdxProject } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { gitDiffSum, createWhatToPrint, showDiffSum } from '../../affirm_simple_git';
import * as child from 'child_process';
import * as util from 'util';
import { fsCopyChangesToNewDir, cleanupTempDirectory } from '../../affirm_fs_extra';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('affirm', 'parcel');

const exec = util.promisify(child.exec);
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
    // TODO: change inputdirFlagDescription to use sfdx-project.json default instead of force-app
    inputdir: flags.string({ char: 'n', description: messages.getMessage('inputdirFlagDescription') }),
    outputdir: flags.string({ char: 'o', description: messages.getMessage('outputdirFlagDescription') }),
    includetructive: flags.boolean({ char: 'd', description: messages.getMessage('includetructiveFlagDescription') })
  };

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    // TODO: add error handling for directories without a git repo or remote.
    // if(no git repo configured) throw new SfdxError(messages.getMessage('errorNoGitRepo'));
    const branch = this.flags.branch || 'remotes/origin/master';
    // if(No Remote repo configured) throw new SfdxError(messages.getMessage('errorNoGitRemote'));
    // TODO: add support for getting sfdx-project.json as sfdx-project from the current directory
    // TODO: add support for multiple directories listed in sfdx-project.packageDirectories
    // TODO: add support for comma seperated list of input directories other than what's in sfdx-project.packageDirectories
    // TODO: add support for testing.
    const inputdir = this.flags.inputdir || 'force-app';
    const outputdir = this.flags.outputdir ? '.releaseArtifacts/' + this.flags.outputdir : '.releaseArtifacts/parcel';
    this.ux.startSpinner('Diff Against: ' + branch);
    const result = await gitDiffSum(branch, inputdir);
    this.ux.stopSpinner('Success');
    this.ux.startSpinner('Cloning Files');
    await fsCopyChangesToNewDir(result);
    this.ux.stopSpinner('Success');

    this.ux.startSpinner('Converting to Package');
    const command_source = ' -r .releaseArtifacts/tempParcel/force-app';
    const command_outputDir = ' -d ' + outputdir;
    const convertCommand = 'sfdx force:source:convert --json --loglevel error' + command_outputDir + command_source;

    // TODO: add support for creating the destructive package.
    let finalResult;
    // try {
    //   finalResult = await exec(convertCommand);
    // } catch (error) {
    //   console.log(finalResult);
    //   console.log(error.stdout.message);
    // }
    await exec(convertCommand)
      .then((resp) => {
        finalResult = resp;
        this.ux.stopSpinner('Success');
      })
      .catch((err) => {
        finalResult = JSON.parse(err.stdout);
        this.ux.stopSpinner('Error');
        this.ux.log(finalResult.message);
        this.ux.log(finalResult.stack);
      });

    this.ux.startSpinner('Cleaning Up');
    await cleanupTempDirectory();
    this.ux.stopSpinner('Success');
    return finalResult;
  }
}
