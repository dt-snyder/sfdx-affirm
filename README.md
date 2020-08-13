# sfdx-affirm

Commands for creating a package from git diff and validating it against a specific org.

## Install for use in sfdx project

1. clone repo to your local and cd into repo directory
2. run `npm install`
3. run `sfdx plugins:link`
4. navigate to salesforce project and run `sfdx affirm --help`

## Commands

List of working commands

### sfdx affirm:changes

print the git diff between your last commit and a specific remote branch (default remote branch: remotes/origin/master)

```bash
USAGE
  $ sfdx affirm:changes [--branch <string>, default: remotes/origin/master] [--inputdir <string>, default: force-app] [--showdestructive] [--showinsertion] [--showchanged] [--silent] [--outfilename <string>]

OPTIONS
  -b, --branch=BranchName                                                                       String: Target Branch for Git Diff
  -n, --inputdir=nameOfRootDirectory                                                            String: Root Directory of files to include in package
  -d, --showdestructive                                                                         Boolean: If provided alone shows destructive changes only.
  -i, --showinsertion                                                                           Boolean: If provided alone shows insertion changes only.
  -c, --showchanged                                                                             Boolean: If provided alone shows changed file names only.
  -s, --silent                                                                                  Boolean: If provided nothing is printed to the console.
  -o, --outfilename=JsonFileName                                                                String: If provided results of git diff are saved to a json file with the specified name.

EXAMPLES
  `$ sfdx affirm:changes
      Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
      Git Diff For: remotes/origin/master...pilot/affirm
      CHANGED: MyClass.cls,MySecondClass.cls
      INSERTION: MyTestClass.cls
      DESTRUCTIVE: MyOldClass.cls,MyOldTestClass.cls
  `,
  `$ sfdx affirm:changes --showdestructive
      Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
      Git Diff For: remotes/origin/master...pilot/affirm
      DESTRUCTIVE: MyOldClass.cls
  `,
  `$ sfdx affirm:changes --showinsertion
      Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
      Git Diff For: remotes/origin/master...pilot/affirm
      INSERTION: MyTestClass.cls
  `,
  `$ sfdx affirm:changes --showchanged
      Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
      Git Diff For: remotes/origin/master...pilot/affirm
      CHANGED: MyClass.cls
  `
```

### sfdx affirm:parcel

Creates a package using the git diff between your current local branch and remotes/origin/master. If there are any destructive changes it will also create a destructive change package.

```bash
USAGE
  $ sfdx affirm:parcel [--branch <string>, default: remotes/origin/master] [--inputdir <string>, default: force-app] [--outputdir <string>, default: ./releaseArtifacts/parcel] [--includedestructive] [--destructivetiming <string>, options: before,after]

OPTIONS
  -b, --branch=BranchName                                                                       String: Target Branch for Git Diff. default is remotes/origin/master
  -i, --inputdir=nameOfRootDirectory                                                            String: Root Directory of files to include in package. default is ./force-app
  -o, --outputdir=nameOfTargetOutputDirectory                                                   String: If provided the package folder will be saved to .releaseArtifacts/nameOfTargetOutputDirectory. Default is .releaseArtifacts/parcel
  -d, --includedestructive                                                                      Boolean: If provided and there are destructive changes you will be included and you will not be asked if you want to include them.
  -t, --destructivetiming=timingOptions                                                         String: Allows you to indicate if you want to process the destructive changes before or after the deployment. options: before, after

EXAMPLES
  `$ sfdx affirm:parcel
      Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
      Diff Against: remotes/origin/master...pilot/affirm... Success:
      Changes: 5, Insertions: 93, Destructive: 7
      Cloning Files... Success: 100 files ready for convert
      Converting... Success
      (y/n) There are 7 destructive changes. Create destructive changes xml file? y
      ? Select when the destructive changes should be deployed: before
      Creating Destructive Package... Success: Created at .releaseArtifacts/parcel/destructiveChangesPre.xml
      Cleaning Up... Success
    `,
    `$ sfdx affirm:parcel -d -t before
      Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
      Diff Against: remotes/origin/master...pilot/affirm... Success:
      Changes: 5, Insertions: 93, Destructive: 7
      Cloning Files... Success: 100 files ready for convert
      Converting... Success
      Creating Destructive Package... Success: Created at .releaseArtifacts/parcel/destructiveChangesPre.xml
      Cleaning Up... Success
    `
```

### sfdx affirm:quality

Short hand version of [`sfdx force:mdapi:deploy`](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_force_mdapi.htm#cli_reference_deploy). This command sets flags for the `mdapi:deploy` command and prompts the users to confirm params to make validating a package easier and less error prone. This command can not be used to deploy a package as there is no way for the user to take the `-c` flag out of the `mdapi:deploy` command.

```bash
USAGE
  $ sfdx affirm:quality [--targetusername  <string>, default: Default Org set in VS Code] [--packagedir <string>, default: .releaseArtifacts/parcel] [--testclasses <string>] [--waittime <integer>, default: 10] [--noresults]

OPTIONS
  -u, --targetusername=TARGETUSERNAME                                                           String: A username or alias for the target org. Overrides the default target org.
  -d, --packagedir=pathToPackageDir                                                             String: The root of the directory tree that contains the files to deploy. The root must contain a valid package.xml file describing the entities in the directory structure. default: .releaseArtifacts/parcel. You will always be asked to confirm the path provided before continuing.
  -t, --testclasses=list,of,testclasses                                                         String: Comma separated list of tests to run. If none are provided you will be asked to confirm your choice to validate without tests before continuing without tests.
  -w, --waittime                                                                                Integer: The number of minutes to wait for the command to complete. The default is 10.
  -r, --noresults                                                                               Boolean: If provided, you will not be asked if you would like to print or save the component details or test details after validation completes.

EXAMPLES
  `$ sfdx affirm:quality
      (y/n) Are you sure you want to validate against myOrg@example.com.sandbox?: y
      Selected Org: myOrg@example.com.sandbox
      (y/n) Are you sure you want to validate the package located in the ".releaseArtifacts/parcel" folder?: y
      Package Directory: ".releaseArtifacts/parcel"
      (y/n) Are you sure you want to validate without running any tests?: y
      Validating without test classes!
      Validating Package... Succeeded
      Deployment Status Date_Time_Id: 2020-08-09_14-21-23_0Af05000000iub1CAA
      Total Components: 761
      Component Deployed: 761
      Component With Errors: 0
      ? Would you like to print or save the any of the validation results? No
  `,
    `$ sfdx affirm:quality -u myOrg@example.com.sandbox -t MyTestClass,OtherTestClass -r
      Selected Org: myOrg@example.com.sandbox
      (y/n) Are you sure you want to validate the package located in the ".releaseArtifacts/parcel" folder?: y
      Package Directory: ".releaseArtifacts/parcel"
      Validating Using Provided Classes: MyTestClass,OtherTestClass
      Validating Package... Succeeded
      Deployment Status Date_Time_Id: 2020-08-09_14-21-23_0Af05000000iub1CAA
      Total Components: 761
      Component Deployed: 761
      Component With Errors: 0
    `
```

### sfdx affirm:suite

Creates a testSuite-meta.xml file with the provided list of tests.

```bash
USAGE
  $ sfdx affirm:suite [--tests <string>] [--name <string>, default: first 35 characters of the current branch name ] [--outputdir <string>, default: force-app/main/default/testSuites]

OPTIONS
  -t, --tests=tests                                                                 Comma separated list of tests names that will be used to create the test suite. If none are provided you will be asked to provide a list or exit.
  -n, --name=name                                                                   Optional: Provide if you would like to define the name of your test suite. Default: name of current branch minus 'feature/'
  -o, --outputdir=outputdir                                                         Optional: Provide if you would like to save the testSuite-meta.xml file to a location other than force-app/main/default/testSuites

EXAMPLES
  `$ sfdx affirm:suite
    Please provide a comma separated list of the test names to add to the suite: testClassNameOne,TestClassNameTwo
    Creating Test Suite... Success
    New Test Suite Written to: force-app/main/default/testSuites/pjname_XXXX_name_of_branch.testSuite-meta.xml
  `,
  `$ sfdx affirm:suite --tests testClassNameOne,TestClassNameTwo
    (y/n) Are you sure you want to overwrite the existing test suite?: y
    Creating Test Suite... Success
    New Test Suite Written to: force-app/main/default/testSuites/pjname_XXXX_name_of_branch.testSuite-meta.xml
  `,
  `$ sfdx affirm:suite -t testClassNameOne,TestClassNameTwo --name myCustomTestSuite
    sfdx affirm:suite -t testClassNameOne,TestClassNameTwo
    Creating Test Suite... Success
    New Test Suite Written to: force-app/main/default/testSuites/myCustomTestSuite.testSuite-meta.xml
  `
```

### sfdx affirm:tests

Allows user to easily run the relevant tests for their current branch.

```bash
USAGE
  $ sfdx affirm:tests [-l <string>] [-w <integer>] [-r] [-u <string>]

OPTIONS
  -l, --list=list                                                                   Comma separated list of tests names that will be used to create the test suite. If none are provided you will be asked to provide a list or exit.
  -r, --printresults                                                                If provided test results will be printed without being prompted.
  -u, --targetusername=targetusername                                               username or alias for the target org; overrides default target org
  -w, --waittime=waittime                                                           The number of minutes to wait for the command to complete. The default is 10.

EXAMPLES
  `$ sfdx affirm:tests
  (y/n) Are you sure you want to run tests against myOrg@example.com.sandbox?: y
  Selected Org: myOrg@example.com.sandbox
  (y/n) Could not find test suite for the current branch. Would you like to provide a list of test classes now?: y
  Please provide a comma separated list of tests names: MyTestClassName,OtherTestClassName
  Count of Test Classes: 2
  Test Classes: MyTestClassName,OtherTestClassName
  Running Tests... Done
  Outcome: Passed
  Tests Ran: 10
  Passing: 10
  Failing: 0
  Skipped: 0
  PassRate: 100%
  FailRate: 0%
  Test Total Time: 27317 ms
  (y/n) Would you like to print the results of each test?: n
  `,
  `$ sfdx affirm:tests -u myOrg@example.com.sandbox
  Selected Org: myOrg@example.com.sandbox
  Found Test Suite for Current Branch: testSuites/pjname_XXXX_name_of_branch.testSuite-meta.xml
  Count of Test Classes: 2
  Test Classes: MyTestClassName,OtherTestClassName
  Running Tests... Done
  Outcome: Passed
  Tests Ran: 16
  Passing: 16
  Failing: 0
  Skipped: 0
  PassRate: 100%
  FailRate: 0%
  Test Total Time: 72004 ms
  (y/n) Would you like to print the results of each test?: n
  `
```

## Development

You can run the commands from this projects directory without linking the plugin to sfdx. This is helpful for development but as this project doesn't have test files that simulate a sfdx project yet it's mostly useful for debugging small functionality before linking and trying out in a sfdx project. At some point a directory that simulates a sfdx project will need to be added to the test folder and tests will need to be created for each of the commands.

### Helpful Links

- [Create Your First Salesforce CLI Plugin](https://developer.salesforce.com/blogs/2018/05/create-your-first-salesforce-cli-plugin.html)
- [Plugin Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_plugins.meta/sfdx_cli_plugins/cli_plugins.htm)
- [salesforce/core](https://forcedotcom.github.io/sfdx-core/globals.html)
- [SimpleGit.js](https://github.com/steveukx/git-js#readme)

### Debugging your plugin

We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `affirm:changes` command:

1. Start the inspector

If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch:

```sh-session
$ sfdx affirm:changes --dev-suspend
```

Alternatively, to call your command using the `bin/run` (`bin\run` on windows) script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:

```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run affirm:changes
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program.
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
   <br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
   Congrats, you are debugging!
