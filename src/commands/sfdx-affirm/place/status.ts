import { flags, SfdxCommand } from '@salesforce/command';
import { AnyJson } from '@salesforce/ts-types';
import { Messages } from '@salesforce/core';
import { sfdxOpenToPath } from '../../../lib/affirm_sfdx';
import { verifyUsername } from '../../../lib/affirm_lift';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-affirm', 'status');

export default class Status extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');
  public static aliases = ['affirm:place:status'];
  public static examples = [
    `$ sfdx affirm:place:status
      Opening Deployment Status in Selected Org: defaultOrg
      Running Command: sfdx force:org:open -p lightning/setup/DeployStatus/home -u defaultOrg --json
      Done
    `,
    `$ sfdx affirm:place:status -d -c
      Opening Deployment Status in Selected Org: defaultOrg
      Running Command: sfdx force:org:open -p changemgmt/monitorDeployment.apexp -u defaultOrg --json
      URL: https://defaultOrg.my.salesforce.com/secur/frontdoor.jsp?sid=token&retURL=changemgmt%2FmonitorDeployment.apexp
      Done
    `,
    `$ sfdx affirm:place:status -d -u sandboxAlias
      Opening Deployment Status in Selected Org: sandboxAlias
      Running Command: sfdx force:org:open -p changemgmt/monitorDeployment.apexp -u sandboxAlias --json
      URL: https://sandboxAlias.my.salesforce.com/secur/frontdoor.jsp?sid=token&retURL=changemgmt%2FmonitorDeployment.apexp
      Done
    `,
  ];

  protected static flagsConfig = {
    id: flags.string({ char: 'i', description: messages.getMessage('idFlagDescription') }),
    urlonly: flags.boolean({ char: 'u', description: messages.getMessage('urlonlyFlagDescription'), default: false }),
    displayurl: flags.boolean({ char: 'd', description: messages.getMessage('displayurlFlagDescription'), default: false }),
    classic: flags.boolean({ char: 'c', description: messages.getMessage('classicFlagDescription'), default: false }),
  };

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;
  protected static supportsUsername = true;

  public async run(): Promise<AnyJson> {
    const username = await verifyUsername(this.flags.targetusername);
    const cmdType = (this.flags.urlonly) ? 'Getting URL for' : 'Opening';
    this.ux.log(`${cmdType} Deployment Status in Selected Org: ${chalk.greenBright(username)}`);
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
    const response: AnyJson = await sfdxOpenToPath(username, path, this.flags.urlonly, this.ux);
    if (this.flags.urlonly || this.flags.displayurl) {
      this.ux.log('URL: ' + chalk.underline.blue(response['result']['url']));
    }
    this.ux.log(chalk.greenBright('Done'));
    return response;
  }
}
