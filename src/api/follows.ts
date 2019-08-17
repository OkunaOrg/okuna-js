import { APIRequest } from "../utils/APIRequest";
import { RequestOpts } from '../typings';
import { IUserFollows } from '../typings/api/follows';

class FollowsAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  async follow(opts: IUserFollows) {
    this._paths.push('follow');

    const body: any = {
      username: opts.username
    };

    if (opts.listIds && opts.listIds.length) {
      body.lists_ids = opts.listIds;
    }

    return this.post(opts);
  }

  async update(opts: IUserFollows) {
    this._paths.push('update');

    return this.post(opts);
  }

  async unfollow(username: string) {
    this._paths.push('unfollow');

    return this.post({ username });
  }
}

export {
  FollowsAPI
};
