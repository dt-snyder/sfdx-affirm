import { flags, SfdxCommand } from '@salesforce/command';
import { AnyJson } from '@salesforce/ts-types';
import { Messages, SfdxError } from '@salesforce/core';
import { sfdxQuery } from '../../lib/affirm_sfdx';
import { getAffirmFormattedDate, stringifyAffirmPermCompareReport, verifyUsername } from '../../lib/affirm_lift';
import { getAffirmSettings } from '../../lib/affirm_settings';
import {
  AffirmPermCompareResult,
  AffirmQueryResponse,
  AffirmSettings,
  ObjectPermissions,
  AffirmSfdcPermission,
  AffirmPermCompareReport
} from '../../lib/affirm_interfaces';
import { fsSaveJson } from '../../lib/affirm_fs';
// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-affirm', 'perms');

export default class Perms extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');
  public static aliases = ['affirm:perms'];
  // TODO: update examples
  public static examples = [
    `$ sfdx affirm:perms
      Running Command:
      sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail ORDER BY CreatedDate DESC" -u defaultUser --json
      Processing Query Results... Done. Found 1222 results
      File Saved to: ./.releaseArtifacts/auditResults/defaultUser/2021_08_27T17_26_15_429Z.json
    `,
    `$ sfdx affirm:perms -n 30 -p "System Administrator" -a caselayout -u aliasName
      Running Command:
      sfdx force:data:soql:query -q "SELECT Id, ...[omitted for brevity]... FROM SetupAuditTrail
      WHERE CreatedDate >= LAST_N_DAYS:30 AND Action LIKE '%caselayout%' AND CreatedBy.Profile.Name = 'System Administrator' ORDER BY CreatedDate DESC" -u aliasName --json
      Processing Query Results... Done. Found 45 results
      File Saved to: ./.releaseArtifacts/auditResults/aliasName/2021_08_27T17_22_12_164Z.json
    `,
  ];
  protected static flagsConfig = {
    profilesonly: flags.boolean({ char: 'p', description: messages.getMessage('profilesonlyFlagDescription'), required: false }),
    permissionsetsonly: flags.boolean({ char: 's', description: messages.getMessage('permissionsetsonlyFlagDescription'), required: false }),
    permissionid: flags.string({ char: 'i', description: messages.getMessage('permissionidFlagDescription'), required: false }),
    savedir: flags.string({ char: 'd', description: messages.getMessage('savedirFlagDescription'), required: false }),
  };
  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;
  protected static supportsUsername = true;

  public async run(): Promise<AnyJson> {
    if (this.flags.profilesonly && this.flags.permissionsetsonly) {
      throw SfdxError.create('sfdx-affirm', 'audit', 'errorOnlyFilters');
    }
    let whereClause;
    if (this.flags.profilesonly) {
      whereClause = ` WHERE Parent.Name LIKE 'X00e%'`;
    } else if (this.flags.permissionsetsonly) {
      whereClause = ` WHERE NOT Parent.Name LIKE 'X00e%'`;
    }
    const settings: AffirmSettings = await getAffirmSettings();
    const username = await verifyUsername(this.flags.targetusername);
    'SELECT  FROM ObjectPermissions';
    const fields = 'ParentId, Parent.Name, Parent.Label, Parent.Description, PermissionsEdit, PermissionsRead, PermissionsCreate, PermissionsModifyAllRecords, PermissionsViewAllRecords, SobjectType';
    const orderBy = 'ORDER BY SobjectType DESC NULLS LAST';
    const query = (whereClause) ? `SELECT ${fields} FROM ObjectPermissions ${whereClause} ${orderBy}` : `SELECT ${fields} FROM ObjectPermissions ${orderBy}`;
    let resultList: Map<string, AffirmPermCompareResult> = new Map<string, AffirmPermCompareResult>();
    let objectLevelPermissions: Map<string, Map<string, Set<ObjectPermissions>>> = new Map<string, Map<string, Set<ObjectPermissions>>>();
    const objPermByPermId: Map<string, Set<ObjectPermissions>> = new Map<string, Set<ObjectPermissions>>();
    const objPermResponse: AffirmQueryResponse = await sfdxQuery(username, query, this.ux) as AffirmQueryResponse;
    this.ux.startSpinner('Processing Query Results');

    if (objPermResponse.result && objPermResponse.result.done && objPermResponse.result.totalSize > 0) {
      objPermResponse.result.records.forEach(item => {
        const record = item as ObjectPermissions;
        if (!objPermByPermId.has(record.ParentId)) {
          objPermByPermId.set(record.ParentId, new Set<ObjectPermissions>());
        }
        objPermByPermId.get(record.ParentId).add(record);
        let permType: string = (record.Parent.Name.startsWith('X00e')) ? 'Profile' : 'Permission Set';
        if (!objectLevelPermissions.has(permType)) {
          objectLevelPermissions.set(permType, new Map<string, Set<ObjectPermissions>>());
        }
        if (!objectLevelPermissions.get(permType).has(record.SobjectType)) {
          objectLevelPermissions.get(permType).set(record.SobjectType, new Set<ObjectPermissions>());
        }
        objectLevelPermissions.get(permType).get(record.SobjectType).add(record);
        if (!resultList.has(record.ParentId)) {
          const newPerm: AffirmSfdcPermission = {
            id: record.ParentId,
            name: record.Parent.Name,
            type: permType,
          };
          const newResult: AffirmPermCompareResult = {
            permission: newPerm,
            applicableSObj: new Set<string>(),
            applicableFields: new Map<string, Set<string>>(),
            countExactObjectLevelMatches: 0,
            countExactFieldLevelMatches: 0,
            countExactMatch: 0,
            exactObjectLevelMatches: new Array<AffirmSfdcPermission>(), //
            exactFieldLevelMatches: new Array<AffirmSfdcPermission>(),
            exactMatches: new Array<AffirmSfdcPermission>(),
            partialObjectLevelMatches: new Map<AffirmSfdcPermission, Set<string>>(),
            partialFieldLevelMatches: new Map<AffirmSfdcPermission, Set<string>>(),
            objMatchingPermId: new Map<string, Set<string>>(),
            fieldMatchingPermId: new Map<string, Set<string>>()
          };
          resultList.set(record.ParentId, newResult);
        }
        resultList.get(record.ParentId).applicableSObj.add(record.SobjectType);

      });
      let printed = false;
      for (const key of resultList.keys()) {
        const currentResult: AffirmPermCompareResult = resultList.get(key);
        if (objectLevelPermissions.has(currentResult.permission.type) && currentResult.applicableSObj && objPermByPermId.has(key)) {
          const currentPermissions: Set<ObjectPermissions> = objPermByPermId.get(key);
          for (const currentPerm of currentPermissions) {
            // TODO: add check on flags and only run currentResult.permission.type logic if one of them is true else compare against all perms
            if (objectLevelPermissions.get(currentResult.permission.type).has(currentPerm.SobjectType)) {
              if (objectLevelPermissions.get(currentResult.permission.type).get(currentPerm.SobjectType).size > 1 && printed === false) {
                console.log(`currentPerm.SobjectType: ${currentPerm.SobjectType} List: ${objectLevelPermissions.get(currentResult.permission.type).get(currentPerm.SobjectType)}`);
                printed = true;
              }
              for (const testAgainst of objectLevelPermissions.get(currentResult.permission.type).get(currentPerm.SobjectType)) {
                // TODO: convert this compare logic to use Object.keys and move it to lift so it can be used in both compare logics
                if (key !== testAgainst.ParentId
                  && currentPerm.SobjectType === testAgainst.SobjectType
                  && currentPerm.PermissionsViewAllRecords === testAgainst.PermissionsViewAllRecords
                  && currentPerm.PermissionsRead === testAgainst.PermissionsRead
                  && currentPerm.PermissionsModifyAllRecords === testAgainst.PermissionsModifyAllRecords
                  && currentPerm.PermissionsEdit === testAgainst.PermissionsEdit
                  && currentPerm.PermissionsCreate === testAgainst.PermissionsCreate
                ) {
                  if (!currentResult.objMatchingPermId.has(testAgainst.ParentId)) {
                    currentResult.objMatchingPermId.set(testAgainst.ParentId, new Set<string>());
                  }
                  currentResult.objMatchingPermId.get(testAgainst.ParentId).add(testAgainst.SobjectType);
                }
              }
            }
          }
          for (const key of currentResult.objMatchingPermId.keys()) {
            const reviewedPerm = currentResult.objMatchingPermId.get(key);
            if (currentResult.applicableSObj.size === reviewedPerm.size) {
              currentResult.exactObjectLevelMatches = [...currentResult.exactObjectLevelMatches, resultList.get(key).permission];
            }
          }
          currentResult.countExactObjectLevelMatches = currentResult.exactObjectLevelMatches.length;
        }
      }
      // TODO: add second query and compare logic
      const report: AffirmPermCompareReport = {
        dateOfRun: (new Date).toLocaleString('en-US'),
        username: username,
        queryUsed: query,
        totalPermsCompared: resultList.size,
        result: Array.from(resultList.values())
      };

      const dateString = await getAffirmFormattedDate();
      const cleanUserName = username.trim();
      const fileName = (this.flags.savedir) ? `${this.flags.savedir}/${(new Date).toJSON()}` : `${settings.buildDirectory}/permissionCompareResults/${cleanUserName}/${dateString}`;
      this.ux.stopSpinner(`Done. Compared ${report.totalPermsCompared} results`);
      const finalFile: string = await stringifyAffirmPermCompareReport(report);
      await fsSaveJson(fileName, JSON.parse(finalFile), this.ux);
    } else {
      this.ux.stopSpinner(`Query ran successfully but returned zero (0) results.`);
    }
    // TODO: update return statement
    return '{result: "okay"}';
  }
}

