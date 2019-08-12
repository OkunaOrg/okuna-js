import { expect } from 'chai';
import { Client } from '../src/Okuna';

import { CategoriesAPI } from '../src/api/categories';
import { DevicesAPI } from '../src/api/devices';

describe('Client', function () {
  describe('@constructor', function () {
    describe('.apiUrl', function () {
      it('should return default API url if not provided', function () {
        const client = new Client({ authToken: 'my-token' });
        return expect(client.apiUrl).to.eql('https://api.openbook.social');
      });

      it('should set custom API url', function () {
        const client = new Client({ apiUrl: 'http://localhost:8000', authToken: 'my-token' });
        return expect(client.apiUrl).to.eql('http://localhost:8000');
      });
    });

    describe('.requestStrategy', function () {
      it('should default to axios', function () {
        const client = new Client({ authToken: 'my-token' });
        return expect(client.requestStrategy).to.eql('axios');
      });
    });

    describe('magic header', function () {
      it('should set default headers if not provided', function () {
        const client = new Client({ authToken: 'my-token' });
        return expect(client.magicHeaderName).to.eql('X-JESUS-TAKE-THE-WHEEL');
      });

      it('should set magic header to null on null', function () {
        const client = new Client({ authToken: 'my-token', magicHeaderName: null });
        return expect(client.magicHeaderName).to.eql(null);
      });

      it('should set custom magic headers', function () {
        const client = new Client({
          authToken: 'my-token',
          magicHeaderName: 'X-MY-OWN-HEADER',
          magicHeaderValue: 'myOwnValue'
        });

        expect(client.magicHeaderName).to.eql('X-MY-OWN-HEADER');
        expect(client.magicHeaderValue).to.eql('myOwnValue');
      });
    });
  });

  describe('#_buildMagicHeader', function () {
    beforeEach(function () {
      this.client = new Client({ authToken: 'my-token' });
    });

    it('should return nulls on null values', function () {
      return expect(this.client._buildMagicHeader(null, null)).to.eql({
        name: null,
        value: null
      });
    });

    it('should return custom values', function () {
      const name = 'X-MY-OWN-HEADER';
      const value = 'myOwnValue';

      return expect(this.client._buildMagicHeader(name, value)).to.eql({ name, value });
    });

    it('should return defaults when not provided', function () {
      return expect(this.client._buildMagicHeader()).to.eql({
        name: 'X-JESUS-TAKE-THE-WHEEL',
        value: 'jesusCantReallyDriveTho'
      });
    });
  });

  describe('APIs', function () {
    beforeEach(function () {
      this.client = new Client({ authToken: 'my-token' });
    });

    it('#categories', function () {
      return expect(this.client.categories()).to.be.instanceof(CategoriesAPI);
    });

    it('#devices', function () {
      return expect(this.client.devices()).to.be.instanceof(DevicesAPI);
    });
  });
});
