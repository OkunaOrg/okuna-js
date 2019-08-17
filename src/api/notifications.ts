import { APIRequest } from "../utils/APIRequest";
import { RequestOpts, LimitationParams } from '../typings';

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
   * @param {LimitationParams} opts - The limitation rules
   */
  async getNotifications(opts: LimitationParams) {
    if (opts.maxId) {
      this._params.maxId = opts.maxId;
    }

    if (opts.count) {
      this._params.count = opts.count;
    }

    return this.get();
  }

  /**
   * `POST /api/notifications/read/` - promises to mark notifications as read
   * @param {LimitationParams} opts - The limitation rules
   */
  async readNotifications(opts: LimitationParams) {
    this._paths.push('read');

    return this.post(opts);
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
