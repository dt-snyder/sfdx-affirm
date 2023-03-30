import { SfError, PollingClient, StatusResult } from '@salesforce/core';
import { get, AnyJson } from '@salesforce/ts-types';
import * as child from 'child_process';
import { UX } from '@salesforce/command';
import { Duration, parseJson } from '@salesforce/kit';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme
export const runCommand = (fullCommand: string, ux?: UX): Promise<AnyJson> => {
  const error = new Error();

  if (!fullCommand.includes('--json')) {
    fullCommand += ' --json';
  }

  const parts = fullCommand.split(' ');
  const commandName = parts[0] + ' ' + parts[1];

  return new Promise((resolve, reject) => {
    if (ux) ux.log(`Running Command: ${chalk.cyan(fullCommand)}`);
    const cmd = child.exec(fullCommand);
    let stdout: AnyJson;
    cmd.stdout.on('data', data => {
      stdout = parseJson(data);
    });

    cmd.stderr.on('data', data => {
      if (ux) ux.logJson(data);
    });

    cmd.on('error', data => {
      console.error('err', data);
    });

    cmd.on('close', code => {
      if (code > 0 && !Object.prototype.hasOwnProperty.call(stdout, 'result')) {
        const sfdxError = SfError.wrap(error);
        sfdxError.message = `Command "${commandName}" failed with message: ${get(stdout, 'message', 'Unknown or Unhandled Error')}`;
        sfdxError.setData(stdout);
        reject(sfdxError);
      } else {
        resolve(stdout);
      }
    });
  });
};

export async function runAsynCommand(fullCommand: string, timeout: number, frequency?: number, ux?: UX): Promise<AnyJson> {
  const error = new Error();
  const parts = fullCommand.split(' ');
  const commandName = parts[0] + ' ' + parts[1];
  const useFrequency = frequency || 15000;
  if (!fullCommand.includes('--json')) {
    fullCommand += ' --json';
  }
  let attempts = 0;
  const executePoll = async (resolve, reject) => {
    if (ux) ux.log(`Running Command: ${chalk.cyan(fullCommand)}`);
    const cmd = child.exec(fullCommand);
    attempts++;
    let stdout: StatusResult = { completed: false, payload: '' };
    cmd.stdout.on('data', data => {
      stdout.payload = parseJson(data);
    });

    cmd.stderr.on('data', data => {
      if (ux) ux.logJson(data);
    });

    cmd.on('error', data => {
      const sfdxError = SfError.wrap(error);
      sfdxError.message = `Command "${commandName}" failed with message: ${data}`;
      sfdxError.setData(data);
      return reject(sfdxError);
    });

    cmd.on('close', code => {
      if (code == 0 && Object.prototype.hasOwnProperty.call(stdout.payload, 'result') && Object.prototype.hasOwnProperty.call(stdout.payload['result'], 'done')) {
        stdout.completed = stdout.payload['result']['done'];
        return resolve(stdout);
      } else if (attempts > 9) {
        const sfdxError = SfError.wrap(error);
        sfdxError.message = `Command "${commandName}" failed with message: Max Appempts Reached`;
        return reject(sfdxError);
      } else {
        const sfdxError = SfError.wrap(error);
        sfdxError.message = `Command "${commandName}" failed with message: ${get(stdout.payload, 'message')}`;
        sfdxError.setData(stdout.payload);
        return reject(sfdxError);
      }
    });
  };

  const options: PollingClient.Options = {
    async poll(): Promise<StatusResult> {
      return new Promise(executePoll);
    },
    frequency: Duration.milliseconds(useFrequency),
    timeout: Duration.minutes(timeout)
  };
  const client = await PollingClient.create(options);
  let finalResponse: AnyJson;
  await client.subscribe().then(response => {
    finalResponse = response;
  }).catch(err => {
    const sfdxError = SfError.wrap(err);
    throw sfdxError;
  });
  return finalResponse;
};


