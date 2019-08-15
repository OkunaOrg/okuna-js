import nock from 'nock';
import fixtures from '../fixtures';

nock('http://okuna.test')
  .get('/api/categories/').reply(200, fixtures.categories.getCategories)
  .get('/api/health/').reply(200, fixtures.health.main);
