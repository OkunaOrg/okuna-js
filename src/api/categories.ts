import { APIRequest } from '../utils/APIRequest';
import { RequestOpts } from '../typings';

class CategoriesAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  async getCategories(): Promise<any> {
    return this.get();
  }
}

export {
  CategoriesAPI
};
