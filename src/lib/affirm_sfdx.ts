// Use this file to store all SFDX commands that are run using util.promisify(child.exec)
import { runCommand } from './sfdx';
import { Ux } from '@salesforce/sf-plugins-core'
import { AnyJson, ensureAnyJson, ensureJsonMap, get } from '@salesforce/ts-types';
import { DescribeMetadata } from './affirm_interfaces';

export async function sfdxOpenToPath(username: string, path: string, urlonly?: boolean, ux?: UX): Promise<AnyJson> {
  let urlOnly = urlonly ? ' -r ' : '';
  const response: AnyJson = ensureAnyJson((await runCommand(`sfdx force:org:open -p ${path} -u ${username} ${urlOnly}`, ux)));
  return response;
}

export async function sfdxGetIsSandbox(username: string, ux?: UX): Promise<boolean> {
  const response: AnyJson = (await runCommand(`sfdx force:data:soql:query -q "SELECT Id, IsSandbox FROM Organization LIMIT 1" -u ${username} --json`, ux));
  const booleanToReturn: boolean = get(response, 'result.records[0].IsSandbox') as boolean;
  return booleanToReturn;
}

export async function sfdxQuery(username: string, query: string, ux?: UX): Promise<AnyJson> {
  const response: AnyJson = ensureJsonMap(ensureAnyJson((await runCommand(`sfdx force:data:soql:query -q "${query}" -u ${username} --json`, ux))));
  return response;
}

export async function describeMetadata(username: string, ux?: UX): Promise<DescribeMetadata> {
  const response: AnyJson = ensureAnyJson((await runCommand(`sfdx force:mdapi:describemetadata -u ${username} --json`, ux)));
  const toReturn: DescribeMetadata = get(response, 'result') as DescribeMetadata;
  return toReturn;
}



