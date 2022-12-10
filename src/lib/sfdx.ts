import { SfError } from '@salesforce/core';
import { Dictionary, get } from '@salesforce/ts-types';
import * as child from 'child_process';
import { UX } from '@salesforce/command';
const chalk = require('chalk'); // https://github.com/chalk/chalk#readme
export const runCommand = (fullCommand: string, ux?: UX): Promise<Dictionary> => {
  const error = new Error();

  if (!fullCommand.includes('--json')) {
    fullCommand += ' --json';
  }

  const parts = fullCommand.split(' ');
  const commandName = parts[0] + ' ' + parts[1];

  return new Promise((resolve, reject) => {
    if (ux) ux.log(`Running Command: ${chalk.cyan(fullCommand)}`);
    const cmd = child.exec(fullCommand);
    let stdout = '';
    cmd.stdout.on('data', data => {
      stdout += data;
    });

    cmd.stderr.on('data', data => {
      console.warn('srderr', data);
    });

    cmd.on('error', data => {
      console.error('err', data);
    });

    cmd.on('close', code => {
      let json;
      try { json = JSON.parse(stdout); } catch (e) {
        console.warn(`No parsable results from command "${fullCommand}"`);
      }
      if (code > 0 && !json.result) {
        const sfdxError = SfError.wrap(error);
        // console.log(json);
        sfdxError.message = `Command "${commandName}" failed with message: ${get(json, 'message')}`;
        sfdxError.setData(json);
        reject(sfdxError);
      } else {
        resolve(json);
      }
    });
  });
};
