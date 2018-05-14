import { expect, test } from '@salesforce/command/dist/test';

describe('curiousbp:source:pull', () => {
  test
    .withOrg({ username: 'test@org.com' }, true)
    .withConnectionRequest(function() {
      return Promise.resolve({ records: [ { Name: 'Super Awesome org', TrialExpirationDate: '2018-03-20T23:24:11.000+0000'}]});
    })
    .stdout()
    .command(['curiousbp:source:pull', '--targetusername', 'test@org.com'])
    .it('runs curiousbp:source:pull --targetusername test@org.com', (ctx) => {
      expect(ctx.stdout).to.contain('Hello world! This is org: Super Awesome org and I will be around until Tue Mar 20 2018!');
    });
});
