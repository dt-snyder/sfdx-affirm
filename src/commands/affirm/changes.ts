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
    // TODO: change flag names and descriptions from only to something else as it will print more than one if more than one flag is provided.
    protected static flagsConfig = {
        // flag with a value (-n, --name=VALUE)
        branch: flags.string({ char: 'b', description: messages.getMessage('branchFlagDescription') }),
        inputdir: flags.string({ char: 'n', description: messages.getMessage('inputdirFlagDescription') }),
        onlydestructive: flags.boolean({ char: 'd', description: messages.getMessage('onlydestructiveFlagDescription') }),
        onlyinsertion: flags.boolean({ char: 'i', description: messages.getMessage('onlyinsertionFlagDescription') }),
        onlychanged: flags.boolean({ char: 'c', description: messages.getMessage('onlychangedFlagDescription') })
    };

    // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
    protected static requiresProject = false;

    public async run(): Promise<AnyJson> {
        const branch = this.flags.branch || 'remotes/origin/master';
        const inputdir = this.flags.inputdir || 'src'; // TODO: change this to force-app
        const git: SimpleGit = simpleGit();
        await git.env('GIT_SSH_COMMAND', GIT_SSH_COMMAND).status();
        const diffSum = await git.env({ ...process.env, GIT_SSH_COMMAND }).diffSummary([branch]);

        const result = {
            changed: [],
            insertion: [],
            destructive: []
        };

        diffSum.files.forEach(file => {
            if (!file.file.startsWith(inputdir)) return;
            if (file.changes === file.insertions && file.deletions === 0 && !file.file.includes('=>')) {
                result.insertion = [...result.insertion, file.file];
            } else if (file.changes === file.deletions && !file.file.includes('=>')) {
                result.destructive = [...result.destructive, file.file];
            } else if (file.file.includes('=>')) {
                const path = file.file.substring(0, file.file.indexOf('{'));
                const files = file.file.substring(file.file.indexOf('{'));
                const oldFile = path + files.substring(0, files.indexOf('=')).replace('{', '').trim();
                const newFile = path + files.substring(files.indexOf('>') + 1).replace('}', '').trim();
                result.destructive = [...result.destructive, oldFile];
                result.insertion = [...result.insertion, newFile];
            } else {
                result.changed = [...result.changed, file.file];
            }
        });
        
        const showAll = !this.flags.onlychanged && !this.flags.onlyinsertion && !this.flags.onlydestructive;
        const whatToPrint = {
            changed: this.flags.onlychanged,
            insertion: this.flags.onlyinsertion,
            destructive: this.flags.onlydestructive
        };
        
        Object.keys(result).forEach(key => {
            if(result[key].length === 0 && (whatToPrint[key] || showAll)){
                this.ux.log(key + ': None Found')
            } else if(whatToPrint[key] || showAll){
                this.ux.log(key + ': ' + result[key]);
            }
        });
        return result;
    }
}
