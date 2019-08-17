import { APIRequest } from '../utils/APIRequest';
import { RequestOpts } from '../typings';

/**
 * @api public
 * CategoriesAPI - Provides methods to interact with the Categories API
 */
class CategoriesAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  /**
   * `GET /api/categories/` - Promises to return a list of categories
   * @returns - an array of categories
   */
  async getCategories(): Promise<any> {
    return this.get();
  }
}

export {
  CategoriesAPI
};
