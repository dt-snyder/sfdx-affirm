# sfdx-affirm
================

Commands for creating a package from git diff and validating it against a specific org.

<!-- [![Version](https://img.shields.io/npm/v/sfdx-affirm.svg)](https://npmjs.org/package/sfdx-affirm)
[![CircleCI](https://circleci.com/gh/DeeTrueSnyder/sfdx-affirm/tree/master.svg?style=shield)](https://circleci.com/gh/DeeTrueSnyder/sfdx-affirm/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/DeeTrueSnyder/sfdx-affirm?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/sfdx-affirm/branch/master)
[![Codecov](https://codecov.io/gh/DeeTrueSnyder/sfdx-affirm/branch/master/graph/badge.svg)](https://codecov.io/gh/DeeTrueSnyder/sfdx-affirm)
[![Greenkeeper](https://badges.greenkeeper.io/DeeTrueSnyder/sfdx-affirm.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/DeeTrueSnyder/sfdx-affirm/badge.svg)](https://snyk.io/test/github/DeeTrueSnyder/sfdx-affirm)
[![Downloads/week](https://img.shields.io/npm/dw/sfdx-affirm.svg)](https://npmjs.org/package/sfdx-affirm)
[![License](https://img.shields.io/npm/l/sfdx-affirm.svg)](https://github.com/DeeTrueSnyder/sfdx-affirm/blob/master/package.json) -->

<!-- toc -->
<!-- * [Debugging your plugin](#debugging-your-plugin) -->
<!-- tocstop -->
<!-- install -->
## Install for use in sfdx project
1. clone repo to your local and cd into repo directory
2. run `yarn`
3. run `sfdx plugins:link`
4. navigate to salesforce project and run `sfdx affirm --help`
<!-- usage -->
<!-- ```sh-session
$ npm install -g sfdx-affirm
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
sfdx-affirm/0.0.0 win32-x64 node-v12.14.1
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
``` -->
<!-- usagestop -->
<!-- commands -->
<!-- * [`sfdx hello:org [-n <string>] [-f] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-helloorg--n-string--f--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal) -->

## `sfdx affirm:changes`

print the git diff between your last commit and a specific remote branch (default remote branch: remotes/origin/master)

```
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
      CHANGED: MyClass.cls,MySecondClass.cls
      INSERTION: MyTestClass.cls
      DESTRUCTIVE: MyOldClass.cls,MyOldTestClass.cls
  `,
  `$ sfdx affirm:changes --showdestructive
      DESTRUCTIVE: MyOldClass.cls
  `,
  `$ sfdx affirm:changes --showinsertion
      INSERTION: MyTestClass.cls
  `,
  `$ sfdx affirm:changes --showchanged
      CHANGED: MyClass.cls
  `
```
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Development
You can run the commands from this projects directory without linking the plugin to sfdx. This is helpful for development but as this project doesn't have test files that simulate a sfdx project yet it's mostly useful for debugging small functionality before linking and trying out in a sfdx project. At some point a directory that simulates a sfdx project will need to be added to the test folder and tests will need to be created for each of the commands.

## Helpful Links
- [Create Your First Salesforce CLI Plugin](https://developer.salesforce.com/blogs/2018/05/create-your-first-salesforce-cli-plugin.html)
- [Plugin Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_plugins.meta/sfdx_cli_plugins/cli_plugins.htm)
- [salesforce/core](https://forcedotcom.github.io/sfdx-core/globals.html)
- [SimpleGit.js](https://github.com/steveukx/git-js#readme)

## Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
