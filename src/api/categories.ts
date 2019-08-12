import { APIRequest } from '../utils/APIRequest';
import { RequestOpts } from '../typings';

class CategoriesAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  async getCategories(): Promise<any> {
    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}

export {
  CategoriesAPI
};
