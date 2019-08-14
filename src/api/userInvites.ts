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

    return new Promise((resolve, reject) => {
      return this
        .postUrlencoded(body)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async update(id: number, nickname: string) {
    this._paths.push(id.toString());

    return new Promise((resolve, reject) => {
      return this
        .patchUrlencoded({ nickname })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
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

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
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

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async deleteUserInvite(id: number) {
    this._paths.push(id.toString());

    return new Promise((resolve, reject) => {
      return this
        .delete()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async email(id: number, email: string) {
    this._paths.push(id.toString(), 'email');

    return new Promise((resolve, reject) => {
      return this
        .post({ email })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}

export {
  UserInvitesAPI
};
