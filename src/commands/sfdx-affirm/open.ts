import { SfdxCommand, flags } from '@salesforce/command';
import { Messages, SfError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { verifyUsername } from '../../lib/affirm_lift';
import { sfdxGetIsSandbox, sfdxOpenToPath } from '../../lib/affirm_sfdx';
import { openLocations } from '../../lib/affirm_openLocations';
import { AffirmOpenLocation } from '../../lib/affirm_interfaces';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme
// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-affirm', 'open');


export default class Open extends SfdxCommand {

  public static description = messages.getMessage('commandFlagDescription');
  public static aliases = ['affirm:open', 'a:o'];
  public static examples = [
    `$ sfdx affirm:open
        Opening Setup Home in Production Org: defaultOrg
        Done
        `,
    `$ sfdx affirm:open --profile -u sandboxAlias
        Opening Profile List Views in Sandbox Org: sandboxAlias
        Done
        `,
    `$ sfdx affirm:open -e --verbose
        (y/n) Are you sure you want to use the "defaultOrg" org ?: y
        Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
        Opening Email Deliverability Settings in Production Org: defaultOrg
        Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
        Done
        `,
    `$ sfdx affirm:open -e --verbose
        (y/n) Are you sure you want to use the "defaultOrg" org ?: y
        Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
        Opening Email Deliverability Settings in Production Org: defaultOrg
        Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
        Done
        `,
    `$ sfdx affirm:open --deployment -i 0Af6S00000pzZSS
        Opening Deployment Status in Production Org: defaultOrg
        Done
        `,
  ];

  // public static args = [{ branch: 'file', silent: 'boolean', outfilename: 'file' }];
  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    email: flags.boolean({ char: 'e', description: messages.getMessage('emailFlagDescription'), default: false }),
    network: flags.boolean({ char: 'n', description: messages.getMessage('networkFlagDescription'), default: false }),
    deployment: flags.boolean({ char: 'd', description: messages.getMessage('deploymentFlagDescription'), default: false }),
    profile: flags.boolean({ char: 'p', description: messages.getMessage('profileFlagDescription'), default: false }),
    id: flags.string({ char: 'i', description: messages.getMessage('idFlagDescription') }),
    urlonly: flags.boolean({ char: 'o', description: messages.getMessage('urlonlyFlagDescription'), default: false }),
    displayurl: flags.boolean({ char: 'd', description: messages.getMessage('displayurlFlagDescription'), default: false }),
    classic: flags.boolean({ char: 'c', description: messages.getMessage('classicDescription'), default: false }),
    verbose: flags.builtin()
  };

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;
  protected static supportsUsername = true;

  public async run(): Promise<AnyJson> {
    if (this.flags.email && (this.flags.network || this.flags.deployment || this.flags.profile)) {
      throw new SfError(messages.getMessage('toManyFlagsEmailErrorFlag'));
    } else if (this.flags.network && (this.flags.email || this.flags.deployment || this.flags.profile)) {
      throw new SfError(messages.getMessage('toManyFlagsNetworkErrorFlag'));

    } else if (this.flags.deployment && (this.flags.email || this.flags.network || this.flags.profile)) {
      throw new SfError(messages.getMessage('toManyFlagsDeployErrorFlag'));

    } else if (this.flags.profile && (this.flags.email || this.flags.network || this.flags.deployment)) {
      throw new SfError(messages.getMessage('toManyFlagsProfileErrorFlag'));

    }

    let pathKey: string | undefined;
    if (!this.flags.email && !this.flags.network && !this.flags.deployment && !this.flags.profile) {
      pathKey = 'home';
    } else if (this.flags.email) {
      pathKey = 'email';
    } else if (this.flags.network) {
      pathKey = 'network';
    } else if (this.flags.profile) {
      pathKey = 'profile';
    } else if (this.flags.deployment) {
      pathKey = 'deployment';
    }
    let currentPath: AffirmOpenLocation = openLocations[pathKey];
    if (this.flags.id && currentPath.supportsId === false) {
      throw new SfError(messages.getMessage('idFlagUnsupportedErrorFlag'));
    }

    const verbose = this.flags.verbose == true ? this.ux : undefined;
    const username = await verifyUsername(this.flags.targetusername, verbose);
    const orgIsSandbox: boolean = await sfdxGetIsSandbox(username, verbose);
    const orgType = (!orgIsSandbox) ? chalk.redBright('Production') : chalk.blueBright('Sandbox');
    const cmdType = (this.flags.urlonly) ? 'Getting URL for' : 'Opening';


    this.ux.log(`${cmdType} ${currentPath.displayName} in ${orgType} Org: ${chalk.greenBright(username)}`);
    let path: string | undefined;
    if (this.flags.classic && !this.flags.id) {
      path = currentPath.classic;
    } else if (!this.flags.classic && !this.flags.id) {
      path = currentPath.lightning;
    } else if (this.flags.classic && this.flags.id) {
      path = `${currentPath.classicIdPath}${this.flags.id}`;
    } else if (!this.flags.classic && this.flags.id) {
      path = `${currentPath.lightningIdPath}${this.flags.id}`;
    }
    const response: AnyJson = await sfdxOpenToPath(username, path, this.flags.urlonly, verbose);
    if (this.flags.urlonly || this.flags.displayurl) {
      this.ux.log('URL: ' + chalk.underline.blue(response['result']['url']));
    }
    this.ux.log(chalk.greenBright('Done'));
    return response;
  }
}
