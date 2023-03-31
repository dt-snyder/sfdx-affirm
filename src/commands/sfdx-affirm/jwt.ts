import { flags, FlagsConfig, SfdxCommand } from '@salesforce/command';
import { Messages, SfError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
// Use this file to store all fs-extra helper methods
/// <reference types="fs-extra" />
import * as fs from 'fs-extra';
import { create } from 'njwt'; // Docs: https://github.com/jwtk/njwt

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-affirm', 'jwt');

export default class Jwt extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');
  public static aliases = ['affirm:jwt'];
  public static examples = [
    `$ sfdx affirm:jwt -p server.key -i 3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com -a https://login.salesforce.com
      Token Created:
      eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
    `,
    `$ sfdx affirm:jwt -p server.key -i 3MVG99OxTyEMCQ3gNp2PjkqeZKxnmAiG1xV4oHh9AKL_rSK.BoSVPGZHQukXnVjzRgSuQqGn75NL7yfkQcyy7  -s my@email.com.test -a https://test.salesforce.com -e 1
      Token Created:
      eyJpc3MiOiAiM01WRz...[omitted for brevity]...ZT
    `
  ];


  protected static flagsConfig: FlagsConfig = {
    privatekey: flags.string({ char: 'p', description: messages.getMessage('privatekeyFlagDescription'), required: true }),
    iss: flags.string({ char: 'i', description: messages.getMessage('issFlagDescription'), required: true }),
    sub: flags.string({ char: 's', description: messages.getMessage('subDescription'), required: true }),
    aud: flags.string({ char: 'a', description: messages.getMessage('audFlagDescription'), required: true }),
    exp: flags.number({ char: 'e', description: messages.getMessage('expDescription'), required: false })
  };

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    const pathExists = await fs.pathExists(this.flags.privatekey);
    if (!pathExists) {
      throw new SfError(messages.getMessage('dirmissingErrorMessage'));
    }
    if (this.flags.exp && this.flags.exp > 3) {
      throw new SfError(messages.getMessage('exptobigErrorMessage'));
    }
    const file = await fs.readFile(this.flags.privatekey, 'utf8');
    const useExp = this.flags.exp || 3;
    const claims = {
      iss: this.flags.iss,  // The issuer must contain the OAuth client_id or the connected app for which you registered the certificate.
      aud: this.flags.aud, // Use the authorization server’s URL for the audience value:
      sub: this.flags.sub,    // The subject must contain the username
      exp: new Date().getTime() + (useExp * 60 * 1000)
    };
    const jwt = create(claims, file, 'RS256');
    const token = jwt.compact();
    this.ux.log('Token Created:');
    this.ux.log(token);
    return JSON.stringify({ fullToken: jwt, compactToken: token });
  }
}
