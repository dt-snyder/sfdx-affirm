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
const messages = Messages.loadMessages('affirm', 'changes');

export default class Changes extends SfdxCommand {

    public static description = messages.getMessage('commandDescription');

    public static examples = [
        `$ sfdx affirm:changes
            changed:
            MyClass.cls
            insertion:
            MyTestClass.cls
            destructive:
            MyOldClass.cls
        `,
        `$ sfdx affirm:changes --onlydestructive
            destructive:
            MyOldClass.cls
        `,
        `$ sfdx affirm:changes --onlyinsertion
            insertion:
            MyTestClass.cls
        `,
        `$ sfdx affirm:changes --onlychanged
            changed:
            MyClass.cls
        `
    ];

    public static args = [{ branch: 'file' }];

    protected static flagsConfig = {
        // flag with a value (-n, --name=VALUE)
        branch: flags.string({ char: 'b', description: messages.getMessage('branchFlagDescription') }),
        onlydestructive: flags.boolean({ char: 'd', description: messages.getMessage('onlydestructiveFlagDescription') }),
        onlyinsertion: flags.boolean({ char: 'i', description: messages.getMessage('onlyinsertionFlagDescription') }),
        onlychanged: flags.boolean({ char: 'c', description: messages.getMessage('onlychangedFlagDescription') })
    };

    // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
    protected static requiresProject = false;

    public async run(): Promise<AnyJson> {
        const git: SimpleGit = simpleGit();
        const setSSH = await git.env('GIT_SSH_COMMAND', GIT_SSH_COMMAND).status();
        //console.log('setSSH:');
        //console.log(setSSH);
        const diffSum = await git.env({ ...process.env, GIT_SSH_COMMAND }).diffSummary(['remotes/origin/master']);

        const diff = {
            changed: [],
            insertion: [],
            destructive: []
        };

        diffSum.files.forEach(file => {
            if (file.changes === file.insertions && file.deletions === 0 && !file.file.includes('=>')) {
                diff.insertion = [...diff.insertion, file.file];
            } else if (file.changes === file.deletions && !file.file.includes('=>')) {
                diff.destructive = [...diff.destructive, file.file];
            } else if (file.file.includes('=>')) {
                const path = file.file.substring(0, file.file.indexOf('{'));
                const files = file.file.substring(file.file.indexOf('{'));
                const oldFile = path + files.substring(0, files.indexOf('=')).replace('{', '').trim();
                const newFile = path + files.substring(files.indexOf('>') + 1).replace('}', '').trim();
                diff.destructive = [...diff.destructive, oldFile];
                diff.insertion = [...diff.insertion, newFile];
            } else {
                diff.changed = [...diff.changed, file.file];
            }
        });
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

        // let outputString = `Hello`;
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
        console.log(diff);
        return diff;
    }
}
