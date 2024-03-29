import { flags, FlagsConfig, SfdxCommand } from '@salesforce/command';
import { Messages, SfError, SfProjectJson } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { getCurrentBranchName, getRemoteInfo, gitDiffSum } from '../../../lib/affirm_git';
import { fsCreateNewTestSuite, fsCheckForExistingSuite, fsUpdateExistingTestSuite } from '../../../lib/affirm_fs';
import { sfcoreGetDefaultPath, sfcoreIsPathProject } from '../../../lib/affirm_sfcore';
import { liftShortBranchName, liftCleanProvidedTests, checkName, printBranchesCompared, liftGetAllSuitesInBranch, liftGetTestsFromSuites } from '../../../lib/affirm_lift';
import { AffirmSettings, DiffObj } from '../../../lib/affirm_interfaces';
import { getAffirmSettings } from '../../../lib/affirm_settings';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-affirm', 'merge');

export default class Merge extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');
  public static aliases = ['affirm:suite:merge'];
  public static examples = [
    `$ sfdx affirm:suite:merge
    Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
    Git Diff For: remotes/origin/main...pilot/affirm
    The following 3 test suite(s) will me merged into the name-of-epic-branch test suite
    force-app/main/default/testSuites/SFDC_1###_some_branch.testSuite-meta.xml
    force-app/main/default/testSuites/SFDC_2###_some_branch1.testSuite-meta.xml
    force-app/main/default/testSuites/SFDC_3###_some_branch2.testSuite-meta.xml
    Creating Test Suite... Success
    New Test Suite Written to: force-app/main/default/testSuites/name-of-epic-branch.testSuite-meta.xml
    `,
    `$ sfdx affirm:suite:merge -n funky_suite_name
    Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
    Git Diff For: remotes/origin/main...pilot/affirm
    The following 2 test suite(s) will me merged into the funky_suite_name test suite
    force-app/main/default/testSuites/SFDC_1###_some_branch.testSuite-meta.xml
    force-app/main/default/testSuites/SFDC_2###_some_branch1.testSuite-meta.xml
    Creating Test Suite... Success
    New Test Suite Written to: force-app/main/default/testSuites/funky_suite_name.testSuite-meta.xml
    `,
    `$ sfdx affirm:suite:merge -o releaseArtifacts/tests
    Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
    Git Diff For: remotes/origin/main...pilot/affirm
    The following 2 test suite(s) will me merged into the name-of-epic-branch test suite
    force-app/main/default/testSuites/SFDC_1###_some_branch.testSuite-meta.xml
    force-app/main/default/testSuites/SFDC_2###_some_branch1.testSuite-meta.xml
    Creating Test Suite... Success
    New Test Suite Written to: releaseArtifacts/tests/name-of-epic-branch.testSuite-meta.xml
    `,
  ];

  protected static flagsConfig: FlagsConfig = {
    name: flags.string({ char: 'n', description: messages.getMessage('nameFlagDescription') }),
    outputdir: flags.string({ char: 'o', description: messages.getMessage('outputdirFlagDescription') }),
    inputdir: flags.string({ char: 'n', description: messages.getMessage('inputdirFlagDescription') }),
    branch: flags.string({ char: 'b', description: messages.getMessage('branchFlagDescription') }),
    list: flags.boolean({ char: 'l', description: messages.getMessage('listFlagDescription'), default: false }),
    string: flags.boolean({ char: 's', description: messages.getMessage('stringFlagDescription'), default: false })
  };

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {

    const settings: AffirmSettings = await getAffirmSettings();
    // make sure we are in a repo and that it has a remote set
    await getRemoteInfo();
    // get the default sfdx project path and use it or the users provided path, check that the path is in the projects sfdx-project.json file
    const pjtJson: SfProjectJson = await this.project.retrieveSfProjectJson();
    const defaultPath = await sfcoreGetDefaultPath(pjtJson);
    const inputdir = this.flags.inputdir || defaultPath;
    const onlyPrint = this.flags.list || this.flags.string;

    await sfcoreIsPathProject(pjtJson, inputdir);
    // compare the current branch to the provided or default branch
    const branch = this.flags.branch || settings.primaryBranch;
    const currentBranch = await getCurrentBranchName();
    await printBranchesCompared(this.ux, branch, currentBranch);
    // get the current branch name and set it as the file name if the user did not provide one
    const defaultFileName = await liftShortBranchName(currentBranch, 25, true);
    const name = this.flags.name || defaultFileName;
    if (!onlyPrint) await checkName(name, this.ux);
    if (name.length > 35 && !onlyPrint) {
      throw new SfError(messages.getMessage('errorNameIsToLong'));
    }
    // get the default sfdx project path and use it or the users provided path, check that the path is in the projects sfdx-project.json file
    const outputdir = this.flags.outputdir || defaultPath + '/main/default/testSuites/';
    const hasExistingSuite: string = await fsCheckForExistingSuite(outputdir, name);
    // get diff and collect suite file locations
    const diffResult: DiffObj = await gitDiffSum(branch, inputdir);
    const suitesToMerge: Set<string> = await liftGetAllSuitesInBranch(diffResult, hasExistingSuite);
    if (suitesToMerge.size === 0) {
      this.ux.log('Could not find existing Suites to Merge: Exit Command');
      return { status: 'no existing suites found' };
    }

    if (onlyPrint) {
      this.ux.log('The following ' + chalk.green(suitesToMerge.size) + ' test suite(s) were found:');
    } else {
      this.ux.log('The following ' + chalk.green(suitesToMerge.size) + ' test suite(s) will me merged into the ' + name + ' test suite:');
    }
    let allTests: Set<string> = await liftGetTestsFromSuites(suitesToMerge);
    allTests = new Set(Array.from(allTests).sort());
    if (onlyPrint) {
      if (this.flags.list) {
        this.ux.log(chalk.dim.blue('Listed'));
        allTests.forEach(test => {
          this.ux.log(chalk.blue(test));
        });
      }
      if (this.flags.string) {
        const testString = Array.from(allTests).join(",");
        this.ux.log(chalk.dim.green('Single String'));
        this.ux.log(chalk.green(testString));
      }
      return { status: 'print and exit' };
    }
    const testArray = [...allTests];
    const allTestsString: string = testArray.join(',');
    const cleanTests = await liftCleanProvidedTests(allTestsString);
    let pathToSuite;
    this.ux.startSpinner('Creating Test Suite');
    if (!hasExistingSuite) {
      pathToSuite = await fsCreateNewTestSuite(cleanTests, outputdir, name);
    } else {
      pathToSuite = await fsUpdateExistingTestSuite(cleanTests, outputdir, name);
    }
    this.ux.stopSpinner('Success');
    this.ux.log('New Test Suite Written to: ' + chalk.underline.blue(pathToSuite));
    return { status: 'complete', pathToSuite: pathToSuite };
  }
}
