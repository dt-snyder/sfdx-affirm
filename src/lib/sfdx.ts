import { SfError, PollingClient, StatusResult } from '@salesforce/core';
import { get, AnyJson, ensureAnyJson } from '@salesforce/ts-types';
import * as child from 'child_process';
import { Ux } from '@salesforce/sf-plugins-core'
import { Duration, parseJson } from '@salesforce/kit';
import { sleep } from './affirm_lift';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme
export const runCommand = (fullCommand: string, ux?: Ux): Promise<AnyJson> => {
  const error = new Error();

  if (!fullCommand.includes('--json')) {
    fullCommand += ' --json';
  }

  const parts = fullCommand.split(' ');
  const commandName = parts[0] + ' ' + parts[1];

  return new Promise((resolve, reject) => {
    if (ux) ux.log(`Running Command: ${chalk.cyan(fullCommand)}`);
    const cmd = child.exec(fullCommand);
    let stdout: string = '';
    cmd.stdout.on('data', data => {
      stdout += data;
    });

    cmd.stderr.on('data', data => {
      const dataAsString: string = data;
      if (ux && dataAsString.indexOf('Warning:') >= 0) {
        let toPrint = dataAsString.substring(dataAsString.indexOf('Warning:'), (dataAsString.indexOf('\n') - 1));
        ux.log(chalk.dim.yellow(toPrint));
      } else if (ux) {
        ux.log(chalk.dim.yellow(dataAsString));
      }
    });

    cmd.on('error', data => {
      console.error('err', data);
    });

    cmd.on('close', code => {
      if (code === 0 && ensureAnyJson(stdout)) {
        resolve(parseJson(stdout));
      } else {
        const sfdxError = SfError.wrap(error);
        sfdxError.message = `Command "${commandName}" failed with message: ${get(stdout, 'message', 'Unknown or Unhandled Error')}`;
        sfdxError.setData(stdout);
        reject(sfdxError);
      }
    });
  });
};

export async function runAsynCommand(fullCommand: string, timeout: number, ux: Ux, spinnerMessage: string, frequency?: number, verbose?: boolean): Promise<AnyJson> {
  const error = new Error();
  const parts = fullCommand.split(' ');
  const commandName = parts[0] + ' ' + parts[1];
  const useFrequency = frequency || 15000;
  let attempts = 0;
  if (!verbose) {
    ux.startSpinner(spinnerMessage);
  } else {
    ux.log(`Running Command: ${chalk.cyan(fullCommand)}`);
  }
  await sleep(useFrequency, (verbose ? ux : undefined));
  if (!fullCommand.includes('--json')) {
    fullCommand += ' --json';
  }
  const executePoll = async (resolve, reject) => {
    const cmd = child.exec(fullCommand);
    attempts++;
    if (verbose) {
      ux.log(`Attempt #: ${chalk.yellow(attempts)} for Command: ${chalk.cyan(commandName)}`);
    } else {
      ux.setSpinnerStatus(`Checking:Attempt#:${attempts}`);
    }
    let stdout: StatusResult = { completed: false, payload: '' };
    let stdoutstr: string = '';
    cmd.stdout.on('data', data => {
      stdoutstr += data;
    });

    cmd.stderr.on('data', data => {
      const dataAsString: string = data;
      if (verbose && dataAsString.indexOf('Warning:') >= 0) {
        let toPrint = dataAsString.substring(dataAsString.indexOf('Warning:'), (dataAsString.indexOf('\n') - 1));
        ux.log(chalk.dim.yellow(toPrint));
      } else if (verbose) {
        ux.log(chalk.dim.yellow(dataAsString));
      }
    });

    cmd.on('error', data => {
      const sfdxError = SfError.wrap(error);
      sfdxError.message = `Command "${commandName}" failed ON ERROR with message: ${data}`;
      sfdxError.setData(data);
      return reject(sfdxError);
    });

    cmd.on('close', code => {
      if (ensureAnyJson(stdoutstr)) {
        stdout.payload = parseJson(stdoutstr);
        const currentStatus = stdout.payload['result']['status'];
        if (currentStatus !== undefined && (currentStatus === 'Done' || currentStatus === 'Failed' || currentStatus === 'Succeeded')) {
          stdout.completed = true;
          if (!verbose) {
            ux.stopSpinner(`Completed`);
          } else if (verbose) {
            ux.log(`Command: ${chalk.cyan(commandName)} | Done: ${stdout.completed}`);
          }
        } else if ((currentStatus !== undefined && currentStatus === 'InProgress') || code == 69) {
          stdout.completed = false;
          if (!verbose) {
            ux.setSpinnerStatus(`Still Processing...`);
          } else if (verbose) {
            ux.log(`Command: ${chalk.cyan(commandName)} | Done: false`);
          }
        } else {
          ux.stopSpinner(`Done:ERROR`);
          const sfdxError = SfError.wrap(error);
          sfdxError.message = `Command "${commandName}" failed UNKNOWN STATUS with message: ${stdoutstr}`;
          sfdxError.setData(stdoutstr);
          return reject(sfdxError);
        }
        return resolve(stdout);
      } else {
        ux.stopSpinner(`Done:ERROR`);
        const sfdxError = SfError.wrap(error);
        sfdxError.message = `Command "${commandName}" failed with UNKNOWN EXCEPTION with message: ${stdoutstr}`;
        sfdxError.setData(stdoutstr);
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


