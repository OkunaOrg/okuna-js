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

    return this.get();
  }

  readNotifications(opts: LimitationParams) {
    this._paths.push('read');

    return this.post(opts);
  }

  deleteNotifications() {
    return this.delete();
  }

  deleteNotification(id: number) {
    this._paths.push(id.toString());

    return this.delete();
  }

  getNotification(id: number) {
    this._paths.push(id.toString());

    return this.get();
  }

  readNotification(id: number) {
    this._paths.push(id.toString());

    return this.post({});
  }
}

export {
  NotificationsAPI
};
