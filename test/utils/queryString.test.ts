import queryString from '../../src/utils/queryString';
import { expect } from 'chai';

describe('utils/queryString', function () {
  it('should treat simple objects correctly', function () {
    return expect(queryString({
      test: 'value',
      other: 123
    })).to.eql('test=value&other=123');
  });

  it('should treat nested objects correctly', function () {
    const input = {
      name: 'joe',
      occupation: 'developer',
      social: {
        okuna: 'joe',
        github: 'jozsefsallai'
      }
    };

    return expect(queryString(input)).to.eql(
      'name=joe&occupation=developer&social[okuna]=joe&social[github]=jozsefsallai'
    );
  });

  it('should treate *really* nested objects correctly', function () {
    const input = {
      okuna: {
        is: {
          awesome: true
        },
        has: {
          ads: false,
          privacy: true,
          awesomeness: {
            level: 9000
          }
        }
      }
    };

    return expect(queryString(input)).to.eql(
      'okuna[is][awesome]=true&okuna[has][ads]=false&okuna[has][privacy]=true&okuna[has][awesomeness][level]=9000'
    );
  });

  it('should treat arrays correctly', function () {
    const input = {
      animals: [ 'dog', 'cat', 'parrot' ]
    };

    return expect(queryString(input)).to.eql(
      'animals[0]=dog&animals[1]=cat&animals[2]=parrot'
    );
  });
});
