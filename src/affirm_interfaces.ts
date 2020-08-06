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

// TODO: add interface for force:mdapi:describemetadata
