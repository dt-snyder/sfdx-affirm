import { Ux, Flags, SfCommand } from '@salesforce/sf-plugins-core';
import { Messages, SfProjectJson } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { getCurrentBranchName, getRemoteInfo, gitDiffSum } from '../../../lib/affirm_git';
import { fsCreateNewTestSuite, fsCheckForExistingSuite, fsUpdateExistingTestSuite } from '../../../lib/affirm_fs';
import { sfcoreGetDefaultPath, sfcoreIsPathProject } from '../../../lib/affirm_sfcore';
import { liftShortBranchName, liftCleanProvidedTests, checkName, printBranchesCompared, liftGetAllSuitesInBranch, liftGetTestsFromSuites } from '../../../lib/affirm_lift';
import { AffirmSettings, DiffObj } from '../../../lib/affirm_interfaces';
import { getAffirmSettings } from '../../../lib/affirm_settings';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('sfdx-affirm', 'merge');

export type MergeResult = {
  status: string;
  suitesToMerge?: Set<string>;
  pathToSuite: string | undefined;
  result: string;
};

export default class Merge extends SfCommand<MergeResult> {

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

  public static readonly flags = {
    name: Flags.string({ char: 'n', description: messages.getMessage('nameFlagDescription') }),
    outputdir: Flags.string({ char: 'o', description: messages.getMessage('outputdirFlagDescription') }),
    inputdir: Flags.string({ char: 'n', description: messages.getMessage('inputdirFlagDescription') }),
    branch: Flags.string({ char: 'b', description: messages.getMessage('branchFlagDescription') }),
    list: Flags.boolean({ char: 'l', description: messages.getMessage('listFlagDescription'), default: false }),
    string: Flags.boolean({ char: 's', description: messages.getMessage('stringFlagDescription'), default: false }),
    targetusername: Flags.requiredOrg({ char: 'u', required: false }),
    apiversion: Flags.orgApiVersion({ description: 'api version for the org', required: false })
  };

  public async run(): Promise<MergeResult> {
    const { flags } = await this.parse(Merge);
    const result: MergeResult = {
      status: 'not started',
      suitesToMerge: undefined,
      pathToSuite: undefined,
      result: undefined
    }
    const settings: AffirmSettings = await getAffirmSettings();
    // make sure we are in a repo and that it has a remote set
    await getRemoteInfo();
    // get the default sfdx project path and use it or the users provided path, check that the path is in the projects sfdx-project.json file
    // TODO: fix this
    const pjtJson: SfProjectJson = await this.project.retrieveSfProjectJson();
    const defaultPath = await sfcoreGetDefaultPath(pjtJson);
    const inputdir = flags.inputdir || defaultPath;
    const onlyPrint = flags.list || flags.string;

    await sfcoreIsPathProject(pjtJson, inputdir);
    // compare the current branch to the provided or default branch
    const branch = flags.branch || settings.primaryBranch;
    const currentBranch = await getCurrentBranchName();
    await printBranchesCompared(new Ux({ jsonEnabled: this.jsonEnabled() }), branch, currentBranch);
    // get the current branch name and set it as the file name if the user did not provide one
    const defaultFileName = await liftShortBranchName(currentBranch, 25, true);
    const name = flags.name || defaultFileName;
    if (!onlyPrint) await checkName(name, new Ux({ jsonEnabled: this.jsonEnabled() }));
    if (name.length > 35 && !onlyPrint) {
      throw messages.createError('errorNameIsToLong');
    }
    // get the default sfdx project path and use it or the users provided path, check that the path is in the projects sfdx-project.json file
    const outputdir = flags.outputdir || defaultPath + '/main/default/testSuites/';
    const hasExistingSuite: string = await fsCheckForExistingSuite(outputdir, name);
    // get diff and collect suite file locations
    const diffResult: DiffObj = await gitDiffSum(branch, inputdir);
    result.suitesToMerge = await liftGetAllSuitesInBranch(diffResult, hasExistingSuite);
    if (result.suitesToMerge.size === 0) {
      this.log('Could not find existing Suites to Merge: Exit Command');
      result.status = 'Complete: no existing suites found';
      return result;
    }

    if (onlyPrint) {
      this.log('The following ' + chalk.green(result.suitesToMerge.size) + ' test suite(s) were found:');
    } else {
      this.log('The following ' + chalk.green(result.suitesToMerge.size) + ' test suite(s) will me merged into the ' + name + ' test suite:');
    }
    let allTests: Set<string> = await liftGetTestsFromSuites(result.suitesToMerge);
    allTests = new Set(Array.from(allTests).sort());
    const testArray = [...allTests];
    const allTestsString: string = testArray.join(',');
    result.result = await liftCleanProvidedTests(allTestsString);
    if (onlyPrint) {
      if (flags.list) {
        this.log(chalk.dim.blue('Listed'));
        allTests.forEach(test => {
          this.log(chalk.blue(test));
        });
      }
      if (flags.string) {
        const testString = Array.from(allTests).join(",");
        this.log(chalk.dim.green('Single String'));
        this.log(chalk.green(testString));
      }
      result.status = 'Complete: print and exit';
      return result;
    }

    this.spinner.start('Creating Test Suite');
    if (!hasExistingSuite) {
      result.pathToSuite = await fsCreateNewTestSuite(result.result, outputdir, name);
    } else {
      result.pathToSuite = await fsUpdateExistingTestSuite(result.result, outputdir, name);
    }
    this.spinner.stop('Success');
    this.log('New Test Suite Written to: ' + chalk.underline.blue(result.pathToSuite));
    result.status = 'Complete: Saved to File';
    return result;
  }
}
