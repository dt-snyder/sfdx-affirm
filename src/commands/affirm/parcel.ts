import { flags, SfdxCommand, SfdxProject } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { gitDiffSum, createWhatToPrint, showDiffSum } from '../../git_diff_sum';
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
    `$ sfdx affirm:parcel --targetusername myOrg@example.com --targetdevhubusername devhub@org.com
  Hello world! This is org: MyOrg and I will be around until Tue Mar 20 2018!
  My hub org id is: 00Dxx000000001234
  `,
    `$ sfdx hello:org --name myname --targetusername myOrg@example.com
  Hello myname! This is org: MyOrg and I will be around until Tue Mar 20 2018!
  `
  ];

  public static args = [{ branch: 'file' }];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    branch: flags.string({ char: 'b', description: messages.getMessage('branchFlagDescription') }),
    outputdir: flags.string({ char: 'o', description: messages.getMessage('outputdirFlagDescription') }),
    includedestructive: flags.boolean({ char: 'd', description: messages.getMessage('includedestructiveFlagDescription') }),
    inputdir: flags.string({ char: 'n', description: messages.getMessage('inputdirFlagDescription') })
  };

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    // TODO: add error handling for directories without a git repo or remote.
    const branch = this.flags.branch || 'remotes/origin/master';
    // TODO: add support for getting sfdx-project.json as sfdx-project from the current directory
    // TODO: add support for multiple directories listed in sfdx-project.packageDirectories
    // TODO: add support for comma seperated list of input directories other than what's in sfdx-project.packageDirectories
    // TODO: add support for testing.
    const inputdir = this.flags.inputdir || 'force-app';
    const outputdir = this.flags.outputdir || 'parcel';
    
    const result = await gitDiffSum(branch, inputdir);
    this.ux.log('Files being Converted to Package: ');
    const whatToPrint = await createWhatToPrint(true, true, this.flags.includedestructive);
    await showDiffSum(this.ux, result, whatToPrint);
    let allFiles = [];
    Object.keys(result).forEach(key => {
      result[key].forEach(element => {
        allFiles = [...allFiles, element];
      });
    });
    this.ux.startSpinner('Converting');
    const command_source = ' -p ' + allFiles.toString();
    const command_outputDir = ' -d ' + outputdir;
    const convertCommand = 'sfdx force:source:convert --json' + command_outputDir + command_source;
    //   // this.org is guaranteed because requiresUsername=true, as opposed to supportsUsername
    // const conn = this.org.getConnection();
    const convertResult = await exec(convertCommand);
    // console.log(convertResult);
    this.ux.stopSpinner('Done');
    return convertResult;
  }
}
