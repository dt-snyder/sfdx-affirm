import { Ux, Flags, SfCommand } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
// Use this file to store all fs-extra helper methods
/// <reference types="fs-extra" />
import * as fs from 'fs-extra';
import { create } from 'njwt'; // Docs: https://github.com/jwtk/njwt

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('sfdx-affirm', 'jwt');

export type JwtResult = { status: string };

export default class Jwt extends SfCommand<JwtResult> {

  public static readonly summary = messages.getMessage('commandDescription');
  public static readonly description = messages.getMessage('commandDescription');
  public static readonly aliases = ['affirm:jwt'];
  public static readonly examples = [
    `$ sfdx affirm:jwt -p server.key -i 3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com -a https://login.salesforce.com
      Token Created:
      eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
    `,
    `$ sfdx affirm:jwt -p server.key -i 3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com.test -a https://test.salesforce.com -e 1
      Token Created:
      eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
    `
  ];


  public static readonly flags = {
    privatekey: Flags.string({ char: 'p', description: messages.getMessage('privatekeyFlagDescription'), required: true }),
    iss: Flags.string({ char: 'i', description: messages.getMessage('issFlagDescription'), required: true }),
    sub: Flags.string({ char: 's', description: messages.getMessage('subDescription'), required: true }),
    aud: Flags.string({ char: 'a', description: messages.getMessage('audFlagDescription'), required: true }),
    exp: Flags.integer({ char: 'e', description: messages.getMessage('expDescription'), required: false }),
    targetusername: Flags.requiredOrg({ char: 'u', required: false }),
    apiversion: Flags.orgApiVersion({ description: 'api version for the org', required: false })
  };

  public async run(): Promise<JwtResult> {
    const { flags } = await this.parse(Jwt);
    const pathExists = await fs.pathExists(flags.privatekey);
    if (!pathExists) {
      throw messages.createError('dirmissingErrorMessage');
    }
    if (flags.exp && flags.exp > 3) {
      throw messages.createError('exptobigErrorMessage');
    }
    const file = await fs.readFile(flags.privatekey, 'utf8');
    const useExp = flags.exp || 3;
    const claims = {
      iss: flags.iss,  // The issuer must contain the OAuth client_id or the connected app for which you registered the certificate.
      aud: flags.aud, // Use the authorization server’s URL for the audience value:
      sub: flags.sub,    // The subject must contain the username
      exp: new Date().getTime() + (useExp * 60 * 1000)
    };
    const jwt = create(claims, file, 'RS256');
    const token = jwt.compact();
    this.log('Token Created:');
    this.log(token);
    return JSON.stringify({ fullToken: jwt, compactToken: token });
  }
}
