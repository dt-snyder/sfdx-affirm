# sfdx-affirm

Commands for creating a package from git diff and validating it against a specific org.

## Install for use in sfdx project

1. Ensure your computer is ready to install the plugin: [Install Salesforce CLI](https://developer.salesforce.com/tools/sfdxcli)
2. run `sfdx plugins:install sfdx-affirm`
3. agree to install unsigned package

## Commands
<!-- commands -->
* [`sfdx a:o [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-ao--e--n--d--p--i-string--o--d--c--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmaudit--a-string--s-string--i-string--c-string--p-string--t-string--n-number--w-string--d-string--o--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmchanges--b-string--n-string--d--i--c--s--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmform--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmjwt--p-string--i-string--s-string--a-string--e-number---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmopen--e--n--d--p--i-string--o--d--c--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmparcel--b-string--i-string--o-string--d--t-string--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmplace--d-string--t-string--s--w-integer--r--o--e--p--n--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmquality--d-string--t-string--s--w-number--r--e--p--o--n--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmsetup--b-string--d-string--p-string--w-number--t-string--a--o---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmsuite--t-string--n-string--o-string--a---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmsuitemerge--n-string--o-string--n-string--b-string--l--s---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmtests--l-string--w-integer--r--a--e--s--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmaudit--a-string--s-string--i-string--c-string--p-string--t-string--n-number--w-string--d-string--o--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmchanges--b-string--n-string--d--i--c--s--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmform--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmjwt--p-string--i-string--s-string--a-string--e-number---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmopen--e--n--d--p--i-string--o--d--c--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmparcel--b-string--i-string--o-string--d--t-string--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmplace--d-string--t-string--s--w-integer--r--o--e--p--n--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmquality--d-string--t-string--s--w-number--r--e--p--o--n--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmsetup--b-string--d-string--p-string--w-number--t-string--a--o---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmsuite--t-string--n-string--o-string--a---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmsuitemerge--n-string--o-string--n-string--b-string--l--s---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmtests--l-string--w-integer--r--a--e--s--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx a:o [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page in Lightning.

```
USAGE
  $ sfdx a:o [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>]
    [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -c, --classic                                                                     Optional | if provided the page will
                                                                                    open in Classic otherwise it opens
                                                                                    in Lightning by default.
  -d, --deployment                                                                  Optional Path | Supports Id | Opens
                                                                                    directly to Deployment status.
  -d, --displayurl                                                                  Optional | If provided the url will
                                                                                    be printed in the terminal.
  -e, --email                                                                       Optional Path | Opens directly to
                                                                                    Email Deliverability Settings
  -i, --id=<value>                                                                  Optional | if provided with a Path
                                                                                    Flag that supports Id the specific
                                                                                    record will be opened rather than
                                                                                    the path home page.
  -n, --network                                                                     Optional Path | Opens directly to
                                                                                    Digital Experiences
  -o, --urlonly                                                                     Optional | If provided the page will
                                                                                    not be opened in a browser it will
                                                                                    just be printed in the terminal.
  -p, --profile                                                                     Optional Path | Supports Id | Opens
                                                                                    directly to Profile List Views
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --verbose                                                                         emit additional command output to
                                                                                    stdout

DESCRIPTION
  Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page
  in Lightning.

ALIASES
  $ sfdx affirm:open
  $ sfdx a:o

EXAMPLES
  $ sfdx affirm:open
          Opening Setup Home in Production Org: defaultOrg
          Done
        

  $ sfdx affirm:open --profile -u sandboxAlias
          Opening Profile List Views in Sandbox Org: sandboxAlias
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open --deployment -i 0Af6S00000pzZSS
          Opening Deployment Status in Production Org: defaultOrg
          Done
```

## `sfdx affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Queries and downloads audit logs from the target org

```
USAGE
  $ sfdx affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n
    <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --action=<value>
      Optional: Adds `Action LIKE '%PROVIDED_VALUE%'` to the queries WHERE statement. Can not be used with the 'where'
      flag.

  -c, --createdbyuser=<value>
      Optional: Adds `CreatedBy.Username = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag.

  -d, --savedir=<value>
      Optional: Provide if you would like to save the file to a directory other than the projects 'buildDirectory'. Can
      not be used with the 'printonly' flag.

  -i, --display=<value>
      Optional: Filters all returned records by looking for the provided string in the `SetupAuditTrail.Display` field.

  -n, --lastndays=<value>
      Optional: Adds `CreatedDate <= LAST_N_DAYS:PROVIDED_VALUE` to the queries WHERE statement. Can not be used with the
      'where' flag. Can not be used with the 'date' flag.

  -o, --printonly
      Optional: provide if you would like to print the results to the terminal only. Can not be used with the 'savedir'
      flag.

  -p, --createdbyprofile=<value>
      Optional: Adds `CreatedBy.Profile.Name = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag.

  -s, --section=<value>
      Optional: Filters all returned records by looking for the provided string in the `SetupAuditTrail.Section` field.

  -t, --date=<value>
      Optional: Adds `DAY_ONLY(CreatedDate) = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag. Can not be used with the 'lastndays' flag.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --where=<value>
      Optional: provide your own custom where clause. Can not be used with any of the other filter flags.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Queries and downloads audit logs from the target org

ALIASES
  $ sfdx affirm:audit

EXAMPLES
  $ sfdx affirm:place:audit
        Running Command:
        sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail ORDER BY CreatedDate DESC" -u defaultUser --json
        Processing Query Results... Done. Found 1222 results
        File Saved to: ./releaseArtifacts/auditResults/defaultUser/2021_08_27T17_26_15_429Z.json
    

  $ sfdx affirm:place:audit -n 30 -p "System Administrator" -a caselayout -u aliasName
        Running Command:
        sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail
        WHERE CreatedDate >= LAST_N_DAYS:30 AND Action LIKE '%caselayout%' AND CreatedBy.Profile.Name = 'System Administrator' ORDER BY CreatedDate DESC" -u aliasName --json
        Processing Query Results... Done. Found 45 results
        File Saved to: ./releaseArtifacts/auditResults/aliasName/2021_08_27T17_22_12_164Z.json
```

## `sfdx affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

returns a diff against the specified branch

```
USAGE
  $ sfdx affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              the branch other than
                                                                                    remotes/origin/main to diff against
  -c, --showchanged                                                                 If provided alone shows changes
                                                                                    only.
  -d, --showdestructive                                                             If provided alone shows destructive
                                                                                    changes only.
  -i, --showinsertion                                                               If provided alone shows insertion
                                                                                    changes only.
  -n, --inputdir=<value>                                                            the root directory to compare other
                                                                                    than the sfdx-project.json default
  -o, --outfilename=<value>                                                         if provided results will be save to
                                                                                    a file using the provided name as
                                                                                    json
  -s, --silent                                                                      runs without printing to console
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  returns a diff against the specified branch

ALIASES
  $ sfdx affirm:changes

EXAMPLES
  $ sfdx affirm:changes
              Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
              Git Diff For: remotes/origin/main...pilot/affirm
              CHANGED: MyClass.cls,MySecondClass.cls
              INSERTION: MyTestClass.cls
              DESTRUCTIVE: MyOldClass.cls,MyOldTestClass.cls
        

  $ sfdx affirm:changes --showdestructive
              Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
              Git Diff For: remotes/origin/main...pilot/affirm
              DESTRUCTIVE: MyOldClass.cls
        

  $ sfdx affirm:changes --showinsertion
              Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
              Git Diff For: remotes/origin/main...pilot/affirm
              INSERTION: MyTestClass.cls
        

  $ sfdx affirm:changes --showchanged
              Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
              Git Diff For: remotes/origin/main...pilot/affirm
              CHANGED: MyClass.cls
```

## `sfdx affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Queries the provided org and tells you if it's a production org or sandbox

```
USAGE
  $ sfdx affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Queries the provided org and tells you if it's a production org or sandbox

ALIASES
  $ sfdx affirm:form

EXAMPLES
  $ sfdx affirm:place:form
        Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrgAlias --json
        Organization.IsSandbox = true
        Org defaultOrgAlias is a Sandbox instance
    

  $ sfdx affirm:place:form -u prodAlias
        Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u prodAlias --json
        Organization.IsSandbox = false
        Org prodAlias is a Production instance
```

## `sfdx affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a JWT token that can be used to auth against a connected app.

```
USAGE
  $ sfdx affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --aud=<value>
      (required) The audience identifies the authorization server as an intended audience. The authorization server must
      verify that it’s an intended audience for the token. Use the authorization server’s URL for the audience value:
      https://login.salesforce.com, https://test.salesforce.com, or https://site.force.com/customers if implementing for
      an Experience Cloud site.

  -e, --exp=<value>
      Optional: (Default: 3) The validity must be the expiration time of the assertion within 3 minutes.

  -i, --iss=<value>
      (required) The issuer must contain the OAuth client_id or the connected app for which you registered the
      certificate.

  -p, --privatekey=<value>
      (required) the location of the private key

  -s, --sub=<value>
      (required) The subject must contain the username of the user if implementing for an Experience Cloud site.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Creates a JWT token that can be used to auth against a connected app.

ALIASES
  $ sfdx affirm:jwt

EXAMPLES
  $ sfdx affirm:jwt -p server.key -i 3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com -a https://login.salesforce.com
        Token Created:
        eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
    

  $ sfdx affirm:jwt -p server.key -i 3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com.test -a https://test.salesforce.com -e 1
        Token Created:
        eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
```

## `sfdx affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page in Lightning.

```
USAGE
  $ sfdx affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>]
    [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -c, --classic                                                                     Optional | if provided the page will
                                                                                    open in Classic otherwise it opens
                                                                                    in Lightning by default.
  -d, --deployment                                                                  Optional Path | Supports Id | Opens
                                                                                    directly to Deployment status.
  -d, --displayurl                                                                  Optional | If provided the url will
                                                                                    be printed in the terminal.
  -e, --email                                                                       Optional Path | Opens directly to
                                                                                    Email Deliverability Settings
  -i, --id=<value>                                                                  Optional | if provided with a Path
                                                                                    Flag that supports Id the specific
                                                                                    record will be opened rather than
                                                                                    the path home page.
  -n, --network                                                                     Optional Path | Opens directly to
                                                                                    Digital Experiences
  -o, --urlonly                                                                     Optional | If provided the page will
                                                                                    not be opened in a browser it will
                                                                                    just be printed in the terminal.
  -p, --profile                                                                     Optional Path | Supports Id | Opens
                                                                                    directly to Profile List Views
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --verbose                                                                         emit additional command output to
                                                                                    stdout

DESCRIPTION
  Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page
  in Lightning.

ALIASES
  $ sfdx affirm:open
  $ sfdx a:o

EXAMPLES
  $ sfdx affirm:open
          Opening Setup Home in Production Org: defaultOrg
          Done
        

  $ sfdx affirm:open --profile -u sandboxAlias
          Opening Profile List Views in Sandbox Org: sandboxAlias
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open --deployment -i 0Af6S00000pzZSS
          Opening Deployment Status in Production Org: defaultOrg
          Done
```

## `sfdx affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a parcel (package) using git diff

```
USAGE
  $ sfdx affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion
    <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              The branch other than
                                                                                    remotes/origin/main to diff against
  -d, --includedestructive                                                          If provided and there are
                                                                                    destructive changes you will not be
                                                                                    asked if you want to include them
  -i, --inputdir=<value>                                                            The root directory to compare other
                                                                                    than the force-app default
  -o, --outputdir=<value>                                                           The output directory to store the
                                                                                    Metadata API–formatted metadata
                                                                                    files in. Default: './parcel'
  -t, --destructivetiming=<option>                                                  Allows you to indicate if you want
                                                                                    to process the destructive changes
                                                                                    before or after the deployment.
                                                                                    options: before, after
                                                                                    <options: before|after>
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --verbose                                                                         emit additional command output to
                                                                                    stdout

DESCRIPTION
  Creates a parcel (package) using git diff

ALIASES
  $ sfdx affirm:parcel

EXAMPLES
  $ sfdx affirm:parcel
        Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
        Diff Against: remotes/origin/main...pilot/affirm... Success:
        Changes: 5, Insertions: 93, Destructive: 7
        Cloning Files... Success: 100 files ready for convert
        Converting... Success
        (y/n) There are 7 destructive changes. Create destructive changes xml file? y
        ? Select when the destructive changes should be deployed: before
        Creating Destructive Package... Success: Created at releaseArtifacts/parcel/destructiveChangesPre.xml
        Cleaning Up... Success
    

  $ sfdx affirm:parcel -d -t before
        Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
        Diff Against: remotes/origin/main...pilot/affirm... Success:
        Changes: 5, Insertions: 93, Destructive: 7
        Cloning Files... Success: 100 files ready for convert
        Converting... Success
        Creating Destructive Package... Success: Created at releaseArtifacts/parcel/destructiveChangesPre.xml
        Cleaning Up... Success
```

## `sfdx affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Deploys a Package to the specific place

```
USAGE
  $ sfdx affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>]
    [--apiversion <string>] [--verbose] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --packagedir=<value>
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

  -t, --testclasses=<value>
      (Optional) Comma separated list of tests to run. If none are provided all test classes listed in any test suites
      found in the 'packagedir' will be use. If none are found and target org is production the default
      'declarativeTestClass' is NOT used.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      (Optional) The number of minutes to wait for the command to complete. Uses default 'waitTime' from AffirmSettings.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Deploys a Package to the specific place

ALIASES
  $ sfdx affirm:place

EXAMPLES
  $ sfdx affirm:place
        Selected Production Instance: personalDev
        (y/n) Are you sure you want to deploy the package located in the "releaseArtifacts/parcel" folder?: y
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Deployment Test Classes:
        MyExampleClassTest
        Validation started in personalDev with Deployment Id: 0Af6S00000qVCieSAG
        Deploying Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_18_05_43_0Af6S00000qVCieSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        ? Would you like to print or save the any of the validation results? save: all
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_18_05_43_0Af6S00000qVCieSAG.json

  $ sfdx affirm:place -s -o -e
        Selected Production Instance: personalDev
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Deployment Test Classes:
        MyExampleClassTest
        Opening Deployment Status page in personalDev for deployment: 0Af6S00000qVCjcSAG
        Deploying Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_18_14_08_0Af6S00000qVCjcSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        File Saved to: ./releaseArtifacts/deploymentResults/personalDev/2023-03-31_18_14_08_0Af6S00000qVCjcSAG.json
```

## `sfdx affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Validates a package against the provided org

```
USAGE
  $ sfdx affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>]
    [--apiversion <string>] [--verbose] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --packagedir=<value>
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

  -t, --testclasses=<value>
      (Optional) Comma separated list of tests to run. If none are provided all test classes listed in any test suites
      found in the 'packagedir' will be use. If none are found and target org is production the default
      'declarativeTestClass' is used if one is set.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      (Optional) The number of minutes to wait for the command to complete. Uses default 'waitTime' from AffirmSettings.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Validates a package against the provided org

ALIASES
  $ sfdx affirm:quality

EXAMPLES
  $ sfdx affirm:quality
        (y/n) Are you sure you want to use the "personalDev" org ?: y
        Selected Production Org: personalDev
        (y/n) Are you sure you want to validate the package located in the "releaseArtifacts/parcel" folder?: y
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Validating Using Provided Test Classes:
        MyExampleClassTest
        Validation started in personalDev with Deployment Id: 0Af6S00000qVCjwSAG
        Validating Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_19_36_13_0Af6S00000qVCjwSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        ? Would you like to print or save the any of the validation results? save: all
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_19_36_13_0Af6S00000qVCjwSAG.json
  

  $ sfdx affirm:quality -s -o -e
        Selected Production Org: personalDev
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Validating Using Provided Test Classes:
        MyExampleClassTest
        Opening Deployment Status page in personalDev for validation: 0Af6S00000qVCkGSAW
        Validating Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_19_38_01_0Af6S00000qVCkGSAW
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_19_38_01_0Af6S00000qVCkGSAW.json
```

## `sfdx affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows users to configure project specific settings for Affirm

```
USAGE
  $ sfdx affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json]
    [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --acceptdefaults
      (optional) If provided only those items provided as a flag will be changed all others will be set to the default

  -b, --primarybranch=<value>
      (optional | Default: main) The primary branch should be the remote branch that is linked to your Production Instance
      of Salesforce. Default is 'remotes/origin/main'. Helpful if you use master instead of main.

  -d, --builddir=<value>
      (optional | Default: .releaseArtifacts) The directory where build files are copied to for processing, build packages
      are saved, and validation results are saved. Default is 'releaseArtifacts'. Would recommend a folder that is ignored
      by git.

  -o, --overwrite
      (optional) Provide this if you already have a sfdx-affirm.json file in your root project directory and you don't
      want to be asked about overwriting it.

  -p, --packagedir=<value>
      (optional | Default: parcel) The default directory name for new packages. Default is 'parcel'. This folder will
      always be placed in the default builddir or the one you indicated

  -t, --declarativetestclass=<value>
      (optional | Default: undefined) The test class to use when no test classes are provided. Mainly used for declarative
      changes that don't require specific code coverage.

  -w, --waittime=<value>
      (optional | Default: 10) The default wait time for all validation, deployment and test commands. The default is '10'
      for ten minutes but you can make this lower or higher for your project.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Allows users to configure project specific settings for Affirm

ALIASES
  $ sfdx affirm:setup

EXAMPLES
  $ sfdx affirm:setup
        Provide name of remote branch related to your Production Instance  [remotes/origin/main]: remotes/origin/master
        Primary Branch set to:  remotes/origin/master
        Provide location where temp build folders and packages will be created and stored  [releaseArtifacts]: .superArtifacts
        Build Directory set to:  .superArtifacts
        Provide default directory name for new packages  [parcel]: pack
        Package Directory set to:  pack
        Provide default wait time for async commands  [10]: 5
        Wait Time set to:  5
        Provide the name of a test class you would like to run for declarative dev by default if no test suite is created : Test_DeclarativeDefault
        Declarative Test Class set to:  Test_DeclarativeDefault
        Settings Saved to: ./sfdx-affirm.json
    

  $ sfdx affirm:setup -b remotes/origin/master -d .superArtifacts -p pack -w 5 -t Test_DeclarativeDefault -o
        Primary Branch set to:  remotes/origin/master
        Build Directory set to:  .superArtifacts
        Package Directory set to:  pack
        Wait Time set to:  5
        Declarative Test Class set to:  Test_DeclarativeDefault
        Settings Saved to: ./sfdx-affirm.json
```

## `sfdx affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a testSuite-meta.xml file with the provided list of tests.

```
USAGE
  $ sfdx affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --addtotests                                                                  Optional: Indicates that you would
                                                                                    like the provided tests to be added
                                                                                    to the existing test suite instead
                                                                                    of overwriting it.
  -n, --name=<value>                                                                Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'
  -o, --outputdir=<value>                                                           Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites
  -t, --tests=<value>                                                               Comma separated list of tests names
                                                                                    that will be used to create the test
                                                                                    suite. If none are provided you will
                                                                                    be asked to provide a list or exit.
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Creates a testSuite-meta.xml file with the provided list of tests.

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

## `sfdx affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates or Updates a testSuite-meta.xml file using the tests from all inserted or changed test suite files in the current branch

```
USAGE
  $ sfdx affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              Optional: the branch other than
                                                                                    remotes/origin/main to diff against
  -l, --list                                                                        Optional: if provided the tests will
                                                                                    not be merged into a single suite,
                                                                                    rather they will be collected and
                                                                                    printed one at a time to the
                                                                                    terminal
  -n, --inputdir=<value>                                                            Optional: the root directory to
                                                                                    compare other than the
                                                                                    sfdx-project.json default
  -n, --name=<value>                                                                Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'
  -o, --outputdir=<value>                                                           Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites
  -s, --string                                                                      Optional: if provided the tests will
                                                                                    not be merged into a single suite,
                                                                                    rather they will be collected and
                                                                                    printed as a single string using a
                                                                                    comma to separate.
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Creates or Updates a testSuite-meta.xml file using the tests from all inserted or changed test suite files in the
  current branch

ALIASES
  $ sfdx affirm:suite:merge

EXAMPLES
  $ sfdx affirm:suite:merge
      Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
      Git Diff For: remotes/origin/main...pilot/affirm
      The following 3 test suite(s) will me merged into the name-of-epic-branch test suite
      force-app/main/default/testSuites/SFDC_1###_some_branch.testSuite-meta.xml
      force-app/main/default/testSuites/SFDC_2###_some_branch1.testSuite-meta.xml
      force-app/main/default/testSuites/SFDC_3###_some_branch2.testSuite-meta.xml
      Creating Test Suite... Success
      New Test Suite Written to: force-app/main/default/testSuites/name-of-epic-branch.testSuite-meta.xml
    

  $ sfdx affirm:suite:merge -n funky_suite_name
      Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
      Git Diff For: remotes/origin/main...pilot/affirm
      The following 2 test suite(s) will me merged into the funky_suite_name test suite
      force-app/main/default/testSuites/SFDC_1###_some_branch.testSuite-meta.xml
      force-app/main/default/testSuites/SFDC_2###_some_branch1.testSuite-meta.xml
      Creating Test Suite... Success
      New Test Suite Written to: force-app/main/default/testSuites/funky_suite_name.testSuite-meta.xml
    

  $ sfdx affirm:suite:merge -o releaseArtifacts/tests
      Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
      Git Diff For: remotes/origin/main...pilot/affirm
      The following 2 test suite(s) will me merged into the name-of-epic-branch test suite
      force-app/main/default/testSuites/SFDC_1###_some_branch.testSuite-meta.xml
      force-app/main/default/testSuites/SFDC_2###_some_branch1.testSuite-meta.xml
      Creating Test Suite... Success
      New Test Suite Written to: releaseArtifacts/tests/name-of-epic-branch.testSuite-meta.xml
```

## `sfdx affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows user to easily run the relevant tests for their current branch.

```
USAGE
  $ sfdx affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>]
    [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --alltestsuites
      (Optional) if provided then all changed or inserted test suites on the branch will be collected and their tests will
      be used. Otherwise, only the test suite with the matching branch name will be used.

  -e, --saveresults
      (Optional) if provided the result json will be saved to the default build directory. Can not be used with
      --printresults

  -l, --list=<value>
      Comma separated list of tests names that will be used to create the test suite. If none are provided you will be
      asked to provide a list or exit.

  -r, --printresults
      If provided test results will be printed without being prompted.

  -s, --silent
      (Optional) If provided you will not be prompted at all for input. If correct input isn't provided command fails.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      The number of minutes to wait for the command to complete. The default is 10.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Allows user to easily run the relevant tests for their current branch.

ALIASES
  $ sfdx affirm:tests

EXAMPLES
  $ sfdx affirm:tests
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

## `sfdx sfdx-affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Queries and downloads audit logs from the target org

```
USAGE
  $ sfdx sfdx-affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n
    <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --action=<value>
      Optional: Adds `Action LIKE '%PROVIDED_VALUE%'` to the queries WHERE statement. Can not be used with the 'where'
      flag.

  -c, --createdbyuser=<value>
      Optional: Adds `CreatedBy.Username = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag.

  -d, --savedir=<value>
      Optional: Provide if you would like to save the file to a directory other than the projects 'buildDirectory'. Can
      not be used with the 'printonly' flag.

  -i, --display=<value>
      Optional: Filters all returned records by looking for the provided string in the `SetupAuditTrail.Display` field.

  -n, --lastndays=<value>
      Optional: Adds `CreatedDate <= LAST_N_DAYS:PROVIDED_VALUE` to the queries WHERE statement. Can not be used with the
      'where' flag. Can not be used with the 'date' flag.

  -o, --printonly
      Optional: provide if you would like to print the results to the terminal only. Can not be used with the 'savedir'
      flag.

  -p, --createdbyprofile=<value>
      Optional: Adds `CreatedBy.Profile.Name = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag.

  -s, --section=<value>
      Optional: Filters all returned records by looking for the provided string in the `SetupAuditTrail.Section` field.

  -t, --date=<value>
      Optional: Adds `DAY_ONLY(CreatedDate) = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag. Can not be used with the 'lastndays' flag.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --where=<value>
      Optional: provide your own custom where clause. Can not be used with any of the other filter flags.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Queries and downloads audit logs from the target org

ALIASES
  $ sfdx affirm:audit

EXAMPLES
  $ sfdx affirm:place:audit
        Running Command:
        sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail ORDER BY CreatedDate DESC" -u defaultUser --json
        Processing Query Results... Done. Found 1222 results
        File Saved to: ./releaseArtifacts/auditResults/defaultUser/2021_08_27T17_26_15_429Z.json
    

  $ sfdx affirm:place:audit -n 30 -p "System Administrator" -a caselayout -u aliasName
        Running Command:
        sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail
        WHERE CreatedDate >= LAST_N_DAYS:30 AND Action LIKE '%caselayout%' AND CreatedBy.Profile.Name = 'System Administrator' ORDER BY CreatedDate DESC" -u aliasName --json
        Processing Query Results... Done. Found 45 results
        File Saved to: ./releaseArtifacts/auditResults/aliasName/2021_08_27T17_22_12_164Z.json
```

_See code: [src/commands/sfdx-affirm/audit.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.2/src/commands/sfdx-affirm/audit.ts)_

## `sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

returns a diff against the specified branch

```
USAGE
  $ sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              the branch other than
                                                                                    remotes/origin/main to diff against
  -c, --showchanged                                                                 If provided alone shows changes
                                                                                    only.
  -d, --showdestructive                                                             If provided alone shows destructive
                                                                                    changes only.
  -i, --showinsertion                                                               If provided alone shows insertion
                                                                                    changes only.
  -n, --inputdir=<value>                                                            the root directory to compare other
                                                                                    than the sfdx-project.json default
  -o, --outfilename=<value>                                                         if provided results will be save to
                                                                                    a file using the provided name as
                                                                                    json
  -s, --silent                                                                      runs without printing to console
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  returns a diff against the specified branch

ALIASES
  $ sfdx affirm:changes

EXAMPLES
  $ sfdx affirm:changes
              Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
              Git Diff For: remotes/origin/main...pilot/affirm
              CHANGED: MyClass.cls,MySecondClass.cls
              INSERTION: MyTestClass.cls
              DESTRUCTIVE: MyOldClass.cls,MyOldTestClass.cls
        

  $ sfdx affirm:changes --showdestructive
              Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
              Git Diff For: remotes/origin/main...pilot/affirm
              DESTRUCTIVE: MyOldClass.cls
        

  $ sfdx affirm:changes --showinsertion
              Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
              Git Diff For: remotes/origin/main...pilot/affirm
              INSERTION: MyTestClass.cls
        

  $ sfdx affirm:changes --showchanged
              Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
              Git Diff For: remotes/origin/main...pilot/affirm
              CHANGED: MyClass.cls
```

_See code: [src/commands/sfdx-affirm/changes.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.2/src/commands/sfdx-affirm/changes.ts)_

## `sfdx sfdx-affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Queries the provided org and tells you if it's a production org or sandbox

```
USAGE
  $ sfdx sfdx-affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Queries the provided org and tells you if it's a production org or sandbox

ALIASES
  $ sfdx affirm:form

EXAMPLES
  $ sfdx affirm:place:form
        Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrgAlias --json
        Organization.IsSandbox = true
        Org defaultOrgAlias is a Sandbox instance
    

  $ sfdx affirm:place:form -u prodAlias
        Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u prodAlias --json
        Organization.IsSandbox = false
        Org prodAlias is a Production instance
```

_See code: [src/commands/sfdx-affirm/form.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.2/src/commands/sfdx-affirm/form.ts)_

## `sfdx sfdx-affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a JWT token that can be used to auth against a connected app.

```
USAGE
  $ sfdx sfdx-affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --aud=<value>
      (required) The audience identifies the authorization server as an intended audience. The authorization server must
      verify that it’s an intended audience for the token. Use the authorization server’s URL for the audience value:
      https://login.salesforce.com, https://test.salesforce.com, or https://site.force.com/customers if implementing for
      an Experience Cloud site.

  -e, --exp=<value>
      Optional: (Default: 3) The validity must be the expiration time of the assertion within 3 minutes.

  -i, --iss=<value>
      (required) The issuer must contain the OAuth client_id or the connected app for which you registered the
      certificate.

  -p, --privatekey=<value>
      (required) the location of the private key

  -s, --sub=<value>
      (required) The subject must contain the username of the user if implementing for an Experience Cloud site.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Creates a JWT token that can be used to auth against a connected app.

ALIASES
  $ sfdx affirm:jwt

EXAMPLES
  $ sfdx affirm:jwt -p server.key -i 3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com -a https://login.salesforce.com
        Token Created:
        eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
    

  $ sfdx affirm:jwt -p server.key -i 3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com.test -a https://test.salesforce.com -e 1
        Token Created:
        eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
```

_See code: [src/commands/sfdx-affirm/jwt.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.2/src/commands/sfdx-affirm/jwt.ts)_

## `sfdx sfdx-affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page in Lightning.

```
USAGE
  $ sfdx sfdx-affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>]
    [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -c, --classic                                                                     Optional | if provided the page will
                                                                                    open in Classic otherwise it opens
                                                                                    in Lightning by default.
  -d, --deployment                                                                  Optional Path | Supports Id | Opens
                                                                                    directly to Deployment status.
  -d, --displayurl                                                                  Optional | If provided the url will
                                                                                    be printed in the terminal.
  -e, --email                                                                       Optional Path | Opens directly to
                                                                                    Email Deliverability Settings
  -i, --id=<value>                                                                  Optional | if provided with a Path
                                                                                    Flag that supports Id the specific
                                                                                    record will be opened rather than
                                                                                    the path home page.
  -n, --network                                                                     Optional Path | Opens directly to
                                                                                    Digital Experiences
  -o, --urlonly                                                                     Optional | If provided the page will
                                                                                    not be opened in a browser it will
                                                                                    just be printed in the terminal.
  -p, --profile                                                                     Optional Path | Supports Id | Opens
                                                                                    directly to Profile List Views
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --verbose                                                                         emit additional command output to
                                                                                    stdout

DESCRIPTION
  Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page
  in Lightning.

ALIASES
  $ sfdx affirm:open
  $ sfdx a:o

EXAMPLES
  $ sfdx affirm:open
          Opening Setup Home in Production Org: defaultOrg
          Done
        

  $ sfdx affirm:open --profile -u sandboxAlias
          Opening Profile List Views in Sandbox Org: sandboxAlias
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open --deployment -i 0Af6S00000pzZSS
          Opening Deployment Status in Production Org: defaultOrg
          Done
```

_See code: [src/commands/sfdx-affirm/open.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.2/src/commands/sfdx-affirm/open.ts)_

## `sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a parcel (package) using git diff

```
USAGE
  $ sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion
    <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              The branch other than
                                                                                    remotes/origin/main to diff against
  -d, --includedestructive                                                          If provided and there are
                                                                                    destructive changes you will not be
                                                                                    asked if you want to include them
  -i, --inputdir=<value>                                                            The root directory to compare other
                                                                                    than the force-app default
  -o, --outputdir=<value>                                                           The output directory to store the
                                                                                    Metadata API–formatted metadata
                                                                                    files in. Default: './parcel'
  -t, --destructivetiming=<option>                                                  Allows you to indicate if you want
                                                                                    to process the destructive changes
                                                                                    before or after the deployment.
                                                                                    options: before, after
                                                                                    <options: before|after>
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --verbose                                                                         emit additional command output to
                                                                                    stdout

DESCRIPTION
  Creates a parcel (package) using git diff

ALIASES
  $ sfdx affirm:parcel

EXAMPLES
  $ sfdx affirm:parcel
        Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
        Diff Against: remotes/origin/main...pilot/affirm... Success:
        Changes: 5, Insertions: 93, Destructive: 7
        Cloning Files... Success: 100 files ready for convert
        Converting... Success
        (y/n) There are 7 destructive changes. Create destructive changes xml file? y
        ? Select when the destructive changes should be deployed: before
        Creating Destructive Package... Success: Created at releaseArtifacts/parcel/destructiveChangesPre.xml
        Cleaning Up... Success
    

  $ sfdx affirm:parcel -d -t before
        Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
        Diff Against: remotes/origin/main...pilot/affirm... Success:
        Changes: 5, Insertions: 93, Destructive: 7
        Cloning Files... Success: 100 files ready for convert
        Converting... Success
        Creating Destructive Package... Success: Created at releaseArtifacts/parcel/destructiveChangesPre.xml
        Cleaning Up... Success
```

_See code: [src/commands/sfdx-affirm/parcel.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.2/src/commands/sfdx-affirm/parcel.ts)_

## `sfdx sfdx-affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Deploys a Package to the specific place

```
USAGE
  $ sfdx sfdx-affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>]
    [--apiversion <string>] [--verbose] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --packagedir=<value>
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

  -t, --testclasses=<value>
      (Optional) Comma separated list of tests to run. If none are provided all test classes listed in any test suites
      found in the 'packagedir' will be use. If none are found and target org is production the default
      'declarativeTestClass' is NOT used.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      (Optional) The number of minutes to wait for the command to complete. Uses default 'waitTime' from AffirmSettings.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Deploys a Package to the specific place

ALIASES
  $ sfdx affirm:place

EXAMPLES
  $ sfdx affirm:place
        Selected Production Instance: personalDev
        (y/n) Are you sure you want to deploy the package located in the "releaseArtifacts/parcel" folder?: y
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Deployment Test Classes:
        MyExampleClassTest
        Validation started in personalDev with Deployment Id: 0Af6S00000qVCieSAG
        Deploying Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_18_05_43_0Af6S00000qVCieSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        ? Would you like to print or save the any of the validation results? save: all
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_18_05_43_0Af6S00000qVCieSAG.json

  $ sfdx affirm:place -s -o -e
        Selected Production Instance: personalDev
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Deployment Test Classes:
        MyExampleClassTest
        Opening Deployment Status page in personalDev for deployment: 0Af6S00000qVCjcSAG
        Deploying Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_18_14_08_0Af6S00000qVCjcSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        File Saved to: ./releaseArtifacts/deploymentResults/personalDev/2023-03-31_18_14_08_0Af6S00000qVCjcSAG.json
```

_See code: [src/commands/sfdx-affirm/place.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.2/src/commands/sfdx-affirm/place.ts)_

## `sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Validates a package against the provided org

```
USAGE
  $ sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>]
    [--apiversion <string>] [--verbose] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --packagedir=<value>
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

  -t, --testclasses=<value>
      (Optional) Comma separated list of tests to run. If none are provided all test classes listed in any test suites
      found in the 'packagedir' will be use. If none are found and target org is production the default
      'declarativeTestClass' is used if one is set.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      (Optional) The number of minutes to wait for the command to complete. Uses default 'waitTime' from AffirmSettings.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Validates a package against the provided org

ALIASES
  $ sfdx affirm:quality

EXAMPLES
  $ sfdx affirm:quality
        (y/n) Are you sure you want to use the "personalDev" org ?: y
        Selected Production Org: personalDev
        (y/n) Are you sure you want to validate the package located in the "releaseArtifacts/parcel" folder?: y
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Validating Using Provided Test Classes:
        MyExampleClassTest
        Validation started in personalDev with Deployment Id: 0Af6S00000qVCjwSAG
        Validating Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_19_36_13_0Af6S00000qVCjwSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        ? Would you like to print or save the any of the validation results? save: all
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_19_36_13_0Af6S00000qVCjwSAG.json
  

  $ sfdx affirm:quality -s -o -e
        Selected Production Org: personalDev
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Validating Using Provided Test Classes:
        MyExampleClassTest
        Opening Deployment Status page in personalDev for validation: 0Af6S00000qVCkGSAW
        Validating Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_19_38_01_0Af6S00000qVCkGSAW
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_19_38_01_0Af6S00000qVCkGSAW.json
```

_See code: [src/commands/sfdx-affirm/quality.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.2/src/commands/sfdx-affirm/quality.ts)_

## `sfdx sfdx-affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows users to configure project specific settings for Affirm

```
USAGE
  $ sfdx sfdx-affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json]
    [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --acceptdefaults
      (optional) If provided only those items provided as a flag will be changed all others will be set to the default

  -b, --primarybranch=<value>
      (optional | Default: main) The primary branch should be the remote branch that is linked to your Production Instance
      of Salesforce. Default is 'remotes/origin/main'. Helpful if you use master instead of main.

  -d, --builddir=<value>
      (optional | Default: .releaseArtifacts) The directory where build files are copied to for processing, build packages
      are saved, and validation results are saved. Default is 'releaseArtifacts'. Would recommend a folder that is ignored
      by git.

  -o, --overwrite
      (optional) Provide this if you already have a sfdx-affirm.json file in your root project directory and you don't
      want to be asked about overwriting it.

  -p, --packagedir=<value>
      (optional | Default: parcel) The default directory name for new packages. Default is 'parcel'. This folder will
      always be placed in the default builddir or the one you indicated

  -t, --declarativetestclass=<value>
      (optional | Default: undefined) The test class to use when no test classes are provided. Mainly used for declarative
      changes that don't require specific code coverage.

  -w, --waittime=<value>
      (optional | Default: 10) The default wait time for all validation, deployment and test commands. The default is '10'
      for ten minutes but you can make this lower or higher for your project.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Allows users to configure project specific settings for Affirm

ALIASES
  $ sfdx affirm:setup

EXAMPLES
  $ sfdx affirm:setup
        Provide name of remote branch related to your Production Instance  [remotes/origin/main]: remotes/origin/master
        Primary Branch set to:  remotes/origin/master
        Provide location where temp build folders and packages will be created and stored  [releaseArtifacts]: .superArtifacts
        Build Directory set to:  .superArtifacts
        Provide default directory name for new packages  [parcel]: pack
        Package Directory set to:  pack
        Provide default wait time for async commands  [10]: 5
        Wait Time set to:  5
        Provide the name of a test class you would like to run for declarative dev by default if no test suite is created : Test_DeclarativeDefault
        Declarative Test Class set to:  Test_DeclarativeDefault
        Settings Saved to: ./sfdx-affirm.json
    

  $ sfdx affirm:setup -b remotes/origin/master -d .superArtifacts -p pack -w 5 -t Test_DeclarativeDefault -o
        Primary Branch set to:  remotes/origin/master
        Build Directory set to:  .superArtifacts
        Package Directory set to:  pack
        Wait Time set to:  5
        Declarative Test Class set to:  Test_DeclarativeDefault
        Settings Saved to: ./sfdx-affirm.json
```

_See code: [src/commands/sfdx-affirm/setup.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.2/src/commands/sfdx-affirm/setup.ts)_

## `sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a testSuite-meta.xml file with the provided list of tests.

```
USAGE
  $ sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --addtotests                                                                  Optional: Indicates that you would
                                                                                    like the provided tests to be added
                                                                                    to the existing test suite instead
                                                                                    of overwriting it.
  -n, --name=<value>                                                                Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'
  -o, --outputdir=<value>                                                           Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites
  -t, --tests=<value>                                                               Comma separated list of tests names
                                                                                    that will be used to create the test
                                                                                    suite. If none are provided you will
                                                                                    be asked to provide a list or exit.
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Creates a testSuite-meta.xml file with the provided list of tests.

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

_See code: [src/commands/sfdx-affirm/suite.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.2/src/commands/sfdx-affirm/suite.ts)_

## `sfdx sfdx-affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates or Updates a testSuite-meta.xml file using the tests from all inserted or changed test suite files in the current branch

```
USAGE
  $ sfdx sfdx-affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              Optional: the branch other than
                                                                                    remotes/origin/main to diff against
  -l, --list                                                                        Optional: if provided the tests will
                                                                                    not be merged into a single suite,
                                                                                    rather they will be collected and
                                                                                    printed one at a time to the
                                                                                    terminal
  -n, --inputdir=<value>                                                            Optional: the root directory to
                                                                                    compare other than the
                                                                                    sfdx-project.json default
  -n, --name=<value>                                                                Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'
  -o, --outputdir=<value>                                                           Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites
  -s, --string                                                                      Optional: if provided the tests will
                                                                                    not be merged into a single suite,
                                                                                    rather they will be collected and
                                                                                    printed as a single string using a
                                                                                    comma to separate.
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Creates or Updates a testSuite-meta.xml file using the tests from all inserted or changed test suite files in the
  current branch

ALIASES
  $ sfdx affirm:suite:merge

EXAMPLES
  $ sfdx affirm:suite:merge
      Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
      Git Diff For: remotes/origin/main...pilot/affirm
      The following 3 test suite(s) will me merged into the name-of-epic-branch test suite
      force-app/main/default/testSuites/SFDC_1###_some_branch.testSuite-meta.xml
      force-app/main/default/testSuites/SFDC_2###_some_branch1.testSuite-meta.xml
      force-app/main/default/testSuites/SFDC_3###_some_branch2.testSuite-meta.xml
      Creating Test Suite... Success
      New Test Suite Written to: force-app/main/default/testSuites/name-of-epic-branch.testSuite-meta.xml
    

  $ sfdx affirm:suite:merge -n funky_suite_name
      Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
      Git Diff For: remotes/origin/main...pilot/affirm
      The following 2 test suite(s) will me merged into the funky_suite_name test suite
      force-app/main/default/testSuites/SFDC_1###_some_branch.testSuite-meta.xml
      force-app/main/default/testSuites/SFDC_2###_some_branch1.testSuite-meta.xml
      Creating Test Suite... Success
      New Test Suite Written to: force-app/main/default/testSuites/funky_suite_name.testSuite-meta.xml
    

  $ sfdx affirm:suite:merge -o releaseArtifacts/tests
      Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
      Git Diff For: remotes/origin/main...pilot/affirm
      The following 2 test suite(s) will me merged into the name-of-epic-branch test suite
      force-app/main/default/testSuites/SFDC_1###_some_branch.testSuite-meta.xml
      force-app/main/default/testSuites/SFDC_2###_some_branch1.testSuite-meta.xml
      Creating Test Suite... Success
      New Test Suite Written to: releaseArtifacts/tests/name-of-epic-branch.testSuite-meta.xml
```

_See code: [src/commands/sfdx-affirm/suite/merge.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.2/src/commands/sfdx-affirm/suite/merge.ts)_

## `sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows user to easily run the relevant tests for their current branch.

```
USAGE
  $ sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>]
    [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --alltestsuites
      (Optional) if provided then all changed or inserted test suites on the branch will be collected and their tests will
      be used. Otherwise, only the test suite with the matching branch name will be used.

  -e, --saveresults
      (Optional) if provided the result json will be saved to the default build directory. Can not be used with
      --printresults

  -l, --list=<value>
      Comma separated list of tests names that will be used to create the test suite. If none are provided you will be
      asked to provide a list or exit.

  -r, --printresults
      If provided test results will be printed without being prompted.

  -s, --silent
      (Optional) If provided you will not be prompted at all for input. If correct input isn't provided command fails.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      The number of minutes to wait for the command to complete. The default is 10.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Allows user to easily run the relevant tests for their current branch.

ALIASES
  $ sfdx affirm:tests

EXAMPLES
  $ sfdx affirm:tests
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

_See code: [src/commands/sfdx-affirm/tests.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.2/src/commands/sfdx-affirm/tests.ts)_
<!-- commandsstop -->
* [`sfdx a:o [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-ao--e--n--d--p--i-string--o--d--c--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmaudit--a-string--s-string--i-string--c-string--p-string--t-string--n-number--w-string--d-string--o--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmchanges--b-string--n-string--d--i--c--s--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmform--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmjwt--p-string--i-string--s-string--a-string--e-number---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmopen--e--n--d--p--i-string--o--d--c--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmparcel--b-string--i-string--o-string--d--t-string--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmplace--d-string--t-string--s--w-integer--r--o--e--p--n--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmquality--d-string--t-string--s--w-number--r--e--p--o--n--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmsetup--b-string--d-string--p-string--w-number--t-string--a--o---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmsuite--t-string--n-string--o-string--a---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmsuitemerge--n-string--o-string--n-string--b-string--l--s---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmtests--l-string--w-integer--r--a--e--s--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmaudit--a-string--s-string--i-string--c-string--p-string--t-string--n-number--w-string--d-string--o--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmchanges--b-string--n-string--d--i--c--s--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmform--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmjwt--p-string--i-string--s-string--a-string--e-number---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmopen--e--n--d--p--i-string--o--d--c--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmparcel--b-string--i-string--o-string--d--t-string--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmplace--d-string--t-string--s--w-integer--r--o--e--p--n--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmquality--d-string--t-string--s--w-number--r--e--p--o--n--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmsetup--b-string--d-string--p-string--w-number--t-string--a--o---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmsuite--t-string--n-string--o-string--a---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmsuitemerge--n-string--o-string--n-string--b-string--l--s---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmtests--l-string--w-integer--r--a--e--s--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx a:o [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page in Lightning.

```
USAGE
  $ sfdx a:o [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>]
    [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -c, --classic                                                                     Optional | if provided the page will
                                                                                    open in Classic otherwise it opens
                                                                                    in Lightning by default.
  -d, --deployment                                                                  Optional Path | Supports Id | Opens
                                                                                    directly to Deployment status.
  -d, --displayurl                                                                  Optional | If provided the url will
                                                                                    be printed in the terminal.
  -e, --email                                                                       Optional Path | Opens directly to
                                                                                    Email Deliverability Settings
  -i, --id=<value>                                                                  Optional | if provided with a Path
                                                                                    Flag that supports Id the specific
                                                                                    record will be opened rather than
                                                                                    the path home page.
  -n, --network                                                                     Optional Path | Opens directly to
                                                                                    Digital Experiences
  -o, --urlonly                                                                     Optional | If provided the page will
                                                                                    not be opened in a browser it will
                                                                                    just be printed in the terminal.
  -p, --profile                                                                     Optional Path | Supports Id | Opens
                                                                                    directly to Profile List Views
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --verbose                                                                         emit additional command output to
                                                                                    stdout

DESCRIPTION
  Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page
  in Lightning.

ALIASES
  $ sfdx affirm:open
  $ sfdx a:o

EXAMPLES
  $ sfdx affirm:open
          Opening Setup Home in Production Org: defaultOrg
          Done
        

  $ sfdx affirm:open --profile -u sandboxAlias
          Opening Profile List Views in Sandbox Org: sandboxAlias
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open --deployment -i 0Af6S00000pzZSS
          Opening Deployment Status in Production Org: defaultOrg
          Done
```

## `sfdx affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Queries and downloads audit logs from the target org

```
USAGE
  $ sfdx affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n
    <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --action=<value>
      Optional: Adds `Action LIKE '%PROVIDED_VALUE%'` to the queries WHERE statement. Can not be used with the 'where'
      flag.

  -c, --createdbyuser=<value>
      Optional: Adds `CreatedBy.Username = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag.

  -d, --savedir=<value>
      Optional: Provide if you would like to save the file to a directory other than the projects 'buildDirectory'. Can
      not be used with the 'printonly' flag.

  -i, --display=<value>
      Optional: Filters all returned records by looking for the provided string in the `SetupAuditTrail.Display` field.

  -n, --lastndays=<value>
      Optional: Adds `CreatedDate <= LAST_N_DAYS:PROVIDED_VALUE` to the queries WHERE statement. Can not be used with the
      'where' flag. Can not be used with the 'date' flag.

  -o, --printonly
      Optional: provide if you would like to print the results to the terminal only. Can not be used with the 'savedir'
      flag.

  -p, --createdbyprofile=<value>
      Optional: Adds `CreatedBy.Profile.Name = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag.

  -s, --section=<value>
      Optional: Filters all returned records by looking for the provided string in the `SetupAuditTrail.Section` field.

  -t, --date=<value>
      Optional: Adds `DAY_ONLY(CreatedDate) = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag. Can not be used with the 'lastndays' flag.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --where=<value>
      Optional: provide your own custom where clause. Can not be used with any of the other filter flags.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Queries and downloads audit logs from the target org

ALIASES
  $ sfdx affirm:audit

EXAMPLES
  $ sfdx affirm:place:audit
        Running Command:
        sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail ORDER BY CreatedDate DESC" -u defaultUser --json
        Processing Query Results... Done. Found 1222 results
        File Saved to: ./releaseArtifacts/auditResults/defaultUser/2021_08_27T17_26_15_429Z.json
    

  $ sfdx affirm:place:audit -n 30 -p "System Administrator" -a caselayout -u aliasName
        Running Command:
        sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail
        WHERE CreatedDate >= LAST_N_DAYS:30 AND Action LIKE '%caselayout%' AND CreatedBy.Profile.Name = 'System Administrator' ORDER BY CreatedDate DESC" -u aliasName --json
        Processing Query Results... Done. Found 45 results
        File Saved to: ./releaseArtifacts/auditResults/aliasName/2021_08_27T17_22_12_164Z.json
```

## `sfdx affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

returns a diff against the specified branch

```
USAGE
  $ sfdx affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              the branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against
  -c, --showchanged                                                                 If provided alone shows changes
                                                                                    only.
  -d, --showdestructive                                                             If provided alone shows destructive
                                                                                    changes only.
  -i, --showinsertion                                                               If provided alone shows insertion
                                                                                    changes only.
  -n, --inputdir=<value>                                                            the root directory to compare other
                                                                                    than the sfdx-project.json default
  -o, --outfilename=<value>                                                         if provided results will be save to
                                                                                    a file using the provided name as
                                                                                    json
  -s, --silent                                                                      runs without printing to console
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  returns a diff against the specified branch

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

## `sfdx affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Queries the provided org and tells you if it's a production org or sandbox

```
USAGE
  $ sfdx affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Queries the provided org and tells you if it's a production org or sandbox

ALIASES
  $ sfdx affirm:form

EXAMPLES
  $ sfdx affirm:place:form
        Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrgAlias --json
        Organization.IsSandbox = true
        Org defaultOrgAlias is a Sandbox instance
    

  $ sfdx affirm:place:form -u prodAlias
        Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u prodAlias --json
        Organization.IsSandbox = false
        Org prodAlias is a Production instance
```

## `sfdx affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a JWT token that can be used to auth against a connected app.

```
USAGE
  $ sfdx affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --aud=<value>
      (required) The audience identifies the authorization server as an intended audience. The authorization server must
      verify that it’s an intended audience for the token. Use the authorization server’s URL for the audience value:
      https://login.salesforce.com, https://test.salesforce.com, or https://site.force.com/customers if implementing for
      an Experience Cloud site.

  -e, --exp=<value>
      Optional: (Default: 3) The validity must be the expiration time of the assertion within 3 minutes.

  -i, --iss=<value>
      (required) The issuer must contain the OAuth client_id or the connected app for which you registered the
      certificate.

  -p, --privatekey=<value>
      (required) the location of the private key

  -s, --sub=<value>
      (required) The subject must contain the username of the user if implementing for an Experience Cloud site.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Creates a JWT token that can be used to auth against a connected app.

ALIASES
  $ sfdx affirm:jwt

EXAMPLES
  $ sfdx affirm:jwt -p server.key -i 3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com -a https://login.salesforce.com
        Token Created:
        eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
    

  $ sfdx affirm:jwt -p server.key -i 3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com.test -a https://test.salesforce.com -e 1
        Token Created:
        eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
```

## `sfdx affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page in Lightning.

```
USAGE
  $ sfdx affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>]
    [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -c, --classic                                                                     Optional | if provided the page will
                                                                                    open in Classic otherwise it opens
                                                                                    in Lightning by default.
  -d, --deployment                                                                  Optional Path | Supports Id | Opens
                                                                                    directly to Deployment status.
  -d, --displayurl                                                                  Optional | If provided the url will
                                                                                    be printed in the terminal.
  -e, --email                                                                       Optional Path | Opens directly to
                                                                                    Email Deliverability Settings
  -i, --id=<value>                                                                  Optional | if provided with a Path
                                                                                    Flag that supports Id the specific
                                                                                    record will be opened rather than
                                                                                    the path home page.
  -n, --network                                                                     Optional Path | Opens directly to
                                                                                    Digital Experiences
  -o, --urlonly                                                                     Optional | If provided the page will
                                                                                    not be opened in a browser it will
                                                                                    just be printed in the terminal.
  -p, --profile                                                                     Optional Path | Supports Id | Opens
                                                                                    directly to Profile List Views
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --verbose                                                                         emit additional command output to
                                                                                    stdout

DESCRIPTION
  Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page
  in Lightning.

ALIASES
  $ sfdx affirm:open
  $ sfdx a:o

EXAMPLES
  $ sfdx affirm:open
          Opening Setup Home in Production Org: defaultOrg
          Done
        

  $ sfdx affirm:open --profile -u sandboxAlias
          Opening Profile List Views in Sandbox Org: sandboxAlias
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open --deployment -i 0Af6S00000pzZSS
          Opening Deployment Status in Production Org: defaultOrg
          Done
```

## `sfdx affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a parcel (package) using git diff

```
USAGE
  $ sfdx affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion
    <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              The branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against
  -d, --includedestructive                                                          If provided and there are
                                                                                    destructive changes you will not be
                                                                                    asked if you want to include them
  -i, --inputdir=<value>                                                            The root directory to compare other
                                                                                    than the force-app default
  -o, --outputdir=<value>                                                           The output directory to store the
                                                                                    Metadata API–formatted metadata
                                                                                    files in. Default: './parcel'
  -t, --destructivetiming=<option>                                                  Allows you to indicate if you want
                                                                                    to process the destructive changes
                                                                                    before or after the deployment.
                                                                                    options: before, after
                                                                                    <options: before|after>
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --verbose                                                                         emit additional command output to
                                                                                    stdout

DESCRIPTION
  Creates a parcel (package) using git diff

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
        Creating Destructive Package... Success: Created at releaseArtifacts/parcel/destructiveChangesPre.xml
        Cleaning Up... Success
    

  $ sfdx affirm:parcel -d -t before
        Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
        Diff Against: remotes/origin/master...pilot/affirm... Success:
        Changes: 5, Insertions: 93, Destructive: 7
        Cloning Files... Success: 100 files ready for convert
        Converting... Success
        Creating Destructive Package... Success: Created at releaseArtifacts/parcel/destructiveChangesPre.xml
        Cleaning Up... Success
```

## `sfdx affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Deploys a Package to the specific place

```
USAGE
  $ sfdx affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>]
    [--apiversion <string>] [--verbose] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --packagedir=<value>
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

  -t, --testclasses=<value>
      (Optional) Comma separated list of tests to run. If none are provided all test classes listed in any test suites
      found in the 'packagedir' will be use. If none are found and target org is production the default
      'declarativeTestClass' is NOT used.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      (Optional) The number of minutes to wait for the command to complete. Uses default 'waitTime' from AffirmSettings.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Deploys a Package to the specific place

ALIASES
  $ sfdx affirm:place

EXAMPLES
  $ sfdx affirm:place
        Selected Production Instance: personalDev
        (y/n) Are you sure you want to deploy the package located in the "releaseArtifacts/parcel" folder?: y
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Deployment Test Classes:
        MyExampleClassTest
        Validation started in personalDev with Deployment Id: 0Af6S00000qVCieSAG
        Deploying Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_18_05_43_0Af6S00000qVCieSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        ? Would you like to print or save the any of the validation results? save: all
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_18_05_43_0Af6S00000qVCieSAG.json

  $ sfdx affirm:place -s -o -e
        Selected Production Instance: personalDev
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Deployment Test Classes:
        MyExampleClassTest
        Opening Deployment Status page in personalDev for deployment: 0Af6S00000qVCjcSAG
        Deploying Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_18_14_08_0Af6S00000qVCjcSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        File Saved to: ./releaseArtifacts/deploymentResults/personalDev/2023-03-31_18_14_08_0Af6S00000qVCjcSAG.json
```

## `sfdx affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Validates a package against the provided org

```
USAGE
  $ sfdx affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>]
    [--apiversion <string>] [--verbose] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --packagedir=<value>
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

  -t, --testclasses=<value>
      (Optional) Comma separated list of tests to run. If none are provided all test classes listed in any test suites
      found in the 'packagedir' will be use. If none are found and target org is production the default
      'declarativeTestClass' is used if one is set.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      (Optional) The number of minutes to wait for the command to complete. Uses default 'waitTime' from AffirmSettings.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Validates a package against the provided org

ALIASES
  $ sfdx affirm:quality

EXAMPLES
  $ sfdx affirm:quality
        (y/n) Are you sure you want to use the "personalDev" org ?: y
        Selected Production Org: personalDev
        (y/n) Are you sure you want to validate the package located in the "releaseArtifacts/parcel" folder?: y
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Validating Using Provided Test Classes:
        MyExampleClassTest
        Validation started in personalDev with Deployment Id: 0Af6S00000qVCjwSAG
        Validating Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_19_36_13_0Af6S00000qVCjwSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        ? Would you like to print or save the any of the validation results? save: all
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_19_36_13_0Af6S00000qVCjwSAG.json
  

  $ sfdx affirm:quality -s -o -e
        Selected Production Org: personalDev
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Validating Using Provided Test Classes:
        MyExampleClassTest
        Opening Deployment Status page in personalDev for validation: 0Af6S00000qVCkGSAW
        Validating Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_19_38_01_0Af6S00000qVCkGSAW
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_19_38_01_0Af6S00000qVCkGSAW.json
```

## `sfdx affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows users to configure project specific settings for Affirm

```
USAGE
  $ sfdx affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json]
    [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --acceptdefaults
      (optional) If provided only those items provided as a flag will be changed all others will be set to the default

  -b, --primarybranch=<value>
      (optional | Default: master) The primary branch should be the remote branch that is linked to your Production
      Instance of Salesforce. Default is 'remotes/origin/master'. Helpful if you use main instead of master.

  -d, --builddir=<value>
      (optional | Default: .releaseArtifacts) The directory where build files are copied to for processing, build packages
      are saved, and validation results are saved. Default is 'releaseArtifacts'. Would recommend a folder that is ignored
      by git.

  -o, --overwrite
      (optional) Provide this if you already have a sfdx-affirm.json file in your root project directory and you don't
      want to be asked about overwriting it.

  -p, --packagedir=<value>
      (optional | Default: parcel) The default directory name for new packages. Default is 'parcel'. This folder will
      always be placed in the default builddir or the one you indicated

  -t, --declarativetestclass=<value>
      (optional | Default: undefined) The test class to use when no test classes are provided. Mainly used for declarative
      changes that don't require specific code coverage.

  -w, --waittime=<value>
      (optional | Default: 10) The default wait time for all validation, deployment and test commands. The default is '10'
      for ten minutes but you can make this lower or higher for your project.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Allows users to configure project specific settings for Affirm

ALIASES
  $ sfdx affirm:setup

EXAMPLES
  $ sfdx affirm:setup
        Provide name of remote branch related to your Production Instance  [remotes/origin/master]: remotes/origin/main
        Primary Branch set to:  remotes/origin/main
        Provide location where temp build folders and packages will be created and stored  [releaseArtifacts]: .superArtifacts
        Build Directory set to:  .superArtifacts
        Provide default directory name for new packages  [parcel]: pack
        Package Directory set to:  pack
        Provide default wait time for async commands  [10]: 5
        Wait Time set to:  5
        Provide the name of a test class you would like to run for declarative dev by default if no test suite is created : Test_DeclarativeDefault
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

## `sfdx affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a testSuite-meta.xml file with the provided list of tests.

```
USAGE
  $ sfdx affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --addtotests                                                                  Optional: Indicates that you would
                                                                                    like the provided tests to be added
                                                                                    to the existing test suite instead
                                                                                    of overwriting it.
  -n, --name=<value>                                                                Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'
  -o, --outputdir=<value>                                                           Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites
  -t, --tests=<value>                                                               Comma separated list of tests names
                                                                                    that will be used to create the test
                                                                                    suite. If none are provided you will
                                                                                    be asked to provide a list or exit.
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Creates a testSuite-meta.xml file with the provided list of tests.

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

## `sfdx affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates or Updates a testSuite-meta.xml file using the tests from all inserted or changed test suite files in the current branch

```
USAGE
  $ sfdx affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              Optional: the branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against
  -l, --list                                                                        Optional: if provided the tests will
                                                                                    not be merged into a single suite,
                                                                                    rather they will be collected and
                                                                                    printed one at a time to the
                                                                                    terminal
  -n, --inputdir=<value>                                                            Optional: the root directory to
                                                                                    compare other than the
                                                                                    sfdx-project.json default
  -n, --name=<value>                                                                Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'
  -o, --outputdir=<value>                                                           Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites
  -s, --string                                                                      Optional: if provided the tests will
                                                                                    not be merged into a single suite,
                                                                                    rather they will be collected and
                                                                                    printed as a single string using a
                                                                                    comma to separate.
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Creates or Updates a testSuite-meta.xml file using the tests from all inserted or changed test suite files in the
  current branch

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
    

  $ sfdx affirm:suite:merge -o releaseArtifacts/tests
      Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
      Git Diff For: remotes/origin/master...pilot/affirm
      The following 2 test suite(s) will me merged into the name-of-epic-branch test suite
      force-app/main/default/testSuites/SFDC_1###_some_branch.testSuite-meta.xml
      force-app/main/default/testSuites/SFDC_2###_some_branch1.testSuite-meta.xml
      Creating Test Suite... Success
      New Test Suite Written to: releaseArtifacts/tests/name-of-epic-branch.testSuite-meta.xml
```

## `sfdx affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows user to easily run the relevant tests for their current branch.

```
USAGE
  $ sfdx affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>]
    [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --alltestsuites
      (Optional) if provided then all changed or inserted test suites on the branch will be collected and their tests will
      be used. Otherwise, only the test suite with the matching branch name will be used.

  -e, --saveresults
      (Optional) if provided the result json will be saved to the default build directory. Can not be used with
      --printresults

  -l, --list=<value>
      Comma separated list of tests names that will be used to create the test suite. If none are provided you will be
      asked to provide a list or exit.

  -r, --printresults
      If provided test results will be printed without being prompted.

  -s, --silent
      (Optional) If provided you will not be prompted at all for input. If correct input isn't provided command fails.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      The number of minutes to wait for the command to complete. The default is 10.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Allows user to easily run the relevant tests for their current branch.

ALIASES
  $ sfdx affirm:tests

EXAMPLES
  $ sfdx affirm:tests
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

## `sfdx sfdx-affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Queries and downloads audit logs from the target org

```
USAGE
  $ sfdx sfdx-affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n
    <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --action=<value>
      Optional: Adds `Action LIKE '%PROVIDED_VALUE%'` to the queries WHERE statement. Can not be used with the 'where'
      flag.

  -c, --createdbyuser=<value>
      Optional: Adds `CreatedBy.Username = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag.

  -d, --savedir=<value>
      Optional: Provide if you would like to save the file to a directory other than the projects 'buildDirectory'. Can
      not be used with the 'printonly' flag.

  -i, --display=<value>
      Optional: Filters all returned records by looking for the provided string in the `SetupAuditTrail.Display` field.

  -n, --lastndays=<value>
      Optional: Adds `CreatedDate <= LAST_N_DAYS:PROVIDED_VALUE` to the queries WHERE statement. Can not be used with the
      'where' flag. Can not be used with the 'date' flag.

  -o, --printonly
      Optional: provide if you would like to print the results to the terminal only. Can not be used with the 'savedir'
      flag.

  -p, --createdbyprofile=<value>
      Optional: Adds `CreatedBy.Profile.Name = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag.

  -s, --section=<value>
      Optional: Filters all returned records by looking for the provided string in the `SetupAuditTrail.Section` field.

  -t, --date=<value>
      Optional: Adds `DAY_ONLY(CreatedDate) = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag. Can not be used with the 'lastndays' flag.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --where=<value>
      Optional: provide your own custom where clause. Can not be used with any of the other filter flags.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Queries and downloads audit logs from the target org

ALIASES
  $ sfdx affirm:audit

EXAMPLES
  $ sfdx affirm:place:audit
        Running Command:
        sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail ORDER BY CreatedDate DESC" -u defaultUser --json
        Processing Query Results... Done. Found 1222 results
        File Saved to: ./releaseArtifacts/auditResults/defaultUser/2021_08_27T17_26_15_429Z.json
    

  $ sfdx affirm:place:audit -n 30 -p "System Administrator" -a caselayout -u aliasName
        Running Command:
        sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail
        WHERE CreatedDate >= LAST_N_DAYS:30 AND Action LIKE '%caselayout%' AND CreatedBy.Profile.Name = 'System Administrator' ORDER BY CreatedDate DESC" -u aliasName --json
        Processing Query Results... Done. Found 45 results
        File Saved to: ./releaseArtifacts/auditResults/aliasName/2021_08_27T17_22_12_164Z.json
```

_See code: [src/commands/sfdx-affirm/audit.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/audit.ts)_

## `sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

returns a diff against the specified branch

```
USAGE
  $ sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              the branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against
  -c, --showchanged                                                                 If provided alone shows changes
                                                                                    only.
  -d, --showdestructive                                                             If provided alone shows destructive
                                                                                    changes only.
  -i, --showinsertion                                                               If provided alone shows insertion
                                                                                    changes only.
  -n, --inputdir=<value>                                                            the root directory to compare other
                                                                                    than the sfdx-project.json default
  -o, --outfilename=<value>                                                         if provided results will be save to
                                                                                    a file using the provided name as
                                                                                    json
  -s, --silent                                                                      runs without printing to console
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  returns a diff against the specified branch

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

_See code: [src/commands/sfdx-affirm/changes.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/changes.ts)_

## `sfdx sfdx-affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Queries the provided org and tells you if it's a production org or sandbox

```
USAGE
  $ sfdx sfdx-affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Queries the provided org and tells you if it's a production org or sandbox

ALIASES
  $ sfdx affirm:form

EXAMPLES
  $ sfdx affirm:place:form
        Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrgAlias --json
        Organization.IsSandbox = true
        Org defaultOrgAlias is a Sandbox instance
    

  $ sfdx affirm:place:form -u prodAlias
        Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u prodAlias --json
        Organization.IsSandbox = false
        Org prodAlias is a Production instance
```

_See code: [src/commands/sfdx-affirm/form.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/form.ts)_

## `sfdx sfdx-affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a JWT token that can be used to auth against a connected app.

```
USAGE
  $ sfdx sfdx-affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --aud=<value>
      (required) The audience identifies the authorization server as an intended audience. The authorization server must
      verify that it’s an intended audience for the token. Use the authorization server’s URL for the audience value:
      https://login.salesforce.com, https://test.salesforce.com, or https://site.force.com/customers if implementing for
      an Experience Cloud site.

  -e, --exp=<value>
      Optional: (Default: 3) The validity must be the expiration time of the assertion within 3 minutes.

  -i, --iss=<value>
      (required) The issuer must contain the OAuth client_id or the connected app for which you registered the
      certificate.

  -p, --privatekey=<value>
      (required) the location of the private key

  -s, --sub=<value>
      (required) The subject must contain the username of the user if implementing for an Experience Cloud site.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Creates a JWT token that can be used to auth against a connected app.

ALIASES
  $ sfdx affirm:jwt

EXAMPLES
  $ sfdx affirm:jwt -p server.key -i 3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com -a https://login.salesforce.com
        Token Created:
        eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
    

  $ sfdx affirm:jwt -p server.key -i 3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com.test -a https://test.salesforce.com -e 1
        Token Created:
        eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
```

_See code: [src/commands/sfdx-affirm/jwt.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/jwt.ts)_

## `sfdx sfdx-affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page in Lightning.

```
USAGE
  $ sfdx sfdx-affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>]
    [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -c, --classic                                                                     Optional | if provided the page will
                                                                                    open in Classic otherwise it opens
                                                                                    in Lightning by default.
  -d, --deployment                                                                  Optional Path | Supports Id | Opens
                                                                                    directly to Deployment status.
  -d, --displayurl                                                                  Optional | If provided the url will
                                                                                    be printed in the terminal.
  -e, --email                                                                       Optional Path | Opens directly to
                                                                                    Email Deliverability Settings
  -i, --id=<value>                                                                  Optional | if provided with a Path
                                                                                    Flag that supports Id the specific
                                                                                    record will be opened rather than
                                                                                    the path home page.
  -n, --network                                                                     Optional Path | Opens directly to
                                                                                    Digital Experiences
  -o, --urlonly                                                                     Optional | If provided the page will
                                                                                    not be opened in a browser it will
                                                                                    just be printed in the terminal.
  -p, --profile                                                                     Optional Path | Supports Id | Opens
                                                                                    directly to Profile List Views
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --verbose                                                                         emit additional command output to
                                                                                    stdout

DESCRIPTION
  Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page
  in Lightning.

ALIASES
  $ sfdx affirm:open
  $ sfdx a:o

EXAMPLES
  $ sfdx affirm:open
          Opening Setup Home in Production Org: defaultOrg
          Done
        

  $ sfdx affirm:open --profile -u sandboxAlias
          Opening Profile List Views in Sandbox Org: sandboxAlias
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open --deployment -i 0Af6S00000pzZSS
          Opening Deployment Status in Production Org: defaultOrg
          Done
```

_See code: [src/commands/sfdx-affirm/open.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/open.ts)_

## `sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a parcel (package) using git diff

```
USAGE
  $ sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion
    <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              The branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against
  -d, --includedestructive                                                          If provided and there are
                                                                                    destructive changes you will not be
                                                                                    asked if you want to include them
  -i, --inputdir=<value>                                                            The root directory to compare other
                                                                                    than the force-app default
  -o, --outputdir=<value>                                                           The output directory to store the
                                                                                    Metadata API–formatted metadata
                                                                                    files in. Default: './parcel'
  -t, --destructivetiming=<option>                                                  Allows you to indicate if you want
                                                                                    to process the destructive changes
                                                                                    before or after the deployment.
                                                                                    options: before, after
                                                                                    <options: before|after>
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --verbose                                                                         emit additional command output to
                                                                                    stdout

DESCRIPTION
  Creates a parcel (package) using git diff

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
        Creating Destructive Package... Success: Created at releaseArtifacts/parcel/destructiveChangesPre.xml
        Cleaning Up... Success
    

  $ sfdx affirm:parcel -d -t before
        Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
        Diff Against: remotes/origin/master...pilot/affirm... Success:
        Changes: 5, Insertions: 93, Destructive: 7
        Cloning Files... Success: 100 files ready for convert
        Converting... Success
        Creating Destructive Package... Success: Created at releaseArtifacts/parcel/destructiveChangesPre.xml
        Cleaning Up... Success
```

_See code: [src/commands/sfdx-affirm/parcel.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/parcel.ts)_

## `sfdx sfdx-affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Deploys a Package to the specific place

```
USAGE
  $ sfdx sfdx-affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>]
    [--apiversion <string>] [--verbose] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --packagedir=<value>
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

  -t, --testclasses=<value>
      (Optional) Comma separated list of tests to run. If none are provided all test classes listed in any test suites
      found in the 'packagedir' will be use. If none are found and target org is production the default
      'declarativeTestClass' is NOT used.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      (Optional) The number of minutes to wait for the command to complete. Uses default 'waitTime' from AffirmSettings.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Deploys a Package to the specific place

ALIASES
  $ sfdx affirm:place

EXAMPLES
  $ sfdx affirm:place
        Selected Production Instance: personalDev
        (y/n) Are you sure you want to deploy the package located in the "releaseArtifacts/parcel" folder?: y
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Deployment Test Classes:
        MyExampleClassTest
        Validation started in personalDev with Deployment Id: 0Af6S00000qVCieSAG
        Deploying Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_18_05_43_0Af6S00000qVCieSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        ? Would you like to print or save the any of the validation results? save: all
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_18_05_43_0Af6S00000qVCieSAG.json

  $ sfdx affirm:place -s -o -e
        Selected Production Instance: personalDev
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Deployment Test Classes:
        MyExampleClassTest
        Opening Deployment Status page in personalDev for deployment: 0Af6S00000qVCjcSAG
        Deploying Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_18_14_08_0Af6S00000qVCjcSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        File Saved to: ./releaseArtifacts/deploymentResults/personalDev/2023-03-31_18_14_08_0Af6S00000qVCjcSAG.json
```

_See code: [src/commands/sfdx-affirm/place.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/place.ts)_

## `sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Validates a package against the provided org

```
USAGE
  $ sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>]
    [--apiversion <string>] [--verbose] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --packagedir=<value>
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

  -t, --testclasses=<value>
      (Optional) Comma separated list of tests to run. If none are provided all test classes listed in any test suites
      found in the 'packagedir' will be use. If none are found and target org is production the default
      'declarativeTestClass' is used if one is set.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      (Optional) The number of minutes to wait for the command to complete. Uses default 'waitTime' from AffirmSettings.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Validates a package against the provided org

ALIASES
  $ sfdx affirm:quality

EXAMPLES
  $ sfdx affirm:quality
        (y/n) Are you sure you want to use the "personalDev" org ?: y
        Selected Production Org: personalDev
        (y/n) Are you sure you want to validate the package located in the "releaseArtifacts/parcel" folder?: y
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Validating Using Provided Test Classes:
        MyExampleClassTest
        Validation started in personalDev with Deployment Id: 0Af6S00000qVCjwSAG
        Validating Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_19_36_13_0Af6S00000qVCjwSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        ? Would you like to print or save the any of the validation results? save: all
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_19_36_13_0Af6S00000qVCjwSAG.json
  

  $ sfdx affirm:quality -s -o -e
        Selected Production Org: personalDev
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Validating Using Provided Test Classes:
        MyExampleClassTest
        Opening Deployment Status page in personalDev for validation: 0Af6S00000qVCkGSAW
        Validating Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_19_38_01_0Af6S00000qVCkGSAW
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_19_38_01_0Af6S00000qVCkGSAW.json
```

_See code: [src/commands/sfdx-affirm/quality.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/quality.ts)_

## `sfdx sfdx-affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows users to configure project specific settings for Affirm

```
USAGE
  $ sfdx sfdx-affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json]
    [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --acceptdefaults
      (optional) If provided only those items provided as a flag will be changed all others will be set to the default

  -b, --primarybranch=<value>
      (optional | Default: master) The primary branch should be the remote branch that is linked to your Production
      Instance of Salesforce. Default is 'remotes/origin/master'. Helpful if you use main instead of master.

  -d, --builddir=<value>
      (optional | Default: .releaseArtifacts) The directory where build files are copied to for processing, build packages
      are saved, and validation results are saved. Default is 'releaseArtifacts'. Would recommend a folder that is ignored
      by git.

  -o, --overwrite
      (optional) Provide this if you already have a sfdx-affirm.json file in your root project directory and you don't
      want to be asked about overwriting it.

  -p, --packagedir=<value>
      (optional | Default: parcel) The default directory name for new packages. Default is 'parcel'. This folder will
      always be placed in the default builddir or the one you indicated

  -t, --declarativetestclass=<value>
      (optional | Default: undefined) The test class to use when no test classes are provided. Mainly used for declarative
      changes that don't require specific code coverage.

  -w, --waittime=<value>
      (optional | Default: 10) The default wait time for all validation, deployment and test commands. The default is '10'
      for ten minutes but you can make this lower or higher for your project.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Allows users to configure project specific settings for Affirm

ALIASES
  $ sfdx affirm:setup

EXAMPLES
  $ sfdx affirm:setup
        Provide name of remote branch related to your Production Instance  [remotes/origin/master]: remotes/origin/main
        Primary Branch set to:  remotes/origin/main
        Provide location where temp build folders and packages will be created and stored  [releaseArtifacts]: .superArtifacts
        Build Directory set to:  .superArtifacts
        Provide default directory name for new packages  [parcel]: pack
        Package Directory set to:  pack
        Provide default wait time for async commands  [10]: 5
        Wait Time set to:  5
        Provide the name of a test class you would like to run for declarative dev by default if no test suite is created : Test_DeclarativeDefault
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

_See code: [src/commands/sfdx-affirm/setup.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/setup.ts)_

## `sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a testSuite-meta.xml file with the provided list of tests.

```
USAGE
  $ sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --addtotests                                                                  Optional: Indicates that you would
                                                                                    like the provided tests to be added
                                                                                    to the existing test suite instead
                                                                                    of overwriting it.
  -n, --name=<value>                                                                Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'
  -o, --outputdir=<value>                                                           Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites
  -t, --tests=<value>                                                               Comma separated list of tests names
                                                                                    that will be used to create the test
                                                                                    suite. If none are provided you will
                                                                                    be asked to provide a list or exit.
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Creates a testSuite-meta.xml file with the provided list of tests.

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

_See code: [src/commands/sfdx-affirm/suite.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/suite.ts)_

## `sfdx sfdx-affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates or Updates a testSuite-meta.xml file using the tests from all inserted or changed test suite files in the current branch

```
USAGE
  $ sfdx sfdx-affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              Optional: the branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against
  -l, --list                                                                        Optional: if provided the tests will
                                                                                    not be merged into a single suite,
                                                                                    rather they will be collected and
                                                                                    printed one at a time to the
                                                                                    terminal
  -n, --inputdir=<value>                                                            Optional: the root directory to
                                                                                    compare other than the
                                                                                    sfdx-project.json default
  -n, --name=<value>                                                                Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'
  -o, --outputdir=<value>                                                           Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites
  -s, --string                                                                      Optional: if provided the tests will
                                                                                    not be merged into a single suite,
                                                                                    rather they will be collected and
                                                                                    printed as a single string using a
                                                                                    comma to separate.
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Creates or Updates a testSuite-meta.xml file using the tests from all inserted or changed test suite files in the
  current branch

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
    

  $ sfdx affirm:suite:merge -o releaseArtifacts/tests
      Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
      Git Diff For: remotes/origin/master...pilot/affirm
      The following 2 test suite(s) will me merged into the name-of-epic-branch test suite
      force-app/main/default/testSuites/SFDC_1###_some_branch.testSuite-meta.xml
      force-app/main/default/testSuites/SFDC_2###_some_branch1.testSuite-meta.xml
      Creating Test Suite... Success
      New Test Suite Written to: releaseArtifacts/tests/name-of-epic-branch.testSuite-meta.xml
```

_See code: [src/commands/sfdx-affirm/suite/merge.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/suite/merge.ts)_

## `sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows user to easily run the relevant tests for their current branch.

```
USAGE
  $ sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>]
    [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --alltestsuites
      (Optional) if provided then all changed or inserted test suites on the branch will be collected and their tests will
      be used. Otherwise, only the test suite with the matching branch name will be used.

  -e, --saveresults
      (Optional) if provided the result json will be saved to the default build directory. Can not be used with
      --printresults

  -l, --list=<value>
      Comma separated list of tests names that will be used to create the test suite. If none are provided you will be
      asked to provide a list or exit.

  -r, --printresults
      If provided test results will be printed without being prompted.

  -s, --silent
      (Optional) If provided you will not be prompted at all for input. If correct input isn't provided command fails.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      The number of minutes to wait for the command to complete. The default is 10.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Allows user to easily run the relevant tests for their current branch.

ALIASES
  $ sfdx affirm:tests

EXAMPLES
  $ sfdx affirm:tests
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

_See code: [src/commands/sfdx-affirm/tests.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/tests.ts)_
<!-- commandsstop -->
* [`sfdx a:o [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-ao--e--n--d--p--i-string--o--d--c--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmaudit--a-string--s-string--i-string--c-string--p-string--t-string--n-number--w-string--d-string--o--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmchanges--b-string--n-string--d--i--c--s--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmform--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmjwt--p-string--i-string--s-string--a-string--e-number---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmopen--e--n--d--p--i-string--o--d--c--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmparcel--b-string--i-string--o-string--d--t-string--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmplace--d-string--t-string--s--w-integer--r--o--e--p--n--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmquality--d-string--t-string--s--w-number--r--e--p--o--n--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmsetup--b-string--d-string--p-string--w-number--t-string--a--o---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmsuite--t-string--n-string--o-string--a---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmsuitemerge--n-string--o-string--n-string--b-string--l--s---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmtests--l-string--w-integer--r--a--e--s--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmaudit--a-string--s-string--i-string--c-string--p-string--t-string--n-number--w-string--d-string--o--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmchanges--b-string--n-string--d--i--c--s--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmform--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmjwt--p-string--i-string--s-string--a-string--e-number---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmopen--e--n--d--p--i-string--o--d--c--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmparcel--b-string--i-string--o-string--d--t-string--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmplace--d-string--t-string--s--w-integer--r--o--e--p--n--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmquality--d-string--t-string--s--w-number--r--e--p--o--n--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmsetup--b-string--d-string--p-string--w-number--t-string--a--o---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmsuite--t-string--n-string--o-string--a---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmsuitemerge--n-string--o-string--n-string--b-string--l--s---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmtests--l-string--w-integer--r--a--e--s--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx a:o [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page in Lightning.

```
USAGE
  $ sfdx a:o [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>]
    [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -c, --classic                                                                     Optional | if provided the page will
                                                                                    open in Classic otherwise it opens
                                                                                    in Lightning by default.
  -d, --deployment                                                                  Optional Path | Supports Id | Opens
                                                                                    directly to Deployment status.
  -d, --displayurl                                                                  Optional | If provided the url will
                                                                                    be printed in the terminal.
  -e, --email                                                                       Optional Path | Opens directly to
                                                                                    Email Deliverability Settings
  -i, --id=<value>                                                                  Optional | if provided with a Path
                                                                                    Flag that supports Id the specific
                                                                                    record will be opened rather than
                                                                                    the path home page.
  -n, --network                                                                     Optional Path | Opens directly to
                                                                                    Digital Experiences
  -o, --urlonly                                                                     Optional | If provided the page will
                                                                                    not be opened in a browser it will
                                                                                    just be printed in the terminal.
  -p, --profile                                                                     Optional Path | Supports Id | Opens
                                                                                    directly to Profile List Views
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --verbose                                                                         emit additional command output to
                                                                                    stdout

DESCRIPTION
  Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page
  in Lightning.

ALIASES
  $ sfdx affirm:open
  $ sfdx a:o

EXAMPLES
  $ sfdx affirm:open
          Opening Setup Home in Production Org: defaultOrg
          Done
        

  $ sfdx affirm:open --profile -u sandboxAlias
          Opening Profile List Views in Sandbox Org: sandboxAlias
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open --deployment -i 0Af6S00000pzZSS
          Opening Deployment Status in Production Org: defaultOrg
          Done
```

## `sfdx affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Queries and downloads audit logs from the target org

```
USAGE
  $ sfdx affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n
    <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --action=<value>
      Optional: Adds `Action LIKE '%PROVIDED_VALUE%'` to the queries WHERE statement. Can not be used with the 'where'
      flag.

  -c, --createdbyuser=<value>
      Optional: Adds `CreatedBy.Username = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag.

  -d, --savedir=<value>
      Optional: Provide if you would like to save the file to a directory other than the projects 'buildDirectory'. Can
      not be used with the 'printonly' flag.

  -i, --display=<value>
      Optional: Filters all returned records by looking for the provided string in the `SetupAuditTrail.Display` field.

  -n, --lastndays=<value>
      Optional: Adds `CreatedDate <= LAST_N_DAYS:PROVIDED_VALUE` to the queries WHERE statement. Can not be used with the
      'where' flag. Can not be used with the 'date' flag.

  -o, --printonly
      Optional: provide if you would like to print the results to the terminal only. Can not be used with the 'savedir'
      flag.

  -p, --createdbyprofile=<value>
      Optional: Adds `CreatedBy.Profile.Name = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag.

  -s, --section=<value>
      Optional: Filters all returned records by looking for the provided string in the `SetupAuditTrail.Section` field.

  -t, --date=<value>
      Optional: Adds `DAY_ONLY(CreatedDate) = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag. Can not be used with the 'lastndays' flag.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --where=<value>
      Optional: provide your own custom where clause. Can not be used with any of the other filter flags.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Queries and downloads audit logs from the target org

ALIASES
  $ sfdx affirm:audit

EXAMPLES
  $ sfdx affirm:place:audit
        Running Command:
        sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail ORDER BY CreatedDate DESC" -u defaultUser --json
        Processing Query Results... Done. Found 1222 results
        File Saved to: ./releaseArtifacts/auditResults/defaultUser/2021_08_27T17_26_15_429Z.json
    

  $ sfdx affirm:place:audit -n 30 -p "System Administrator" -a caselayout -u aliasName
        Running Command:
        sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail
        WHERE CreatedDate >= LAST_N_DAYS:30 AND Action LIKE '%caselayout%' AND CreatedBy.Profile.Name = 'System Administrator' ORDER BY CreatedDate DESC" -u aliasName --json
        Processing Query Results... Done. Found 45 results
        File Saved to: ./releaseArtifacts/auditResults/aliasName/2021_08_27T17_22_12_164Z.json
```

## `sfdx affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

returns a diff against the specified branch

```
USAGE
  $ sfdx affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              the branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against
  -c, --showchanged                                                                 If provided alone shows changes
                                                                                    only.
  -d, --showdestructive                                                             If provided alone shows destructive
                                                                                    changes only.
  -i, --showinsertion                                                               If provided alone shows insertion
                                                                                    changes only.
  -n, --inputdir=<value>                                                            the root directory to compare other
                                                                                    than the sfdx-project.json default
  -o, --outfilename=<value>                                                         if provided results will be save to
                                                                                    a file using the provided name as
                                                                                    json
  -s, --silent                                                                      runs without printing to console
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  returns a diff against the specified branch

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

## `sfdx affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Queries the provided org and tells you if it's a production org or sandbox

```
USAGE
  $ sfdx affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Queries the provided org and tells you if it's a production org or sandbox

ALIASES
  $ sfdx affirm:form

EXAMPLES
  $ sfdx affirm:place:form
        Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrgAlias --json
        Organization.IsSandbox = true
        Org defaultOrgAlias is a Sandbox instance
    

  $ sfdx affirm:place:form -u prodAlias
        Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u prodAlias --json
        Organization.IsSandbox = false
        Org prodAlias is a Production instance
```

## `sfdx affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a JWT token that can be used to auth against a connected app.

```
USAGE
  $ sfdx affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --aud=<value>
      (required) The audience identifies the authorization server as an intended audience. The authorization server must
      verify that it’s an intended audience for the token. Use the authorization server’s URL for the audience value:
      https://login.salesforce.com, https://test.salesforce.com, or https://site.force.com/customers if implementing for
      an Experience Cloud site.

  -e, --exp=<value>
      Optional: (Default: 3) The validity must be the expiration time of the assertion within 3 minutes.

  -i, --iss=<value>
      (required) The issuer must contain the OAuth client_id or the connected app for which you registered the
      certificate.

  -p, --privatekey=<value>
      (required) the location of the private key

  -s, --sub=<value>
      (required) The subject must contain the username of the user if implementing for an Experience Cloud site.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Creates a JWT token that can be used to auth against a connected app.

ALIASES
  $ sfdx affirm:jwt

EXAMPLES
  $ sfdx affirm:jwt -p server.key -i 3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com -a https://login.salesforce.com
        Token Created:
        eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
    

  $ sfdx affirm:jwt -p server.key -i 3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com.test -a https://test.salesforce.com -e 1
        Token Created:
        eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
```

## `sfdx affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page in Lightning.

```
USAGE
  $ sfdx affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>]
    [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -c, --classic                                                                     Optional | if provided the page will
                                                                                    open in Classic otherwise it opens
                                                                                    in Lightning by default.
  -d, --deployment                                                                  Optional Path | Supports Id | Opens
                                                                                    directly to Deployment status.
  -d, --displayurl                                                                  Optional | If provided the url will
                                                                                    be printed in the terminal.
  -e, --email                                                                       Optional Path | Opens directly to
                                                                                    Email Deliverability Settings
  -i, --id=<value>                                                                  Optional | if provided with a Path
                                                                                    Flag that supports Id the specific
                                                                                    record will be opened rather than
                                                                                    the path home page.
  -n, --network                                                                     Optional Path | Opens directly to
                                                                                    Digital Experiences
  -o, --urlonly                                                                     Optional | If provided the page will
                                                                                    not be opened in a browser it will
                                                                                    just be printed in the terminal.
  -p, --profile                                                                     Optional Path | Supports Id | Opens
                                                                                    directly to Profile List Views
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --verbose                                                                         emit additional command output to
                                                                                    stdout

DESCRIPTION
  Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page
  in Lightning.

ALIASES
  $ sfdx affirm:open
  $ sfdx a:o

EXAMPLES
  $ sfdx affirm:open
          Opening Setup Home in Production Org: defaultOrg
          Done
        

  $ sfdx affirm:open --profile -u sandboxAlias
          Opening Profile List Views in Sandbox Org: sandboxAlias
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open --deployment -i 0Af6S00000pzZSS
          Opening Deployment Status in Production Org: defaultOrg
          Done
```

## `sfdx affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a parcel (package) using git diff

```
USAGE
  $ sfdx affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion
    <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              The branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against
  -d, --includedestructive                                                          If provided and there are
                                                                                    destructive changes you will not be
                                                                                    asked if you want to include them
  -i, --inputdir=<value>                                                            The root directory to compare other
                                                                                    than the force-app default
  -o, --outputdir=<value>                                                           The output directory to store the
                                                                                    Metadata API–formatted metadata
                                                                                    files in. Default: './parcel'
  -t, --destructivetiming=<option>                                                  Allows you to indicate if you want
                                                                                    to process the destructive changes
                                                                                    before or after the deployment.
                                                                                    options: before, after
                                                                                    <options: before|after>
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --verbose                                                                         emit additional command output to
                                                                                    stdout

DESCRIPTION
  Creates a parcel (package) using git diff

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
        Creating Destructive Package... Success: Created at releaseArtifacts/parcel/destructiveChangesPre.xml
        Cleaning Up... Success
    

  $ sfdx affirm:parcel -d -t before
        Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
        Diff Against: remotes/origin/master...pilot/affirm... Success:
        Changes: 5, Insertions: 93, Destructive: 7
        Cloning Files... Success: 100 files ready for convert
        Converting... Success
        Creating Destructive Package... Success: Created at releaseArtifacts/parcel/destructiveChangesPre.xml
        Cleaning Up... Success
```

## `sfdx affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Deploys a Package to the specific place

```
USAGE
  $ sfdx affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>]
    [--apiversion <string>] [--verbose] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --packagedir=<value>
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

  -t, --testclasses=<value>
      (Optional) Comma separated list of tests to run. If none are provided all test classes listed in any test suites
      found in the 'packagedir' will be use. If none are found and target org is production the default
      'declarativeTestClass' is NOT used.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      (Optional) The number of minutes to wait for the command to complete. Uses default 'waitTime' from AffirmSettings.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Deploys a Package to the specific place

ALIASES
  $ sfdx affirm:place

EXAMPLES
  $ sfdx affirm:place
        Selected Production Instance: personalDev
        (y/n) Are you sure you want to deploy the package located in the "releaseArtifacts/parcel" folder?: y
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Deployment Test Classes:
        MyExampleClassTest
        Validation started in personalDev with Deployment Id: 0Af6S00000qVCieSAG
        Deploying Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_18_05_43_0Af6S00000qVCieSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        ? Would you like to print or save the any of the validation results? save: all
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_18_05_43_0Af6S00000qVCieSAG.json

  $ sfdx affirm:place -s -o -e
        Selected Production Instance: personalDev
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Deployment Test Classes:
        MyExampleClassTest
        Opening Deployment Status page in personalDev for deployment: 0Af6S00000qVCjcSAG
        Deploying Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_18_14_08_0Af6S00000qVCjcSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        File Saved to: ./releaseArtifacts/deploymentResults/personalDev/2023-03-31_18_14_08_0Af6S00000qVCjcSAG.json
```

## `sfdx affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Validates a package against the provided org

```
USAGE
  $ sfdx affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>]
    [--apiversion <string>] [--verbose] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --packagedir=<value>
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

  -t, --testclasses=<value>
      (Optional) Comma separated list of tests to run. If none are provided all test classes listed in any test suites
      found in the 'packagedir' will be use. If none are found and target org is production the default
      'declarativeTestClass' is used if one is set.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      (Optional) The number of minutes to wait for the command to complete. Uses default 'waitTime' from AffirmSettings.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Validates a package against the provided org

ALIASES
  $ sfdx affirm:quality

EXAMPLES
  $ sfdx affirm:quality
        (y/n) Are you sure you want to use the "personalDev" org ?: y
        Selected Production Org: personalDev
        (y/n) Are you sure you want to validate the package located in the "releaseArtifacts/parcel" folder?: y
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Validating Using Provided Test Classes:
        MyExampleClassTest
        Validation started in personalDev with Deployment Id: 0Af6S00000qVCjwSAG
        Validating Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_19_36_13_0Af6S00000qVCjwSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        ? Would you like to print or save the any of the validation results? save: all
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_19_36_13_0Af6S00000qVCjwSAG.json
  

  $ sfdx affirm:quality -s -o -e
        Selected Production Org: personalDev
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Validating Using Provided Test Classes:
        MyExampleClassTest
        Opening Deployment Status page in personalDev for validation: 0Af6S00000qVCkGSAW
        Validating Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_19_38_01_0Af6S00000qVCkGSAW
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_19_38_01_0Af6S00000qVCkGSAW.json
```

## `sfdx affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows users to configure project specific settings for Affirm

```
USAGE
  $ sfdx affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json]
    [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --acceptdefaults
      (optional) If provided only those items provided as a flag will be changed all others will be set to the default

  -b, --primarybranch=<value>
      (optional | Default: master) The primary branch should be the remote branch that is linked to your Production
      Instance of Salesforce. Default is 'remotes/origin/master'. Helpful if you use main instead of master.

  -d, --builddir=<value>
      (optional | Default: .releaseArtifacts) The directory where build files are copied to for processing, build packages
      are saved, and validation results are saved. Default is 'releaseArtifacts'. Would recommend a folder that is ignored
      by git.

  -o, --overwrite
      (optional) Provide this if you already have a sfdx-affirm.json file in your root project directory and you don't
      want to be asked about overwriting it.

  -p, --packagedir=<value>
      (optional | Default: parcel) The default directory name for new packages. Default is 'parcel'. This folder will
      always be placed in the default builddir or the one you indicated

  -t, --declarativetestclass=<value>
      (optional | Default: undefined) The test class to use when no test classes are provided. Mainly used for declarative
      changes that don't require specific code coverage.

  -w, --waittime=<value>
      (optional | Default: 10) The default wait time for all validation, deployment and test commands. The default is '10'
      for ten minutes but you can make this lower or higher for your project.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Allows users to configure project specific settings for Affirm

ALIASES
  $ sfdx affirm:setup

EXAMPLES
  $ sfdx affirm:setup
        Provide name of remote branch related to your Production Instance  [remotes/origin/master]: remotes/origin/main
        Primary Branch set to:  remotes/origin/main
        Provide location where temp build folders and packages will be created and stored  [releaseArtifacts]: .superArtifacts
        Build Directory set to:  .superArtifacts
        Provide default directory name for new packages  [parcel]: pack
        Package Directory set to:  pack
        Provide default wait time for async commands  [10]: 5
        Wait Time set to:  5
        Provide the name of a test class you would like to run for declarative dev by default if no test suite is created : Test_DeclarativeDefault
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

## `sfdx affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a testSuite-meta.xml file with the provided list of tests.

```
USAGE
  $ sfdx affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --addtotests                                                                  Optional: Indicates that you would
                                                                                    like the provided tests to be added
                                                                                    to the existing test suite instead
                                                                                    of overwriting it.
  -n, --name=<value>                                                                Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'
  -o, --outputdir=<value>                                                           Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites
  -t, --tests=<value>                                                               Comma separated list of tests names
                                                                                    that will be used to create the test
                                                                                    suite. If none are provided you will
                                                                                    be asked to provide a list or exit.
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Creates a testSuite-meta.xml file with the provided list of tests.

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

## `sfdx affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates or Updates a testSuite-meta.xml file using the tests from all inserted or changed test suite files in the current branch

```
USAGE
  $ sfdx affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              Optional: the branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against
  -l, --list                                                                        Optional: if provided the tests will
                                                                                    not be merged into a single suite,
                                                                                    rather they will be collected and
                                                                                    printed one at a time to the
                                                                                    terminal
  -n, --inputdir=<value>                                                            Optional: the root directory to
                                                                                    compare other than the
                                                                                    sfdx-project.json default
  -n, --name=<value>                                                                Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'
  -o, --outputdir=<value>                                                           Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites
  -s, --string                                                                      Optional: if provided the tests will
                                                                                    not be merged into a single suite,
                                                                                    rather they will be collected and
                                                                                    printed as a single string using a
                                                                                    comma to separate.
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Creates or Updates a testSuite-meta.xml file using the tests from all inserted or changed test suite files in the
  current branch

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
    

  $ sfdx affirm:suite:merge -o releaseArtifacts/tests
      Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
      Git Diff For: remotes/origin/master...pilot/affirm
      The following 2 test suite(s) will me merged into the name-of-epic-branch test suite
      force-app/main/default/testSuites/SFDC_1###_some_branch.testSuite-meta.xml
      force-app/main/default/testSuites/SFDC_2###_some_branch1.testSuite-meta.xml
      Creating Test Suite... Success
      New Test Suite Written to: releaseArtifacts/tests/name-of-epic-branch.testSuite-meta.xml
```

## `sfdx affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows user to easily run the relevant tests for their current branch.

```
USAGE
  $ sfdx affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>]
    [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --alltestsuites
      (Optional) if provided then all changed or inserted test suites on the branch will be collected and their tests will
      be used. Otherwise, only the test suite with the matching branch name will be used.

  -e, --saveresults
      (Optional) if provided the result json will be saved to the default build directory. Can not be used with
      --printresults

  -l, --list=<value>
      Comma separated list of tests names that will be used to create the test suite. If none are provided you will be
      asked to provide a list or exit.

  -r, --printresults
      If provided test results will be printed without being prompted.

  -s, --silent
      (Optional) If provided you will not be prompted at all for input. If correct input isn't provided command fails.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      The number of minutes to wait for the command to complete. The default is 10.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Allows user to easily run the relevant tests for their current branch.

ALIASES
  $ sfdx affirm:tests

EXAMPLES
  $ sfdx affirm:tests
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

## `sfdx sfdx-affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Queries and downloads audit logs from the target org

```
USAGE
  $ sfdx sfdx-affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n
    <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --action=<value>
      Optional: Adds `Action LIKE '%PROVIDED_VALUE%'` to the queries WHERE statement. Can not be used with the 'where'
      flag.

  -c, --createdbyuser=<value>
      Optional: Adds `CreatedBy.Username = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag.

  -d, --savedir=<value>
      Optional: Provide if you would like to save the file to a directory other than the projects 'buildDirectory'. Can
      not be used with the 'printonly' flag.

  -i, --display=<value>
      Optional: Filters all returned records by looking for the provided string in the `SetupAuditTrail.Display` field.

  -n, --lastndays=<value>
      Optional: Adds `CreatedDate <= LAST_N_DAYS:PROVIDED_VALUE` to the queries WHERE statement. Can not be used with the
      'where' flag. Can not be used with the 'date' flag.

  -o, --printonly
      Optional: provide if you would like to print the results to the terminal only. Can not be used with the 'savedir'
      flag.

  -p, --createdbyprofile=<value>
      Optional: Adds `CreatedBy.Profile.Name = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag.

  -s, --section=<value>
      Optional: Filters all returned records by looking for the provided string in the `SetupAuditTrail.Section` field.

  -t, --date=<value>
      Optional: Adds `DAY_ONLY(CreatedDate) = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag. Can not be used with the 'lastndays' flag.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --where=<value>
      Optional: provide your own custom where clause. Can not be used with any of the other filter flags.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Queries and downloads audit logs from the target org

ALIASES
  $ sfdx affirm:audit

EXAMPLES
  $ sfdx affirm:place:audit
        Running Command:
        sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail ORDER BY CreatedDate DESC" -u defaultUser --json
        Processing Query Results... Done. Found 1222 results
        File Saved to: ./releaseArtifacts/auditResults/defaultUser/2021_08_27T17_26_15_429Z.json
    

  $ sfdx affirm:place:audit -n 30 -p "System Administrator" -a caselayout -u aliasName
        Running Command:
        sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail
        WHERE CreatedDate >= LAST_N_DAYS:30 AND Action LIKE '%caselayout%' AND CreatedBy.Profile.Name = 'System Administrator' ORDER BY CreatedDate DESC" -u aliasName --json
        Processing Query Results... Done. Found 45 results
        File Saved to: ./releaseArtifacts/auditResults/aliasName/2021_08_27T17_22_12_164Z.json
```

_See code: [src/commands/sfdx-affirm/audit.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/audit.ts)_

## `sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

returns a diff against the specified branch

```
USAGE
  $ sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              the branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against
  -c, --showchanged                                                                 If provided alone shows changes
                                                                                    only.
  -d, --showdestructive                                                             If provided alone shows destructive
                                                                                    changes only.
  -i, --showinsertion                                                               If provided alone shows insertion
                                                                                    changes only.
  -n, --inputdir=<value>                                                            the root directory to compare other
                                                                                    than the sfdx-project.json default
  -o, --outfilename=<value>                                                         if provided results will be save to
                                                                                    a file using the provided name as
                                                                                    json
  -s, --silent                                                                      runs without printing to console
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  returns a diff against the specified branch

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

_See code: [src/commands/sfdx-affirm/changes.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/changes.ts)_

## `sfdx sfdx-affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Queries the provided org and tells you if it's a production org or sandbox

```
USAGE
  $ sfdx sfdx-affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Queries the provided org and tells you if it's a production org or sandbox

ALIASES
  $ sfdx affirm:form

EXAMPLES
  $ sfdx affirm:place:form
        Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrgAlias --json
        Organization.IsSandbox = true
        Org defaultOrgAlias is a Sandbox instance
    

  $ sfdx affirm:place:form -u prodAlias
        Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u prodAlias --json
        Organization.IsSandbox = false
        Org prodAlias is a Production instance
```

_See code: [src/commands/sfdx-affirm/form.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/form.ts)_

## `sfdx sfdx-affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a JWT token that can be used to auth against a connected app.

```
USAGE
  $ sfdx sfdx-affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --aud=<value>
      (required) The audience identifies the authorization server as an intended audience. The authorization server must
      verify that it’s an intended audience for the token. Use the authorization server’s URL for the audience value:
      https://login.salesforce.com, https://test.salesforce.com, or https://site.force.com/customers if implementing for
      an Experience Cloud site.

  -e, --exp=<value>
      Optional: (Default: 3) The validity must be the expiration time of the assertion within 3 minutes.

  -i, --iss=<value>
      (required) The issuer must contain the OAuth client_id or the connected app for which you registered the
      certificate.

  -p, --privatekey=<value>
      (required) the location of the private key

  -s, --sub=<value>
      (required) The subject must contain the username of the user if implementing for an Experience Cloud site.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Creates a JWT token that can be used to auth against a connected app.

ALIASES
  $ sfdx affirm:jwt

EXAMPLES
  $ sfdx affirm:jwt -p server.key -i 3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com -a https://login.salesforce.com
        Token Created:
        eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
    

  $ sfdx affirm:jwt -p server.key -i 3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com.test -a https://test.salesforce.com -e 1
        Token Created:
        eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
```

_See code: [src/commands/sfdx-affirm/jwt.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/jwt.ts)_

## `sfdx sfdx-affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page in Lightning.

```
USAGE
  $ sfdx sfdx-affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>]
    [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -c, --classic                                                                     Optional | if provided the page will
                                                                                    open in Classic otherwise it opens
                                                                                    in Lightning by default.
  -d, --deployment                                                                  Optional Path | Supports Id | Opens
                                                                                    directly to Deployment status.
  -d, --displayurl                                                                  Optional | If provided the url will
                                                                                    be printed in the terminal.
  -e, --email                                                                       Optional Path | Opens directly to
                                                                                    Email Deliverability Settings
  -i, --id=<value>                                                                  Optional | if provided with a Path
                                                                                    Flag that supports Id the specific
                                                                                    record will be opened rather than
                                                                                    the path home page.
  -n, --network                                                                     Optional Path | Opens directly to
                                                                                    Digital Experiences
  -o, --urlonly                                                                     Optional | If provided the page will
                                                                                    not be opened in a browser it will
                                                                                    just be printed in the terminal.
  -p, --profile                                                                     Optional Path | Supports Id | Opens
                                                                                    directly to Profile List Views
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --verbose                                                                         emit additional command output to
                                                                                    stdout

DESCRIPTION
  Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page
  in Lightning.

ALIASES
  $ sfdx affirm:open
  $ sfdx a:o

EXAMPLES
  $ sfdx affirm:open
          Opening Setup Home in Production Org: defaultOrg
          Done
        

  $ sfdx affirm:open --profile -u sandboxAlias
          Opening Profile List Views in Sandbox Org: sandboxAlias
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open --deployment -i 0Af6S00000pzZSS
          Opening Deployment Status in Production Org: defaultOrg
          Done
```

_See code: [src/commands/sfdx-affirm/open.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/open.ts)_

## `sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a parcel (package) using git diff

```
USAGE
  $ sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion
    <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              The branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against
  -d, --includedestructive                                                          If provided and there are
                                                                                    destructive changes you will not be
                                                                                    asked if you want to include them
  -i, --inputdir=<value>                                                            The root directory to compare other
                                                                                    than the force-app default
  -o, --outputdir=<value>                                                           The output directory to store the
                                                                                    Metadata API–formatted metadata
                                                                                    files in. Default: './parcel'
  -t, --destructivetiming=<option>                                                  Allows you to indicate if you want
                                                                                    to process the destructive changes
                                                                                    before or after the deployment.
                                                                                    options: before, after
                                                                                    <options: before|after>
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --verbose                                                                         emit additional command output to
                                                                                    stdout

DESCRIPTION
  Creates a parcel (package) using git diff

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
        Creating Destructive Package... Success: Created at releaseArtifacts/parcel/destructiveChangesPre.xml
        Cleaning Up... Success
    

  $ sfdx affirm:parcel -d -t before
        Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
        Diff Against: remotes/origin/master...pilot/affirm... Success:
        Changes: 5, Insertions: 93, Destructive: 7
        Cloning Files... Success: 100 files ready for convert
        Converting... Success
        Creating Destructive Package... Success: Created at releaseArtifacts/parcel/destructiveChangesPre.xml
        Cleaning Up... Success
```

_See code: [src/commands/sfdx-affirm/parcel.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/parcel.ts)_

## `sfdx sfdx-affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Deploys a Package to the specific place

```
USAGE
  $ sfdx sfdx-affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>]
    [--apiversion <string>] [--verbose] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --packagedir=<value>
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

  -t, --testclasses=<value>
      (Optional) Comma separated list of tests to run. If none are provided all test classes listed in any test suites
      found in the 'packagedir' will be use. If none are found and target org is production the default
      'declarativeTestClass' is NOT used.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      (Optional) The number of minutes to wait for the command to complete. Uses default 'waitTime' from AffirmSettings.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Deploys a Package to the specific place

ALIASES
  $ sfdx affirm:place

EXAMPLES
  $ sfdx affirm:place
        Selected Production Instance: personalDev
        (y/n) Are you sure you want to deploy the package located in the "releaseArtifacts/parcel" folder?: y
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Deployment Test Classes:
        MyExampleClassTest
        Validation started in personalDev with Deployment Id: 0Af6S00000qVCieSAG
        Deploying Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_18_05_43_0Af6S00000qVCieSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        ? Would you like to print or save the any of the validation results? save: all
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_18_05_43_0Af6S00000qVCieSAG.json

  $ sfdx affirm:place -s -o -e
        Selected Production Instance: personalDev
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Deployment Test Classes:
        MyExampleClassTest
        Opening Deployment Status page in personalDev for deployment: 0Af6S00000qVCjcSAG
        Deploying Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_18_14_08_0Af6S00000qVCjcSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        File Saved to: ./releaseArtifacts/deploymentResults/personalDev/2023-03-31_18_14_08_0Af6S00000qVCjcSAG.json
```

_See code: [src/commands/sfdx-affirm/place.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/place.ts)_

## `sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Validates a package against the provided org

```
USAGE
  $ sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>]
    [--apiversion <string>] [--verbose] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --packagedir=<value>
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

  -t, --testclasses=<value>
      (Optional) Comma separated list of tests to run. If none are provided all test classes listed in any test suites
      found in the 'packagedir' will be use. If none are found and target org is production the default
      'declarativeTestClass' is used if one is set.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      (Optional) The number of minutes to wait for the command to complete. Uses default 'waitTime' from AffirmSettings.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Validates a package against the provided org

ALIASES
  $ sfdx affirm:quality

EXAMPLES
  $ sfdx affirm:quality
        (y/n) Are you sure you want to use the "personalDev" org ?: y
        Selected Production Org: personalDev
        (y/n) Are you sure you want to validate the package located in the "releaseArtifacts/parcel" folder?: y
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Validating Using Provided Test Classes:
        MyExampleClassTest
        Validation started in personalDev with Deployment Id: 0Af6S00000qVCjwSAG
        Validating Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_19_36_13_0Af6S00000qVCjwSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        ? Would you like to print or save the any of the validation results? save: all
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_19_36_13_0Af6S00000qVCjwSAG.json
  

  $ sfdx affirm:quality -s -o -e
        Selected Production Org: personalDev
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Validating Using Provided Test Classes:
        MyExampleClassTest
        Opening Deployment Status page in personalDev for validation: 0Af6S00000qVCkGSAW
        Validating Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_19_38_01_0Af6S00000qVCkGSAW
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_19_38_01_0Af6S00000qVCkGSAW.json
```

_See code: [src/commands/sfdx-affirm/quality.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/quality.ts)_

## `sfdx sfdx-affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows users to configure project specific settings for Affirm

```
USAGE
  $ sfdx sfdx-affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json]
    [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --acceptdefaults
      (optional) If provided only those items provided as a flag will be changed all others will be set to the default

  -b, --primarybranch=<value>
      (optional | Default: master) The primary branch should be the remote branch that is linked to your Production
      Instance of Salesforce. Default is 'remotes/origin/master'. Helpful if you use main instead of master.

  -d, --builddir=<value>
      (optional | Default: .releaseArtifacts) The directory where build files are copied to for processing, build packages
      are saved, and validation results are saved. Default is 'releaseArtifacts'. Would recommend a folder that is ignored
      by git.

  -o, --overwrite
      (optional) Provide this if you already have a sfdx-affirm.json file in your root project directory and you don't
      want to be asked about overwriting it.

  -p, --packagedir=<value>
      (optional | Default: parcel) The default directory name for new packages. Default is 'parcel'. This folder will
      always be placed in the default builddir or the one you indicated

  -t, --declarativetestclass=<value>
      (optional | Default: undefined) The test class to use when no test classes are provided. Mainly used for declarative
      changes that don't require specific code coverage.

  -w, --waittime=<value>
      (optional | Default: 10) The default wait time for all validation, deployment and test commands. The default is '10'
      for ten minutes but you can make this lower or higher for your project.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Allows users to configure project specific settings for Affirm

ALIASES
  $ sfdx affirm:setup

EXAMPLES
  $ sfdx affirm:setup
        Provide name of remote branch related to your Production Instance  [remotes/origin/master]: remotes/origin/main
        Primary Branch set to:  remotes/origin/main
        Provide location where temp build folders and packages will be created and stored  [releaseArtifacts]: .superArtifacts
        Build Directory set to:  .superArtifacts
        Provide default directory name for new packages  [parcel]: pack
        Package Directory set to:  pack
        Provide default wait time for async commands  [10]: 5
        Wait Time set to:  5
        Provide the name of a test class you would like to run for declarative dev by default if no test suite is created : Test_DeclarativeDefault
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

_See code: [src/commands/sfdx-affirm/setup.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/setup.ts)_

## `sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a testSuite-meta.xml file with the provided list of tests.

```
USAGE
  $ sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --addtotests                                                                  Optional: Indicates that you would
                                                                                    like the provided tests to be added
                                                                                    to the existing test suite instead
                                                                                    of overwriting it.
  -n, --name=<value>                                                                Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'
  -o, --outputdir=<value>                                                           Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites
  -t, --tests=<value>                                                               Comma separated list of tests names
                                                                                    that will be used to create the test
                                                                                    suite. If none are provided you will
                                                                                    be asked to provide a list or exit.
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Creates a testSuite-meta.xml file with the provided list of tests.

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

_See code: [src/commands/sfdx-affirm/suite.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/suite.ts)_

## `sfdx sfdx-affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates or Updates a testSuite-meta.xml file using the tests from all inserted or changed test suite files in the current branch

```
USAGE
  $ sfdx sfdx-affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              Optional: the branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against
  -l, --list                                                                        Optional: if provided the tests will
                                                                                    not be merged into a single suite,
                                                                                    rather they will be collected and
                                                                                    printed one at a time to the
                                                                                    terminal
  -n, --inputdir=<value>                                                            Optional: the root directory to
                                                                                    compare other than the
                                                                                    sfdx-project.json default
  -n, --name=<value>                                                                Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'
  -o, --outputdir=<value>                                                           Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites
  -s, --string                                                                      Optional: if provided the tests will
                                                                                    not be merged into a single suite,
                                                                                    rather they will be collected and
                                                                                    printed as a single string using a
                                                                                    comma to separate.
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Creates or Updates a testSuite-meta.xml file using the tests from all inserted or changed test suite files in the
  current branch

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
    

  $ sfdx affirm:suite:merge -o releaseArtifacts/tests
      Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
      Git Diff For: remotes/origin/master...pilot/affirm
      The following 2 test suite(s) will me merged into the name-of-epic-branch test suite
      force-app/main/default/testSuites/SFDC_1###_some_branch.testSuite-meta.xml
      force-app/main/default/testSuites/SFDC_2###_some_branch1.testSuite-meta.xml
      Creating Test Suite... Success
      New Test Suite Written to: releaseArtifacts/tests/name-of-epic-branch.testSuite-meta.xml
```

_See code: [src/commands/sfdx-affirm/suite/merge.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/suite/merge.ts)_

## `sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows user to easily run the relevant tests for their current branch.

```
USAGE
  $ sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>]
    [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --alltestsuites
      (Optional) if provided then all changed or inserted test suites on the branch will be collected and their tests will
      be used. Otherwise, only the test suite with the matching branch name will be used.

  -e, --saveresults
      (Optional) if provided the result json will be saved to the default build directory. Can not be used with
      --printresults

  -l, --list=<value>
      Comma separated list of tests names that will be used to create the test suite. If none are provided you will be
      asked to provide a list or exit.

  -r, --printresults
      If provided test results will be printed without being prompted.

  -s, --silent
      (Optional) If provided you will not be prompted at all for input. If correct input isn't provided command fails.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      The number of minutes to wait for the command to complete. The default is 10.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Allows user to easily run the relevant tests for their current branch.

ALIASES
  $ sfdx affirm:tests

EXAMPLES
  $ sfdx affirm:tests
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

_See code: [src/commands/sfdx-affirm/tests.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/tests.ts)_
<!-- commandsstop -->
* [`sfdx a:o [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-ao--e--n--d--p--i-string--o--d--c--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmaudit--a-string--s-string--i-string--c-string--p-string--t-string--n-number--w-string--d-string--o--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmchanges--b-string--n-string--d--i--c--s--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmform--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmjwt--p-string--i-string--s-string--a-string--e-number---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmopen--e--n--d--p--i-string--o--d--c--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmparcel--b-string--i-string--o-string--d--t-string--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmplace--d-string--t-string--s--w-integer--r--o--e--p--n--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmquality--d-string--t-string--s--w-number--r--e--p--o--n--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmsetup--b-string--d-string--p-string--w-number--t-string--a--o---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmsuite--t-string--n-string--o-string--a---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmsuitemerge--n-string--o-string--n-string--b-string--l--s---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-affirmtests--l-string--w-integer--r--a--e--s--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmaudit--a-string--s-string--i-string--c-string--p-string--t-string--n-number--w-string--d-string--o--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmchanges--b-string--n-string--d--i--c--s--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmform--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmjwt--p-string--i-string--s-string--a-string--e-number---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmopen--e--n--d--p--i-string--o--d--c--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmparcel--b-string--i-string--o-string--d--t-string--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmplace--d-string--t-string--s--w-integer--r--o--e--p--n--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmquality--d-string--t-string--s--w-number--r--e--p--o--n--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmsetup--b-string--d-string--p-string--w-number--t-string--a--o---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmsuite--t-string--n-string--o-string--a---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmsuitemerge--n-string--o-string--n-string--b-string--l--s---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfdx-affirmtests--l-string--w-integer--r--a--e--s--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx a:o [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page in Lightning.

```
USAGE
  $ sfdx a:o [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>]
    [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -c, --classic                                                                     Optional | if provided the page will
                                                                                    open in Classic otherwise it opens
                                                                                    in Lightning by default.
  -d, --deployment                                                                  Optional Path | Supports Id | Opens
                                                                                    directly to Deployment status.
  -d, --displayurl                                                                  Optional | If provided the url will
                                                                                    be printed in the terminal.
  -e, --email                                                                       Optional Path | Opens directly to
                                                                                    Email Deliverability Settings
  -i, --id=<value>                                                                  Optional | if provided with a Path
                                                                                    Flag that supports Id the specific
                                                                                    record will be opened rather than
                                                                                    the path home page.
  -n, --network                                                                     Optional Path | Opens directly to
                                                                                    Digital Experiences
  -o, --urlonly                                                                     Optional | If provided the page will
                                                                                    not be opened in a browser it will
                                                                                    just be printed in the terminal.
  -p, --profile                                                                     Optional Path | Supports Id | Opens
                                                                                    directly to Profile List Views
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --verbose                                                                         emit additional command output to
                                                                                    stdout

DESCRIPTION
  Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page
  in Lightning.

ALIASES
  $ sfdx affirm:open
  $ sfdx a:o

EXAMPLES
  $ sfdx affirm:open
          Opening Setup Home in Production Org: defaultOrg
          Done
        

  $ sfdx affirm:open --profile -u sandboxAlias
          Opening Profile List Views in Sandbox Org: sandboxAlias
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open --deployment -i 0Af6S00000pzZSS
          Opening Deployment Status in Production Org: defaultOrg
          Done
```

## `sfdx affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Queries and downloads audit logs from the target org

```
USAGE
  $ sfdx affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n
    <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --action=<value>
      Optional: Adds `Action LIKE '%PROVIDED_VALUE%'` to the queries WHERE statement. Can not be used with the 'where'
      flag.

  -c, --createdbyuser=<value>
      Optional: Adds `CreatedBy.Username = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag.

  -d, --savedir=<value>
      Optional: Provide if you would like to save the file to a directory other than the projects 'buildDirectory'. Can
      not be used with the 'printonly' flag.

  -i, --display=<value>
      Optional: Filters all returned records by looking for the provided string in the `SetupAuditTrail.Display` field.

  -n, --lastndays=<value>
      Optional: Adds `CreatedDate <= LAST_N_DAYS:PROVIDED_VALUE` to the queries WHERE statement. Can not be used with the
      'where' flag. Can not be used with the 'date' flag.

  -o, --printonly
      Optional: provide if you would like to print the results to the terminal only. Can not be used with the 'savedir'
      flag.

  -p, --createdbyprofile=<value>
      Optional: Adds `CreatedBy.Profile.Name = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag.

  -s, --section=<value>
      Optional: Filters all returned records by looking for the provided string in the `SetupAuditTrail.Section` field.

  -t, --date=<value>
      Optional: Adds `DAY_ONLY(CreatedDate) = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag. Can not be used with the 'lastndays' flag.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --where=<value>
      Optional: provide your own custom where clause. Can not be used with any of the other filter flags.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Queries and downloads audit logs from the target org

ALIASES
  $ sfdx affirm:audit

EXAMPLES
  $ sfdx affirm:place:audit
        Running Command:
        sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail ORDER BY CreatedDate DESC" -u defaultUser --json
        Processing Query Results... Done. Found 1222 results
        File Saved to: ./releaseArtifacts/auditResults/defaultUser/2021_08_27T17_26_15_429Z.json
    

  $ sfdx affirm:place:audit -n 30 -p "System Administrator" -a caselayout -u aliasName
        Running Command:
        sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail
        WHERE CreatedDate >= LAST_N_DAYS:30 AND Action LIKE '%caselayout%' AND CreatedBy.Profile.Name = 'System Administrator' ORDER BY CreatedDate DESC" -u aliasName --json
        Processing Query Results... Done. Found 45 results
        File Saved to: ./releaseArtifacts/auditResults/aliasName/2021_08_27T17_22_12_164Z.json
```

## `sfdx affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

returns a diff against the specified branch

```
USAGE
  $ sfdx affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              the branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against
  -c, --showchanged                                                                 If provided alone shows changes
                                                                                    only.
  -d, --showdestructive                                                             If provided alone shows destructive
                                                                                    changes only.
  -i, --showinsertion                                                               If provided alone shows insertion
                                                                                    changes only.
  -n, --inputdir=<value>                                                            the root directory to compare other
                                                                                    than the sfdx-project.json default
  -o, --outfilename=<value>                                                         if provided results will be save to
                                                                                    a file using the provided name as
                                                                                    json
  -s, --silent                                                                      runs without printing to console
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  returns a diff against the specified branch

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

## `sfdx affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Queries the provided org and tells you if it's a production org or sandbox

```
USAGE
  $ sfdx affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Queries the provided org and tells you if it's a production org or sandbox

ALIASES
  $ sfdx affirm:form

EXAMPLES
  $ sfdx affirm:place:form
        Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrgAlias --json
        Organization.IsSandbox = true
        Org defaultOrgAlias is a Sandbox instance
    

  $ sfdx affirm:place:form -u prodAlias
        Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u prodAlias --json
        Organization.IsSandbox = false
        Org prodAlias is a Production instance
```

## `sfdx affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a JWT token that can be used to auth against a connected app.

```
USAGE
  $ sfdx affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --aud=<value>
      (required) The audience identifies the authorization server as an intended audience. The authorization server must
      verify that it’s an intended audience for the token. Use the authorization server’s URL for the audience value:
      https://login.salesforce.com, https://test.salesforce.com, or https://site.force.com/customers if implementing for
      an Experience Cloud site.

  -e, --exp=<value>
      Optional: (Default: 3) The validity must be the expiration time of the assertion within 3 minutes.

  -i, --iss=<value>
      (required) The issuer must contain the OAuth client_id or the connected app for which you registered the
      certificate.

  -p, --privatekey=<value>
      (required) the location of the private key

  -s, --sub=<value>
      (required) The subject must contain the username of the user if implementing for an Experience Cloud site.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Creates a JWT token that can be used to auth against a connected app.

ALIASES
  $ sfdx affirm:jwt

EXAMPLES
  $ sfdx affirm:jwt -p server.key -i 3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com -a https://login.salesforce.com
        Token Created:
        eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
    

  $ sfdx affirm:jwt -p server.key -i 3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com.test -a https://test.salesforce.com -e 1
        Token Created:
        eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
```

## `sfdx affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page in Lightning.

```
USAGE
  $ sfdx affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>]
    [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -c, --classic                                                                     Optional | if provided the page will
                                                                                    open in Classic otherwise it opens
                                                                                    in Lightning by default.
  -d, --deployment                                                                  Optional Path | Supports Id | Opens
                                                                                    directly to Deployment status.
  -d, --displayurl                                                                  Optional | If provided the url will
                                                                                    be printed in the terminal.
  -e, --email                                                                       Optional Path | Opens directly to
                                                                                    Email Deliverability Settings
  -i, --id=<value>                                                                  Optional | if provided with a Path
                                                                                    Flag that supports Id the specific
                                                                                    record will be opened rather than
                                                                                    the path home page.
  -n, --network                                                                     Optional Path | Opens directly to
                                                                                    Digital Experiences
  -o, --urlonly                                                                     Optional | If provided the page will
                                                                                    not be opened in a browser it will
                                                                                    just be printed in the terminal.
  -p, --profile                                                                     Optional Path | Supports Id | Opens
                                                                                    directly to Profile List Views
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --verbose                                                                         emit additional command output to
                                                                                    stdout

DESCRIPTION
  Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page
  in Lightning.

ALIASES
  $ sfdx affirm:open
  $ sfdx a:o

EXAMPLES
  $ sfdx affirm:open
          Opening Setup Home in Production Org: defaultOrg
          Done
        

  $ sfdx affirm:open --profile -u sandboxAlias
          Opening Profile List Views in Sandbox Org: sandboxAlias
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open --deployment -i 0Af6S00000pzZSS
          Opening Deployment Status in Production Org: defaultOrg
          Done
```

## `sfdx affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a parcel (package) using git diff

```
USAGE
  $ sfdx affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion
    <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              The branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against
  -d, --includedestructive                                                          If provided and there are
                                                                                    destructive changes you will not be
                                                                                    asked if you want to include them
  -i, --inputdir=<value>                                                            The root directory to compare other
                                                                                    than the force-app default
  -o, --outputdir=<value>                                                           The output directory to store the
                                                                                    Metadata API–formatted metadata
                                                                                    files in. Default: './parcel'
  -t, --destructivetiming=<option>                                                  Allows you to indicate if you want
                                                                                    to process the destructive changes
                                                                                    before or after the deployment.
                                                                                    options: before, after
                                                                                    <options: before|after>
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --verbose                                                                         emit additional command output to
                                                                                    stdout

DESCRIPTION
  Creates a parcel (package) using git diff

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
        Creating Destructive Package... Success: Created at releaseArtifacts/parcel/destructiveChangesPre.xml
        Cleaning Up... Success
    

  $ sfdx affirm:parcel -d -t before
        Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
        Diff Against: remotes/origin/master...pilot/affirm... Success:
        Changes: 5, Insertions: 93, Destructive: 7
        Cloning Files... Success: 100 files ready for convert
        Converting... Success
        Creating Destructive Package... Success: Created at releaseArtifacts/parcel/destructiveChangesPre.xml
        Cleaning Up... Success
```

## `sfdx affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Deploys a Package to the specific place

```
USAGE
  $ sfdx affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>]
    [--apiversion <string>] [--verbose] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --packagedir=<value>
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

  -t, --testclasses=<value>
      (Optional) Comma separated list of tests to run. If none are provided all test classes listed in any test suites
      found in the 'packagedir' will be use. If none are found and target org is production the default
      'declarativeTestClass' is NOT used.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      (Optional) The number of minutes to wait for the command to complete. Uses default 'waitTime' from AffirmSettings.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Deploys a Package to the specific place

ALIASES
  $ sfdx affirm:place

EXAMPLES
  $ sfdx affirm:place
        Selected Production Instance: personalDev
        (y/n) Are you sure you want to deploy the package located in the "releaseArtifacts/parcel" folder?: y
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Deployment Test Classes:
        MyExampleClassTest
        Validation started in personalDev with Deployment Id: 0Af6S00000qVCieSAG
        Deploying Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_18_05_43_0Af6S00000qVCieSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        ? Would you like to print or save the any of the validation results? save: all
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_18_05_43_0Af6S00000qVCieSAG.json

  $ sfdx affirm:place -s -o -e
        Selected Production Instance: personalDev
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Deployment Test Classes:
        MyExampleClassTest
        Opening Deployment Status page in personalDev for deployment: 0Af6S00000qVCjcSAG
        Deploying Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_18_14_08_0Af6S00000qVCjcSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        File Saved to: ./releaseArtifacts/deploymentResults/personalDev/2023-03-31_18_14_08_0Af6S00000qVCjcSAG.json
```

## `sfdx affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Validates a package against the provided org

```
USAGE
  $ sfdx affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>]
    [--apiversion <string>] [--verbose] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --packagedir=<value>
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

  -t, --testclasses=<value>
      (Optional) Comma separated list of tests to run. If none are provided all test classes listed in any test suites
      found in the 'packagedir' will be use. If none are found and target org is production the default
      'declarativeTestClass' is used if one is set.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      (Optional) The number of minutes to wait for the command to complete. Uses default 'waitTime' from AffirmSettings.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Validates a package against the provided org

ALIASES
  $ sfdx affirm:quality

EXAMPLES
  $ sfdx affirm:quality
        (y/n) Are you sure you want to use the "personalDev" org ?: y
        Selected Production Org: personalDev
        (y/n) Are you sure you want to validate the package located in the "releaseArtifacts/parcel" folder?: y
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Validating Using Provided Test Classes:
        MyExampleClassTest
        Validation started in personalDev with Deployment Id: 0Af6S00000qVCjwSAG
        Validating Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_19_36_13_0Af6S00000qVCjwSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        ? Would you like to print or save the any of the validation results? save: all
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_19_36_13_0Af6S00000qVCjwSAG.json
  

  $ sfdx affirm:quality -s -o -e
        Selected Production Org: personalDev
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Validating Using Provided Test Classes:
        MyExampleClassTest
        Opening Deployment Status page in personalDev for validation: 0Af6S00000qVCkGSAW
        Validating Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_19_38_01_0Af6S00000qVCkGSAW
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_19_38_01_0Af6S00000qVCkGSAW.json
```

## `sfdx affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows users to configure project specific settings for Affirm

```
USAGE
  $ sfdx affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json]
    [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --acceptdefaults
      (optional) If provided only those items provided as a flag will be changed all others will be set to the default

  -b, --primarybranch=<value>
      (optional | Default: master) The primary branch should be the remote branch that is linked to your Production
      Instance of Salesforce. Default is 'remotes/origin/master'. Helpful if you use main instead of master.

  -d, --builddir=<value>
      (optional | Default: .releaseArtifacts) The directory where build files are copied to for processing, build packages
      are saved, and validation results are saved. Default is 'releaseArtifacts'. Would recommend a folder that is ignored
      by git.

  -o, --overwrite
      (optional) Provide this if you already have a sfdx-affirm.json file in your root project directory and you don't
      want to be asked about overwriting it.

  -p, --packagedir=<value>
      (optional | Default: parcel) The default directory name for new packages. Default is 'parcel'. This folder will
      always be placed in the default builddir or the one you indicated

  -t, --declarativetestclass=<value>
      (optional | Default: undefined) The test class to use when no test classes are provided. Mainly used for declarative
      changes that don't require specific code coverage.

  -w, --waittime=<value>
      (optional | Default: 10) The default wait time for all validation, deployment and test commands. The default is '10'
      for ten minutes but you can make this lower or higher for your project.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Allows users to configure project specific settings for Affirm

ALIASES
  $ sfdx affirm:setup

EXAMPLES
  $ sfdx affirm:setup
        Provide name of remote branch related to your Production Instance  [remotes/origin/master]: remotes/origin/main
        Primary Branch set to:  remotes/origin/main
        Provide location where temp build folders and packages will be created and stored  [releaseArtifacts]: .superArtifacts
        Build Directory set to:  .superArtifacts
        Provide default directory name for new packages  [parcel]: pack
        Package Directory set to:  pack
        Provide default wait time for async commands  [10]: 5
        Wait Time set to:  5
        Provide the name of a test class you would like to run for declarative dev by default if no test suite is created : Test_DeclarativeDefault
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

## `sfdx affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a testSuite-meta.xml file with the provided list of tests.

```
USAGE
  $ sfdx affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --addtotests                                                                  Optional: Indicates that you would
                                                                                    like the provided tests to be added
                                                                                    to the existing test suite instead
                                                                                    of overwriting it.
  -n, --name=<value>                                                                Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'
  -o, --outputdir=<value>                                                           Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites
  -t, --tests=<value>                                                               Comma separated list of tests names
                                                                                    that will be used to create the test
                                                                                    suite. If none are provided you will
                                                                                    be asked to provide a list or exit.
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Creates a testSuite-meta.xml file with the provided list of tests.

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

## `sfdx affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates or Updates a testSuite-meta.xml file using the tests from all inserted or changed test suite files in the current branch

```
USAGE
  $ sfdx affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              Optional: the branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against
  -l, --list                                                                        Optional: if provided the tests will
                                                                                    not be merged into a single suite,
                                                                                    rather they will be collected and
                                                                                    printed one at a time to the
                                                                                    terminal
  -n, --inputdir=<value>                                                            Optional: the root directory to
                                                                                    compare other than the
                                                                                    sfdx-project.json default
  -n, --name=<value>                                                                Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'
  -o, --outputdir=<value>                                                           Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites
  -s, --string                                                                      Optional: if provided the tests will
                                                                                    not be merged into a single suite,
                                                                                    rather they will be collected and
                                                                                    printed as a single string using a
                                                                                    comma to separate.
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Creates or Updates a testSuite-meta.xml file using the tests from all inserted or changed test suite files in the
  current branch

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
    

  $ sfdx affirm:suite:merge -o releaseArtifacts/tests
      Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
      Git Diff For: remotes/origin/master...pilot/affirm
      The following 2 test suite(s) will me merged into the name-of-epic-branch test suite
      force-app/main/default/testSuites/SFDC_1###_some_branch.testSuite-meta.xml
      force-app/main/default/testSuites/SFDC_2###_some_branch1.testSuite-meta.xml
      Creating Test Suite... Success
      New Test Suite Written to: releaseArtifacts/tests/name-of-epic-branch.testSuite-meta.xml
```

## `sfdx affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows user to easily run the relevant tests for their current branch.

```
USAGE
  $ sfdx affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>]
    [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --alltestsuites
      (Optional) if provided then all changed or inserted test suites on the branch will be collected and their tests will
      be used. Otherwise, only the test suite with the matching branch name will be used.

  -e, --saveresults
      (Optional) if provided the result json will be saved to the default build directory. Can not be used with
      --printresults

  -l, --list=<value>
      Comma separated list of tests names that will be used to create the test suite. If none are provided you will be
      asked to provide a list or exit.

  -r, --printresults
      If provided test results will be printed without being prompted.

  -s, --silent
      (Optional) If provided you will not be prompted at all for input. If correct input isn't provided command fails.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      The number of minutes to wait for the command to complete. The default is 10.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Allows user to easily run the relevant tests for their current branch.

ALIASES
  $ sfdx affirm:tests

EXAMPLES
  $ sfdx affirm:tests
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

## `sfdx sfdx-affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Queries and downloads audit logs from the target org

```
USAGE
  $ sfdx sfdx-affirm:audit [-a <string>] [-s <string>] [-i <string>] [-c <string>] [-p <string>] [-t <string>] [-n
    <number>] [-w <string>] [-d <string>] [-o] [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --action=<value>
      Optional: Adds `Action LIKE '%PROVIDED_VALUE%'` to the queries WHERE statement. Can not be used with the 'where'
      flag.

  -c, --createdbyuser=<value>
      Optional: Adds `CreatedBy.Username = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag.

  -d, --savedir=<value>
      Optional: Provide if you would like to save the file to a directory other than the projects 'buildDirectory'. Can
      not be used with the 'printonly' flag.

  -i, --display=<value>
      Optional: Filters all returned records by looking for the provided string in the `SetupAuditTrail.Display` field.

  -n, --lastndays=<value>
      Optional: Adds `CreatedDate <= LAST_N_DAYS:PROVIDED_VALUE` to the queries WHERE statement. Can not be used with the
      'where' flag. Can not be used with the 'date' flag.

  -o, --printonly
      Optional: provide if you would like to print the results to the terminal only. Can not be used with the 'savedir'
      flag.

  -p, --createdbyprofile=<value>
      Optional: Adds `CreatedBy.Profile.Name = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag.

  -s, --section=<value>
      Optional: Filters all returned records by looking for the provided string in the `SetupAuditTrail.Section` field.

  -t, --date=<value>
      Optional: Adds `DAY_ONLY(CreatedDate) = 'PROVIDED_VALUE'` to the queries WHERE statement. Can not be used with the
      'where' flag. Can not be used with the 'lastndays' flag.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --where=<value>
      Optional: provide your own custom where clause. Can not be used with any of the other filter flags.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Queries and downloads audit logs from the target org

ALIASES
  $ sfdx affirm:audit

EXAMPLES
  $ sfdx affirm:place:audit
        Running Command:
        sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail ORDER BY CreatedDate DESC" -u defaultUser --json
        Processing Query Results... Done. Found 1222 results
        File Saved to: ./releaseArtifacts/auditResults/defaultUser/2021_08_27T17_26_15_429Z.json
    

  $ sfdx affirm:place:audit -n 30 -p "System Administrator" -a caselayout -u aliasName
        Running Command:
        sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail
        WHERE CreatedDate >= LAST_N_DAYS:30 AND Action LIKE '%caselayout%' AND CreatedBy.Profile.Name = 'System Administrator' ORDER BY CreatedDate DESC" -u aliasName --json
        Processing Query Results... Done. Found 45 results
        File Saved to: ./releaseArtifacts/auditResults/aliasName/2021_08_27T17_22_12_164Z.json
```

_See code: [src/commands/sfdx-affirm/audit.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/audit.ts)_

## `sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

returns a diff against the specified branch

```
USAGE
  $ sfdx sfdx-affirm:changes [-b <string>] [-n <string>] [-d] [-i] [-c] [-s] [-o <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              the branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against
  -c, --showchanged                                                                 If provided alone shows changes
                                                                                    only.
  -d, --showdestructive                                                             If provided alone shows destructive
                                                                                    changes only.
  -i, --showinsertion                                                               If provided alone shows insertion
                                                                                    changes only.
  -n, --inputdir=<value>                                                            the root directory to compare other
                                                                                    than the sfdx-project.json default
  -o, --outfilename=<value>                                                         if provided results will be save to
                                                                                    a file using the provided name as
                                                                                    json
  -s, --silent                                                                      runs without printing to console
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  returns a diff against the specified branch

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

_See code: [src/commands/sfdx-affirm/changes.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/changes.ts)_

## `sfdx sfdx-affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Queries the provided org and tells you if it's a production org or sandbox

```
USAGE
  $ sfdx sfdx-affirm:form [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Queries the provided org and tells you if it's a production org or sandbox

ALIASES
  $ sfdx affirm:form

EXAMPLES
  $ sfdx affirm:place:form
        Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrgAlias --json
        Organization.IsSandbox = true
        Org defaultOrgAlias is a Sandbox instance
    

  $ sfdx affirm:place:form -u prodAlias
        Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u prodAlias --json
        Organization.IsSandbox = false
        Org prodAlias is a Production instance
```

_See code: [src/commands/sfdx-affirm/form.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/form.ts)_

## `sfdx sfdx-affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a JWT token that can be used to auth against a connected app.

```
USAGE
  $ sfdx sfdx-affirm:jwt -p <string> -i <string> -s <string> -a <string> [-e <number>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --aud=<value>
      (required) The audience identifies the authorization server as an intended audience. The authorization server must
      verify that it’s an intended audience for the token. Use the authorization server’s URL for the audience value:
      https://login.salesforce.com, https://test.salesforce.com, or https://site.force.com/customers if implementing for
      an Experience Cloud site.

  -e, --exp=<value>
      Optional: (Default: 3) The validity must be the expiration time of the assertion within 3 minutes.

  -i, --iss=<value>
      (required) The issuer must contain the OAuth client_id or the connected app for which you registered the
      certificate.

  -p, --privatekey=<value>
      (required) the location of the private key

  -s, --sub=<value>
      (required) The subject must contain the username of the user if implementing for an Experience Cloud site.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Creates a JWT token that can be used to auth against a connected app.

ALIASES
  $ sfdx affirm:jwt

EXAMPLES
  $ sfdx affirm:jwt -p server.key -i 3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com -a https://login.salesforce.com
        Token Created:
        eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
    

  $ sfdx affirm:jwt -p server.key -i 3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com.test -a https://test.salesforce.com -e 1
        Token Created:
        eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
```

_See code: [src/commands/sfdx-affirm/jwt.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/jwt.ts)_

## `sfdx sfdx-affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page in Lightning.

```
USAGE
  $ sfdx sfdx-affirm:open [-e] [-n] [-d] [-p] [-i <string>] [-o] [-d] [-c] [-u <string>] [--apiversion <string>]
    [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -c, --classic                                                                     Optional | if provided the page will
                                                                                    open in Classic otherwise it opens
                                                                                    in Lightning by default.
  -d, --deployment                                                                  Optional Path | Supports Id | Opens
                                                                                    directly to Deployment status.
  -d, --displayurl                                                                  Optional | If provided the url will
                                                                                    be printed in the terminal.
  -e, --email                                                                       Optional Path | Opens directly to
                                                                                    Email Deliverability Settings
  -i, --id=<value>                                                                  Optional | if provided with a Path
                                                                                    Flag that supports Id the specific
                                                                                    record will be opened rather than
                                                                                    the path home page.
  -n, --network                                                                     Optional Path | Opens directly to
                                                                                    Digital Experiences
  -o, --urlonly                                                                     Optional | If provided the page will
                                                                                    not be opened in a browser it will
                                                                                    just be printed in the terminal.
  -p, --profile                                                                     Optional Path | Supports Id | Opens
                                                                                    directly to Profile List Views
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --verbose                                                                         emit additional command output to
                                                                                    stdout

DESCRIPTION
  Open setup page(s) in the specified org. Running the command without flags will Open your current orgs Setup Home page
  in Lightning.

ALIASES
  $ sfdx affirm:open
  $ sfdx a:o

EXAMPLES
  $ sfdx affirm:open
          Opening Setup Home in Production Org: defaultOrg
          Done
        

  $ sfdx affirm:open --profile -u sandboxAlias
          Opening Profile List Views in Sandbox Org: sandboxAlias
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open -e --verbose
          (y/n) Are you sure you want to use the "defaultOrg" org ?: y
          Running Command: sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u defaultOrg --json
          Opening Email Deliverability Settings in Production Org: defaultOrg
          Running Command: sfdx force:org:open -p lightning/setup/OrgEmailSettings/home -u defaultOrg  --json
          Done
        

  $ sfdx affirm:open --deployment -i 0Af6S00000pzZSS
          Opening Deployment Status in Production Org: defaultOrg
          Done
```

_See code: [src/commands/sfdx-affirm/open.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/open.ts)_

## `sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a parcel (package) using git diff

```
USAGE
  $ sfdx sfdx-affirm:parcel [-b <string>] [-i <string>] [-o <string>] [-d] [-t <string>] [-u <string>] [--apiversion
    <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              The branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against
  -d, --includedestructive                                                          If provided and there are
                                                                                    destructive changes you will not be
                                                                                    asked if you want to include them
  -i, --inputdir=<value>                                                            The root directory to compare other
                                                                                    than the force-app default
  -o, --outputdir=<value>                                                           The output directory to store the
                                                                                    Metadata API–formatted metadata
                                                                                    files in. Default: './parcel'
  -t, --destructivetiming=<option>                                                  Allows you to indicate if you want
                                                                                    to process the destructive changes
                                                                                    before or after the deployment.
                                                                                    options: before, after
                                                                                    <options: before|after>
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
  --verbose                                                                         emit additional command output to
                                                                                    stdout

DESCRIPTION
  Creates a parcel (package) using git diff

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
        Creating Destructive Package... Success: Created at releaseArtifacts/parcel/destructiveChangesPre.xml
        Cleaning Up... Success
    

  $ sfdx affirm:parcel -d -t before
        Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
        Diff Against: remotes/origin/master...pilot/affirm... Success:
        Changes: 5, Insertions: 93, Destructive: 7
        Cloning Files... Success: 100 files ready for convert
        Converting... Success
        Creating Destructive Package... Success: Created at releaseArtifacts/parcel/destructiveChangesPre.xml
        Cleaning Up... Success
```

_See code: [src/commands/sfdx-affirm/parcel.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/parcel.ts)_

## `sfdx sfdx-affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Deploys a Package to the specific place

```
USAGE
  $ sfdx sfdx-affirm:place [-d <string>] [-t <string>] [-s] [-w <integer>] [-r] [-o] [-e] [-p] [-n] [-u <string>]
    [--apiversion <string>] [--verbose] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --packagedir=<value>
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

  -t, --testclasses=<value>
      (Optional) Comma separated list of tests to run. If none are provided all test classes listed in any test suites
      found in the 'packagedir' will be use. If none are found and target org is production the default
      'declarativeTestClass' is NOT used.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      (Optional) The number of minutes to wait for the command to complete. Uses default 'waitTime' from AffirmSettings.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Deploys a Package to the specific place

ALIASES
  $ sfdx affirm:place

EXAMPLES
  $ sfdx affirm:place
        Selected Production Instance: personalDev
        (y/n) Are you sure you want to deploy the package located in the "releaseArtifacts/parcel" folder?: y
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Deployment Test Classes:
        MyExampleClassTest
        Validation started in personalDev with Deployment Id: 0Af6S00000qVCieSAG
        Deploying Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_18_05_43_0Af6S00000qVCieSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        ? Would you like to print or save the any of the validation results? save: all
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_18_05_43_0Af6S00000qVCieSAG.json

  $ sfdx affirm:place -s -o -e
        Selected Production Instance: personalDev
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Deployment Test Classes:
        MyExampleClassTest
        Opening Deployment Status page in personalDev for deployment: 0Af6S00000qVCjcSAG
        Deploying Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_18_14_08_0Af6S00000qVCjcSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        File Saved to: ./releaseArtifacts/deploymentResults/personalDev/2023-03-31_18_14_08_0Af6S00000qVCjcSAG.json
```

_See code: [src/commands/sfdx-affirm/place.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/place.ts)_

## `sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Validates a package against the provided org

```
USAGE
  $ sfdx sfdx-affirm:quality [-d <string>] [-t <string>] [-s] [-w <number>] [-r] [-e] [-p] [-o] [-n] [-u <string>]
    [--apiversion <string>] [--verbose] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --packagedir=<value>
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

  -t, --testclasses=<value>
      (Optional) Comma separated list of tests to run. If none are provided all test classes listed in any test suites
      found in the 'packagedir' will be use. If none are found and target org is production the default
      'declarativeTestClass' is used if one is set.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      (Optional) The number of minutes to wait for the command to complete. Uses default 'waitTime' from AffirmSettings.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Validates a package against the provided org

ALIASES
  $ sfdx affirm:quality

EXAMPLES
  $ sfdx affirm:quality
        (y/n) Are you sure you want to use the "personalDev" org ?: y
        Selected Production Org: personalDev
        (y/n) Are you sure you want to validate the package located in the "releaseArtifacts/parcel" folder?: y
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Validating Using Provided Test Classes:
        MyExampleClassTest
        Validation started in personalDev with Deployment Id: 0Af6S00000qVCjwSAG
        Validating Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_19_36_13_0Af6S00000qVCjwSAG
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        ? Would you like to print or save the any of the validation results? save: all
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_19_36_13_0Af6S00000qVCjwSAG.json
  

  $ sfdx affirm:quality -s -o -e
        Selected Production Org: personalDev
        Package Directory: "releaseArtifacts/parcel"
        Found test suite(s) in releaseArtifacts/parcel
        Validating Using Provided Test Classes:
        MyExampleClassTest
        Opening Deployment Status page in personalDev for validation: 0Af6S00000qVCkGSAW
        Validating Package... Completed
        Deployment Status Date_Time_Id: 2023-03-31_19_38_01_0Af6S00000qVCkGSAW
        Total Components: 10
        Component Deployed: 10
        Component With Errors: 0
        Total Tests Run: 1
        Successful Tests: 1
        Test Errors: 0
        File Saved to: ./releaseArtifacts/validationResults/personalDev/2023-03-31_19_38_01_0Af6S00000qVCkGSAW.json
```

_See code: [src/commands/sfdx-affirm/quality.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/quality.ts)_

## `sfdx sfdx-affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows users to configure project specific settings for Affirm

```
USAGE
  $ sfdx sfdx-affirm:setup [-b <string>] [-d <string>] [-p <string>] [-w <number>] [-t <string>] [-a] [-o] [--json]
    [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --acceptdefaults
      (optional) If provided only those items provided as a flag will be changed all others will be set to the default

  -b, --primarybranch=<value>
      (optional | Default: master) The primary branch should be the remote branch that is linked to your Production
      Instance of Salesforce. Default is 'remotes/origin/master'. Helpful if you use main instead of master.

  -d, --builddir=<value>
      (optional | Default: .releaseArtifacts) The directory where build files are copied to for processing, build packages
      are saved, and validation results are saved. Default is 'releaseArtifacts'. Would recommend a folder that is ignored
      by git.

  -o, --overwrite
      (optional) Provide this if you already have a sfdx-affirm.json file in your root project directory and you don't
      want to be asked about overwriting it.

  -p, --packagedir=<value>
      (optional | Default: parcel) The default directory name for new packages. Default is 'parcel'. This folder will
      always be placed in the default builddir or the one you indicated

  -t, --declarativetestclass=<value>
      (optional | Default: undefined) The test class to use when no test classes are provided. Mainly used for declarative
      changes that don't require specific code coverage.

  -w, --waittime=<value>
      (optional | Default: 10) The default wait time for all validation, deployment and test commands. The default is '10'
      for ten minutes but you can make this lower or higher for your project.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

DESCRIPTION
  Allows users to configure project specific settings for Affirm

ALIASES
  $ sfdx affirm:setup

EXAMPLES
  $ sfdx affirm:setup
        Provide name of remote branch related to your Production Instance  [remotes/origin/master]: remotes/origin/main
        Primary Branch set to:  remotes/origin/main
        Provide location where temp build folders and packages will be created and stored  [releaseArtifacts]: .superArtifacts
        Build Directory set to:  .superArtifacts
        Provide default directory name for new packages  [parcel]: pack
        Package Directory set to:  pack
        Provide default wait time for async commands  [10]: 5
        Wait Time set to:  5
        Provide the name of a test class you would like to run for declarative dev by default if no test suite is created : Test_DeclarativeDefault
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

_See code: [src/commands/sfdx-affirm/setup.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/setup.ts)_

## `sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates a testSuite-meta.xml file with the provided list of tests.

```
USAGE
  $ sfdx sfdx-affirm:suite [-t <string>] [-n <string>] [-o <string>] [-a] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --addtotests                                                                  Optional: Indicates that you would
                                                                                    like the provided tests to be added
                                                                                    to the existing test suite instead
                                                                                    of overwriting it.
  -n, --name=<value>                                                                Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'
  -o, --outputdir=<value>                                                           Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites
  -t, --tests=<value>                                                               Comma separated list of tests names
                                                                                    that will be used to create the test
                                                                                    suite. If none are provided you will
                                                                                    be asked to provide a list or exit.
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Creates a testSuite-meta.xml file with the provided list of tests.

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

_See code: [src/commands/sfdx-affirm/suite.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/suite.ts)_

## `sfdx sfdx-affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates or Updates a testSuite-meta.xml file using the tests from all inserted or changed test suite files in the current branch

```
USAGE
  $ sfdx sfdx-affirm:suite:merge [-n <string>] [-o <string>] [-n <string>] [-b <string>] [-l] [-s] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -b, --branch=<value>                                                              Optional: the branch other than
                                                                                    remotes/origin/master to diff
                                                                                    against
  -l, --list                                                                        Optional: if provided the tests will
                                                                                    not be merged into a single suite,
                                                                                    rather they will be collected and
                                                                                    printed one at a time to the
                                                                                    terminal
  -n, --inputdir=<value>                                                            Optional: the root directory to
                                                                                    compare other than the
                                                                                    sfdx-project.json default
  -n, --name=<value>                                                                Optional: Provide if you would like
                                                                                    to define the name of your test
                                                                                    suite. Default: name of current
                                                                                    branch minus 'feature/'
  -o, --outputdir=<value>                                                           Optional: Provide if you would like
                                                                                    to save the testSuite-meta.xml file
                                                                                    to a location other than
                                                                                    force-app/main/default/testSuites
  -s, --string                                                                      Optional: if provided the tests will
                                                                                    not be merged into a single suite,
                                                                                    rather they will be collected and
                                                                                    printed as a single string using a
                                                                                    comma to separate.
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Creates or Updates a testSuite-meta.xml file using the tests from all inserted or changed test suite files in the
  current branch

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
    

  $ sfdx affirm:suite:merge -o releaseArtifacts/tests
      Current Remote: origin => git@bitbucket.org:projectName/repo-name.git
      Git Diff For: remotes/origin/master...pilot/affirm
      The following 2 test suite(s) will me merged into the name-of-epic-branch test suite
      force-app/main/default/testSuites/SFDC_1###_some_branch.testSuite-meta.xml
      force-app/main/default/testSuites/SFDC_2###_some_branch1.testSuite-meta.xml
      Creating Test Suite... Success
      New Test Suite Written to: releaseArtifacts/tests/name-of-epic-branch.testSuite-meta.xml
```

_See code: [src/commands/sfdx-affirm/suite/merge.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/suite/merge.ts)_

## `sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Allows user to easily run the relevant tests for their current branch.

```
USAGE
  $ sfdx sfdx-affirm:tests [-l <string>] [-w <integer>] [-r] [-a] [-e] [-s] [-u <string>] [--apiversion <string>]
    [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -a, --alltestsuites
      (Optional) if provided then all changed or inserted test suites on the branch will be collected and their tests will
      be used. Otherwise, only the test suite with the matching branch name will be used.

  -e, --saveresults
      (Optional) if provided the result json will be saved to the default build directory. Can not be used with
      --printresults

  -l, --list=<value>
      Comma separated list of tests names that will be used to create the test suite. If none are provided you will be
      asked to provide a list or exit.

  -r, --printresults
      If provided test results will be printed without being prompted.

  -s, --silent
      (Optional) If provided you will not be prompted at all for input. If correct input isn't provided command fails.

  -u, --targetusername=<value>
      username or alias for the target org; overrides default target org

  -w, --waittime=<value>
      The number of minutes to wait for the command to complete. The default is 10.

  --apiversion=<value>
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --verbose
      emit additional command output to stdout

DESCRIPTION
  Allows user to easily run the relevant tests for their current branch.

ALIASES
  $ sfdx affirm:tests

EXAMPLES
  $ sfdx affirm:tests
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

_See code: [src/commands/sfdx-affirm/tests.ts](https://github.com/dt-snyder/sfdx-affirm/blob/v3.0.0/src/commands/sfdx-affirm/tests.ts)_
<!-- commandsstop -->
## Helpful Links

- [Create Your First Salesforce CLI Plugin](https://developer.salesforce.com/blogs/2018/05/create-your-first-salesforce-cli-plugin.html)
- [Plugin Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_plugins.meta/sfdx_cli_plugins/cli_plugins.htm)
- [salesforce/core](https://forcedotcom.github.io/sfdx-core/globals.html)
- [SimpleGit.js](https://github.com/steveukx/git-js#readme)
