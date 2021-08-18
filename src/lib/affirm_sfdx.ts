// Use this file to store all SFDX commands that are run using util.promisify(child.exec)
// import { SfdxError } from '@salesforce/core';
// import { DescribeMetadata } from './affirm_interfaces';
// import { sleep } from './affirm_lift';
// import { AnyJson, ensureString, ensureAnyJson } from '@salesforce/ts-types';
// import { UX } from '@salesforce/command';
// import { DiffObj, DestructiveXMLMain, DestructiveXMLType, DestructiveXMLTypeEntry, WhatToPrint } from './affirm_interfaces';
import { runCommand } from './sfdx';
import { AnyJson, ensureAnyJson } from '@salesforce/ts-types';
// TODO: move reporting of wait time based on id here for both test and deploy. Either have been built yet.
// TODO: remove timeToWait, get Id, then run force:apex:test:report, to print and update a progress bar
// TODO: remove timeToWait, get Id, then run force:mdapi:deploy:report, to print and update a progress bar
// TODO: add method that returns true if current instance is sandbox
export async function sfdxOpenDeploymentStatus(username: string, path: string, urlonly?: boolean): Promise<AnyJson> {
  let urlOnly = urlonly ? ' -r ' : '';
  const response: AnyJson = ensureAnyJson((await runCommand(`sfdx force:org:open -p ${path} -u ${username} ${urlOnly}`)));
  return response;
}

export async function sfdxGetIsSandbox(username: string): Promise<boolean> {
  const response: object = ensureAnyJson((await runCommand(`sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u ${username} --json`))) as object;
  const booleanToReturn: boolean = response['result']['records'][0]['IsSandbox'] as boolean;
  return booleanToReturn;
}


