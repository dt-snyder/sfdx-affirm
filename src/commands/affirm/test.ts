import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import * as fs from 'fs-extra'; // Docs: https://github.com/jprichardson/node-fs-extra
const { create } = require('xmlbuilder2'); // Docs: https://oozcitak.github.io/xmlbuilder2/
// import { gitDiffSum, getRemoteInfo, getCurrentBranchName } from '../../affirm_simple_git';
import { fsSaveJson, fsCreateDescructiveChangeFile } from '../../affirm_fs_extra';
// import { getDefaultPath, checkProvidedPathIsProject, findOrCreateReleasePath, cleanUpReleasePath } from '../../affirm_sfpjt';
import {
  // sfdxMdapiConvert,
  sfdxMdapiDescribeMetadata
} from '../../affirm_sfdx_commands';


// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('affirm', 'test');

export default class Test extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
    `$ sfdx affirm:test`,
  ];

  public static args = [{ name: 'file' }];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    // name: flags.string({char: 'n', description: messages.getMessage('nameFlagDescription')}),
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    const fakeWorking = {
      package: {
        '@xmlns': "http://soap.sforce.com/2006/04/metadata",
        types: [
          {
            name: 'someName',
            members: ['someMember', 'someMember2']
          },
          {
            name: 'someName2',
            members: ['someMember2', 'someMember3']
          }]
      }
    };
    const newDestructivePackage = create({ version: '1.0', encoding: 'UTF-8' }, fakeWorking);
    await fs.outputFile('./testing.xml', newDestructivePackage.end({ prettyPrint: true, group: true }));
    return fake;
  }
}
