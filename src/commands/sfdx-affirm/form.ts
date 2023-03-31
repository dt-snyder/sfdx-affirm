import { SfdxCommand } from '@salesforce/command';
import { AnyJson } from '@salesforce/ts-types';
import { Messages } from '@salesforce/core';
import { sfdxGetIsSandbox } from '../../lib/affirm_sfdx';
import { verifyUsername } from '../../lib/affirm_lift';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme
// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-affirm', 'form');

export default class Form extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');
  public static aliases = ['affirm:form'];
  public static examples = [
    `$ sfdx affirm:place:form
      Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrgAlias --json
      Organization.IsSandbox = true
      Org defaultOrgAlias is a Sandbox instance
    `,
    `$ sfdx affirm:place:form -u prodAlias
      Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u prodAlias --json
      Organization.IsSandbox = false
      Org prodAlias is a Production instance
    `,
  ];

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;
  protected static supportsUsername = true;

  public async run(): Promise<AnyJson> {
    const username = await verifyUsername(this.flags.targetusername);
    const orgIsSandbox: boolean = await sfdxGetIsSandbox(username, this.ux);
    const booleanToPrint = orgIsSandbox ? chalk.greenBright(orgIsSandbox) : chalk.redBright(orgIsSandbox);
    this.ux.log(`Organization.IsSandbox = ${booleanToPrint}`);
    const messageToPrint = orgIsSandbox ? `${chalk.greenBright('Sandbox')}` : `${chalk.redBright('Production')}`;
    this.ux.log(`Org ${chalk.blueBright(username)} is a ${messageToPrint} instance`);
    return JSON.stringify(orgIsSandbox);
  }
}

