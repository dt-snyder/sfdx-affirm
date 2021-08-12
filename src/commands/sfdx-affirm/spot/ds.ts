import { flags, SfdxCommand } from '@salesforce/command';
import { AnyJson, ensureAnyJson } from '@salesforce/ts-types';
import { Messages, SfdxProject } from '@salesforce/core';
import { runCommand } from '../../../lib/sfdx';
import { sfdxOpenDeploymentStatus } from '../../../lib/affirm_sfdx';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-affirm', 'ds');

export default class Ds extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');
  public static aliases = ['affirm:spot:ds'];
  // TODO: Update documentation
  public static examples = [
    `$ sfdx affirm:spot:ds

    `,
    `$ affirm:config:setup -

    `,
  ];

  protected static flagsConfig = {
    name: flags.string({ char: 'n', description: messages.getMessage('nameFlagDescription') }),
    urlonly: flags.boolean({ char: 'r', description: messages.getMessage('urlonlyFlagDescription'), default: false }),
    classic: flags.boolean({ char: 'c', description: messages.getMessage('classicFlagDescription'), default: false }),
  };

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
    this.ux.log('Opening Deployment Status in Selected Org: ' + chalk.greenBright(username));
    let path: string | undefined;
    if (!this.flags.name && this.flags.classic) {
      path = 'changemgmt/monitorDeployment.apexp';
    } else if (this.flags.name && !this.flags.classic) {
      path = `lightning/setup/DeployStatus/page?address=%2Fchangemgmt%2FmonitorDeploymentsDetails.apexp%3FasyncId%3D${this.flags.name}%26`;
    } else if (this.flags.name && this.flags.classic) {
      path = `changemgmt/monitorDeployment.apexp?asyncId=${this.flags.name}`;
    } else {
      path = 'lightning/setup/DeployStatus/home';
    }
    const response: AnyJson = await sfdxOpenDeploymentStatus(username, path, this.flags.urlonly);
    if (this.flags.urlonly) {
      this.ux.log('URL: ' + chalk.underline.blue(response.result.url));
    }
    return response;
  }
}
