// Use this file to store all custom interfaces
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
