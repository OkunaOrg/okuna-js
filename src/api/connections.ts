import { APIRequest } from "../utils/APIRequest";
import { RequestOpts } from '../typings/index';
import { IUserConnection } from '../typings/api/connections';

class ConnectionsAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  connect(opts: IUserConnection) {
    this._paths.push('connect');

    return new Promise((resolve, reject) => {
      return this
        .post(opts)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  confirm(opts: IUserConnection) {
    this._paths.push('confirm');

    return new Promise((resolve, reject) => {
      return this
        .post(opts)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  update(opts: IUserConnection) {
    this._paths.push('update');

    return new Promise((resolve, reject) => {
      return this
        .post(opts)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  disconnect(username: string) {
    this._paths.push('disconnect');

    return new Promise((resolve, reject) => {
      return this
        .post({ username })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}

export {
  ConnectionsAPI
};
