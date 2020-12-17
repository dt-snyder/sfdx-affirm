# sfdx-affirm

Commands for creating a package from git diff and validating it against a specific org.

## Install for use in sfdx project

1. Ensure your computer is ready to install the plugin: [Install Salesforce CLI](https://developer.salesforce.com/tools/sfdxcli)
2. run `sfdx plugins:install sfdx-affirm`
3. agree to install unsigned package

# Commands

<!-- commands -->
* [`sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmchanges--b-string--n-string--d--i--c--s--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmparcel--b-string--i-string--o-string--d--t-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmquality--d-string--t-string--s--w-integer--r--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmsuite--t-string--n-string--o-string--a---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmtests--l-string--w-integer--r--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

returns a diff against the specified branch

```
USAGE
  $ sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -b, --branch=branch                                                               the branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against

  -c, --showchanged                                                                 If provided alone shows changes
                                                                                    only.

  -d, --showdestructive                                                             If provided alone shows destructive
                                                                                    changes only.

  -i, --showinsertion                                                               If provided alone shows insertion
                                                                                    changes only.

  -n, --inputdir=inputdir                                                           the root directory to compare other
                                                                                    than the sfdx-project.json default

  -o, --outfilename=outfilename                                                     if provided results will be save to
                                                                                    a file using the provided name as
                                                                                    json

  -s, --silent                                                                      runs without printing to console

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:changes

EXAMPLES
  $ sfdx affirm:changes
               Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
               Git Diff For: remotes/origin/master...pilot/affirm
               CHANGED: MyClass.cls,MySecondClass.cls
               INSERTION: MyTestClass.cls
               DESTRUCTIVE: MyOldClass.cls,MyOldTestClass.cls
        
  $ sfdx affirm:changes --showdestructive
               Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
               Git Diff For: remotes/origin/master...pilot/affirm
               DESTRUCTIVE: MyOldClass.cls
        
  $ sfdx affirm:changes --showinsertion
               Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
               Git Diff For: remotes/origin/master...pilot/affirm
               INSERTION: MyTestClass.cls
        
  $ sfdx affirm:changes --showchanged
               Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
               Git Diff For: remotes/origin/master...pilot/affirm
               CHANGED: MyClass.cls
```

_See code: [lib\commands\sfdx-affirm\changes.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.0.0/lib\commands\sfdx-affirm\changes.js)_

## `sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a parcel (package) using git diff

```
USAGE
  $ sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion 
  <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -b, --branch=branch                                                               The branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against

  -d, --includedestructive                                                          If provided and there are
                                                                                    destructive changes you will not be
                                                                                    asked if you want to include them

  -i, --inputdir=inputdir                                                           The root directory to compare other
                                                                                    than the force-app default

  -o, --outputdir=outputdir                                                         The output directory to store the
                                                                                    Metadata API–formatted metadata
                                                                                    files in. Default: './parcel'

  -t, --destructivetiming=before|after                                              Allows you to indicate if you want
                                                                                    to process the destructive changes
                                                                                    before or after the deployment.
                                                                                    options: before, after

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:parcel

EXAMPLES
  $ sfdx affirm:parcel
         Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
         Diff Against: remotes/origin/master...pilot/affirm... Success:
         Changes: 5, Insertions: 93, Destructive: 7
         Cloning Files... Success: 100 files ready for convert
         Converting... Success
         (y/n) There are 7 destructive changes. Create destructive changes xml file? y
         ? Select when the destructive changes should be deployed: before
         Creating Destructive Package... Success: Created at .releaseArtifacts/parcel/destructiveChangesPre.xml
         Cleaning Up... Success
    
  $ sfdx affirm:parcel -d -t before
         Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
         Diff Against: remotes/origin/master...pilot/affirm... Success:
         Changes: 5, Insertions: 93, Destructive: 7
         Cloning Files... Success: 100 files ready for convert
         Converting... Success
         Creating Destructive Package... Success: Created at .releaseArtifacts/parcel/destructiveChangesPre.xml
         Cleaning Up... Success
```

_See code: [lib\commands\sfdx-affirm\parcel.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.0.0/lib\commands\sfdx-affirm\parcel.js)_

## `sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Validates a package against the provided org

```
USAGE
  $ sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] 
  [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --packagedir=packagedir
      The root of the directory tree that contains the files to deploy. The root must contain a valid package.xml file 
      describing the entities in the directory structure. default: .releaseArtifacts/parcel. You will always be asked to 
      confirm the path provided before continuing.

  -r, --noresults
      If provided, you will not be asked if you would like to print the component details or test details after validation 
      completes.

  -s, --silent
      If provided, you will not be prompted at all for input. If correct input isn't provided command fails.

  -t, --testclasses=testclasses
      Comma separated list of tests to run. If none are provided you will be asked to confirm your choice to validate 
      without tests before continuing without tests.

  -u, --targetusername=targetusername
      username or alias for the target org; overrides default target org

  -w, --waittime=waittime
      The number of minutes to wait for the command to complete. The default is 10.

  --apiversion=apiversion
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

ALIASES
  $ sfdx affirm:quality

EXAMPLES
  $ sfdx affirm:quality
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
  
  $ sfdx affirm:quality -u myOrg@example.com.sandbox -t MyTestClass,OtherTestClass -r
         Selected Org: myOrg@example.com.sandbox
         (y/n) Are you sure you want to validate the package located in the ".releaseArtifacts/parcel" folder?: y
         Package Directory: ".releaseArtifacts/parcel"
         Validating Using Provided Classes: MyTestClass,OtherTestClass
         Validating Package... Succeeded
         Deployment Status Date_Time_Id: 2020-08-09_14-21-23_0Af05000000iub1CAA
         Total Components: 761
         Component Deployed: 761
         Component With Errors: 0
```

_See code: [lib\commands\sfdx-affirm\quality.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.0.0/lib\commands\sfdx-affirm\quality.js)_

## `sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a testSuite-meta.xml file with the provided list of tests.

```
USAGE
  $ sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --addtotests                                                                  Optional: Indicates that you would
                                                                                    like the provided tests to be added
                                                                                    to the existing test suite instead
                                                                                    of overwriting it.

  -n, --name=name                                                                   Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'

  -o, --outputdir=outputdir                                                         Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites

  -t, --tests=tests                                                                 Comma separated list of tests names
                                                                                    that will be used to create the test
                                                                                    suite. If none are provided you will
                                                                                    be asked to provide a list or exit.

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:suite

EXAMPLES
  $ sfdx affirm:suite
       Please provide a comma separated list of the test names to add to the suite: testClassNameOne,TestClassNameTwo
       Creating Test Suite... Success
       New Test Suite Written to: force-app/main/default/testSuites/pjname_XXXX_name_of_branch.testSuite-meta.xml
    
  $ sfdx affirm:suite --tests testClassNameOne,TestClassNameTwo
       Found existing suite at force-app/main/default/testSuites/pjname_XXXX_name_of_branch.testSuite-meta.xml
       ? Would you like to update the list of tests, overwrite it completely, or keep the current list and exit? Update
       Creating Test Suite... Success
       New Test Suite Written to: force-app/main/default/testSuites/pjname_XXXX_name_of_branch.testSuite-meta.xml
    
  $ sfdx affirm:suite --addtotests -t testClassNameOne,TestClassNameTwo
       Creating Test Suite... Success
       New Test Suite Written to: force-app/main/default/testSuites/myCustomTestSuite.testSuite-meta.xml
```

_See code: [lib\commands\sfdx-affirm\suite.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.0.0/lib\commands\sfdx-affirm\suite.js)_

## `sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows user to easily run the relevant tests for their current branch.

```
USAGE
  $ sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -l, --list=list                                                                   Comma separated list of tests names
                                                                                    that will be used to create the test
                                                                                    suite. If none are provided you will
                                                                                    be asked to provide a list or exit.

  -r, --printresults                                                                If provided test results will be
                                                                                    printed without being prompted.

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -w, --waittime=waittime                                                           The number of minutes to wait for
                                                                                    the command to complete. The default
                                                                                    is 10.

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:tests

EXAMPLES
  $ sfdx affirm:tests
         (y/n) Are you sure you want to run tests against myOrg@example.com.sandbox?: y
         Selected Org: myOrg@example.com.sandbox
         (y/n) Could not find test suite for the current branch. Would you like to provide a list of test classes now?: 
  y
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
    
  $ sfdx affirm:tests -u myOrg@example.com.sandbox
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
```

_See code: [lib\commands\sfdx-affirm\tests.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.0.0/lib\commands\sfdx-affirm\tests.js)_
<!-- commandsstop -->
* [`sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmchanges--b-string--n-string--d--i--c--s--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmparcel--b-string--i-string--o-string--d--t-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmquality--d-string--t-string--s--w-integer--r--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmsuite--t-string--n-string--o-string--a---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmtests--l-string--w-integer--r--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

returns a diff against the specified branch

```
USAGE
  $ sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -b, --branch=branch                                                               the branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against

  -c, --showchanged                                                                 If provided alone shows changes
                                                                                    only.

  -d, --showdestructive                                                             If provided alone shows destructive
                                                                                    changes only.

  -i, --showinsertion                                                               If provided alone shows insertion
                                                                                    changes only.

  -n, --inputdir=inputdir                                                           the root directory to compare other
                                                                                    than the sfdx-project.json default

  -o, --outfilename=outfilename                                                     if provided results will be save to
                                                                                    a file using the provided name as
                                                                                    json

  -s, --silent                                                                      runs without printing to console

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:changes

EXAMPLES
  $ sfdx affirm:changes
               Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
               Git Diff For: remotes/origin/master...pilot/affirm
               CHANGED: MyClass.cls,MySecondClass.cls
               INSERTION: MyTestClass.cls
               DESTRUCTIVE: MyOldClass.cls,MyOldTestClass.cls
        
  $ sfdx affirm:changes --showdestructive
               Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
               Git Diff For: remotes/origin/master...pilot/affirm
               DESTRUCTIVE: MyOldClass.cls
        
  $ sfdx affirm:changes --showinsertion
               Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
               Git Diff For: remotes/origin/master...pilot/affirm
               INSERTION: MyTestClass.cls
        
  $ sfdx affirm:changes --showchanged
               Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
               Git Diff For: remotes/origin/master...pilot/affirm
               CHANGED: MyClass.cls
```

_See code: [lib\commands\sfdx-affirm\changes.js](https://github.com/hunterdouglas/sfdx-affirm/blob/v1.9.3/lib\commands\sfdx-affirm\changes.js)_

## `sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a parcel (package) using git diff

```
USAGE
  $ sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion 
  <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -b, --branch=branch                                                               The branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against

  -d, --includedestructive                                                          If provided and there are
                                                                                    destructive changes you will not be
                                                                                    asked if you want to include them

  -i, --inputdir=inputdir                                                           The root directory to compare other
                                                                                    than the force-app default

  -o, --outputdir=outputdir                                                         The output directory to store the
                                                                                    Metadata API–formatted metadata
                                                                                    files in. Default: './parcel'

  -t, --destructivetiming=before|after                                              Allows you to indicate if you want
                                                                                    to process the destructive changes
                                                                                    before or after the deployment.
                                                                                    options: before, after

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:parcel

EXAMPLES
  $ sfdx affirm:parcel
         Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
         Diff Against: remotes/origin/master...pilot/affirm... Success:
         Changes: 5, Insertions: 93, Destructive: 7
         Cloning Files... Success: 100 files ready for convert
         Converting... Success
         (y/n) There are 7 destructive changes. Create destructive changes xml file? y
         ? Select when the destructive changes should be deployed: before
         Creating Destructive Package... Success: Created at .releaseArtifacts/parcel/destructiveChangesPre.xml
         Cleaning Up... Success
    
  $ sfdx affirm:parcel -d -t before
         Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
         Diff Against: remotes/origin/master...pilot/affirm... Success:
         Changes: 5, Insertions: 93, Destructive: 7
         Cloning Files... Success: 100 files ready for convert
         Converting... Success
         Creating Destructive Package... Success: Created at .releaseArtifacts/parcel/destructiveChangesPre.xml
         Cleaning Up... Success
```

_See code: [lib\commands\sfdx-affirm\parcel.js](https://github.com/hunterdouglas/sfdx-affirm/blob/v1.9.3/lib\commands\sfdx-affirm\parcel.js)_

## `sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Validates a package against the provided org

```
USAGE
  $ sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] 
  [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --packagedir=packagedir
      The root of the directory tree that contains the files to deploy. The root must contain a valid package.xml file 
      describing the entities in the directory structure. default: .releaseArtifacts/parcel. You will always be asked to 
      confirm the path provided before continuing.

  -r, --noresults
      If provided, you will not be asked if you would like to print the component details or test details after validation 
      completes.

  -s, --silent
      If provided, you will not be prompted at all for input. If correct input isn't provided command fails.

  -t, --testclasses=testclasses
      Comma separated list of tests to run. If none are provided you will be asked to confirm your choice to validate 
      without tests before continuing without tests.

  -u, --targetusername=targetusername
      username or alias for the target org; overrides default target org

  -w, --waittime=waittime
      The number of minutes to wait for the command to complete. The default is 10.

  --apiversion=apiversion
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

ALIASES
  $ sfdx affirm:quality

EXAMPLES
  $ sfdx affirm:quality
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
  
  $ sfdx affirm:quality -u myOrg@example.com.sandbox -t MyTestClass,OtherTestClass -r
         Selected Org: myOrg@example.com.sandbox
         (y/n) Are you sure you want to validate the package located in the ".releaseArtifacts/parcel" folder?: y
         Package Directory: ".releaseArtifacts/parcel"
         Validating Using Provided Classes: MyTestClass,OtherTestClass
         Validating Package... Succeeded
         Deployment Status Date_Time_Id: 2020-08-09_14-21-23_0Af05000000iub1CAA
         Total Components: 761
         Component Deployed: 761
         Component With Errors: 0
```

_See code: [lib\commands\sfdx-affirm\quality.js](https://github.com/hunterdouglas/sfdx-affirm/blob/v1.9.3/lib\commands\sfdx-affirm\quality.js)_

## `sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a testSuite-meta.xml file with the provided list of tests.

```
USAGE
  $ sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --addtotests                                                                  Optional: Indicates that you would
                                                                                    like the provided tests to be added
                                                                                    to the existing test suite instead
                                                                                    of overwriting it.

  -n, --name=name                                                                   Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'

  -o, --outputdir=outputdir                                                         Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites

  -t, --tests=tests                                                                 Comma separated list of tests names
                                                                                    that will be used to create the test
                                                                                    suite. If none are provided you will
                                                                                    be asked to provide a list or exit.

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:suite

EXAMPLES
  $ sfdx affirm:suite
       Please provide a comma separated list of the test names to add to the suite: testClassNameOne,TestClassNameTwo
       Creating Test Suite... Success
       New Test Suite Written to: force-app/main/default/testSuites/pjname_XXXX_name_of_branch.testSuite-meta.xml
    
  $ sfdx affirm:suite --tests testClassNameOne,TestClassNameTwo
       Found existing suite at force-app/main/default/testSuites/pjname_XXXX_name_of_branch.testSuite-meta.xml
       ? Would you like to update the list of tests, overwrite it completely, or keep the current list and exit? Update
       Creating Test Suite... Success
       New Test Suite Written to: force-app/main/default/testSuites/pjname_XXXX_name_of_branch.testSuite-meta.xml
    
  $ sfdx affirm:suite --addtotests -t testClassNameOne,TestClassNameTwo
       Creating Test Suite... Success
       New Test Suite Written to: force-app/main/default/testSuites/myCustomTestSuite.testSuite-meta.xml
```

_See code: [lib\commands\sfdx-affirm\suite.js](https://github.com/hunterdouglas/sfdx-affirm/blob/v1.9.3/lib\commands\sfdx-affirm\suite.js)_

## `sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows user to easily run the relevant tests for their current branch.

```
USAGE
  $ sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -l, --list=list                                                                   Comma separated list of tests names
                                                                                    that will be used to create the test
                                                                                    suite. If none are provided you will
                                                                                    be asked to provide a list or exit.

  -r, --printresults                                                                If provided test results will be
                                                                                    printed without being prompted.

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -w, --waittime=waittime                                                           The number of minutes to wait for
                                                                                    the command to complete. The default
                                                                                    is 10.

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:tests

EXAMPLES
  $ sfdx affirm:tests
         (y/n) Are you sure you want to run tests against myOrg@example.com.sandbox?: y
         Selected Org: myOrg@example.com.sandbox
         (y/n) Could not find test suite for the current branch. Would you like to provide a list of test classes now?: 
  y
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
    
  $ sfdx affirm:tests -u myOrg@example.com.sandbox
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
```

_See code: [lib\commands\sfdx-affirm\tests.js](https://github.com/hunterdouglas/sfdx-affirm/blob/v1.9.3/lib\commands\sfdx-affirm\tests.js)_
<!-- commandsstop -->
* [`sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmchanges--b-string--n-string--d--i--c--s--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmparcel--b-string--i-string--o-string--d--t-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmquality--d-string--t-string--s--w-integer--r--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmsuite--t-string--n-string--o-string--a---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmtests--l-string--w-integer--r--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

returns a diff against the specified branch

```
USAGE
  $ sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -b, --branch=branch                                                               the branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against

  -c, --showchanged                                                                 If provided alone shows changes
                                                                                    only.

  -d, --showdestructive                                                             If provided alone shows destructive
                                                                                    changes only.

  -i, --showinsertion                                                               If provided alone shows insertion
                                                                                    changes only.

  -n, --inputdir=inputdir                                                           the root directory to compare other
                                                                                    than the sfdx-project.json default

  -o, --outfilename=outfilename                                                     if provided results will be save to
                                                                                    a file using the provided name as
                                                                                    json

  -s, --silent                                                                      runs without printing to console

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:changes

EXAMPLES
  $ sfdx affirm:changes
               Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
               Git Diff For: remotes/origin/master...pilot/affirm
               CHANGED: MyClass.cls,MySecondClass.cls
               INSERTION: MyTestClass.cls
               DESTRUCTIVE: MyOldClass.cls,MyOldTestClass.cls
        
  $ sfdx affirm:changes --showdestructive
               Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
               Git Diff For: remotes/origin/master...pilot/affirm
               DESTRUCTIVE: MyOldClass.cls
        
  $ sfdx affirm:changes --showinsertion
               Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
               Git Diff For: remotes/origin/master...pilot/affirm
               INSERTION: MyTestClass.cls
        
  $ sfdx affirm:changes --showchanged
               Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
               Git Diff For: remotes/origin/master...pilot/affirm
               CHANGED: MyClass.cls
```

_See code: [lib\commands\sfdx-affirm\changes.js](https://github.com/hunterdouglas/sfdx-affirm/blob/v1.9.0/lib\commands\sfdx-affirm\changes.js)_

## `sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a parcel (package) using git diff

```
USAGE
  $ sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion 
  <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -b, --branch=branch                                                               The branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against

  -d, --includedestructive                                                          If provided and there are
                                                                                    destructive changes you will not be
                                                                                    asked if you want to include them

  -i, --inputdir=inputdir                                                           The root directory to compare other
                                                                                    than the force-app default

  -o, --outputdir=outputdir                                                         The output directory to store the
                                                                                    Metadata API–formatted metadata
                                                                                    files in. Default: './parcel'

  -t, --destructivetiming=before|after                                              Allows you to indicate if you want
                                                                                    to process the destructive changes
                                                                                    before or after the deployment.
                                                                                    options: before, after

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:parcel

EXAMPLES
  $ sfdx affirm:parcel
         Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
         Diff Against: remotes/origin/master...pilot/affirm... Success:
         Changes: 5, Insertions: 93, Destructive: 7
         Cloning Files... Success: 100 files ready for convert
         Converting... Success
         (y/n) There are 7 destructive changes. Create destructive changes xml file? y
         ? Select when the destructive changes should be deployed: before
         Creating Destructive Package... Success: Created at .releaseArtifacts/parcel/destructiveChangesPre.xml
         Cleaning Up... Success
    
  $ sfdx affirm:parcel -d -t before
         Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
         Diff Against: remotes/origin/master...pilot/affirm... Success:
         Changes: 5, Insertions: 93, Destructive: 7
         Cloning Files... Success: 100 files ready for convert
         Converting... Success
         Creating Destructive Package... Success: Created at .releaseArtifacts/parcel/destructiveChangesPre.xml
         Cleaning Up... Success
```

_See code: [lib\commands\sfdx-affirm\parcel.js](https://github.com/hunterdouglas/sfdx-affirm/blob/v1.9.0/lib\commands\sfdx-affirm\parcel.js)_

## `sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Validates a package against the provided org

```
USAGE
  $ sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] 
  [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --packagedir=packagedir
      The root of the directory tree that contains the files to deploy. The root must contain a valid package.xml file 
      describing the entities in the directory structure. default: .releaseArtifacts/parcel. You will always be asked to 
      confirm the path provided before continuing.

  -r, --noresults
      If provided, you will not be asked if you would like to print the component details or test details after validation 
      completes.

  -s, --silent
      If provided, you will not be prompted at all for input. If correct input isn't provided command fails.

  -t, --testclasses=testclasses
      Comma separated list of tests to run. If none are provided you will be asked to confirm your choice to validate 
      without tests before continuing without tests.

  -u, --targetusername=targetusername
      username or alias for the target org; overrides default target org

  -w, --waittime=waittime
      The number of minutes to wait for the command to complete. The default is 10.

  --apiversion=apiversion
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

ALIASES
  $ sfdx affirm:quality

EXAMPLES
  $ sfdx affirm:quality
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
  
  $ sfdx affirm:quality -u myOrg@example.com.sandbox -t MyTestClass,OtherTestClass -r
         Selected Org: myOrg@example.com.sandbox
         (y/n) Are you sure you want to validate the package located in the ".releaseArtifacts/parcel" folder?: y
         Package Directory: ".releaseArtifacts/parcel"
         Validating Using Provided Classes: MyTestClass,OtherTestClass
         Validating Package... Succeeded
         Deployment Status Date_Time_Id: 2020-08-09_14-21-23_0Af05000000iub1CAA
         Total Components: 761
         Component Deployed: 761
         Component With Errors: 0
```

_See code: [lib\commands\sfdx-affirm\quality.js](https://github.com/hunterdouglas/sfdx-affirm/blob/v1.9.0/lib\commands\sfdx-affirm\quality.js)_

## `sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a testSuite-meta.xml file with the provided list of tests.

```
USAGE
  $ sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --addtotests                                                                  Optional: Indicates that you would
                                                                                    like the provided tests to be added
                                                                                    to the existing test suite instead
                                                                                    of overwriting it.

  -n, --name=name                                                                   Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'

  -o, --outputdir=outputdir                                                         Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites

  -t, --tests=tests                                                                 Comma separated list of tests names
                                                                                    that will be used to create the test
                                                                                    suite. If none are provided you will
                                                                                    be asked to provide a list or exit.

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:suite

EXAMPLES
  $ sfdx affirm:suite
       Please provide a comma separated list of the test names to add to the suite: testClassNameOne,TestClassNameTwo
       Creating Test Suite... Success
       New Test Suite Written to: force-app/main/default/testSuites/pjname_XXXX_name_of_branch.testSuite-meta.xml
    
  $ sfdx affirm:suite --tests testClassNameOne,TestClassNameTwo
       Found existing suite at force-app/main/default/testSuites/pjname_XXXX_name_of_branch.testSuite-meta.xml
       ? Would you like to update the list of tests, overwrite it completely, or keep the current list and exit? Update
       Creating Test Suite... Success
       New Test Suite Written to: force-app/main/default/testSuites/pjname_XXXX_name_of_branch.testSuite-meta.xml
    
  $ sfdx affirm:suite --addtotests -t testClassNameOne,TestClassNameTwo
       Creating Test Suite... Success
       New Test Suite Written to: force-app/main/default/testSuites/myCustomTestSuite.testSuite-meta.xml
```

_See code: [lib\commands\sfdx-affirm\suite.js](https://github.com/hunterdouglas/sfdx-affirm/blob/v1.9.0/lib\commands\sfdx-affirm\suite.js)_

## `sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows user to easily run the relevant tests for their current branch.

```
USAGE
  $ sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -l, --list=list                                                                   Comma separated list of tests names
                                                                                    that will be used to create the test
                                                                                    suite. If none are provided you will
                                                                                    be asked to provide a list or exit.

  -r, --printresults                                                                If provided test results will be
                                                                                    printed without being prompted.

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -w, --waittime=waittime                                                           The number of minutes to wait for
                                                                                    the command to complete. The default
                                                                                    is 10.

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:tests

EXAMPLES
  $ sfdx affirm:tests
         (y/n) Are you sure you want to run tests against myOrg@example.com.sandbox?: y
         Selected Org: myOrg@example.com.sandbox
         (y/n) Could not find test suite for the current branch. Would you like to provide a list of test classes now?: 
  y
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
    
  $ sfdx affirm:tests -u myOrg@example.com.sandbox
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
```

_See code: [lib\commands\sfdx-affirm\tests.js](https://github.com/hunterdouglas/sfdx-affirm/blob/v1.9.0/lib\commands\sfdx-affirm\tests.js)_
<!-- commandsstop -->
* [`sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmchanges--b-string--n-string--d--i--c--s--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmparcel--b-string--i-string--o-string--d--t-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmquality--d-string--t-string--s--w-integer--r--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmsuite--t-string--n-string--o-string--a---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmtests--l-string--w-integer--r--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

returns a diff against the specified branch

```
USAGE
  $ sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -b, --branch=branch                                                               the branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against

  -c, --showchanged                                                                 If provided alone shows changes
                                                                                    only.

  -d, --showdestructive                                                             If provided alone shows destructive
                                                                                    changes only.

  -i, --showinsertion                                                               If provided alone shows insertion
                                                                                    changes only.

  -n, --inputdir=inputdir                                                           the root directory to compare other
                                                                                    than the sfdx-project.json default

  -o, --outfilename=outfilename                                                     if provided results will be save to
                                                                                    a file using the provided name as
                                                                                    json

  -s, --silent                                                                      runs without printing to console

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:changes

EXAMPLES
  $ sfdx affirm:changes
               Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
               Git Diff For: remotes/origin/master...pilot/affirm
               CHANGED: MyClass.cls,MySecondClass.cls
               INSERTION: MyTestClass.cls
               DESTRUCTIVE: MyOldClass.cls,MyOldTestClass.cls
        
  $ sfdx affirm:changes --showdestructive
               Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
               Git Diff For: remotes/origin/master...pilot/affirm
               DESTRUCTIVE: MyOldClass.cls
        
  $ sfdx affirm:changes --showinsertion
               Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
               Git Diff For: remotes/origin/master...pilot/affirm
               INSERTION: MyTestClass.cls
        
  $ sfdx affirm:changes --showchanged
               Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
               Git Diff For: remotes/origin/master...pilot/affirm
               CHANGED: MyClass.cls
```

_See code: [lib\commands\sfdx-affirm\changes.js](https://github.com/hunterdouglas/sfdx-affirm/blob/v1.8.2/lib\commands\sfdx-affirm\changes.js)_

## `sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a parcel (package) using git diff

```
USAGE
  $ sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion 
  <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -b, --branch=branch                                                               The branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against

  -d, --includedestructive                                                          If provided and there are
                                                                                    destructive changes you will not be
                                                                                    asked if you want to include them

  -i, --inputdir=inputdir                                                           The root directory to compare other
                                                                                    than the force-app default

  -o, --outputdir=outputdir                                                         The output directory to store the
                                                                                    Metadata API–formatted metadata
                                                                                    files in. Default: './parcel'

  -t, --destructivetiming=before|after                                              Allows you to indicate if you want
                                                                                    to process the destructive changes
                                                                                    before or after the deployment.
                                                                                    options: before, after

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:parcel

EXAMPLES
  $ sfdx affirm:parcel
         Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
         Diff Against: remotes/origin/master...pilot/affirm... Success:
         Changes: 5, Insertions: 93, Destructive: 7
         Cloning Files... Success: 100 files ready for convert
         Converting... Success
         (y/n) There are 7 destructive changes. Create destructive changes xml file? y
         ? Select when the destructive changes should be deployed: before
         Creating Destructive Package... Success: Created at .releaseArtifacts/parcel/destructiveChangesPre.xml
         Cleaning Up... Success
    
  $ sfdx affirm:parcel -d -t before
         Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
         Diff Against: remotes/origin/master...pilot/affirm... Success:
         Changes: 5, Insertions: 93, Destructive: 7
         Cloning Files... Success: 100 files ready for convert
         Converting... Success
         Creating Destructive Package... Success: Created at .releaseArtifacts/parcel/destructiveChangesPre.xml
         Cleaning Up... Success
```

_See code: [lib\commands\sfdx-affirm\parcel.js](https://github.com/hunterdouglas/sfdx-affirm/blob/v1.8.2/lib\commands\sfdx-affirm\parcel.js)_

## `sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Validates a package against the provided org

```
USAGE
  $ sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] 
  [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --packagedir=packagedir
      The root of the directory tree that contains the files to deploy. The root must contain a valid package.xml file 
      describing the entities in the directory structure. default: .releaseArtifacts/parcel. You will always be asked to 
      confirm the path provided before continuing.

  -r, --noresults
      If provided, you will not be asked if you would like to print the component details or test details after validation 
      completes.

  -s, --silent
      If provided, you will not be prompted at all for input. If correct input isn't provided command fails.

  -t, --testclasses=testclasses
      Comma separated list of tests to run. If none are provided you will be asked to confirm your choice to validate 
      without tests before continuing without tests.

  -u, --targetusername=targetusername
      username or alias for the target org; overrides default target org

  -w, --waittime=waittime
      The number of minutes to wait for the command to complete. The default is 10.

  --apiversion=apiversion
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

ALIASES
  $ sfdx affirm:quality

EXAMPLES
  $ sfdx affirm:quality
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
  
  $ sfdx affirm:quality -u myOrg@example.com.sandbox -t MyTestClass,OtherTestClass -r
         Selected Org: myOrg@example.com.sandbox
         (y/n) Are you sure you want to validate the package located in the ".releaseArtifacts/parcel" folder?: y
         Package Directory: ".releaseArtifacts/parcel"
         Validating Using Provided Classes: MyTestClass,OtherTestClass
         Validating Package... Succeeded
         Deployment Status Date_Time_Id: 2020-08-09_14-21-23_0Af05000000iub1CAA
         Total Components: 761
         Component Deployed: 761
         Component With Errors: 0
```

_See code: [lib\commands\sfdx-affirm\quality.js](https://github.com/hunterdouglas/sfdx-affirm/blob/v1.8.2/lib\commands\sfdx-affirm\quality.js)_

## `sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a testSuite-meta.xml file with the provided list of tests.

```
USAGE
  $ sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --addtotests                                                                  Optional: Indicates that you would
                                                                                    like the provided tests to be added
                                                                                    to the existing test suite instead
                                                                                    of overwriting it.

  -n, --name=name                                                                   Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'

  -o, --outputdir=outputdir                                                         Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites

  -t, --tests=tests                                                                 Comma separated list of tests names
                                                                                    that will be used to create the test
                                                                                    suite. If none are provided you will
                                                                                    be asked to provide a list or exit.

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:suite

EXAMPLES
  $ sfdx affirm:suite
       Please provide a comma separated list of the test names to add to the suite: testClassNameOne,TestClassNameTwo
       Creating Test Suite... Success
       New Test Suite Written to: force-app/main/default/testSuites/pjname_XXXX_name_of_branch.testSuite-meta.xml
    
  $ sfdx affirm:suite --tests testClassNameOne,TestClassNameTwo
       Found existing suite at force-app/main/default/testSuites/pjname_XXXX_name_of_branch.testSuite-meta.xml
       ? Would you like to update the list of tests, overwrite it completely, or keep the current list and exit? Update
       Creating Test Suite... Success
       New Test Suite Written to: force-app/main/default/testSuites/pjname_XXXX_name_of_branch.testSuite-meta.xml
    
  $ sfdx affirm:suite --addtotests -t testClassNameOne,TestClassNameTwo
       Creating Test Suite... Success
       New Test Suite Written to: force-app/main/default/testSuites/myCustomTestSuite.testSuite-meta.xml
```

_See code: [lib\commands\sfdx-affirm\suite.js](https://github.com/hunterdouglas/sfdx-affirm/blob/v1.8.2/lib\commands\sfdx-affirm\suite.js)_

## `sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows user to easily run the relevant tests for their current branch.

```
USAGE
  $ sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -l, --list=list                                                                   Comma separated list of tests names
                                                                                    that will be used to create the test
                                                                                    suite. If none are provided you will
                                                                                    be asked to provide a list or exit.

  -r, --printresults                                                                If provided test results will be
                                                                                    printed without being prompted.

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -w, --waittime=waittime                                                           The number of minutes to wait for
                                                                                    the command to complete. The default
                                                                                    is 10.

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:tests

EXAMPLES
  $ sfdx affirm:tests
         (y/n) Are you sure you want to run tests against myOrg@example.com.sandbox?: y
         Selected Org: myOrg@example.com.sandbox
         (y/n) Could not find test suite for the current branch. Would you like to provide a list of test classes now?: 
  y
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
    
  $ sfdx affirm:tests -u myOrg@example.com.sandbox
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
```

_See code: [lib\commands\sfdx-affirm\tests.js](https://github.com/hunterdouglas/sfdx-affirm/blob/v1.8.2/lib\commands\sfdx-affirm\tests.js)_
<!-- commandsstop -->
* [`sfdx affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmchanges--b-string--n-string--d--i--c--s--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmparcel--b-string--i-string--o-string--d--t-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:quality [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmquality--d-string--t-string--s--w-integer--r--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmsuite--t-string--n-string--o-string--a---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:tests [-l <string>] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmtests--l-string--w-integer--r--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

returns a diff against the specified branch

```
returns a diff against the specified branch

USAGE
  $ sfdx affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -b, --branch=branch                                                               the branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against

  -c, --showchanged                                                                 If provided alone shows changes
                                                                                    only.

  -d, --showdestructive                                                             If provided alone shows destructive
                                                                                    changes only.

  -i, --showinsertion                                                               If provided alone shows insertion
                                                                                    changes only.

  -n, --inputdir=inputdir                                                           the root directory to compare other
                                                                                    than the sfdx-project.json default

  -o, --outfilename=outfilename                                                     if provided results will be save to
                                                                                    a file using the provided name as
                                                                                    json

  -s, --silent                                                                      runs without printing to console

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  $ sfdx affirm:changes
               Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
               Git Diff For: remotes/origin/master...pilot/affirm
               CHANGED: MyClass.cls,MySecondClass.cls
               INSERTION: MyTestClass.cls
               DESTRUCTIVE: MyOldClass.cls,MyOldTestClass.cls
        
  $ sfdx affirm:changes --showdestructive
               Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
               Git Diff For: remotes/origin/master...pilot/affirm
               DESTRUCTIVE: MyOldClass.cls
        
  $ sfdx affirm:changes --showinsertion
               Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
               Git Diff For: remotes/origin/master...pilot/affirm
               INSERTION: MyTestClass.cls
        
  $ sfdx affirm:changes --showchanged
               Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
               Git Diff For: remotes/origin/master...pilot/affirm
               CHANGED: MyClass.cls
```

## `sfdx affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a parcel (package) using git diff

```
Creates a parcel (package) using git diff

USAGE
  $ sfdx affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion 
  <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -b, --branch=branch                                                               The branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against

  -d, --includedestructive                                                          If provided and there are
                                                                                    destructive changes you will not be
                                                                                    asked if you want to include them

  -i, --inputdir=inputdir                                                           The root directory to compare other
                                                                                    than the force-app default

  -o, --outputdir=outputdir                                                         The output directory to store the
                                                                                    Metadata API–formatted metadata
                                                                                    files in. Default: './parcel'

  -t, --destructivetiming=before|after                                              Allows you to indicate if you want
                                                                                    to process the destructive changes
                                                                                    before or after the deployment.
                                                                                    options: before, after

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  $ sfdx affirm:parcel
         Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
         Diff Against: remotes/origin/master...pilot/affirm... Success:
         Changes: 5, Insertions: 93, Destructive: 7
         Cloning Files... Success: 100 files ready for convert
         Converting... Success
         (y/n) There are 7 destructive changes. Create destructive changes xml file? y
         ? Select when the destructive changes should be deployed: before
         Creating Destructive Package... Success: Created at .releaseArtifacts/parcel/destructiveChangesPre.xml
         Cleaning Up... Success
    
  $ sfdx affirm:parcel -d -t before
         Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
         Diff Against: remotes/origin/master...pilot/affirm... Success:
         Changes: 5, Insertions: 93, Destructive: 7
         Cloning Files... Success: 100 files ready for convert
         Converting... Success
         Creating Destructive Package... Success: Created at .releaseArtifacts/parcel/destructiveChangesPre.xml
         Cleaning Up... Success
```

## `sfdx affirm:quality [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Validates a package against the provided org

```
Validates a package against the provided org

USAGE
  $ sfdx affirm:quality [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] 
  [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --packagedir=packagedir
      The root of the directory tree that contains the files to deploy. The root must contain a valid package.xml file 
      describing the entities in the directory structure. default: .releaseArtifacts/parcel. You will always be asked to 
      confirm the path provided before continuing.

  -r, --noresults
      If provided, you will not be asked if you would like to print the component details or test details after validation 
      completes.

  -s, --silent
      If provided, you will not be prompted at all for input. If correct input isn't provided command fails.

  -t, --testclasses=testclasses
      Comma separated list of tests to run. If none are provided you will be asked to confirm your choice to validate 
      without tests before continuing without tests.

  -u, --targetusername=targetusername
      username or alias for the target org; overrides default target org

  -w, --waittime=waittime
      The number of minutes to wait for the command to complete. The default is 10.

  --apiversion=apiversion
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

EXAMPLES
  $ sfdx affirm:quality
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
  
  $ sfdx affirm:quality -u myOrg@example.com.sandbox -t MyTestClass,OtherTestClass -r
         Selected Org: myOrg@example.com.sandbox
         (y/n) Are you sure you want to validate the package located in the ".releaseArtifacts/parcel" folder?: y
         Package Directory: ".releaseArtifacts/parcel"
         Validating Using Provided Classes: MyTestClass,OtherTestClass
         Validating Package... Succeeded
         Deployment Status Date_Time_Id: 2020-08-09_14-21-23_0Af05000000iub1CAA
         Total Components: 761
         Component Deployed: 761
         Component With Errors: 0
```

## `sfdx affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a testSuite-meta.xml file with the provided list of tests.

```
Creates a testSuite-meta.xml file with the provided list of tests.

USAGE
  $ sfdx affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --addtotests                                                                  Optional: Indicates that you would
                                                                                    like the provided tests to be added
                                                                                    to the existing test suite instead
                                                                                    of overwriting it.

  -n, --name=name                                                                   Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'

  -o, --outputdir=outputdir                                                         Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites

  -t, --tests=tests                                                                 Comma separated list of tests names
                                                                                    that will be used to create the test
                                                                                    suite. If none are provided you will
                                                                                    be asked to provide a list or exit.

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  $ sfdx affirm:suite
       Please provide a comma separated list of the test names to add to the suite: testClassNameOne,TestClassNameTwo
       Creating Test Suite... Success
       New Test Suite Written to: force-app/main/default/testSuites/pjname_XXXX_name_of_branch.testSuite-meta.xml
    
  $ sfdx affirm:suite --tests testClassNameOne,TestClassNameTwo
       Found existing suite at force-app/main/default/testSuites/pjname_XXXX_name_of_branch.testSuite-meta.xml
       ? Would you like to update the list of tests, overwrite it completely, or keep the current list and exit? Update
       Creating Test Suite... Success
       New Test Suite Written to: force-app/main/default/testSuites/pjname_XXXX_name_of_branch.testSuite-meta.xml
    
  $ sfdx affirm:suite --addtotests -t testClassNameOne,TestClassNameTwo
       Creating Test Suite... Success
       New Test Suite Written to: force-app/main/default/testSuites/myCustomTestSuite.testSuite-meta.xml
```

## `sfdx affirm:tests [-l <string>] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows user to easily run the relevant tests for their current branch.

```
Allows user to easily run the relevant tests for their current branch.

USAGE
  $ sfdx affirm:tests [-l <string>] [-w <integer>] [-r] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -l, --list=list                                                                   Comma separated list of tests names
                                                                                    that will be used to create the test
                                                                                    suite. If none are provided you will
                                                                                    be asked to provide a list or exit.

  -r, --printresults                                                                If provided test results will be
                                                                                    printed without being prompted.

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -w, --waittime=waittime                                                           The number of minutes to wait for
                                                                                    the command to complete. The default
                                                                                    is 10.

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  $ sfdx affirm:tests
         (y/n) Are you sure you want to run tests against myOrg@example.com.sandbox?: y
         Selected Org: myOrg@example.com.sandbox
         (y/n) Could not find test suite for the current branch. Would you like to provide a list of test classes now?: 
  y
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
    
  $ sfdx affirm:tests -u myOrg@example.com.sandbox
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
```
<!-- commandsstop -->

## Helpful Links

- [Create Your First Salesforce CLI Plugin](https://developer.salesforce.com/blogs/2018/05/create-your-first-salesforce-cli-plugin.html)
- [Plugin Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_plugins.meta/sfdx_cli_plugins/cli_plugins.htm)
- [salesforce/core](https://forcedotcom.github.io/sfdx-core/globals.html)
- [SimpleGit.js](https://github.com/steveukx/git-js#readme)
