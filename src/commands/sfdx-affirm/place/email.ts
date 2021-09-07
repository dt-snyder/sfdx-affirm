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
const messages = Messages.loadMessages('sfdx-affirm', 'email');

export default class Email extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');
  public static aliases = ['affirm:place:email'];
  public static examples = [
    `$ sfdx affirm:place:email
      Opening Email Deliverability in Selected Org: defaultOrg
      Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg --json
      Done
    `,
    `$ sfdx affirm:place:email -d -c
      Opening Email Deliverability in Selected Org: defaultOrg
      Running Command: sfdx force:org:open -p email-admin/editOrgEmailSettings.apexp -u defaultOrg --json
      URL: https://defaultOrg.my.salesforce.com/secur/frontdoor.jsp?sid=token&retURL=email-admin%2FeditOrgEmailSettings.apexp
      Done
    `,
    `$ sfdx affirm:place:email -d -u sandboxAlias -o
      Getting URL for Email Deliverability in Selected Org: sandboxAlias
      Running Command: sfdx force:org:open -p email-admin/editOrgEmailSettings.apexp -u sandboxAlias --json
      URL: https://sandboxAlias.my.salesforce.com/secur/frontdoor.jsp?sid=token&retURL=lightning%2Fsetup%2FOrgEmailSettings%2Fhome
      Done
    `,
  ];

  protected static flagsConfig = {
    urlonly: flags.boolean({ char: 'o', description: messages.getMessage('urlonlyFlagDescription'), default: false }),
    displayurl: flags.boolean({ char: 'd', description: messages.getMessage('displayurlFlagDescription'), default: false }),
    classic: flags.boolean({ char: 'c', description: messages.getMessage('classicFlagDescription'), default: false }),
  };

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;
  protected static supportsUsername = true;

  public async run(): Promise<AnyJson> {
    const username = await verifyUsername(this.flags.targetusername);
    const cmdType = (this.flags.urlonly) ? 'Getting URL for' : 'Opening';
    this.ux.log(`${cmdType} Email Deliverability in Selected Org: ${chalk.greenBright(username)}`);
    let path: string | undefined;
    if (this.flags.classic) {
      path = 'email-admin/editOrgEmailSettings.apexp';
    } else {
      path = 'lightning/setup/OrgEmailSettings/home';
    }
    const response: AnyJson = await sfdxOpenToPath(username, path, this.flags.urlonly, this.ux);
    if (this.flags.urlonly || this.flags.displayurl) {
      this.ux.log('URL: ' + chalk.underline.blue(response['result']['url']));
    }
    this.ux.log(chalk.greenBright('Done'));
    return response;
  }
}
