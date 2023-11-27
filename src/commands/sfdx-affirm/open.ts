import { Ux, Flags, SfCommand } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { verifyUsername } from '../../lib/affirm_lift';
import { sfdxGetIsSandbox, sfdxOpenToPath } from '../../lib/affirm_sfdx';
import { openLocations } from '../../lib/affirm_openLocations';
import { AffirmOpenLocation } from '../../lib/affirm_interfaces';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('sfdx-affirm', 'open');

export type OpenResult = { status: string };

export default class Open extends SfCommand<OpenResult> {

  public static readonly summary = messages.getMessage('commandFlagDescription');
  public static readonly description = messages.getMessage('commandFlagDescription');
  public static readonly aliases = ['affirm:open', 'a:o'];
  public static readonly examples = [
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
  public static readonly flags = {
    // flag with a value (-n, --name=VALUE)
    email: Flags.boolean({ char: 'e', description: messages.getMessage('emailFlagDescription'), default: false }),
    network: Flags.boolean({ char: 'n', description: messages.getMessage('networkFlagDescription'), default: false }),
    deployment: Flags.boolean({ char: 'd', description: messages.getMessage('deploymentFlagDescription'), default: false }),
    profile: Flags.boolean({ char: 'p', description: messages.getMessage('profileFlagDescription'), default: false }),
    id: Flags.string({ char: 'i', description: messages.getMessage('idFlagDescription') }),
    urlonly: Flags.boolean({ char: 'o', description: messages.getMessage('urlonlyFlagDescription'), default: false }),
    displayurl: Flags.boolean({ char: 'd', description: messages.getMessage('displayurlFlagDescription'), default: false }),
    classic: Flags.boolean({ char: 'c', description: messages.getMessage('classicDescription'), default: false }),
    verbose: Flags.boolean({ summary: messages.getMessage('flags.verbose'), deprecateAliases: true, default: false, hidden: true }),
    targetusername: Flags.requiredOrg({ char: 'u', required: false }),
    apiversion: Flags.orgApiVersion({ description: 'api version for the org', required: false })
  };
  // eslint-disable-next-line complexity
  public async run(): Promise<OpenResult> {
    const { flags } = await this.parse(Open);
    if (flags.email && (flags.network || flags.deployment || flags.profile)) {
      throw messages.createError('toManyFlagsEmailErrorFlag');
    } else if (flags.network && (flags.email || flags.deployment || flags.profile)) {
      throw messages.createError('toManyFlagsNetworkErrorFlag');
    } else if (flags.deployment && (flags.email || flags.network || flags.profile)) {
      throw messages.createError('toManyFlagsDeployErrorFlag');
    } else if (flags.profile && (flags.email || flags.network || flags.deployment)) {
      throw messages.createError('toManyFlagsProfileErrorFlag');
    }

    let pathKey: string | undefined;
    if (!flags.email && !flags.network && !flags.deployment && !flags.profile) {
      pathKey = 'home';
    } else if (flags.email) {
      pathKey = 'email';
    } else if (flags.network) {
      pathKey = 'network';
    } else if (flags.profile) {
      pathKey = 'profile';
    } else if (flags.deployment) {
      pathKey = 'deployment';
    }
    const currentPath: AffirmOpenLocation = openLocations[pathKey];
    if (flags.id && currentPath.supportsId === false) {
      throw messages.createError('idFlagUnsupportedErrorFlag');
    }

    const verbose = flags.verbose == true ? new Ux({jsonEnabled: this.jsonEnabled()}) : undefined;
    const username = flags.targetusername.getUsername();
    const orgIsSandbox: boolean = await sfdxGetIsSandbox(username, verbose);
    const orgType = (!orgIsSandbox) ? chalk.redBright('Production') : chalk.blueBright('Sandbox');
    const cmdType = (flags.urlonly) ? 'Getting URL for' : 'Opening';


    this.log(`${cmdType} ${currentPath.displayName} in ${orgType} Org: ${chalk.greenBright(username)}`);
    let path: string | undefined;
    if (flags.classic && !flags.id) {
      path = currentPath.classic;
    } else if (!flags.classic && !flags.id) {
      path = currentPath.lightning;
    } else if (flags.classic && flags.id) {
      path = `${currentPath.classicIdPath}${flags.id}`;
    } else if (!flags.classic && flags.id) {
      path = `${currentPath.lightningIdPath}${flags.id}`;
    }
    const response: AnyJson = await sfdxOpenToPath(username, path, flags.urlonly, verbose);
    if (flags.urlonly || flags.displayurl) {
      this.log('URL: ' + chalk.underline.blue(response['result']['url']));
    }
    this.log(chalk.greenBright('Done'));
    return response;
  }
}
