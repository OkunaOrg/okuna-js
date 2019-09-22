import { APIRequest } from "../utils/APIRequest";
import { RequestOpts } from '../typings';
import { IGetNotificationOpts } from '../typings/api/notifications';

/**
 * @api public
 * NotificationsAPI - Provides methods to interact with the Notifications API
 */
class NotificationsAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  /**
   * `GET /api/notifications/` - promises to retrieve the user's notifications
   * @param {IGetNotificationOpts} opts - The limitation rules
   */
  async getNotifications(opts: IGetNotificationOpts) {
    if (opts.maxId) {
      this._params.maxId = opts.maxId;
    }

    if (opts.count) {
      this._params.count = opts.count;
    }

    if (opts.types && opts.types.length) {
      this._params.types = opts.types.join(',');
    }

    return this.get();
  }

  /**
   * `POST /api/notifications/read/` - promises to mark notifications as read
   * @param {IGetNotificationOpts} opts - The limitation rules
   */
  async readNotifications(opts: IGetNotificationOpts) {
    this._paths.push('read');

    const body: any = {};

    if (opts.maxId) {
      body.max_id = opts.maxId;
    }

    if (opts.types && opts.types.length) {
      body.types = opts.types.join(',');
    }

    return this.post(body);
  }

  /**
   * `DELETE /api/notifications/` - promises to delete all notifications
   */
  async deleteNotifications() {
    return this.delete();
  }

  /**
   * `DELETE /api/notifications/:id/` - promises to delete a notification
   * @param {number} id - The ID of the notification
   */
  async deleteNotification(id: number) {
    this._paths.push(id.toString());

    return this.delete();
  }

  /**
   * `GET /api/notifications/:id/` - promises to get a notification
   * @param {number} id - The ID of the notification
   */
  async getNotification(id: number) {
    this._paths.push(id.toString());

    return this.get();
  }

  /**
   * `POST /api/notifications/:id/` - promises to mark a notification as read
   * @param {number} id - The ID of the notification
   */
  async readNotification(id: number) {
    this._paths.push(id.toString());

    return this.post({});
  }
}

export {
  NotificationsAPI
};
