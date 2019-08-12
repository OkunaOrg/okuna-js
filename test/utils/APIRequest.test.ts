import { expect } from 'chai';
import { APIRequest } from '../../src/utils/APIRequest';
import { Client } from '../../src/Okuna';

describe('utils/APIRequest', function () {
  beforeEach(function () {
    this.client = new Client({ authToken: 'your-public-auth-token' });
  });

  describe('#generateHeaders', function () {
    it('should generate proper header information', function () {
      const request = new APIRequest({ okuna: this.client, endpoint: '/' });
      const expected = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token your-public-auth-token',
        'X-JESUS-TAKE-THE-WHEEL': 'jesusCantReallyDriveTho'
      };
      return expect(request.generateHeaders()).to.eql(expected);
    });

    it('should not include magic header if not present', function () {
      const client = new Client({
        authToken: 'your-auth-token',
        magicHeaderName: null
      });
      const request = new APIRequest({ okuna: client, endpoint: '/' });
      const expected = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token your-auth-token'
      };
      return expect(request.generateHeaders()).to.eql(expected);
    });
  });
});
