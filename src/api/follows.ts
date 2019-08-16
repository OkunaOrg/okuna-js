import { APIRequest } from "../utils/APIRequest";
import { RequestOpts } from '../typings';
import { IUserFollows } from '../typings/api/follows';

class FollowsAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  follow(opts: IUserFollows) {
    this._paths.push('follow');

    return this.post(opts);
  }

  update(opts: IUserFollows) {
    this._paths.push('update');

    return this.post(opts);
  }

  unfollow(username: string) {
    this._paths.push('unfollow');

    return this.post({ username });
  }
}

export {
  FollowsAPI
};
