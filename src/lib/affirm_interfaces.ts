// Use this file to store all custom interfaces
import { AnyJson } from '@salesforce/ts-types';
export interface DiffObj {
  changed: Set<String>;
  insertion: Set<String>;
  destructive: Set<String>;
};
export interface PrintableDiffObj {
  changed: String[];
  insertion: String[];
  destructive: String[];
};

export interface DestructiveXMLMain {
  package: DestructiveXMLType,
};

export interface DestructiveXMLType {
  types: DestructiveXMLTypeEntry[]
  '@xmlns': string,
};

export interface DestructiveXMLTypeEntry {
  members: string[]
  name: string
};

export interface WhatToPrint {
  changed: Boolean,
  insertion: Boolean,
  destructive: Boolean,
  showAll: Boolean
};

export interface TestSuiteXMLMain {
  ApexTestSuite: TestSuiteXMLTests,
};

export interface TestSuiteXMLTests {
  testClassName: string[]
  '@xmlns': string,
};

export interface DescribedSObject {
  childXmlNames?: string[],
  directoryName: string,
  inFolder: boolean,
  metaFile: boolean,
  suffix: string,
  xmlName: string
}
export interface DescribeMetadata {
  metadataObjects: Array<DescribedSObject>,
  organizationNamespace?: string,
  partialSaveAllowed: boolean,
  testRequired: boolean
}
export interface StandardOutSFDX {
  status: number,
  result: AnyJson
}

export interface SfdxTestResult {
  summary: SfdxTestRunSummary,
  tests: Array<SfdxTestRunResult>
}
export interface SfdxTestRunSummary {
  outcome: string,
  testsRan: number,
  passing: number,
  failing: number,
  skipped: number,
  passRate: string,
  failRate: string,
  testStartTime: string,
  testExecutionTime: string,
  testTotalTime: string,
  commandTime: string,
  hostname: string,
  orgId: string,
  username: string,
  testRunId: string,
  userId: string
}
export interface SfdxTestRunResult {
  Id: string,
  QueueItemId: string,
  StackTrace: string | undefined | null,
  Message: string | undefined | null,
  AsyncApexJobId: string,
  MethodName: string,
  Outcome: string,
  ApexClass: SfdxTestApexClass,
  RunTime: number,
  FullName: string
}

export interface SfdxTestApexClass {
  Id: string,
  Name: string,
  NamespacePrefix: string | undefined | null
}

export interface AffirmSettings {
  primaryBranch: string | undefined,
  buildDirectory: string | undefined,
  packageDirectory: string | undefined,
  waitTime: string | undefined
  declarativeTestClass: string | undefined
}

export interface SfdxOrgOpenResult {
  orgId: string,
  url: string,
  username: string
}

export interface AffirmAuditResult {
  dateOfRun: string,
  username: string,
  queryUsed: string,
  totalResults: number,
  filteredResults: number,
  actionFlag: string | undefined,
  sectionFlag: string | undefined,
  displayFlag: string | undefined,
  createdbyuserFlag: string | undefined,
  createdbyprofileFlag: string | undefined,
  dateFlag: string | undefined,
  lastndaysFlag: string | undefined,
  savedirFlag: string | undefined,
  printonlyFlag: string | undefined,
  whereFlag: string | undefined
}
export interface AffirmSfdcPermission {
  id: string,
  name: string,
  type: string,
}
export interface AffirmPermCompareResult {
  permission: AffirmSfdcPermission,
  applicableSObj?: Set<string>,
  applicableFields?: Map<string, Set<string>>,
  countExactObjectLevelMatches?: number,
  countExactFieldLevelMatches?: number,
  countExactMatch?: number,
  exactObjectLevelMatches?: Array<AffirmSfdcPermission>, //
  exactFieldLevelMatches?: Array<AffirmSfdcPermission>,
  exactMatches?: Array<AffirmSfdcPermission>,
  partialObjectLevelMatches?: Map<AffirmSfdcPermission, Set<string>>,
  partialFieldLevelMatches?: Map<AffirmSfdcPermission, Set<string>>,
  objMatchingPermId?: Map<string, Set<string>>,
  fieldMatchingPermId?: Map<string, Set<string>>
}

export interface AffirmPermCompareReport {
  dateOfRun: string,
  username: string,
  queryUsed: string,
  totalPermsCompared: number,
  result: Array<AffirmPermCompareResult>
}

export interface AffirmQueryResponse {
  status: number,
  result: AffirmQueryResult
}
export interface AffirmQueryResult {
  totalSize: number,
  done: boolean,
  records?: Array<AffirmSfdcRecord>
}
export interface AffirmSfdcRecord {
  attributes: AffirmSfdcRecordAttributes,
  Id?: string,
}
export interface PermissionSet extends AffirmSfdcRecord {
  Name: string,
  Label: string,
  Description?: string
}

export interface ObjectPermissions extends AffirmSfdcRecord {
  ParentId: string,
  Parent: PermissionSet,
  PermissionsEdit: boolean,
  PermissionsRead: boolean,
  PermissionsCreate: boolean,
  PermissionsModifyAllRecords: boolean,
  PermissionsViewAllRecords: boolean,
  SobjectType: string
}

export interface AffirmSfdcRecordAttributes {
  type: string,
  url: string
}

