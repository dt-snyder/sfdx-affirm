import { flags, SfdxCommand } from '@salesforce/command';
import { AnyJson, ensureString, ensureAnyJson } from '@salesforce/ts-types';
import { Messages, SfdxProject } from '@salesforce/core';
import { runCommand } from '../../../lib/sfdx';
import { sfdxGetIsSandbox } from '../../../lib/affirm_sfdx';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-affirm', 'prod');

export default class Prod extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');
  public static aliases = ['affirm:spot:prod'];
  // TODO: Update documentation
  public static examples = [
    `$ sfdx affirm:spot:ac

    `,
    `$ affirm:config:setup -

    `,
  ];

  // protected static flagsConfig = {
  // };

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;
  protected static supportsUsername = true;

  public async run(): Promise<AnyJson> {
    const inputUsername = this.flags.targetusername;
    let username;
    if (!inputUsername) {
      const project = await SfdxProject.resolve();
      const pjtJson = await project.resolveProjectConfig();
      username = pjtJson.defaultusername;
    } else {
      username = inputUsername;
    }
    // const orgList: object = ensureAnyJson((await runCommand(`sfdx force:org:list --json`))) as object;
    // // this.ux.logJson(orgList);
    // let orgId;
    // orgList['result']['nonScratchOrgs'].forEach(org => {
    //   if (org['alias'] === username || org['username'] === username) {
    //     orgId = org['orgId'];
    //     this.ux.log(org);
    //   }
    // });
    const orgIsSandbox: boolean = await sfdxGetIsSandbox(username);
    this.ux.log(`Org ${username} is a Sandbox: ${orgIsSandbox}`);
    return JSON.stringify(orgIsSandbox);
  }
}

