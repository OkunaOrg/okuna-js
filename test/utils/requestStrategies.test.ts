import { expect } from 'chai';
import { RequestStrategy, getRequestStrategy } from '../../src/utils/requestStrategies';
import MockRequestStrategy from '../support/MockRequestStrategy';

describe('utils/requestStrategies', function () {
  describe('RequestStrategy class', function () {
    describe('@constructor', function () {
      it('should set name', function () {
        const strategy = new RequestStrategy('test-strategy');
        return expect(strategy.name).to.eql('test-strategy');
      });
    });
  });

  describe('getRequestStrategy', function () {
    describe('on string input', function () {
      it('should return axios, if it is provided', function () {
        const strategy = getRequestStrategy('axios');
        return expect(strategy.name).to.eql('axios');
      });

      it('should return fetch, if it is provided', function () {
        const strategy = getRequestStrategy('fetch');
        return expect(strategy.name).to.eql('fetch');
      });

      it('should throw on invalid input', function () {
        const strategy = () => getRequestStrategy('totallylegitstrategy');
        return expect(strategy).to.throw('Unknown request strategy: totallylegitstrategy.');
      });
    });

    describe('on strategy class input', function () {
      it('should return custom strategy', function () {
        const strategy = getRequestStrategy(MockRequestStrategy);
        return expect(strategy.name).to.eql('mock');
      });

      it('should be able to call the class methods', function () {
        const strategy = getRequestStrategy(MockRequestStrategy);
        return strategy.post('http://localhost:8000', {
          key: 'value'
        }, {
          'Content-Type': 'application/json'
        })
          .then((result: object) => {
            return expect(result).to.eql({
              method: 'POST',
              url: 'http://localhost:8000',
              body: {
                key: 'value'
              },
              headers: {
                'Content-Type': 'application/json'
              }
            });
          });
      });
    });

    describe('should have all methods', function () {
      beforeEach(function () {
        this.api = getRequestStrategy(MockRequestStrategy);
      });

      [
        'get', 'post', 'put', 'patch', 'delete'
      ].forEach(method => {
        it(`has "${method}"`, function () {
          return expect(this.api[method]).to.exist;
        });
      });
    });
  });
});
