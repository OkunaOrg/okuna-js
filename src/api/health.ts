import { APIRequest } from '../utils/APIRequest';
import { RequestOpts } from '../typings';

/**
 * HealthAPI - Provides methods to interact with the Health API
 */
class HealthAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  /**
   * `GET /api/health/` - Promises to get the server health
   */
  async getHealth(): Promise<any> {
    this.requiresToken = false;
    return this.get();
  }
}

export {
  HealthAPI
};
