import { APIRequest } from "../utils/APIRequest";
import { RequestOpts } from '../typings/index';
import { IUserFollows } from '../typings/api/follows';

class FollowsAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  follow(opts: IUserFollows) {
    this._paths.push('follow');

    return new Promise((resolve, reject) => {
      return this
        .post(opts)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  update(opts: IUserFollows) {
    this._paths.push('update');

    return new Promise((resolve, reject) => {
      return this
        .post(opts)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  unfollow(username: string) {
    this._paths.push('unfollow');

    return new Promise((resolve, reject) => {
      return this
        .post({ username })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}

export {
  FollowsAPI
};
