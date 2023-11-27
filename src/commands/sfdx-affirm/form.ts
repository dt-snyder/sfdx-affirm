import { Ux, Flags, SfCommand } from '@salesforce/sf-plugins-core';
import { AnyJson } from '@salesforce/ts-types';
import { Messages } from '@salesforce/core';
import { sfdxGetIsSandbox } from '../../affirm-lib/affirm_sfdx';
import { verifyUsername } from '../../affirm-lib/affirm_lift';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('sfdx-affirm', 'form');

export type FormResult = { status: string };

export default class Form extends SfCommand<FormResult> {

  public static readonly summary = messages.getMessage('commandDescription');
  public static readonly description = messages.getMessage('commandDescription');
  public static readonly aliases = ['affirm:form'];
  public static readonly examples = [
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

  public static readonly flags = {
    targetusername: Flags.requiredOrg({ char: 'u', required: false }),
    apiversion: Flags.orgApiVersion({ description: 'api version for the org', required: false })
  };

  public async run(): Promise<FormResult> {
    const { flags } = await this.parse(Form);
    const username = flags.targetusername.getUsername();
    const orgIsSandbox: boolean = await sfdxGetIsSandbox(username, new Ux({jsonEnabled: this.jsonEnabled()}));
    const booleanToPrint = orgIsSandbox ? chalk.greenBright(orgIsSandbox) : chalk.redBright(orgIsSandbox);
    this.log(`Organization.IsSandbox = ${booleanToPrint}`);
    const messageToPrint = orgIsSandbox ? `${chalk.greenBright('Sandbox')}` : `${chalk.redBright('Production')}`;
    this.log(`Org ${chalk.blueBright(username)} is a ${messageToPrint} instance`);
    return JSON.stringify(orgIsSandbox);
  }
}

