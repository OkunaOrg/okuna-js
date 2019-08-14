import { APIRequest } from '../utils/APIRequest';
import { RequestOpts } from '../typings';
import { UserCreatorOpts } from '../typings/api/auth';

class AuthAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  async isUsernameAvailable(username: string) {
    this._paths.push('username-check');

    return new Promise((resolve, reject) => {
      return this
        .post({ username })
        .then(() => resolve(true))
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            return resolve(false);
          }

          return reject(err);
        });
    });
  }

  async isEmailAvailable(email: string) {
    this._paths.push('email-check');

    return new Promise((resolve, reject) => {
      return this
        .post({ email })
        .then(() => resolve(true))
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            return resolve(false);
          }

          return reject(err);
        });
    });
  }

  async createUser(payload: UserCreatorOpts) {
    const { email, token, name, isOfLegalAge, areGuidelinesAccepted, password }: UserCreatorOpts = payload;
    const body = {
      email,
      token,
      name,
      is_of_legal_age: isOfLegalAge.toString(),
      are_guidelines_accepted: areGuidelinesAccepted.toString(),
      password
    };

    // WIP
    if (payload.avatar && payload.avatar.name) {
      (body as any)['avatar'] = payload.avatar;
    }

    this._paths.push('register');
    this.requiresToken = false;

    return new Promise((resolve, reject) => {
      return this
        .postUrlencoded(body)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}

export {
  AuthAPI
};
