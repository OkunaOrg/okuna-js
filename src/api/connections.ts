import { APIRequest } from "../utils/APIRequest";
import { RequestOpts } from '../typings';
import { IUserConnection } from '../typings/api/connections';

class ConnectionsAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  connect(opts: IUserConnection) {
    this._paths.push('connect');

    return this.post(opts);
  }

  confirm(opts: IUserConnection) {
    this._paths.push('confirm');

    return this.post(opts);
  }

  update(opts: IUserConnection) {
    this._paths.push('update');

    return this.post(opts);
  }

  disconnect(username: string) {
    this._paths.push('disconnect');

    return this.post({ username });
  }
}

export {
  ConnectionsAPI
};
