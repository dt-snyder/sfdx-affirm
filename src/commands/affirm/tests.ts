import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError, SfdxProject, SfdxProjectJson } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { getCurrentBranchName } from '../../affirm_git';
import { liftShortBranchName, liftCleanProvidedTests } from '../../affirm_lift';
import { fsCheckForExistingSuite } from '../../affirm_fs';
import { sfcoreGetDefaultPath } from '../../affirm_sfcore';
// import { DiffObj, PrintableDiffObj } from '../../affirm_interfaces';
import * as fs from 'fs-extra' // Docs: https://github.com/jprichardson/node-fs-extra

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('affirm', 'tests');

export default class Tests extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
    `$ sfdx affirm:tests

    `,
  ];

  // public static args = [{ branch: 'file', silent: 'boolean', outfilename: 'file' }];
  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    list: flags.string({ char: 'l', description: messages.getMessage('listFlagDescription') })
  };

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  // Comment this out if your command does not require an org username
  protected static supportsUsername = true;

  public async run(): Promise<AnyJson> {
    // if the user provides tests then skip getting them from the suite
    const list = this.flags.list;
    let testsToUse;
    if (!list) {
      // get current branch name
      const currentBranch = await getCurrentBranchName();
      const defaultFileName = await liftShortBranchName(currentBranch, 25);
      // look for test suite with the current name
      const project = await SfdxProject.resolve();
      const pjtJson: SfdxProjectJson = await project.retrieveSfdxProjectJson();
      const defaultPath = await sfcoreGetDefaultPath(pjtJson);
      const defaultOutputDir = defaultPath + '/main/default/testSuites';
      const suiteExists = await fsCheckForExistingSuite(defaultOutputDir, defaultFileName);
      // if a suite doesn't exist prompt the user for tests
      if(!suiteExists) {
        const provideList = await this.ux.confirm('(y/n) Could not find test suite for the current branch. Would you like to provide a list of test classes now?');
        if(provideList) {
          const providedTests = await this.ux.prompt('Please provide a comma separated list of tests names');
          testsToUse = await liftCleanProvidedTests(providedTests);
        } else {
          this.ux.log('End Command');
          return { result: 'User ended Command' };
        }
      } else {
        // if a test suite exists then parse the tests out
      }
    } else {
      testsToUse = await liftCleanProvidedTests(list);
    }
    // run force:apex:test:run command

    // prompt user if they would like more details on the test results

    return { result: 'I do nothing' };
  }
}
