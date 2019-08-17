import { APIRequest } from "../utils/APIRequest";
import { RequestOpts } from '../typings';
import { IUserConnection } from '../typings/api/connections';

class ConnectionsAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

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

  async update(opts: IUserConnection) {
    const body: any = {
      username: opts.username
    };

    if (opts.circleIds && opts.circleIds.length) {
      body.circles_ids = opts.circleIds;
    }

    return this.post(body);
  }

  async disconnect(username: string) {
    this._paths.push('disconnect');

    return this.post({ username });
  }
}

export {
  ConnectionsAPI
};
