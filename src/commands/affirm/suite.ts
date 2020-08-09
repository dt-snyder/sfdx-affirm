import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError, SfdxProject, SfdxProjectJson } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { getCurrentBranchName } from '../../affirm_simple_git';
import { fsCreateNewTestSuite, fsCheckForExistingSuite } from '../../affirm_fs_extra';
import { getDefaultPath } from '../../affirm_sfpjt';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('affirm', 'suite');

export default class Suite extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
    `$ sfdx affirm:suite
    Please provide a comma separated list of the test names to add to the suite: testClassNameOne,TestClassNameTwo
    Creating Test Suite... Success
    New Test Suite Written to: force-app/main/default/testSuites/pjname_###_name_of_branch.testSuite-meta.xml
    `,
    `$ sfdx affirm:suite --tests testClassNameOne,TestClassNameTwo
    (y/n) Are you sure you want to overwrite the existing test suite?: y
    Creating Test Suite... Success
    New Test Suite Written to: force-app/main/default/testSuites/pjname_###_name_of_branch.testSuite-meta.xml
    `,
    `$ sfdx affirm:suite -t testClassNameOne,TestClassNameTwo --name myCustomTestSuite
    sfdx affirm:suite -t testClassNameOne,TestClassNameTwo
    Creating Test Suite... Success
    New Test Suite Written to: force-app/main/default/testSuites/myCustomTestSuite.testSuite-meta.xml
    `,
  ];

  protected static flagsConfig = {
    tests: flags.string({ char: 't', description: messages.getMessage('testsFlagDescription') }),
    name: flags.string({ char: 'n', description: messages.getMessage('nameFlagDescription') }),
    outputdir: flags.string({ char: 'o', description: messages.getMessage('outputdirFlagDescription') })
  };

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    // get the values of flags set by the user
    const tests = this.flags.tests;
    // get the current branch name and set it as the file name if the user did not provide one
    const currentBranch = await getCurrentBranchName();
    const defaultFileName = currentBranch.substring(currentBranch.indexOf('/'), currentBranch.length).split('-');
    let shortFileName;
    let charCount = 0;
    defaultFileName.forEach(element => {
      charCount = charCount + element.length;
      if (charCount > 25) return;
      if (shortFileName) {
        shortFileName = shortFileName + '_' + element;
      } else {
        shortFileName = element;
      }
    });
    const name = this.flags.name || shortFileName;
    if (name.length > 35) {
      throw SfdxError.create('affirm', 'suite', 'errorNameIsToLong');
    }
    // get the default sfdx project path and use it or the users provided path, check that the path is in the projects sfdx-project.json file
    const project = await SfdxProject.resolve();
    const pjtJson: SfdxProjectJson = await project.retrieveSfdxProjectJson();
    const defaultPath = await getDefaultPath(pjtJson);
    const outputdir = this.flags.outputdir || defaultPath + '/main/default/testSuites';
    // if the user did not provide the --tests flag then ask them to provide a list of tests
    let useTests;
    if (!tests) {
      useTests = await this.ux.prompt('Please provide a comma separated list of the test names to add to the suite');
      if (!useTests) {
        throw SfdxError.create('affirm', 'suite', 'errorNoTestsProvided');
      }
    } else {
      useTests = tests;
    }
    // clear the value provided by the user; remove white space and .cls
    const cleanTests = useTests.trim().replace(/\s+/g, '');
    if (cleanTests.includes('.cls')) {
      throw SfdxError.create('affirm', 'suite', 'errorNoToFileName');
    }
    const hasExistingSuite = await fsCheckForExistingSuite(outputdir, name);
    if (hasExistingSuite) {
      const confirmOverwrite = await this.ux.confirm('(y/n) Are you sure you want to overwrite the existing test suite?');
      if (!confirmOverwrite) {
        this.ux.log('Exit Command');
        return { status: 'user exit' };
      }
    }
    // create the xml file and save to the the outputdir
    this.ux.startSpinner('Creating Test Suite');
    const pathToSuite = await fsCreateNewTestSuite(cleanTests, outputdir, name);
    this.ux.stopSpinner('Success');
    this.ux.log('New Test Suite Written to: ' + pathToSuite);
    return { status: 'complete', pathToSuite: pathToSuite };
  }
}
