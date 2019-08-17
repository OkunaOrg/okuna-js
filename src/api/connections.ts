import { APIRequest } from "../utils/APIRequest";
import { RequestOpts } from '../typings';
import { IUserConnection } from '../typings/api/connections';

/**
 * @api public
 * ConnectionsAPI - Provides methods to interact with the Connections API
 */
class ConnectionsAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  /**
   * `POST /api/connections/connect/` - Promises to connect to a user
   * @param {IUserConnection} opts
   */
  async connect(opts: IUserConnection) {
    this._paths.push('connect');

    const body: any = {
      username: opts.username
    };

    if (opts.circleIds && opts.circleIds.length) {
      body.circles_ids = opts.circleIds;
    }

    return this.post(body);
  }

  /**
   * `POST /api/connections/confirm/` - Promises to confirm a user connection
   * @param {IUserConnection} opts
   */
  async confirm(opts: IUserConnection) {
    this._paths.push('confirm');

    const body: any = {
      username: opts.username
    };

    if (opts.circleIds && opts.circleIds.length) {
      body.circles_ids = opts.circleIds;
    }

    return this.post(body);
  }

  /**
   * `POST /api/connections/update/` - Promises to update a connection
   * @param {IUserConnection} opts
   */
  async update(opts: IUserConnection) {
    const body: any = {
      username: opts.username
    };

    if (opts.circleIds && opts.circleIds.length) {
      body.circles_ids = opts.circleIds;
    }

    return this.post(body);
  }

  /**
   * `POST /api/connections/disconnect/` - Promises to disconnect from a user
   * @param {string} username - The user to disconnect from
   */
  async disconnect(username: string) {
    this._paths.push('disconnect');

    return this.post({ username });
  }
}

export {
  ConnectionsAPI
};
