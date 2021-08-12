import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
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
  // TODO: finish docs
  public static examples = [
    `$ sfdx affirm:jwt`
  ];


  protected static flagsConfig = {
    privatekey: flags.string({ char: 'p', description: messages.getMessage('privatekeyFlagDescription'), required: true }),
    clientid: flags.string({ char: 'c', description: messages.getMessage('clientidFlagDescription'), required: true }),
    url: flags.string({ char: 'u', description: messages.getMessage('urlFlagDescription'), required: true })
  };

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    const pathExists = await fs.pathExists(this.flags.privatekey);
    if (!pathExists) {
      throw SfdxError.create('sfdx-affirm', 'faker', 'dirmissingErrorMessage');
    }
    const file = await fs.readFile(this.flags.privatekey, 'utf8');
    const claims = {
      iss: this.flags.clientid,  // The issuer must contain the OAuth client_id or the connected app for which you registered the certificate.
      aud: this.flags.url, // Use the authorization server’s URL for the audience value:
      sub: "drew.snyder@hunterdouglas.com.intmii",    // The subject must contain the username of the user if implementing for an Experience Cloud site.
      exp: new Date().getTime() + (2 * 60 * 1000)
    };
    const jwt = create(claims, file, 'RS256');
    const token = jwt.compact();
    this.ux.log('Token Created:');
    this.ux.log(token);
    return JSON.stringify({ fullToken: jwt, compactToken: token });
  }
}
