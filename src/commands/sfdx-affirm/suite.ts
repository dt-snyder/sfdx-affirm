import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError, SfdxProjectJson } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { getCurrentBranchName } from '../../lib/affirm_git';
import { fsCreateNewTestSuite, fsCheckForExistingSuite, fsUpdateExistingTestSuite } from '../../lib/affirm_fs';
import { sfcoreGetDefaultPath } from '../../lib/affirm_sfcore';
import { liftShortBranchName, liftCleanProvidedTests, checkName } from '../../lib/affirm_lift';
import * as inquirer from 'inquirer'
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-affirm', 'suite');

export default class Suite extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');
  public static aliases = ['affirm:suite'];
  public static examples = [
    `$ sfdx affirm:suite
    Please provide a comma separated list of the test names to add to the suite: testClassNameOne,TestClassNameTwo
    Creating Test Suite... Success
    New Test Suite Written to: force-app/main/default/testSuites/pjname_XXXX_name_of_branch.testSuite-meta.xml
    `,
    `$ sfdx affirm:suite --tests testClassNameOne,TestClassNameTwo
    Found existing suite at force-app/main/default/testSuites/pjname_XXXX_name_of_branch.testSuite-meta.xml
    ? Would you like to update the list of tests, overwrite it completely, or keep the current list and exit? Update
    Creating Test Suite... Success
    New Test Suite Written to: force-app/main/default/testSuites/pjname_XXXX_name_of_branch.testSuite-meta.xml
    `,
    `$ sfdx affirm:suite --addtotests -t testClassNameOne,TestClassNameTwo
    Creating Test Suite... Success
    New Test Suite Written to: force-app/main/default/testSuites/myCustomTestSuite.testSuite-meta.xml
    `,
  ];

  protected static flagsConfig = {
    tests: flags.string({ char: 't', description: messages.getMessage('testsFlagDescription') }),
    name: flags.string({ char: 'n', description: messages.getMessage('nameFlagDescription') }),
    outputdir: flags.string({ char: 'o', description: messages.getMessage('outputdirFlagDescription') }),
    addtotests: flags.boolean({ char: 'a', description: messages.getMessage('addtotestsFlagDescription') })
  };

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    // get the values of flags set by the user
    const tests = this.flags.tests;
    // if the user did not provide the --tests flag then ask them to provide a list of tests
    let useTests;
    if (!tests) {
      useTests = await this.ux.prompt('Please provide a comma separated list of the test names to add to the suite');
      if (!useTests) {
        throw SfdxError.create('sfdx-affirm', 'suite', 'errorNoTestsProvided');
      }
    } else {
      useTests = tests;
    }
    // clear the value provided by the user; remove white space and .cls
    const cleanTests = await liftCleanProvidedTests(useTests);
    // get the current branch name and set it as the file name if the user did not provide one
    const currentBranch = await getCurrentBranchName();
    const defaultFileName = await liftShortBranchName(currentBranch, 25);
    // console.log('defaultFileName: ' + defaultFileName);

    const name = this.flags.name || defaultFileName;
    await checkName(name, this.ux);
    if (name.length > 35) {
      throw SfdxError.create('sfdx-affirm', 'suite', 'errorNameIsToLong');
    }
    // get the default sfdx project path and use it or the users provided path, check that the path is in the projects sfdx-project.json file
    const pjtJson: SfdxProjectJson = await this.project.retrieveSfdxProjectJson();
    const defaultPath = await sfcoreGetDefaultPath(pjtJson);
    const outputdir = this.flags.outputdir || defaultPath + '/main/default/testSuites/';
    const addtotests = this.flags.addtotests;
    const hasExistingSuite = await fsCheckForExistingSuite(outputdir, name);
    let pathForward = (addtotests && hasExistingSuite) ? 'Update' : 'Overwrite';
    if (hasExistingSuite && !addtotests) {
      this.ux.log('Found existing suite at ' + chalk.underline.blue(hasExistingSuite));
      const displayResults: any = await inquirer.prompt([{
        name: 'selected',
        message: 'Would you like to update the list of tests, overwrite it completely, or keep the current list and exit?',
        type: 'list',
        choices: [{ name: 'Update' }, { name: 'Overwrite' }, { name: 'Keep' }],
      }]);
      pathForward = displayResults.selected;
    }

    if (pathForward === 'Keep') {
      this.ux.log('Keeping existing test suite: Exit Command');
      return { status: 'user exit' };
    }
    // create the xml file and save to the the outputdir
    let pathToSuite;
    this.ux.startSpinner('Creating Test Suite');
    if (pathForward === 'Overwrite') {
      pathToSuite = await fsCreateNewTestSuite(cleanTests, outputdir, name);
    } else if (pathForward === 'Update') {
      pathToSuite = await fsUpdateExistingTestSuite(cleanTests, outputdir, name);
    } else {
      this.ux.stopSpinner('FAIL');
      throw SfdxError.create('sfdx-affirm', 'suite', 'errorUnknown');
    }
    this.ux.stopSpinner('Success');
    this.ux.log('New Test Suite Written to: ' + chalk.underline.blue(pathToSuite));
    return { status: 'complete', pathToSuite: pathToSuite };
  }
}
