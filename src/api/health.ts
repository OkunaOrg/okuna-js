import { APIRequest } from '../utils/APIRequest';
import { RequestOpts } from '../typings';

class HealthAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  async getHealth(): Promise<any> {
    this.requiresToken = false;

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}

export {
  HealthAPI
};
