import { expect } from 'chai';
import { Client } from '../../src/Okuna';
import { HealthAPI } from '../../src/api/health';

describe('HealthAPI', function () {
  beforeEach(function () {
    this.client = new Client({
      authToken: 'my-token',
      apiUrl: 'http://okuna.test',
      magicHeaderName: null
    });

    this.health = new HealthAPI({ okuna: this.client, endpoint: '/api/health' });
  });

  describe('#getHealth', function () {
    it('should return health', function () {
      return expect(this.health.getHealth()).to.eventually.eql({
        message: 'Todo moy bueno!'
      });
    });
  });
});
