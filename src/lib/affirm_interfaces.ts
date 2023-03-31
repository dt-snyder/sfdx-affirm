// Use this file to store all custom interfaces
import { AnyJson, JsonMap } from '@salesforce/ts-types';
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
  waitTime: number | undefined
  declarativeTestClass: string | undefined
}

export interface SfdxOrgOpenResult {
  orgId: string,
  url: string,
  username: string
}

export interface AffirmAuditConfig {
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

export interface AffirmAuditResult {
  currentRunConfiguration: AffirmAuditConfig,
  results: Array<JsonMap>
}

export interface AffirmOpenLocation {
  displayName: string,
  classic: string,
  lightning: string,
  supportsId: boolean,
  classicIdPath?: string,
  lightningIdPath?: string
}

export interface AffirmOpenLocations {
  home: AffirmOpenLocation,
  network: AffirmOpenLocation,
  deployment: AffirmOpenLocation,
  profile: AffirmOpenLocation,
  email: AffirmOpenLocation,
}


