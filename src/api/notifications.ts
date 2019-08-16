import { APIRequest } from "../utils/APIRequest";
import { RequestOpts, LimitationParams } from '../typings';

class NotificationsAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  async getNotifications(opts: LimitationParams) {
    if (opts.maxId) {
      this._params.maxId = opts.maxId;
    }

    if (opts.count) {
      this._params.count = opts.count;
    }

    return this.get();
  }

  async readNotifications(opts: LimitationParams) {
    this._paths.push('read');

    return this.post(opts);
  }

  async deleteNotifications() {
    return this.delete();
  }

  async deleteNotification(id: number) {
    this._paths.push(id.toString());

    return this.delete();
  }

  async getNotification(id: number) {
    this._paths.push(id.toString());

    return this.get();
  }

  async readNotification(id: number) {
    this._paths.push(id.toString());

    return this.post({});
  }
}

export {
  NotificationsAPI
};
