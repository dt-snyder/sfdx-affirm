import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import simpleGit, { SimpleGit, StatusResult } from 'simple-git'; // Docs: https://github.com/steveukx/git-js#readme
import * as fs from 'fs-extra' // Docs: https://github.com/jprichardson/node-fs-extra

const GIT_SSH_COMMAND = "ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no";

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('affirm', 'parcel');

export default class Parcel extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
    `$ sfdx affirm:parcel --targetusername myOrg@example.com --targetdevhubusername devhub@org.com
  Hello world! This is org: MyOrg and I will be around until Tue Mar 20 2018!
  My hub org id is: 00Dxx000000001234
  `,
    `$ sfdx hello:org --name myname --targetusername myOrg@example.com
  Hello myname! This is org: MyOrg and I will be around until Tue Mar 20 2018!
  `
  ];

  public static args = [{ branch: 'file' }];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    branch: flags.string({ char: 'b', description: messages.getMessage('branchFlagDescription') }),
    outputdir: flags.string({ char: 'o', description: messages.getMessage('outputdirFlagDescription') }),
    includedestructive: flags.boolean({ char: 'd', description: messages.getMessage('includedestructiveFlagDescription') })
  };

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    const git: SimpleGit = simpleGit();
    const setSSH = await git.env('GIT_SSH_COMMAND', GIT_SSH_COMMAND).status();
    //console.log('setSSH:');
    //console.log(setSSH);
    const processSSH = await git.env({ ...process.env, GIT_SSH_COMMAND }).diffSummary(['origin/master..master', '--name-only']);
    console.log('processSSH:');
    console.log(processSSH);
    
    // const status: StatusResult = await git.status();

    //   const branch = this.flags.branch || 'master';
    //   const outputdir = this.flags.outputdir || 'parcel';

    //   // this.org is guaranteed because requiresUsername=true, as opposed to supportsUsername
    //   const conn = this.org.getConnection();
    //   const query = 'Select Name, TrialExpirationDate from Organization';

    //   // The type we are querying for
    //   interface Organization {
    //     Name: string;
    //     TrialExpirationDate: string;
    //   }

    //   // Query the org
    //   const result = await conn.query<Organization>(query);

    //   // Organization will always return one result, but this is an example of throwing an error
    //   // The output and --json will automatically be handled for you.
    //   if (!result.records || result.records.length <= 0) {
    //     throw new SfdxError(messages.getMessage('errorNoOrgResults', [this.org.getOrgId()]));
    //   }

    //   // Organization always only returns one result
    //   const orgName = result.records[0].Name;
    //   const trialExpirationDate = result.records[0].TrialExpirationDate;

    let outputString = `Hello`;
    //   if (trialExpirationDate) {
    //     const date = new Date(trialExpirationDate).toDateString();
    //     outputString = `${outputString} and I will be around until ${date}!`;
    //   }
    //   this.ux.log(outputString);

    //   // this.hubOrg is NOT guaranteed because supportsHubOrgUsername=true, as opposed to requiresHubOrgUsername.
    //   if (this.hubOrg) {
    //     const hubOrgId = this.hubOrg.getOrgId();
    //     this.ux.log(`My hub org id is: ${hubOrgId}`);
    //   }

    //   if (this.flags.force && this.args.file) {
    //     this.ux.log(`You input --force and a file: ${this.args.file}`);
    //   }

    //   // Return an object to be displayed with --json
    return { outputString };
  }
}
