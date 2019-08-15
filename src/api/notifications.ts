import { APIRequest } from "../utils/APIRequest";
import { RequestOpts, LimitationParams } from '../typings';

class NotificationsAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  getNotifications(opts: LimitationParams) {
    if (opts.maxId) {
      this._params.maxId = opts.maxId;
    }

    if (opts.count) {
      this._params.count = opts.count;
    }

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  readNotifications(opts: LimitationParams) {
    this._paths.push('read');

    return new Promise((resolve, reject) => {
      return this
        .post(opts)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  deleteNotifications() {
    return new Promise((resolve, reject) => {
      return this
        .delete()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  deleteNotification(id: number) {
    this._paths.push(id.toString());

    return new Promise((resolve, reject) => {
      return this
        .delete()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  getNotification(id: number) {
    this._paths.push(id.toString());

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  readNotification(id: number) {
    this._paths.push(id.toString());

    return new Promise((resolve, reject) => {
      return this
        .post({})
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}

export {
  NotificationsAPI
};
