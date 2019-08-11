import { APIRequest } from '../utils/APIRequest';
import { RequestOpts } from '../typings';
import { AxiosResponse, AxiosError } from 'axios';

class CategoriesAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  async getCategories(): Promise<any> {
    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res: AxiosResponse) => resolve(res.data))
        .catch((err: AxiosError) => reject(err));
    });
  }
}

export {
  CategoriesAPI
};
