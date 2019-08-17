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
