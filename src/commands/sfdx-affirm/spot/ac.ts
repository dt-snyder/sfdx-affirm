import { flags, SfdxCommand } from '@salesforce/command';
import { AnyJson, ensureString, ensureAnyJson } from '@salesforce/ts-types';
import { Messages } from '@salesforce/core';
import { runCommand } from '../../../lib/sfdx';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-affirm', 'ac');

export default class Ac extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');
  public static aliases = ['affirm:spot:ac'];
  // TODO: Update documentation
  public static examples = [
    `$ sfdx affirm:spot:ac

    `,
    `$ affirm:config:setup -

    `,
  ];

  protected static flagsConfig = {
    name: flags.string({ char: 'n', description: messages.getMessage('nameFlagDescription'), required: true }),
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
      const pjtJson = await this.project.resolveProjectConfig();
      username = pjtJson.defaultusername;
    } else {
      username = inputUsername;
    }
    const apexId: String = ensureString((await runCommand(`sfdx force:data:record:get -s ApexClass -w "name='${this.flags.name}'"`))['result']['Id']);
    this.ux.log(chalk.greenBright(`Found ${this.flags.name} - Id: ${apexId}`));
    this.ux.log('Opening Apex Class in: ' + chalk.greenBright(username));
    let path: string | undefined;
    if (this.flags.classic) {
      path = '${apexId}';
    } else {
      path = `lightning/setup/ApexClasses/page?address=%2F${apexId}`;
    }
    let urlOnly = this.flags.urlonly ? ' -r ' : '';
    const response: AnyJson = ensureAnyJson((await runCommand(`sfdx force:org:open -p ${path} -u ${username} ${urlOnly}`)));
    if (this.flags.urlonly) {
      this.ux.log('URL: ' + chalk.underline.blue(response['result'].url));
    }
    return response;
  }
}

