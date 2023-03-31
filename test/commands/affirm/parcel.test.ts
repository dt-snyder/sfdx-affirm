import { expect, test } from '@salesforce/command/lib/test';
import { ensureJsonMap, ensureString } from '@salesforce/ts-types';

describe('affirm:parcel', () => {
  test
    .withOrg({ username: 'test@org.com' }, true)
    .withConnectionRequest((request) => {
      const requestMap = ensureJsonMap(request);
      if (/Organization/.exec(ensureString(requestMap.url))) {
        return Promise.resolve({
          records: [
            {
              Name: 'Super Awesome Org',
              TrialExpirationDate: '2018-03-20T23:24:11.000+0000',
            },
          ],
        });
      }
      return Promise.resolve({ records: [] });
    })
    .stdout()
    .command(['affirm:parcel', '--targetusername', 'test@org.com'])
    .it('runs affirm:parcel --targetusername test@org.com', (ctx) => {
      expect(ctx.stdout).to.contain('Current Remote: origin => git@github.com:dt-snyder/sfdx-affirm.git');
    });
});
