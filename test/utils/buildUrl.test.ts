import { expect } from 'chai';
import buildUrl from '../../src/utils/buildUrl';

describe('utils/buildUrl', function () {
  it('should return API url', function () {
    return expect(buildUrl('https://api.okuna.io', [], {})).to.eql('https://api.okuna.io/');
  });

  it('should parse paths properly', function () {
    const paths = [ 'api', 'categories' ];
    return expect(buildUrl('https://api.okuna.io', paths, {}))
      .to.eql('https://api.okuna.io/api/categories');
  });

  it('should parse params properly', function () {
    const params = {
      key1: 'value1',
      key2: 'value2'
    };

    return expect(buildUrl('https://api.okuna.io/', [], params))
      .to.eql('https://api.okuna.io/?key1=value1&key2=value2');
  });
});
