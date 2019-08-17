import { expect } from 'chai';
import { APIRequest } from '../../src/utils/APIRequest';
import { Client } from '../../src/Okuna';
import MockRequestStrategy = require('../support/MockRequestStrategy');

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

    it('should not include auth token if not necessary', function () {
      const request = new APIRequest({ okuna: this.client, endpoint: '/' });
      request.requiresToken = false;
      const expected = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-JESUS-TAKE-THE-WHEEL': 'jesusCantReallyDriveTho'
      };
      return expect(request.generateHeaders()).to.eql(expected);
    });

    it('should set custom content-type', function () {
      const request = new APIRequest({ okuna: this.client, endpoint: '/' });
      const expected = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Token your-public-auth-token',
        'X-JESUS-TAKE-THE-WHEEL': 'jesusCantReallyDriveTho'
      };
      return expect(request.generateHeaders('application/x-www-form-urlencoded')).to.eql(expected);
    });

    it('should not set content-type if "auto" is provided', function () {
      const request = new APIRequest({ okuna: this.client, endpoint: '/' });
      const expected = {
        'Accept': 'application/json',
        'Authorization': 'Token your-public-auth-token',
        'X-JESUS-TAKE-THE-WHEEL': 'jesusCantReallyDriveTho'
      };
      return expect(request.generateHeaders('auto')).to.eql(expected);
    });

    it('should throw if authToken is necessary but not provided', function () {
      const client = new Client();
      const request = new APIRequest({ okuna: client, endpoint: '/' });
      return expect(() => request.generateHeaders()).to.throw('Authorization token not provided.');
    });
  });

  describe('#_constructFormdata', function () {
    beforeEach(function () {
      this.client = new Client({ authToken: 'my-token', requestStrategy: MockRequestStrategy });
      this.request = new APIRequest({ okuna: this.client, endpoint: '/' });
    });

    it('should return empty formdata on non-object', function () {
      return expect(this.request._constructFormdata().getLengthSync()).to.eql(0);
    });

    it('should return correct formdata for object', function () {
      // npm/form-data will does not provide get() or entries()
      // so we only check the length here

      const obj = {
        wubba: 'lubba',
        dub: 'dub'
      };

      const form = this.request._constructFormdata(obj);

      return expect(form.getLengthSync()).to.not.eql(0);
    });
  });

  describe('methods', function () {
    beforeEach(function () {
      this.client = new Client({ authToken: 'my-token', requestStrategy: MockRequestStrategy });
      this.request = new APIRequest({ okuna: this.client, endpoint: '/' });
    });

    afterEach(function () {
      this.request._paths = [];
    });

    [
      'get', 'post', 'put', 'patch', 'delete',
      'postFormdata', 'putFormdata', 'patchFormdata',
    ].forEach(method => {
      it(`#${method} - resolve`, function () {
        return expect(this.request[method]()).to.eventually.not.be.rejected;
      });

      it(`#${method} - reject`, function () {
        this.request._paths.push('bad');
        return expect(this.request[method]()).to.eventually.be.rejected;
      });
    });
  });
});
