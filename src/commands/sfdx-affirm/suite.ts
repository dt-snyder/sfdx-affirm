import { Ux, Flags, SfCommand } from '@salesforce/sf-plugins-core';
import { Messages, SfProjectJson } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import * as inquirer from 'inquirer'
import { getCurrentBranchName, gitDiffSum } from '../../lib/affirm_git';
import { fsCreateNewTestSuite, fsCheckForExistingSuite, fsUpdateExistingTestSuite } from '../../lib/affirm_fs';
import { sfcoreGetDefaultPath } from '../../lib/affirm_sfcore';
import { liftShortBranchName, liftCleanProvidedTests, checkName, liftGetAllSuitesInBranch } from '../../lib/affirm_lift';
import { AffirmSettings, DiffObj } from '../../lib/affirm_interfaces';
import { getAffirmSettings } from '../../lib/affirm_settings';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('sfdx-affirm', 'suite');

export type SuiteResult = { status: string };

export default class Suite extends SfCommand<SuiteResult> {

  public static readonly summary = messages.getMessage('commandDescription');
  public static readonly description = messages.getMessage('commandDescription');
  public static readonly aliases = ['affirm:suite'];
  public static readonly examples = [
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

  public static readonly flags = {
    tests: Flags.string({ char: 't', description: messages.getMessage('testsFlagDescription') }),
    name: Flags.string({ char: 'n', description: messages.getMessage('nameFlagDescription') }),
    outputdir: Flags.string({ char: 'o', description: messages.getMessage('outputdirFlagDescription') }),
    addtotests: Flags.boolean({ char: 'a', description: messages.getMessage('addtotestsFlagDescription') }),
    targetusername: Flags.requiredOrg({ char: 'u', required: false }),
    apiversion: Flags.orgApiVersion({ description: 'api version for the org', required: false })
  };

  public async run(): Promise<SuiteResult> {
    const { flags } = await this.parse(Suite);
    const settings: AffirmSettings = await getAffirmSettings();
    // get the values of flags set by the user
    const tests = flags.tests;
    // if the user did not provide the --tests flag then ask them to provide a list of tests
    let useTests;
    if (!tests) {
      const testsInput = await this.prompt<{ confirm: string }>({
        type: 'input',
        name: 'confirm',
        message: 'Please provide a comma separated list of the test names to add to the suite',
      });
      if (!testsInput.confirm) {
        throw messages.createError('errorNoTestsProvided');
      } else {
        useTests = testsInput.confirm;
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

    const name = flags.name || defaultFileName;
    await checkName(name, new Ux({ jsonEnabled: this.jsonEnabled() }));
    if (name.length > 35) {
      throw messages.createError('errorNameIsToLong');
    }
    let nameToUse = name;
    // get the default sfdx project path and use it or the users provided path, check that the path is in the projects sfdx-project.json file
    const pjtJson: SfProjectJson = await this.project.retrieveSfProjectJson();
    const defaultPath = await sfcoreGetDefaultPath(pjtJson);
    const outputdir = flags.outputdir || defaultPath + '/main/default/testSuites/';
    const addtotests = flags.addtotests;
    const hasExistingSuite = await fsCheckForExistingSuite(outputdir, nameToUse);
    let existingTestSuiteToUse: string | undefined;
    if (!hasExistingSuite) {
      const diffResult: DiffObj = await gitDiffSum(settings.primaryBranch, defaultPath);
      const suitesToMerge: Set<string> = await liftGetAllSuitesInBranch(diffResult, hasExistingSuite);
      if (suitesToMerge.size > 1) {
        throw messages.createError('errorTooManySuites');
      } else if (suitesToMerge.size === 1) {
        existingTestSuiteToUse = Array.from(suitesToMerge)[0];
        nameToUse = existingTestSuiteToUse.substring(existingTestSuiteToUse.indexOf('testSuites/') + 11);
        nameToUse = nameToUse.substring(0, nameToUse.indexOf('.testSuite-meta.xml'));
      }
    } else {
      existingTestSuiteToUse = hasExistingSuite;
    }
    let pathForward = (addtotests && existingTestSuiteToUse) ? 'Update' : 'Overwrite';
    if (existingTestSuiteToUse && !addtotests) {
      this.log('Found existing suite at ' + chalk.underline.blue(existingTestSuiteToUse));
      const displayResults = await this.prompt<{ selected: string }>([{
        name: 'selected',
        message: 'Would you like to update the list of tests, overwrite it completely, or keep the current list and exit?',
        type: 'list',
        choices: [{ name: 'Update' }, { name: 'Overwrite' }, { name: 'Keep' }],
      }]);
      pathForward = displayResults.selected;
    }

    if (pathForward === 'Keep') {
      this.log('Keeping existing test suite: Exit Command');
      return { status: 'user exit' };
    }
    // create the xml file and save to the the outputdir
    let pathToSuite;
    this.spinner.start('Creating Test Suite');
    if (pathForward === 'Overwrite') {
      pathToSuite = await fsCreateNewTestSuite(cleanTests, outputdir, nameToUse);
    } else if (pathForward === 'Update') {
      pathToSuite = await fsUpdateExistingTestSuite(cleanTests, outputdir, nameToUse);
    } else {
      this.spinner.stop('FAIL');
      throw messages.createError('errorUnknown');
    }
    this.spinner.stop('Success');
    this.log('New Test Suite Written to: ' + chalk.underline.blue(pathToSuite));
    return { status: 'complete', pathToSuite };
  }
}
