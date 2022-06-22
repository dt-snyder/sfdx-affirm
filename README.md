# sfdx-affirm

Commands for creating a package from git diff and validating it against a specific org.

## Install for use in sfdx project

1. Ensure your computer is ready to install the plugin: [Install Salesforce CLI](https://developer.salesforce.com/tools/sfdxcli)
2. run `sfdx plugins:install sfdx-affirm`
3. agree to install unsigned package

# Commands

<!-- commands -->
* [`sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmchanges--b-string--n-string--d--i--c--s--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:faker [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmfaker--b-string--n-string--d--i--c--s--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmjwt--p-string--i-string--s-string--a-string--e-number---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmparcel--b-string--i-string--o-string--d--t-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmplace--d-string--t-string--s--w-integer--r--o--e--p--n--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:place:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmplaceaudit--a-string--s-string--i-string--c-string--p-string--t-string--n-number--w-string--d-string--o--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:place:email [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmplaceemail--o--d--c--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:place:form [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmplaceform--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:place:status [-i <string>] [-u] [-d] [-c] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmplacestatus--i-string--u--d--c--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-e] [-p] [-o] [-n] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmquality--d-string--t-string--s--w-integer--r--e--p--o--n--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <string>] [-t <string>] [-a] [-o] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmsetup--b-string--d-string--p-string--w-string--t-string--a--o---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:spot:ac -n <string> [-r] [-c] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmspotac--n-string--r--c--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmsuite--t-string--n-string--o-string--a---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmsuitemerge--n-string--o-string--n-string--b-string--l---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmtests--l-string--w-integer--r--a--e--s--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

returns a diff against the specified branch

```
returns a diff against the specified branch

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

_See code: [lib/commands/sfdx-affirm/changes.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib/commands/sfdx-affirm/changes.js)_

## `sfdx sfdx-affirm:faker [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

returns a diff against the specified branch

```
returns a diff against the specified branch

USAGE
  $ sfdx sfdx-affirm:faker [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel 
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
  $ sfdx affirm:faker

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

_See code: [lib/commands/sfdx-affirm/faker.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib/commands/sfdx-affirm/faker.js)_

## `sfdx sfdx-affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a JWT token that can be used to auth against a connected app.

```
Creates a JWT token that can be used to auth against a connected app.

USAGE
  $ sfdx sfdx-affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --aud=aud
      (required) The audience identifies the authorization server as an intended audience. The authorization server must 
      verify that it’s an intended audience for the token. Use the authorization server’s URL for the audience value: 
      https://login.salesforce.com, https://test.salesforce.com, or https://site.force.com/customers if implementing for 
      an Experience Cloud site.

  -e, --exp=exp
      Optional: (Default: 3) The validity must be the expiration time of the assertion within 3 minutes.

  -i, --iss=iss
      (required) The issuer must contain the OAuth client_id or the connected app for which you registered the 
      certificate.

  -p, --privatekey=privatekey
      (required) the location of the private key

  -s, --sub=sub
      (required) The subject must contain the username of the user if implementing for an Experience Cloud site.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

ALIASES
  $ sfdx affirm:jwt

EXAMPLES
  $ sfdx affirm:jwt -p server.key -i 
  3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com -a 
  https://login.salesforce.com
         Token Created:
         eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
    
  $ sfdx affirm:jwt -p server.key -i 
  3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com.test -a 
  https://test.salesforce.com -e 1
         Token Created:
         eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
```

_See code: [lib/commands/sfdx-affirm/jwt.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib/commands/sfdx-affirm/jwt.js)_

## `sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a parcel (package) using git diff

```
Creates a parcel (package) using git diff

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

_See code: [lib/commands/sfdx-affirm/parcel.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib/commands/sfdx-affirm/parcel.js)_

## `sfdx sfdx-affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Deploys a Package to the specific place

```
Deploys a Package to the specific place

USAGE
  $ sfdx sfdx-affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>] 
  [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --packagedir=packagedir
      The root of the directory tree that contains the files to deploy. The root must contain a valid package.xml file 
      describing the entities in the directory structure. default: .releaseArtifacts/parcel. You will always be asked to 
      confirm the path provided before continuing.

  -e, --saveresults
      (Optional) if provided the result json will be saved to the default build directory. Can not be used with --printall 
      or --noresults.

  -n, --notestsrun
      (Optional) if provided and the target org is a sandbox no tests will run. Does not work if target org is production 
      or the --testclasses flag is provided.

  -o, --openstatus
      If provided, the deployment status page will be opened in the default or specified org.

  -p, --printall
      (Optional) if provided the results will be printed to the console. Can not be used with --saveresults or 
      --noresults.

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
  $ sfdx affirm:place

EXAMPLE
  $ sfdx affirm:place
```

_See code: [lib/commands/sfdx-affirm/place.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib/commands/sfdx-affirm/place.js)_

## `sfdx sfdx-affirm:place:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Queries and downloads audit logs from the target org

```
Queries and downloads audit logs from the target org

USAGE
  $ sfdx sfdx-affirm:place:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n 
  <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --action=action
      Optional: Adds `Action LIKE '%PROVIDED_VALUE%'` to the queries WHERE statement. Can not be used with the 'where' 
      flag.

  -c, --createdbyuser=createdbyuser
      Optional: Adds `CreatedBy.Username = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the 
      'where' flag.

  -d, --savedir=savedir
      Optional: Provide if you would like to save the file to a directory other than the projects 'buildDirectory'. Can 
      not be used with the 'printonly' flag.

  -i, --display=display
      Optional: Filters all returned records by looking for the provided string in the `SetupAuditTrail.Display` field.

  -n, --lastndays=lastndays
      Optional: Adds `CreatedDate <= LAST_N_DAYS:PROVIDED_VALUE` to the queries WHERE statement. Can not be used with the 
      'where' flag. Can not be used with the 'date' flag.

  -o, --printonly
      Optional: provide if you would like to print the results to the terminal only. Can not be used with the 'savedir' 
      flag.

  -p, --createdbyprofile=createdbyprofile
      Optional: Adds `CreatedBy.Profile.Name = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the 
      'where' flag.

  -s, --section=section
      Optional: Filters all returned records by looking for the provided string in the `SetupAuditTrail.Section` field.

  -t, --date=date
      Optional: Adds `DAY_ONLY(CreatedDate) = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the 
      'where' flag. Can not be used with the 'lastndays' flag.

  -u, --targetusername=targetusername
      username or alias for the target org; overrides default target org

  -w, --where=where
      Optional: provide your own custom where clause. Can not be used with any of the other filter flags.

  --apiversion=apiversion
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

ALIASES
  $ sfdx affirm:place:audit

EXAMPLES
  $ sfdx affirm:place:audit
         Running Command:
         sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail ORDER BY CreatedDate 
  DESC" -u defaultUser --json
         Processing Query Results... Done. Found 1222 results
         File Saved to: ./.releaseArtifacts/auditResults/defaultUser/2021_08_27T17_26_15_429Z.json
    
  $ sfdx affirm:place:audit -n 30 -p "System Administrator" -a caselayout -u aliasName
         Running Command:
         sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail
         WHERE CreatedDate >= LAST_N_DAYS:30 AND Action LIKE '%caselayout%' AND CreatedBy.Profile.Name = 'System 
  Administrator' ORDER BY CreatedDate DESC" -u aliasName --json
         Processing Query Results... Done. Found 45 results
         File Saved to: ./.releaseArtifacts/auditResults/aliasName/2021_08_27T17_22_12_164Z.json
```

_See code: [lib/commands/sfdx-affirm/place/audit.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib/commands/sfdx-affirm/place/audit.js)_

## `sfdx sfdx-affirm:place:email [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Opens the Email Deliverability page in the target org.

```
Opens the Email Deliverability page in the target org.

USAGE
  $ sfdx sfdx-affirm:place:email [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -c, --classic                                                                     Optional:(Default: false) If
                                                                                    provided the page will be opened in
                                                                                    the Classic UI. Default is Lightning
                                                                                    UI.

  -d, --displayurl                                                                  Optional:(Default: false) If
                                                                                    provided the url will be printed in
                                                                                    the terminal.

  -o, --urlonly                                                                     Optional:(Default: false) If
                                                                                    provided the page will not be opened
                                                                                    in a browser it will just be printed
                                                                                    in the terminal.

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:place:email

EXAMPLES
  $ sfdx affirm:place:email
         Opening Email Deliverability in Selected Org: defaultOrg
         Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg --json
         Done
    
  $ sfdx affirm:place:email -d -c
         Opening Email Deliverability in Selected Org: defaultOrg
         Running Command: sfdx force:org:open -p email-admin/editOrgEmailSettings.apexp -u defaultOrg --json
         URL: 
  https://defaultOrg.my.salesforce.com/secur/frontdoor.jsp?sid=token&retURL=email-admin%2FeditOrgEmailSettings.apexp
         Done
    
  $ sfdx affirm:place:email -d -u sandboxAlias -o
         Getting URL for Email Deliverability in Selected Org: sandboxAlias
         Running Command: sfdx force:org:open -p email-admin/editOrgEmailSettings.apexp -u sandboxAlias --json
         URL: 
  https://sandboxAlias.my.salesforce.com/secur/frontdoor.jsp?sid=token&retURL=lightning%2Fsetup%2FOrgEmailSettings%2Fhom
  e
         Done
```

_See code: [lib/commands/sfdx-affirm/place/email.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib/commands/sfdx-affirm/place/email.js)_

## `sfdx sfdx-affirm:place:form [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Queries the provided org and tells you if it's a production org or sandbox

```
Queries the provided org and tells you if it's a production org or sandbox

USAGE
  $ sfdx sfdx-affirm:place:form [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:place:form

EXAMPLES
  $ sfdx affirm:place:form
         Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u 
  defaultOrgAlias --json
         Organization.IsSandbox = true
         Org defaultOrgAlias is a Sandbox instance
    
  $ sfdx affirm:place:form -u prodAlias
         Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u prodAlias 
  --json
         Organization.IsSandbox = false
         Org prodAlias is a Production instance
```

_See code: [lib/commands/sfdx-affirm/place/form.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib/commands/sfdx-affirm/place/form.js)_

## `sfdx sfdx-affirm:place:status [-i <string>] [-u] [-d] [-c] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Opens the Deployment Status page in the target org.

```
Opens the Deployment Status page in the target org.

USAGE
  $ sfdx sfdx-affirm:place:status [-i <string>] [-u] [-d] [-c] [-u <string>] [--apiversion <string>] [--json] 
  [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -c, --classic                                                                     Optional:(Default: false) If
                                                                                    provided the page will be opened in
                                                                                    the Classic UI. Default is Lightning
                                                                                    UI.

  -d, --displayurl                                                                  Optional:(Default: false) If
                                                                                    provided the url will be printed in
                                                                                    the terminal.

  -i, --id=id                                                                       Optional: Provide an id of a
                                                                                    validation or deployment to be taken
                                                                                    directly to the specific deployment
                                                                                    status page.

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -u, --urlonly                                                                     Optional:(Default: false) If
                                                                                    provided the page will not be opened
                                                                                    in a browser it will just be printed
                                                                                    in the terminal.

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:place:status

EXAMPLES
  $ sfdx affirm:place:status
         Opening Deployment Status in Selected Org: defaultOrg
         Running Command: sfdx force:org:open -p lightning/setup/DeployStatus/home -u defaultOrg --json
         Done
    
  $ sfdx affirm:place:status -d -c
         Opening Deployment Status in Selected Org: defaultOrg
         Running Command: sfdx force:org:open -p changemgmt/monitorDeployment.apexp -u defaultOrg --json
         URL: 
  https://defaultOrg.my.salesforce.com/secur/frontdoor.jsp?sid=token&retURL=changemgmt%2FmonitorDeployment.apexp
         Done
    
  $ sfdx affirm:place:status -d -u sandboxAlias
         Opening Deployment Status in Selected Org: sandboxAlias
         Running Command: sfdx force:org:open -p changemgmt/monitorDeployment.apexp -u sandboxAlias --json
         URL: 
  https://sandboxAlias.my.salesforce.com/secur/frontdoor.jsp?sid=token&retURL=changemgmt%2FmonitorDeployment.apexp
         Done
```

_See code: [lib/commands/sfdx-affirm/place/status.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib/commands/sfdx-affirm/place/status.js)_

## `sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-e] [-p] [-o] [-n] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Validates a package against the provided org

```
Validates a package against the provided org

USAGE
  $ sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-e] [-p] [-o] [-n] [-u <string>] 
  [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --packagedir=packagedir
      (Optional) The root of the directory tree that contains the files to validate. The root must contain a valid 
      package.xml file describing the entities in the directory structure. Uses default 'buildDirectory' from 
      AffirmSettings.

  -e, --saveresults
      (Optional) if provided the result json will be saved to the default build directory. Can not be used with --printall 
      or --noresults.

  -n, --notestsrun
      (Optional) if provided and the target org is a sandbox no tests will run. Does not work if target org is production 
      or the --testclasses flag is provided.

  -o, --openstatus
      (Optional) if provided the deployment status page will be opened in the default or specified org.

  -p, --printall
      (Optional) if provided the results will be printed to the console. Can not be used with --saveresults or 
      --noresults.

  -r, --noresults
      (Optional) if provided minimal results will be printed and you will not be asked if you would like to save or print 
      results. Can not be used with --printall or --saveresults.

  -s, --silent
      (Optional) If provided you will not be prompted at all for input. If correct input isn't provided command fails.

  -t, --testclasses=testclasses
      (Optional) Comma separated list of tests to run. If none are provided all test classes listed in any test suites 
      found in the 'packagedir' will be use. If none are found and target org is production the default 
      'declarativeTestClass' is used if one is set.

  -u, --targetusername=targetusername
      username or alias for the target org; overrides default target org

  -w, --waittime=waittime
      (Optional) The number of minutes to wait for the command to complete. Uses default 'waitTime' from AffirmSettings.

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

_See code: [lib/commands/sfdx-affirm/quality.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib/commands/sfdx-affirm/quality.js)_

## `sfdx sfdx-affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <string>] [-t <string>] [-a] [-o] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows users to configure project specific settings for Affirm

```
Allows users to configure project specific settings for Affirm

USAGE
  $ sfdx sfdx-affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <string>] [-t <string>] [-a] [-o] [--json] 
  [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --acceptdefaults
      (optional) If provided only those items provided as a flag will be changed all others will be set to the default

  -b, --primarybranch=primarybranch
      (optional | Default: master) The primary branch should be the remote branch that is linked to your Production 
      Instance of Salesforce. Default is 'remotes/origin/master'. Helpful if you use main instead of master.

  -d, --builddir=builddir
      (optional | Default: .releaseArtifacts) The directory where build files are copied to for processing, build packages 
      are saved, and validation results are saved. Default is '.releaseArtifacts'. Would recommend a folder that is 
      ignored by git.

  -o, --overwrite
      (optional) Provide this if you already have a sfdx-affirm.json file in your root project directory and you don't 
      want to be asked about overwriting it.

  -p, --packagedir=packagedir
      (optional | Default: parcel) The default directory name for new packages. Default is 'parcel'. This folder will 
      always be placed in the default builddir or the one you indicated

  -t, --declarativetestclass=declarativetestclass
      (optional | Default: undefined) The test class to use when no test classes are provided. Mainly used for declarative 
      changes that don't require specific code coverage.

  -w, --waittime=waittime
      (optional | Default: 10) The default wait time for all validation, deployment and test commands. The default is '10' 
      for ten minutes but you can make this lower or higher for your project.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

ALIASES
  $ sfdx affirm:setup

EXAMPLES
  $ sfdx affirm:setup
         Provide name of remote branch related to your Production Instance  [remotes/origin/master]: remotes/origin/main
         Primary Branch set to:  remotes/origin/main
         Provide location where temp build folders and packages will be created and stored  [.releaseArtifacts]: 
  .superArtifacts
         Build Directory set to:  .superArtifacts
         Provide default directory name for new packages  [parcel]: pack
         Package Directory set to:  pack
         Provide default wait time for async commands  [10]: 5
         Wait Time set to:  5
         Provide the name of a test class you would like to run for declarative dev by default if no test suite is 
  created : Test_DeclarativeDefault
         Declarative Test Class set to:  Test_DeclarativeDefault
         Settings Saved to: ./sfdx-affirm.json
    
  $ sfdx affirm:setup -b remotes/origin/main -d .superArtifacts -p pack -w 5 -t Test_DeclarativeDefault -o
         Primary Branch set to:  remotes/origin/main
         Build Directory set to:  .superArtifacts
         Package Directory set to:  pack
         Wait Time set to:  5
         Declarative Test Class set to:  Test_DeclarativeDefault
         Settings Saved to: ./sfdx-affirm.json
```

_See code: [lib/commands/sfdx-affirm/setup.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib/commands/sfdx-affirm/setup.js)_

## `sfdx sfdx-affirm:spot:ac -n <string> [-r] [-c] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a testSuite-meta.xml file with the provided list of tests.

```
Creates a testSuite-meta.xml file with the provided list of tests.

USAGE
  $ sfdx sfdx-affirm:spot:ac -n <string> [-r] [-c] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -c, --classic                                                                     Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites

  -n, --name=name                                                                   (required) Comma separated list of
                                                                                    tests names that will be used to
                                                                                    create the test suite. If none are
                                                                                    provided you will be asked to
                                                                                    provide a list or exit.

  -r, --urlonly                                                                     Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:spot:ac

EXAMPLES
  $ sfdx affirm:spot:ac

    
  $ affirm:config:setup -
```

_See code: [lib/commands/sfdx-affirm/spot/ac.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib/commands/sfdx-affirm/spot/ac.js)_

## `sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a testSuite-meta.xml file with the provided list of tests.

```
Creates a testSuite-meta.xml file with the provided list of tests.

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

_See code: [lib/commands/sfdx-affirm/suite.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib/commands/sfdx-affirm/suite.js)_

## `sfdx sfdx-affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates or Updates a testSuite-meta.xml file using the tests from all inserted or changed test suite files in the current branch

```
Creates or Updates a testSuite-meta.xml file using the tests from all inserted or changed test suite files in the current branch

USAGE
  $ sfdx sfdx-affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -b, --branch=branch                                                               Optional: the branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against

  -l, --list                                                                        Optional: if provided the tests will
                                                                                    not be merged into a single suite,
                                                                                    rather they will be collected and
                                                                                    printed

  -n, --inputdir=inputdir                                                           Optional: the root directory to
                                                                                    compare other than the
                                                                                    sfdx-project.json default

  -n, --name=name                                                                   Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'

  -o, --outputdir=outputdir                                                         Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:suite:merge

EXAMPLES
  $ sfdx affirm:suite:merge
       Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
       Git Diff For: remotes/origin/master...pilot/affirm
       The following 3 test suite(s) will me merged into the name-of-epic-branch test suite
       force-app/main/default/testSuites/SFDC_1###_some_branch.testSuite-meta.xml
       force-app/main/default/testSuites/SFDC_2###_some_branch1.testSuite-meta.xml
       force-app/main/default/testSuites/SFDC_3###_some_branch2.testSuite-meta.xml
       Creating Test Suite... Success
       New Test Suite Written to: force-app/main/default/testSuites/name-of-epic-branch.testSuite-meta.xml
    
  $ sfdx affirm:suite:merge -n funky_suite_name
       Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
       Git Diff For: remotes/origin/master...pilot/affirm
       The following 2 test suite(s) will me merged into the funky_suite_name test suite
       force-app/main/default/testSuites/SFDC_1###_some_branch.testSuite-meta.xml
       force-app/main/default/testSuites/SFDC_2###_some_branch1.testSuite-meta.xml
       Creating Test Suite... Success
       New Test Suite Written to: force-app/main/default/testSuites/funky_suite_name.testSuite-meta.xml
    
  $ sfdx affirm:suite:merge -o .releaseArtifacts/tests
       Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
       Git Diff For: remotes/origin/master...pilot/affirm
       The following 2 test suite(s) will me merged into the name-of-epic-branch test suite
       force-app/main/default/testSuites/SFDC_1###_some_branch.testSuite-meta.xml
       force-app/main/default/testSuites/SFDC_2###_some_branch1.testSuite-meta.xml
       Creating Test Suite... Success
       New Test Suite Written to: .releaseArtifacts/tests/name-of-epic-branch.testSuite-meta.xml
```

_See code: [lib/commands/sfdx-affirm/suite/merge.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib/commands/sfdx-affirm/suite/merge.js)_

## `sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows user to easily run the relevant tests for their current branch.

```
Allows user to easily run the relevant tests for their current branch.

USAGE
  $ sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>] 
  [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --alltestsuites
      (Optional) if provided then all changed or inserted test suites on the branch will be collected and their tests will 
      be used. Otherwise, only the test suite with the matching branch name will be used.

  -e, --saveresults
      (Optional) if provided the result json will be saved to the default build directory. Can not be used with 
      --printresults

  -l, --list=list
      Comma separated list of tests names that will be used to create the test suite. If none are provided you will be 
      asked to provide a list or exit.

  -r, --printresults
      If provided test results will be printed without being prompted.

  -s, --silent
      (Optional) If provided you will not be prompted at all for input. If correct input isn't provided command fails.

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

_See code: [lib/commands/sfdx-affirm/tests.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib/commands/sfdx-affirm/tests.js)_
<!-- commandsstop -->
* [`sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmchanges--b-string--n-string--d--i--c--s--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:faker [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmfaker--b-string--n-string--d--i--c--s--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmjwt--p-string--i-string--s-string--a-string--e-number---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmparcel--b-string--i-string--o-string--d--t-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmplace--d-string--t-string--s--w-integer--r--o--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:place:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmplaceaudit--a-string--s-string--i-string--c-string--p-string--t-string--n-number--w-string--d-string--o--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:place:email [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmplaceemail--o--d--c--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:place:form [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmplaceform--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:place:status [-i <string>] [-u] [-d] [-c] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmplacestatus--i-string--u--d--c--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-e] [-p] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmquality--d-string--t-string--s--w-integer--r--e--p--o--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <string>] [-t <string>] [-a] [-o] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmsetup--b-string--d-string--p-string--w-string--t-string--a--o---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:spot:ac -n <string> [-r] [-c] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmspotac--n-string--r--c--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmsuite--t-string--n-string--o-string--a---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmsuitemerge--n-string--o-string--n-string--b-string--l---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmtests--l-string--w-integer--r--a--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

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

_See code: [lib\commands\sfdx-affirm\changes.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib\commands\sfdx-affirm\changes.js)_

## `sfdx sfdx-affirm:faker [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

returns a diff against the specified branch

```
USAGE
  $ sfdx sfdx-affirm:faker [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel 
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
  $ sfdx affirm:faker

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

_See code: [lib\commands\sfdx-affirm\faker.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib\commands\sfdx-affirm\faker.js)_

## `sfdx sfdx-affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a JWT token that can be used to auth against a connected app.

```
USAGE
  $ sfdx sfdx-affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --aud=aud
      (required) The audience identifies the authorization server as an intended audience. The authorization server must 
      verify that it’s an intended audience for the token. Use the authorization server’s URL for the audience value: 
      https://login.salesforce.com, https://test.salesforce.com, or https://site.force.com/customers if implementing for 
      an Experience Cloud site.

  -e, --exp=exp
      Optional: (Default: 3) The validity must be the expiration time of the assertion within 3 minutes.

  -i, --iss=iss
      (required) The issuer must contain the OAuth client_id or the connected app for which you registered the 
      certificate.

  -p, --privatekey=privatekey
      (required) the location of the private key

  -s, --sub=sub
      (required) The subject must contain the username of the user if implementing for an Experience Cloud site.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

ALIASES
  $ sfdx affirm:jwt

EXAMPLES
  $ sfdx affirm:jwt -p server.key -i 
  3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com -a 
  https://login.salesforce.com
         Token Created:
         eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
    
  $ sfdx affirm:jwt -p server.key -i 
  3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com.test -a 
  https://test.salesforce.com -e 1
         Token Created:
         eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
```

_See code: [lib\commands\sfdx-affirm\jwt.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib\commands\sfdx-affirm\jwt.js)_

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

_See code: [lib\commands\sfdx-affirm\parcel.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib\commands\sfdx-affirm\parcel.js)_

## `sfdx sfdx-affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Deploys a Package to the specific place

```
USAGE
  $ sfdx sfdx-affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-u <string>] [--apiversion 
  <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --packagedir=packagedir
      The root of the directory tree that contains the files to deploy. The root must contain a valid package.xml file 
      describing the entities in the directory structure. default: .releaseArtifacts/parcel. You will always be asked to 
      confirm the path provided before continuing.

  -o, --openstatus
      If provided, the deployment status page will be opened in the default or specified org.

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
  $ sfdx affirm:place

EXAMPLE
  $ sfdx affirm:place
```

_See code: [lib\commands\sfdx-affirm\place.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib\commands\sfdx-affirm\place.js)_

## `sfdx sfdx-affirm:place:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Queries and downloads audit logs from the target org

```
USAGE
  $ sfdx sfdx-affirm:place:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n 
  <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --action=action
      Optional: Adds `Action LIKE '%PROVIDED_VALUE%'` to the queries WHERE statement. Can not be used with the 'where' 
      flag.

  -c, --createdbyuser=createdbyuser
      Optional: Adds `CreatedBy.Username = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the 
      'where' flag.

  -d, --savedir=savedir
      Optional: Provide if you would like to save the file to a directory other than the projects 'buildDirectory'. Can 
      not be used with the 'printonly' flag.

  -i, --display=display
      Optional: Filters all returned records by looking for the provided string in the `SetupAuditTrail.Display` field.

  -n, --lastndays=lastndays
      Optional: Adds `CreatedDate <= LAST_N_DAYS:PROVIDED_VALUE` to the queries WHERE statement. Can not be used with the 
      'where' flag. Can not be used with the 'date' flag.

  -o, --printonly
      Optional: provide if you would like to print the results to the terminal only. Can not be used with the 'savedir' 
      flag.

  -p, --createdbyprofile=createdbyprofile
      Optional: Adds `CreatedBy.Profile.Name = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the 
      'where' flag.

  -s, --section=section
      Optional: Filters all returned records by looking for the provided string in the `SetupAuditTrail.Section` field.

  -t, --date=date
      Optional: Adds `DAY_ONLY(CreatedDate) = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the 
      'where' flag. Can not be used with the 'lastndays' flag.

  -u, --targetusername=targetusername
      username or alias for the target org; overrides default target org

  -w, --where=where
      Optional: provide your own custom where clause. Can not be used with any of the other filter flags.

  --apiversion=apiversion
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

ALIASES
  $ sfdx affirm:place:audit

EXAMPLES
  $ sfdx affirm:place:audit
         Running Command:
         sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail ORDER BY CreatedDate 
  DESC" -u defaultUser --json
         Processing Query Results... Done. Found 1222 results
         File Saved to: ./.releaseArtifacts/auditResults/defaultUser/2021_08_27T17_26_15_429Z.json
    
  $ sfdx affirm:place:audit -n 30 -p "System Administrator" -a caselayout -u aliasName
         Running Command:
         sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail
         WHERE CreatedDate >= LAST_N_DAYS:30 AND Action LIKE '%caselayout%' AND CreatedBy.Profile.Name = 'System 
  Administrator' ORDER BY CreatedDate DESC" -u aliasName --json
         Processing Query Results... Done. Found 45 results
         File Saved to: ./.releaseArtifacts/auditResults/aliasName/2021_08_27T17_22_12_164Z.json
```

_See code: [lib\commands\sfdx-affirm\place\audit.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib\commands\sfdx-affirm\place\audit.js)_

## `sfdx sfdx-affirm:place:email [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Opens the Email Deliverability page in the target org.

```
USAGE
  $ sfdx sfdx-affirm:place:email [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -c, --classic                                                                     Optional:(Default: false) If
                                                                                    provided the page will be opened in
                                                                                    the Classic UI. Default is Lightning
                                                                                    UI.

  -d, --displayurl                                                                  Optional:(Default: false) If
                                                                                    provided the url will be printed in
                                                                                    the terminal.

  -o, --urlonly                                                                     Optional:(Default: false) If
                                                                                    provided the page will not be opened
                                                                                    in a browser it will just be printed
                                                                                    in the terminal.

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:place:email

EXAMPLES
  $ sfdx affirm:place:email
         Opening Email Deliverability in Selected Org: defaultOrg
         Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg --json
         Done
    
  $ sfdx affirm:place:email -d -c
         Opening Email Deliverability in Selected Org: defaultOrg
         Running Command: sfdx force:org:open -p email-admin/editOrgEmailSettings.apexp -u defaultOrg --json
         URL: 
  https://defaultOrg.my.salesforce.com/secur/frontdoor.jsp?sid=token&retURL=email-admin%2FeditOrgEmailSettings.apexp
         Done
    
  $ sfdx affirm:place:email -d -u sandboxAlias -o
         Getting URL for Email Deliverability in Selected Org: sandboxAlias
         Running Command: sfdx force:org:open -p email-admin/editOrgEmailSettings.apexp -u sandboxAlias --json
         URL: 
  https://sandboxAlias.my.salesforce.com/secur/frontdoor.jsp?sid=token&retURL=lightning%2Fsetup%2FOrgEmailSettings%2Fhom
  e
         Done
```

_See code: [lib\commands\sfdx-affirm\place\email.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib\commands\sfdx-affirm\place\email.js)_

## `sfdx sfdx-affirm:place:form [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Queries the provided org and tells you if it's a production org or sandbox

```
USAGE
  $ sfdx sfdx-affirm:place:form [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:place:form

EXAMPLES
  $ sfdx affirm:place:form
         Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u 
  defaultOrgAlias --json
         Organization.IsSandbox = true
         Org defaultOrgAlias is a Sandbox instance
    
  $ sfdx affirm:place:form -u prodAlias
         Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u prodAlias 
  --json
         Organization.IsSandbox = false
         Org prodAlias is a Production instance
```

_See code: [lib\commands\sfdx-affirm\place\form.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib\commands\sfdx-affirm\place\form.js)_

## `sfdx sfdx-affirm:place:status [-i <string>] [-u] [-d] [-c] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Opens the Deployment Status page in the target org.

```
USAGE
  $ sfdx sfdx-affirm:place:status [-i <string>] [-u] [-d] [-c] [-u <string>] [--apiversion <string>] [--json] 
  [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -c, --classic                                                                     Optional:(Default: false) If
                                                                                    provided the page will be opened in
                                                                                    the Classic UI. Default is Lightning
                                                                                    UI.

  -d, --displayurl                                                                  Optional:(Default: false) If
                                                                                    provided the url will be printed in
                                                                                    the terminal.

  -i, --id=id                                                                       Optional: Provide an id of a
                                                                                    validation or deployment to be taken
                                                                                    directly to the specific deployment
                                                                                    status page.

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -u, --urlonly                                                                     Optional:(Default: false) If
                                                                                    provided the page will not be opened
                                                                                    in a browser it will just be printed
                                                                                    in the terminal.

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:place:status

EXAMPLES
  $ sfdx affirm:place:status
         Opening Deployment Status in Selected Org: defaultOrg
         Running Command: sfdx force:org:open -p lightning/setup/DeployStatus/home -u defaultOrg --json
         Done
    
  $ sfdx affirm:place:status -d -c
         Opening Deployment Status in Selected Org: defaultOrg
         Running Command: sfdx force:org:open -p changemgmt/monitorDeployment.apexp -u defaultOrg --json
         URL: 
  https://defaultOrg.my.salesforce.com/secur/frontdoor.jsp?sid=token&retURL=changemgmt%2FmonitorDeployment.apexp
         Done
    
  $ sfdx affirm:place:status -d -u sandboxAlias
         Opening Deployment Status in Selected Org: sandboxAlias
         Running Command: sfdx force:org:open -p changemgmt/monitorDeployment.apexp -u sandboxAlias --json
         URL: 
  https://sandboxAlias.my.salesforce.com/secur/frontdoor.jsp?sid=token&retURL=changemgmt%2FmonitorDeployment.apexp
         Done
```

_See code: [lib\commands\sfdx-affirm\place\status.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib\commands\sfdx-affirm\place\status.js)_

## `sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-e] [-p] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Validates a package against the provided org

```
USAGE
  $ sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-e] [-p] [-o] [-u <string>] 
  [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --packagedir=packagedir
      (Optional) The root of the directory tree that contains the files to validate. The root must contain a valid 
      package.xml file describing the entities in the directory structure. Uses default 'buildDirectory' from 
      AffirmSettings.

  -e, --saveresults
      (Optional) if provided the result json will be saved to the default build directory. Can not be used with --printall 
      or --noresults.

  -o, --openstatus
      (Optional) if provided the deployment status page will be opened in the default or specified org.

  -p, --printall
      (Optional) if provided the results will be printed to the console. Can not be used with --saveresults or 
      --noresults.

  -r, --noresults
      (Optional) if provided minimal results will be printed and you will not be asked if you would like to save or print 
      results. Can not be used with --printall or --saveresults.

  -s, --silent
      (Optional) If provided you will not be prompted at all for input. If correct input isn't provided command fails.

  -t, --testclasses=testclasses
      (Optional) Comma separated list of tests to run. If none are provided all test classes listed in any test suites 
      found in the 'packagedir' will be use. If none are found and target org is production the default 
      'declarativeTestClass' is used if one is set.

  -u, --targetusername=targetusername
      username or alias for the target org; overrides default target org

  -w, --waittime=waittime
      (Optional) The number of minutes to wait for the command to complete. Uses default 'waitTime' from AffirmSettings.

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

_See code: [lib\commands\sfdx-affirm\quality.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib\commands\sfdx-affirm\quality.js)_

## `sfdx sfdx-affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <string>] [-t <string>] [-a] [-o] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows users to configure project specific settings for Affirm

```
USAGE
  $ sfdx sfdx-affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <string>] [-t <string>] [-a] [-o] [--json] 
  [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --acceptdefaults
      (optional) If provided only those items provided as a flag will be changed all others will be set to the default

  -b, --primarybranch=primarybranch
      (optional | Default: master) The primary branch should be the remote branch that is linked to your Production 
      Instance of Salesforce. Default is 'remotes/origin/master'. Helpful if you use main instead of master.

  -d, --builddir=builddir
      (optional | Default: .releaseArtifacts) The directory where build files are copied to for processing, build packages 
      are saved, and validation results are saved. Default is '.releaseArtifacts'. Would recommend a folder that is 
      ignored by git.

  -o, --overwrite
      (optional) Provide this if you already have a sfdx-affirm.json file in your root project directory and you don't 
      want to be asked about overwriting it.

  -p, --packagedir=packagedir
      (optional | Default: parcel) The default directory name for new packages. Default is 'parcel'. This folder will 
      always be placed in the default builddir or the one you indicated

  -t, --declarativetestclass=declarativetestclass
      (optional | Default: undefined) The test class to use when no test classes are provided. Mainly used for declarative 
      changes that don't require specific code coverage.

  -w, --waittime=waittime
      (optional | Default: 10) The default wait time for all validation, deployment and test commands. The default is '10' 
      for ten minutes but you can make this lower or higher for your project.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

ALIASES
  $ sfdx affirm:setup

EXAMPLES
  $ sfdx affirm:setup
         Provide name of remote branch related to your Production Instance  [remotes/origin/master]: remotes/origin/main
         Primary Branch set to:  remotes/origin/main
         Provide location where temp build folders and packages will be created and stored  [.releaseArtifacts]: 
  .superArtifacts
         Build Directory set to:  .superArtifacts
         Provide default directory name for new packages  [parcel]: pack
         Package Directory set to:  pack
         Provide default wait time for async commands  [10]: 5
         Wait Time set to:  5
         Provide the name of a test class you would like to run for declarative dev by default if no test suite is 
  created : Test_DeclarativeDefault
         Declarative Test Class set to:  Test_DeclarativeDefault
         Settings Saved to: ./sfdx-affirm.json
    
  $ sfdx affirm:setup -b remotes/origin/main -d .superArtifacts -p pack -w 5 -t Test_DeclarativeDefault -o
         Primary Branch set to:  remotes/origin/main
         Build Directory set to:  .superArtifacts
         Package Directory set to:  pack
         Wait Time set to:  5
         Declarative Test Class set to:  Test_DeclarativeDefault
         Settings Saved to: ./sfdx-affirm.json
```

_See code: [lib\commands\sfdx-affirm\setup.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib\commands\sfdx-affirm\setup.js)_

## `sfdx sfdx-affirm:spot:ac -n <string> [-r] [-c] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a testSuite-meta.xml file with the provided list of tests.

```
USAGE
  $ sfdx sfdx-affirm:spot:ac -n <string> [-r] [-c] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -c, --classic                                                                     Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites

  -n, --name=name                                                                   (required) Comma separated list of
                                                                                    tests names that will be used to
                                                                                    create the test suite. If none are
                                                                                    provided you will be asked to
                                                                                    provide a list or exit.

  -r, --urlonly                                                                     Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:spot:ac

EXAMPLES
  $ sfdx affirm:spot:ac

    
  $ affirm:config:setup -
```

_See code: [lib\commands\sfdx-affirm\spot\ac.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib\commands\sfdx-affirm\spot\ac.js)_

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

_See code: [lib\commands\sfdx-affirm\suite.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib\commands\sfdx-affirm\suite.js)_

## `sfdx sfdx-affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates or Updates a testSuite-meta.xml file using the tests from all inserted or changed test suite files in the current branch

```
USAGE
  $ sfdx sfdx-affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -b, --branch=branch                                                               Optional: the branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against

  -l, --list                                                                        Optional: if provided the tests will
                                                                                    not be merged into a single suite,
                                                                                    rather they will be collected and
                                                                                    printed

  -n, --inputdir=inputdir                                                           Optional: the root directory to
                                                                                    compare other than the
                                                                                    sfdx-project.json default

  -n, --name=name                                                                   Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'

  -o, --outputdir=outputdir                                                         Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

ALIASES
  $ sfdx affirm:suite:merge

EXAMPLES
  $ sfdx affirm:suite:merge
       Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
       Git Diff For: remotes/origin/master...pilot/affirm
       The following 3 test suite(s) will me merged into the name-of-epic-branch test suite
       force-app/main/default/testSuites/SFDC_1###_some_branch.testSuite-meta.xml
       force-app/main/default/testSuites/SFDC_2###_some_branch1.testSuite-meta.xml
       force-app/main/default/testSuites/SFDC_3###_some_branch2.testSuite-meta.xml
       Creating Test Suite... Success
       New Test Suite Written to: force-app/main/default/testSuites/name-of-epic-branch.testSuite-meta.xml
    
  $ sfdx affirm:suite:merge -n funky_suite_name
       Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
       Git Diff For: remotes/origin/master...pilot/affirm
       The following 2 test suite(s) will me merged into the funky_suite_name test suite
       force-app/main/default/testSuites/SFDC_1###_some_branch.testSuite-meta.xml
       force-app/main/default/testSuites/SFDC_2###_some_branch1.testSuite-meta.xml
       Creating Test Suite... Success
       New Test Suite Written to: force-app/main/default/testSuites/funky_suite_name.testSuite-meta.xml
    
  $ sfdx affirm:suite:merge -o .releaseArtifacts/tests
       Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
       Git Diff For: remotes/origin/master...pilot/affirm
       The following 2 test suite(s) will me merged into the name-of-epic-branch test suite
       force-app/main/default/testSuites/SFDC_1###_some_branch.testSuite-meta.xml
       force-app/main/default/testSuites/SFDC_2###_some_branch1.testSuite-meta.xml
       Creating Test Suite... Success
       New Test Suite Written to: .releaseArtifacts/tests/name-of-epic-branch.testSuite-meta.xml
```

_See code: [lib\commands\sfdx-affirm\suite\merge.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib\commands\sfdx-affirm\suite\merge.js)_

## `sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows user to easily run the relevant tests for their current branch.

```
USAGE
  $ sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-u <string>] [--apiversion <string>] [--json] 
  [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --alltestsuites
      (Optional) if provided then all changed or inserted test suites on the branch will be collected and their tests will 
      be used. Otherwise, only the test suite with the matching branch name will be used.

  -l, --list=list
      Comma separated list of tests names that will be used to create the test suite. If none are provided you will be 
      asked to provide a list or exit.

  -r, --printresults
      If provided test results will be printed without being prompted.

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

_See code: [lib\commands\sfdx-affirm\tests.js](https://github.com/dt-snyder/sfdx-affirm/blob/v2.5.0/lib\commands\sfdx-affirm\tests.js)_
<!-- commandsstop -->
## Helpful Links

- [Create Your First Salesforce CLI Plugin](https://developer.salesforce.com/blogs/2018/05/create-your-first-salesforce-cli-plugin.html)
- [Plugin Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_plugins.meta/sfdx_cli_plugins/cli_plugins.htm)
- [salesforce/core](https://forcedotcom.github.io/sfdx-core/globals.html)
- [SimpleGit.js](https://github.com/steveukx/git-js#readme)
