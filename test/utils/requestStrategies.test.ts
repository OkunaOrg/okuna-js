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
      it('should return strategy if it is known', function () {
        const strategy = getRequestStrategy('axios');
        return expect(strategy.name).to.eql('axios');
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
  });
});
