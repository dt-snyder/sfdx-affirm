import * as child from 'child_process';
import * as util from 'util';
import { SfdxError } from '@salesforce/core';
// import { DiffObj, DestructiveXMLMain, DestructiveXMLType, DestructiveXMLTypeEntry, WhatToPrint } from './affirm_interfaces';
const exec = util.promisify(child.exec);

export async function sfdxMdapiConvert(ux: UX, outputdir: string) {
  // TODO: add support for deploying destructive changes first or last
  const command_source = ' -r .releaseArtifacts/tempParcel/force-app';
  const command_outputDir = ' -d ' + outputdir;
  const command = 'sfdx force:source:convert --json --loglevel error' + command_outputDir + command_source;

  let result;
  await exec(command)
    .then((resp) => {
      result = resp.stdout;
      ux.stopSpinner('Success');
    })
    .catch((err) => {
      result = JSON.parse(err.stdout);
      ux.stopSpinner('Error');
      ux.log(result.message);
      ux.log(result.stack);
    });
  return result;
}


// TODO: create method that calls describeMetadata and returns the json object for use in creating a destructive package
export async function sfdxMdapiDescribeMetadata(ux?: UX, throwError?: boolean) {
  const command = 'sfdx force:mdapi:describemetadata --json';
  const willThrow: boolean = throwError || false;
  let result;
  await exec(command)
    .then((resp) => {
      const rawObj = JSON.parse(resp.stdout)
      result = rawObj.result;
    })
    .catch((err) => {
      result = JSON.parse(err.stdout);
      if (ux) {
        ux.stopSpinner('Error');
        ux.log(result.message);
        ux.log(result.stack);
        if (willThrow) throw SfdxError.create('affirm', 'helper_files', 'errorMdapiCallFailed');
      }
    });
  return result;
}
