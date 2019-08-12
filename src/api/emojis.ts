import { APIRequest } from '../utils/APIRequest';
import { RequestOpts } from '../typings';

class EmojisAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  async getGroups(): Promise<any> {
    this._paths.push('groups');

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}

export {
  EmojisAPI
};
