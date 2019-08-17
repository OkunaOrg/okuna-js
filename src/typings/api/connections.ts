import { APIRequest } from '../../utils/APIRequest';

/**
 * Parameters for certain methods in connections()
 * @typedef {object} IUserConnection
 * @property {string} username - the username to connect with
 * @property {number[]} circleIds - the circle IDs to which the user should be added
 */
export interface IUserConnection {
  username: string;
  circleIds: number[];
}
