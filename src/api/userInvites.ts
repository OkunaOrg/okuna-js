import { APIRequest } from '../utils/APIRequest';
import { RequestOpts } from '../typings';

class UserInvitesAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  async create(nickname: string) {
    const body = {};

    if (nickname) {
      (body as any)['nickname'] = nickname;
    }

    return this.putUrlencoded(body);
  }

  async update(id: number, nickname: string) {
    this._paths.push(id.toString());

    return this.patchUrlencoded({ nickname });
  }

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

  async deleteUserInvite(id: number) {
    this._paths.push(id.toString());

    return this.delete();
  }

  async email(id: number, email: string) {
    this._paths.push(id.toString(), 'email');

    return this.post({ email });
  }
}

export {
  UserInvitesAPI
};
