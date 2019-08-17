import { APIRequest } from "../utils/APIRequest";
import { RequestOpts } from '../typings';
import { IUserFollows } from '../typings/api/follows';

/**
 * @api public
 * FollowsAPI - Provides methods to interact with the Follows API
 */
class FollowsAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  /**
   * `POST /api/follows/follow/` - Promises to follow a user
   * @param {IUserFollows} opts
   */
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

  /**
   * `POST /api/follows/update/` - Promises to update a following
   * @param {IUserFollows} opts
   */
  async update(opts: IUserFollows) {
    this._paths.push('update');

    return this.post(opts);
  }

  /**
   * `POST /api/follows/unfollow/` - Promises to unfollow a user
   * @param {string} username - The username of the user to unfollow
   */
  async unfollow(username: string) {
    this._paths.push('unfollow');

    return this.post({ username });
  }
}

export {
  FollowsAPI
};
