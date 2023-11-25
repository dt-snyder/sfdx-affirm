import { Ux, Flags, SfCommand } from '@salesforce/sf-plugins-core';
import { AnyJson, asJsonArray, ensureAnyJson, ensureJsonMap, JsonMap } from '@salesforce/ts-types';
import { Messages } from '@salesforce/core';
import { sfdxQuery } from '../../lib/affirm_sfdx';
import { verifyUsername } from '../../lib/affirm_lift';
import { getAffirmSettings } from '../../lib/affirm_settings';
import { AffirmSettings, AffirmAuditResult } from '../../lib/affirm_interfaces';
import { fsSaveJson } from '../../lib/affirm_fs';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('sfdx-affirm', 'audit');

export type AuditResult = { status: string; };

export default class Audit extends SfCommand<AuditResult> {

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
  public static readonly flags = {
    action: Flags.string({ char: 'a', description: messages.getMessage('actionFlagDescription'), required: false }),
    section: Flags.string({ char: 's', description: messages.getMessage('sectionFlagDescription'), required: false }), // can't query filter
    display: Flags.string({ char: 'i', description: messages.getMessage('displayFlagDescription'), required: false }), // can't query filter
    createdbyuser: Flags.string({ char: 'c', description: messages.getMessage('createdbyuserFlagDescription'), required: false }),
    createdbyprofile: Flags.string({ char: 'p', description: messages.getMessage('createdbyprofileFlagDescription'), required: false }),
    date: Flags.string({ char: 't', description: messages.getMessage('dateFlagDescription'), required: false }),
    lastndays: Flags.integer({ char: 'n', description: messages.getMessage('lastndaysFlagDescription'), required: false }),
    where: Flags.string({ char: 'w', description: messages.getMessage('whereFlagDescription'), required: false }),
    savedir: Flags.string({ char: 'd', description: messages.getMessage('savedirFlagDescription'), required: false }),
    printonly: Flags.boolean({ char: 'o', description: messages.getMessage('printonlyFlagDescription'), required: false }),
    verbose: Flags.boolean({ summary: messages.getMessage('flags.verbose'), deprecateAliases: true, default: false, hidden: true }),
    targetusername: Flags.requiredOrg({ char: 'u', required: false }),
    apiversion: Flags.orgApiVersion({ description: 'api version for the org', required: false })
  };

  public async run(): Promise<AuditResult> {
    const { flags } = await this.parse(Audit);
    if (flags.date && flags.lastndays) {
      throw messages.createError('errorDateAndDays');
    } else if (flags.savedir && flags.printonly) {
      throw messages.createError('errorPrintAndSave');
    } else if ((flags.action || flags.section || flags.display || flags.createdbyuser || flags.createdbyprofile || flags.date || flags.lastndays) && flags.where) {
      throw messages.createError('errorWhereAndFilters');
    }
    let whereClause;
    if (flags.where) {
      whereClause = (flags.where.indexOf('where') >= 0) ? flags.where : `WHERE ${flags.where}`;
    } else {
      let filters: Array<string> = [];
      if (flags.date) {
        const parsedDate = Date.parse(flags.date);
        const providedDate: Date = new Date(parsedDate);
        const month = (providedDate.getMonth().toString().length === 1) ? `0${providedDate.getMonth()}` : providedDate.getMonth();
        const day = (providedDate.getDate().toString().length === 1) ? `0${providedDate.getDate()}` : providedDate.getDate();
        filters = [...filters, `DAY_ONLY(CreatedDate) = ${providedDate.getFullYear()}-${month}-${day}`];
      } else if (flags.lastndays) {
        filters = [...filters, `CreatedDate >= LAST_N_DAYS:${flags.lastndays}`];
      }
      if (flags.action) filters = [...filters, `Action LIKE '%${flags.action}%'`];
      if (flags.createdbyuser) filters = [...filters, `CreatedBy.Username = '${flags.createdbyuser}'`];
      if (flags.createdbyprofile) filters = [...filters, `CreatedBy.Profile.Name = '${flags.createdbyprofile}'`];
      if (filters.length > 0) {
        whereClause = `WHERE ${filters.join(' AND ')}`;
      }
    }

    const settings: AffirmSettings = await getAffirmSettings();
    const verbose = flags.verbose ? new Ux({ jsonEnabled: this.jsonEnabled() }) : undefined;
    const username = flags.targetusername.getUsername();
    const fields = 'Id, Action, Section, Display, DelegateUser, CreatedByContext, CreatedById, CreatedBy.Name, CreatedBy.Username, CreatedBy.Profile.Name, CreatedDate, ResponsibleNamespacePrefix';
    const orderBy = 'ORDER BY CreatedDate DESC';
    const query = (whereClause) ? `SELECT ${fields} FROM SetupAuditTrail ${whereClause} ${orderBy}` : `SELECT ${fields} FROM SetupAuditTrail ${orderBy}`;
    this.spinner.start('Processing Query Results');
    const response: JsonMap = ensureJsonMap((await sfdxQuery(username, query, new Ux({ jsonEnabled: this.jsonEnabled() }))));

    if ("status" in response && response["status"] == 0 && "result" in response) {
      const result: JsonMap = ensureJsonMap(response.result);
      let resultList: Array<JsonMap> = [];
      const records: Array<JsonMap> = asJsonArray(result.records, Array<JsonMap>()) as Array<JsonMap>;
      if (records.length === 0) {
        this.spinner.stop(`Query ran successfully but returned zero (0) results.`);
      } else if (flags.section) {
        records.forEach(record => {
          const recordMap: JsonMap = ensureJsonMap(record);
          if ('Section' in recordMap && recordMap.Section) {
            const sectionString: string = recordMap.Section as string;
            if (sectionString.includes(flags.section)) {
              resultList = [...resultList, recordMap];
            }
          }
        });
      } else if (flags.display) {
        records.forEach(record => {
          const recordMap: JsonMap = ensureJsonMap(record);
          if ('Display' in recordMap && recordMap.Display) {
            const sectionString: string = recordMap.Display as string;
            if (sectionString.includes(flags.display)) {
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
          actionFlag: flags.action,
          sectionFlag: flags.section,
          displayFlag: flags.display,
          createdbyuserFlag: flags.createdbyuser,
          createdbyprofileFlag: flags.createdbyprofile,
          dateFlag: flags.date,
          lastndaysFlag: flags.lastndays.toString(),
          savedirFlag: flags.savedir,
          printonlyFlag: flags.printonly ? "true" : "false",
          whereFlag: flags.where
        },
        results: resultList
      };
      if (flags.printonly) {
        this.spinner.stop(`Done. Found ${resultList.length} results`);
        this.logJson(ensureJsonMap(auditResult as unknown as AnyJson));
      } else {
        const dateString = (new Date).toJSON().trim().replace('.', '_').replace('.', '_').replace('-', '_').replace('-', '_').replace(':', '_').replace(':', '_');
        const cleanUserName = username.trim();
        const fileName = (flags.savedir) ? `${flags.savedir}/${(new Date).toJSON()}` : `${settings.buildDirectory}/auditResults/${cleanUserName}/${dateString}`;
        this.spinner.stop(`Done. Found ${resultList.length} results`);
        await fsSaveJson(fileName, ensureAnyJson(auditResult), new Ux({ jsonEnabled: this.jsonEnabled() }));
      }
    }
    return ensureAnyJson(response);
  }
}

