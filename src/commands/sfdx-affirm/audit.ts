import { flags, FlagsConfig, SfdxCommand } from '@salesforce/command';
import { AnyJson, asJsonArray, ensureAnyJson, ensureJsonMap, JsonMap } from '@salesforce/ts-types';
import { Messages, SfError } from '@salesforce/core';
import { sfdxQuery } from '../../lib/affirm_sfdx';
import { verifyUsername } from '../../lib/affirm_lift';
import { getAffirmSettings } from '../../lib/affirm_settings';
import { AffirmSettings, AffirmAuditResult } from '../../lib/affirm_interfaces';
import { fsSaveJson } from '../../lib/affirm_fs';
// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-affirm', 'audit');

export default class Audit extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');
  public static aliases = ['affirm:audit'];
  public static examples = [
    `$ sfdx affirm:place:audit
      Running Command:
      sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail ORDER BY CreatedDate DESC" -u defaultUser --json
      Processing Query Results... Done. Found 1222 results
      File Saved to: ./releaseArtifacts/auditResults/defaultUser/2021_08_27T17_26_15_429Z.json
    `,
    `$ sfdx affirm:place:audit -n 30 -p "System Administrator" -a caselayout -u aliasName
      Running Command:
      sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail
      WHERE CreatedDate >= LAST_N_DAYS:30 AND Action LIKE '%caselayout%' AND CreatedBy.Profile.Name = 'System Administrator' ORDER BY CreatedDate DESC" -u aliasName --json
      Processing Query Results... Done. Found 45 results
      File Saved to: ./releaseArtifacts/auditResults/aliasName/2021_08_27T17_22_12_164Z.json
    `,
  ];
  protected static flagsConfig: FlagsConfig = {
    action: flags.string({ char: 'a', description: messages.getMessage('actionFlagDescription'), required: false }),
    section: flags.string({ char: 's', description: messages.getMessage('sectionFlagDescription'), required: false }), // can't query filter
    display: flags.string({ char: 'i', description: messages.getMessage('displayFlagDescription'), required: false }), // can't query filter
    createdbyuser: flags.string({ char: 'c', description: messages.getMessage('createdbyuserFlagDescription'), required: false }),
    createdbyprofile: flags.string({ char: 'p', description: messages.getMessage('createdbyprofileFlagDescription'), required: false }),
    date: flags.string({ char: 't', description: messages.getMessage('dateFlagDescription'), required: false }),
    lastndays: flags.number({ char: 'n', description: messages.getMessage('lastndaysFlagDescription'), required: false }),
    where: flags.string({ char: 'w', description: messages.getMessage('whereFlagDescription'), required: false }),
    savedir: flags.string({ char: 'd', description: messages.getMessage('savedirFlagDescription'), required: false }),
    printonly: flags.boolean({ char: 'o', description: messages.getMessage('printonlyFlagDescription'), required: false }),
    verbose: flags.builtin()
  };
  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;
  protected static supportsUsername = true;

  public async run(): Promise<AnyJson> {
    if (this.flags.date && this.flags.lastndays) {
      throw new SfError(messages.getMessage('errorDateAndDays'));
    } else if (this.flags.savedir && this.flags.printonly) {
      throw new SfError(messages.getMessage('errorPrintAndSave'));
    } else if ((this.flags.action || this.flags.section || this.flags.display || this.flags.createdbyuser || this.flags.createdbyprofile || this.flags.date || this.flags.lastndays) && this.flags.where) {
      throw new SfError(messages.getMessage('errorWhereAndFilters'));
    }
    let whereClause;
    if (this.flags.where) {
      whereClause = (this.flags.where.indexOf('where') >= 0) ? this.flags.where : `WHERE ${this.flags.where}`;
    } else {
      let filters: Array<string> = [];
      if (this.flags.date) {
        const parsedDate = Date.parse(this.flags.date);
        const providedDate: Date = new Date(parsedDate);
        const month = (providedDate.getMonth().toString().length === 1) ? `0${providedDate.getMonth()}` : providedDate.getMonth();
        const day = (providedDate.getDate().toString().length === 1) ? `0${providedDate.getDate()}` : providedDate.getDate();
        filters = [...filters, `DAY_ONLY(CreatedDate) = ${providedDate.getFullYear()}-${month}-${day}`];
      } else if (this.flags.lastndays) {
        filters = [...filters, `CreatedDate >= LAST_N_DAYS:${this.flags.lastndays}`];
      }
      if (this.flags.action) filters = [...filters, `Action LIKE '%${this.flags.action}%'`];
      if (this.flags.createdbyuser) filters = [...filters, `CreatedBy.Username = '${this.flags.createdbyuser}'`];
      if (this.flags.createdbyprofile) filters = [...filters, `CreatedBy.Profile.Name = '${this.flags.createdbyprofile}'`];
      if (filters.length > 0) {
        whereClause = `WHERE ${filters.join(' AND ')}`;
      }
    }

    const settings: AffirmSettings = await getAffirmSettings();
    const verbose = this.flags.verbose ? this.ux : undefined;
    const username = await verifyUsername(this.flags.targetusername, undefined, verbose);
    const fields = 'Id, Action, Section, Display, DelegateUser, CreatedByContext, CreatedById, CreatedBy.Name, CreatedBy.Username, CreatedBy.Profile.Name, CreatedDate, ResponsibleNamespacePrefix';
    const orderBy = 'ORDER BY CreatedDate DESC';
    const query = (whereClause) ? `SELECT ${fields} FROM SetupAuditTrail ${whereClause} ${orderBy}` : `SELECT ${fields} FROM SetupAuditTrail ${orderBy}`;
    this.ux.startSpinner('Processing Query Results');
    const response: JsonMap = ensureJsonMap((await sfdxQuery(username, query, this.ux)));

    if ("status" in response && response["status"] == 0 && "result" in response) {
      const result: JsonMap = ensureJsonMap(response.result);
      let resultList: Array<JsonMap> = [];
      const records: Array<JsonMap> = asJsonArray(result.records, Array<JsonMap>()) as Array<JsonMap>;
      if (records.length === 0) {
        this.ux.stopSpinner(`Query ran successfully but returned zero (0) results.`);
      } else if (this.flags.section) {
        records.forEach(record => {
          const recordMap: JsonMap = ensureJsonMap(record);
          if ('Section' in recordMap && recordMap.Section) {
            const sectionString: string = recordMap.Section as string;
            if (sectionString.includes(this.flags.section)) {
              resultList = [...resultList, recordMap];
            }
          }
        });
      } else if (this.flags.display) {
        records.forEach(record => {
          const recordMap: JsonMap = ensureJsonMap(record);
          if ('Display' in recordMap && recordMap.Display) {
            const sectionString: string = recordMap.Display as string;
            if (sectionString.includes(this.flags.display)) {
              resultList = [...resultList, recordMap];
            }
          }
        });
      } else {
        resultList = [...records];
      }
      const auditResult: AffirmAuditResult = {
        currentRunConfiguration: {
          dateOfRun: (new Date).toLocaleString('en-US'),
          username: username,
          queryUsed: query,
          totalResults: records.length,
          filteredResults: resultList.length,
          actionFlag: this.flags.action,
          sectionFlag: this.flags.section,
          displayFlag: this.flags.display,
          createdbyuserFlag: this.flags.createdbyuser,
          createdbyprofileFlag: this.flags.createdbyprofile,
          dateFlag: this.flags.date,
          lastndaysFlag: this.flags.lastndays,
          savedirFlag: this.flags.savedir,
          printonlyFlag: this.flags.printonly,
          whereFlag: this.flags.where
        },
        results: resultList
      };
      if (this.flags.printonly) {
        this.ux.stopSpinner(`Done. Found ${resultList.length} results`);
        this.ux.logJson(ensureJsonMap(auditResult as unknown as AnyJson));
      } else {
        const dateString = (new Date).toJSON().trim().replace('.', '_').replace('.', '_').replace('-', '_').replace('-', '_').replace(':', '_').replace(':', '_');
        const cleanUserName = username.trim();
        const fileName = (this.flags.savedir) ? `${this.flags.savedir}/${(new Date).toJSON()}` : `${settings.buildDirectory}/auditResults/${cleanUserName}/${dateString}`;
        this.ux.stopSpinner(`Done. Found ${resultList.length} results`);
        await fsSaveJson(fileName, ensureAnyJson(auditResult), this.ux);
      }
    }
    return ensureAnyJson(response);
  }
}

