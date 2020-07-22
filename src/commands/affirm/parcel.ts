import { flags, SfdxCommand, SfdxProject } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { gitDiffSum, createWhatToPrint, showDiffSum, checkForRepoAndRemote } from '../../git_commands';
import * as child from 'child_process';
import * as util from 'util';
import * as fs from 'fs-extra' // Docs: https://github.com/jprichardson/node-fs-extra

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
    await checkForRepoAndRemote(this.ux);
    const branch = this.flags.branch || 'remotes/origin/master';
    // if(No Remote repo configured) throw new SfdxError(messages.getMessage('errorNoGitRemote'));
    // TODO: add support for getting sfdx-project.json as sfdx-project from the current directory
    // TODO: add support for multiple directories listed in sfdx-project.packageDirectories
    // TODO: add support for comma seperated list of input directories other than what's in sfdx-project.packageDirectories
    // TODO: add support for testing.
    const inputdir = this.flags.inputdir || 'force-app';
    const outputdir = this.flags.outputdir || 'parcel';

    const result = await gitDiffSum(branch, inputdir);
    this.ux.log('Files being Converted to Package: ');
    const whatToPrint = await createWhatToPrint(true, true, this.flags.includetructive);
    await showDiffSum(this.ux, result, whatToPrint);
    let allFiles = [];
    Object.keys(result).forEach(key => {
      result[key].forEach(element => {
        const fileName = '"'+element+'"';
        allFiles = [...allFiles, fileName];
      });
    });
    this.ux.startSpinner('Converting');
    const command_source = ' -p ' + allFiles.toString();
    const command_outputDir = ' -d ' + outputdir;
    const convertCommand = 'sfdx force:source:convert --json --loglevel error' + command_outputDir + command_source;

    // TODO: add support for creating the destructive package.
    const convertResult = await exec(convertCommand);
    // console.log(convertResult);
    this.ux.stopSpinner('Done');
    return convertResult;
  }
}
