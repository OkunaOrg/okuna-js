import { expect } from 'chai';
import { Client } from '../../src/Okuna';
import { CategoriesAPI } from '../../src/api/categories';

describe('CategoriesAPI', function () {
  beforeEach(function () {
    this.client = new Client({
      authToken: 'my-token',
      apiUrl: 'http://okuna.test',
      magicHeaderName: null
    });

    this.categories = new CategoriesAPI({ okuna: this.client, endpoint: '/api/categories' });
  });

  describe('#getCategories', function () {
    it('should return list of categories', function () {
      return expect(this.categories.getCategories()).to.eventually.be.an('array').and.have.length(2);
    });
  });
});
