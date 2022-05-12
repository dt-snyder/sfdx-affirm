import {  SfdxCommand, flags } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { runCommand } from '../../../lib/sfdx';
import { AnyJson } from '@salesforce/ts-types';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-affirm', 'setup');


export default class Setup extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');
  public static aliases = ['affirm:open:setup'];
  public static examples = [
    `$ sfdx affirm:open:setup
            Open Setup Home page
    `,
    `$ sfdx affirm:open:setup -d
            Open Deployment Status
    `,
    `$ sfdx affirm:open:setup -n
            Open Digital Experience Setup Page 
    `,
    `$ sfdx affirm:open:setup -u -e
            Open Email Deliverability page for the given user  
    `,
    `$ sfdx affirm:open:setup -p
            Open Enhanced Profile Setup Page 
    `,


  ];

  // public static args = [{ branch: 'file', silent: 'boolean', outfilename: 'file' }];
  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    email: flags.boolean({ char: 'e', description: messages.getMessage('emailDescription') }),
    network: flags.boolean({ char: 'n', description: messages.getMessage('networkDescription') }),
    deployment: flags.boolean({ char: 'd', description: messages.getMessage('deploymentStatusDescription') }),
    username: flags.string({char: 'u', description: messages.getMessage('usernameDescription')}),
    profile: flags.boolean({char: 'p', description: messages.getMessage('profileDescription')})

  };

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    
  let path = 'lightning/setup/SetupOneHome/home';

   if(this.flags.email){
     path = 'lightning/setup/OrgEmailSettings/home';
   } else if(this.flags.network){
    path = '_ui/networks/setup/SetupNetworksPage';
   } else if(this.flags.deployment){
    path = 'lightning/setup/DeployStatus/home';
   } else if(this.flags.profile){
     path = 'lightning/setup/EnhancedProfiles/home';
   }
   
   if(this.flags.username != null && this.flags.username.length > 0){
     path += ' -u '+ this.flags.username
   }

   await runCommand('sfdx force:org:open --path '+ path); 

    return JSON.stringify('Executed the command');
  }
}
