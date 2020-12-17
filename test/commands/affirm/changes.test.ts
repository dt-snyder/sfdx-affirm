import { expect, test } from '@salesforce/command/lib/test';
import { ensureJsonMap, ensureString } from '@salesforce/ts-types';

describe('affirm:changes', () => {
  test
    .stdout()
    .command(['affirm:changes'])
    .it('runs affirm:changes', ctx => {
      expect(ctx.stdout).to.contain('Current Remote: origin => git@github.com:dt-snyder/sfdx-affirm.git');
    });
});
