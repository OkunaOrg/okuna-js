import { APIRequest } from '../utils/APIRequest';
import { RequestOpts } from '../typings';

class EmojisAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  async getGroups(): Promise<any> {
    this._paths.push('groups');

    return this.get();
  }
}

export {
  EmojisAPI
};
