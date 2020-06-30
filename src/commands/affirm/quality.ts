import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import simpleGit, { SimpleGit, StatusResult } from 'simple-git'; // Docs: https://github.com/steveukx/git-js#readme
import * as fs from 'fs-extra' // Docs: https://github.com/jprichardson/node-fs-extra


// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('affirm', 'quality');

export default class Quality extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx affirm:quality --targetusername myOrg@example.com --targetdevhubusername devhub@org.com
  Hello world! This is org: MyOrg and I will be around until Tue Mar 20 2018!
  My hub org id is: 00Dxx000000001234
  `,
  `$ sfdx affirm:quality --name myname --targetusername myOrg@example.com
  Hello myname! This is org: MyOrg and I will be around until Tue Mar 20 2018!
  `
  ];

  public static args = [{name: 'file'}];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: messages.getMessage('nameFlagDescription')}),
    branch: flags.string({ char: 'b', description: messages.getMessage('branchFlagDescription') }),
    // TODO: change inputdirFlagDescription to use sfdx-project.json default instead of force-app
    inputdir: flags.string({ char: 'n', description: messages.getMessage('inputdirFlagDescription') }),
    outputdir: flags.string({ char: 'o', description: messages.getMessage('outputdirFlagDescription') }),
    includetructive: flags.boolean({ char: 'd', description: messages.getMessage('includetructiveFlagDescription') }),
    excludetests: flags.boolean({ char: 't', description: messages.getMessage('excludetestsFlagDescription') }),
    specifictests: flags.string({ char: 'n', description: messages.getMessage('specifictestsFlagDescription') })
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    // TODO: add error handling for directories without a git repo or remote.
    // if(no git repo configured) throw new SfdxError(messages.getMessage('errorNoGitRepo'));
    const branch = this.flags.branch || 'remotes/origin/master';
    // if(No Remote repo configured) throw new SfdxError(messages.getMessage('errorNoGitRemote'));
    // TODO: add support for getting sfdx-project.json as sfdx-project from the current directory
    // TODO: add support for multiple directories listed in sfdx-project.packageDirectories
    // TODO: add support for comma seperated list of input directories other than what's in sfdx-project.packageDirectories
    // TODO: add support for testing.
    const inputdir = this.flags.inputdir || 'force-app';
    const outputdir = this.flags.outputdir || 'parcel';
    // ! everything below this is default from the creation of the plugin generator. Some of it is useful for this command but this method is still a work in progress.
    const name = this.flags.name || 'world';

    // this.org is guaranteed because requiresUsername=true, as opposed to supportsUsername
    const conn = this.org.getConnection();
    const query = 'Select Name, TrialExpirationDate from Organization';

    // The type we are querying for
    interface Organization {
      Name: string;
      TrialExpirationDate: string;
    }

    // Query the org
    const result = await conn.query<Organization>(query);

    // Organization will always return one result, but this is an example of throwing an error
    // The output and --json will automatically be handled for you.
    if (!result.records || result.records.length <= 0) {
      throw new SfdxError(messages.getMessage('errorNoOrgResults', [this.org.getOrgId()]));
    }

    // Organization always only returns one result
    const orgName = result.records[0].Name;
    const trialExpirationDate = result.records[0].TrialExpirationDate;

    let outputString = `Hello ${name}! This is org: ${orgName}`;
    if (trialExpirationDate) {
      const date = new Date(trialExpirationDate).toDateString();
      outputString = `${outputString} and I will be around until ${date}!`;
    }
    this.ux.log(outputString);

    // this.hubOrg is NOT guaranteed because supportsHubOrgUsername=true, as opposed to requiresHubOrgUsername.
    if (this.hubOrg) {
      const hubOrgId = this.hubOrg.getOrgId();
      this.ux.log(`My hub org id is: ${hubOrgId}`);
    }

    if (this.flags.force && this.args.file) {
      this.ux.log(`You input --force and a file: ${this.args.file}`);
    }

    // Return an object to be displayed with --json
    return { orgId: this.org.getOrgId(), outputString };
  }
}
