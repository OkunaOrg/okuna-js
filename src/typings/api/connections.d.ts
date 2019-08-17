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

/**
 * ConnectionsAPI - Provides methods to interact with the Connections API
 */
export interface ConnectionsAPI extends APIRequest {
  /**
   * `POST /api/connections/connect/` - Promises to connect to a user
   * @param {IUserConnection} opts
   */
  connect(opts: IUserConnection): Promise<any>;

  /**
   * `POST /api/connections/confirm/` - Promises to confirm a user connection
   * @param {IUserConnection} opts
   */
  confirm(opts: IUserConnection): Promise<any>;

  /**
   * `POST /api/connections/update/` - Promises to update a connection
   * @param {IUserConnection} opts
   */
  update(opts: IUserConnection): Promise<any>;

  /**
   * `POST /api/connections/disconnect/` - Promises to disconnect from a user
   * @param {string} username - The user to disconnect from
   */
  disconnect(username: string): Promise<any>;
}
