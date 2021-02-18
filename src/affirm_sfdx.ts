// Use this file to store all SFDX commands that are run using util.promisify(child.exec)
import * as child from 'child_process';
import * as util from 'util';
import { SfdxError } from '@salesforce/core';
import { DescribeMetadata } from './affirm_interfaces';
import { UX } from '@salesforce/command';
// import { DiffObj, DestructiveXMLMain, DestructiveXMLType, DestructiveXMLTypeEntry, WhatToPrint } from './affirm_interfaces';
const exec = util.promisify(child.exec);

export async function sfdxMdapiConvert(ux: UX, outputdir: string) {
  const command_source = ' -r .releaseArtifacts/tempParcel/force-app';
  const command_outputDir = ' -d ' + outputdir;
  const command = 'sfdx force:source:convert --json --loglevel error' + command_outputDir + command_source;

  let result;
  await exec(command)
    .then((resp) => {
      result = resp.stdout;
      // ux.stopSpinner('Success');
    })
    .catch((err) => {
      result = JSON.parse(err.stdout);
      ux.stopSpinner('Error');
      ux.log(result.message);
      ux.log(result.stack);
    });
  return result;
}

export async function sfdxMdapiDescribeMetadata(ux?: UX): Promise<DescribeMetadata> {
  const command = 'sfdx force:mdapi:describemetadata --json';
  let result;
  await exec(command)
    .then((resp) => {
      const rawObj = JSON.parse(resp.stdout)
      result = rawObj.result;
    })
    .catch((err) => {
      const errResult = JSON.parse(err.stdout);
      if (ux) {
        ux.stopSpinner('Error');
        ux.log(errResult.message);
        ux.log(errResult.stack);
        throw SfdxError.create('sfdx-affirm', 'helper_files', 'errorMdapiCallFailed');
      }
    });
  return result as DescribeMetadata;
}

// TODO: remove timeToWait, get Id, then run force:mdapi:deploy:report, to print and update a progress bar
export async function sfdxMdapiValidatePackage(targetusername: string, packageDir: string, openDeploymetStatus: boolean, testClasses?: string, waitTime?: number, ux?: UX) {
  const username = ' -u ' + targetusername;
  const packageDirectory = ' -d ' + packageDir;
  const tests = testClasses ? ' -l RunSpecifiedTests -r ' + testClasses : ' -l NoTestRun';
  const timeToWait = waitTime ? ' -w ' + waitTime : ' -w 10';
  const command = openDeploymetStatus ? 'sfdx force:mdapi:deploy --json -c ' + username + packageDirectory + tests : 'sfdx force:mdapi:deploy --json -c ' + username + packageDirectory + timeToWait + tests;
  let result;
  await exec(command)
    .then((resp) => {
      const rawObj = JSON.parse(resp.stdout);
      result = rawObj.result;
    })
    .catch((err) => {
      const rawObj = JSON.parse(err.stdout);
      if (rawObj.result) {
        result = rawObj.result;
      } else {
        result = rawObj;
      }
    });
  if (openDeploymetStatus && result.status === 1) {
    if (ux) {
      ux.log('Opening Deployment Status page for: ' + result.Id);
    }
    const openCommand = 'sfdx force:org:open --json ' + username + ' -p lightning/setup/DeployStatus/page?address=%2Fchangemgmt%2FmonitorDeploymentsDetails.apexp%3FasyncId%' + result.Id;
    let openResult;
    let hasError;
    await exec(openCommand)
      .then((resp) => {
        const rawObj = JSON.parse(resp.stdout);
        openResult = rawObj.result;
      })
      .catch((err) => {
        hasError = true;
        const rawObj = JSON.parse(err.stdout);
        if (rawObj.result) {
          openResult = rawObj.result;
        } else {
          openResult = rawObj;
        }
      });
    if (hasError) ux.error('Error Opening Deployment Status: ' + openResult);
  }
  return result;
}

// TODO: remove timeToWait, get Id, then run force:apex:test:report, to print and update a progress bar
export async function sfdxTestRun(targetusername: string, testClasses: string, waitTime?: number, ux?: UX, throwError?: boolean) {
  const username = ' -u ' + targetusername;
  const tests = ' -n ' + testClasses;
  const timeToWait = waitTime ? ' -w ' + waitTime : ' -w 10';
  const command = 'sfdx force:apex:test:run --json -l RunSpecifiedTests ' + username + timeToWait + tests;
  // const willThrow: boolean = throwError || false;
  let result;
  await exec(command)
    .then((resp) => {
      const rawObj = JSON.parse(resp.stdout)
      result = rawObj.result;
    })
    .catch((err) => {
      const rawObj = JSON.parse(err.stdout)
      if (rawObj.result) {
        result = rawObj.result;
      } else {
        result = rawObj;
      }
    });
  // console.log(result);
  return result;
}
