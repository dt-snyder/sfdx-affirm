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
