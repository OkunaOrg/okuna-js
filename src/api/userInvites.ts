import { APIRequest } from '../utils/APIRequest';
import { RequestOpts } from '../typings';

/**
 * @api public
 * UserInvitesAPI - Provides methods to interact with the User Invites API
 */
class UserInvitesAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  /**
   * `PUT /api/invites/` - promises to create an invite
   * @param {string} nickname - A nickname for the notification
   */
  async create(nickname: string) {
    const body = {};

    if (nickname) {
      (body as any)['nickname'] = nickname;
    }

    return this.putFormdata(body);
  }

  /**
   * `PATCH /api/invites/` - promises to update a notification's nickname
   * @param {string} id - The ID of the notification
   * @param {string} nickname - The new nickname
   */
  async update(id: number, nickname: string) {
    this._paths.push(id.toString());

    return this.patchFormdata({ nickname });
  }

  /**
   * `GET /api/invites/` - promises to retrieve a list of all invites
   * @param {number} offset
   * @param {number} count
   * @param {boolean} pending
   */
  async getUserInvites(
    offset: number | null = null,
    count: number | null = null,
    pending: boolean | null = null
  ) {
    if (offset !== null) {
      this._params['offset'] = offset;
    }

    if (count !== null) {
      this._params['count'] = count;
    }

    if (pending !== null) {
      this._params['pending'] = pending;
    }

    return this.get();
  }

  /**
   * `GET /api/invites/search/` - promises to search between the user invites
   * @param {string} query
   * @param {number} count
   * @param {boolean} pending
   */
  async searchUserInvite(
    query: string,
    count: number | null = null,
    pending: boolean | null = null
  ) {
    this._paths.push('search');
    this._params['query'] = encodeURIComponent(query);

    if (count !== null) {
      this._params['count'] = count;
    }

    if (pending !== null) {
      this._params['pending'] = pending;
    }

    return this.get();
  }

  /**
   * `DELETE /api/invites/:id/` - promises to delete an invite
   * @param {number} id - The ID of the invite
   */
  async deleteUserInvite(id: number) {
    this._paths.push(id.toString());

    return this.delete();
  }

  /**
   * `POST /api/invites/:id/email/` - promises to sent an email with the invitation
   * @param {number} id - The ID of the invite
   * @param {string} email - The email to which the invite will be sent
   */
  async email(id: number, email: string) {
    this._paths.push(id.toString(), 'email');

    return this.post({ email });
  }
}

export {
  UserInvitesAPI
};
