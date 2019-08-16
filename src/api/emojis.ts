import { APIRequest } from '../utils/APIRequest';
import { RequestOpts } from '../typings';

/**
 * EmojisAPI - Provides methods to interact with the Emojis API
 */
class EmojisAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  /**
   * `GET /api/emojis/groups/` - Promises to get an array of emoji groups
   */
  async getGroups(): Promise<any> {
    this._paths.push('groups');

    return this.get();
  }
}

export {
  EmojisAPI
};
