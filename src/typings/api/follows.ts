import { APIRequest } from '../../utils/APIRequest';

/**
 * Parameters for certain methods in follows()
 * @typedef {object} IUserFollows
 * @property {string} username - the username to follow
 * @property {number[]} listIds - the list IDs to which the user should be added
 */
export interface IUserFollows {
  username: string;
  listIds: number[];
}

/**
 * FollowsAPI - Provides methods to interact with the Follows API
 */
export interface FollowsAPI extends APIRequest {
  /**
   * `POST /api/follows/follow/` - Promises to follow a user
   * @param {IUserFollows} opts
   */
  follow(opts: IUserFollows): Promise<any>;

  /**
   * `POST /api/follows/update/` - Promises to update a following
   * @param {IUserFollows} opts
   */
  update(opts: IUserFollows): Promise<any>;

  /**
   * `POST /api/follows/unfollow/` - Promises to unfollow a user
   * @param {string} username - The username of the user to unfollow
   */
  unfollow(username: string): Promise<any>;
}
