import { APIRequest } from '../utils/APIRequest';
import { RequestOpts } from '../typings';

class HealthAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  async getHealth(): Promise<any> {
    this.requiresToken = false;
    return this.get();
  }
}

export {
  HealthAPI
};
