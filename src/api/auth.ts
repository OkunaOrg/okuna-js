import { APIRequest } from '../utils/APIRequest';
import { RequestOpts, LimitationParams } from '../typings';
import {
  UserCreatorOpts,
  ISearchLinkedUsers,
  IGetLinkedUsers,
  ISearchFollowers,
  ISearchFollowings,
  IRequestPasswordReset,
  IVerifyPasswordReset,
  IUpdateNotificationSettings,
  IReportUser
} from '../typings/api/auth';

class AuthAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  async isUsernameAvailable(username: string) {
    this._paths.push('username-check');
    this.requiresToken = false;

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
    this.requiresToken = false;

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

  async updateUserEmail(email: string) {
    this._paths.push('user', 'settings');

    return new Promise((resolve, reject) => {
      return this
        .patchUrlencoded({ email })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async updateUserPassword(currentPassword: string, newPassword: string) {
    this._paths.push('user', 'settings');

    return new Promise((resolve, reject) => {
      return this
        .patchUrlencoded({
          current_password: currentPassword,
          new_password: newPassword
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async verifyEmailWithToken(token: string) {
    this._paths.push('email', 'verify');

    return new Promise((resolve, reject) => {
      return this
        .post({ token })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async getUserWithAuthToken(authToken: string) {
    this.requiresToken = false;
    (this._headers as any)['Authorization'] = `Token: ${authToken}`;
    this._paths.push('user');

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async getUserWithUsername(username: string, authenticatedRequest: boolean = true) {
    if (!authenticatedRequest) {
      this.requiresToken = false;
    }

    this._paths.push('users', encodeURIComponent(username));

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async getUsersWithQuery(query: string, authenticatedRequest: boolean = true) {
    this.requiresToken = authenticatedRequest;

    this._paths.push('users');
    this._params.query = query;

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async searchLinkedUsers(opts: ISearchLinkedUsers) {
    this._paths.push('linked-users', 'search');
    this._params.query = opts.query;
    
    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.withCommunity) {
      this._params.with_community = opts.withCommunity;
    }

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async getLinkedUsers(opts: IGetLinkedUsers, authenticatedRequest: boolean = true) {
    this.requiresToken = authenticatedRequest;
    this._paths.push('linked-users');

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    if (opts.withCommunity) {
      this._params.with_community = opts.withCommunity;
    }

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async searchBlockedUsers(query: string, count: number | undefined = undefined) {
    this._paths.push('blocked-users', 'search');
    this._params.query = query;
    
    if (count !== undefined) {
      this._params.count = count;
    }

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async getBlockedUsers(opts: LimitationParams, authenticatedRequest: boolean = true) {
    this.requiresToken = authenticatedRequest;
    this._paths.push('blocked-users');

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async blockUserWithName(username: string) {
    this._paths.push('users', encodeURIComponent(username), 'block');

    return new Promise((resolve, reject) => {
      return this
        .post({})
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async unblockUserWithName(username: string) {
    this._paths.push('users', encodeURIComponent(username), 'unblock');

    return new Promise((resolve, reject) => {
      return this
        .post({})
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async searchFollowers(opts: ISearchFollowers) {
    this._paths.push('followers', 'search');

    this._params.query = opts.query;

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async getFollowers(opts: LimitationParams, authenticatedRequest: boolean = true) {
    this.requiresToken = authenticatedRequest;
    this._paths.push('followers');

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async searchFollowings(opts: ISearchFollowings) {
    this._paths.push('followings', 'search');

    this._params.query = opts.query;

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async getFollowings(opts: LimitationParams, authenticatedRequest: boolean = true) {
    this.requiresToken = authenticatedRequest;
    this._paths.push('followings');

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async login(username: string, password: string) {
    this._paths.push('login');
    this.requiresToken = false;

    return new Promise((resolve, reject) => {
      return this
        .post({ username, password })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async requestPasswordReset(opts: IRequestPasswordReset) {
    this.requiresToken = false;
    this._paths.push('password', 'reset');

    return new Promise((resolve, reject) => {
      return this
        .post(opts)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async verifyPasswordReset(opts: IVerifyPasswordReset) {
    this.requiresToken = false;
    this._paths.push('password', 'verify');

    return new Promise((resolve, reject) => {
      return this
        .post({
          new_password: opts.password,
          token: opts.token
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async getAuthenticatedUserNotificationSettings() {
    this._paths.push('user', 'notifications-settings');

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async updateAuthenticatedUserNotificationSettings(opts: IUpdateNotificationSettings) {
    this._paths.push('user', 'notifications-settings');

    return new Promise((resolve, reject) => {
      return this
        .post(opts)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async acceptGuidelines() {
    this._paths.push('user', 'accept-guidelines');

    return new Promise((resolve, reject) => {
      return this
        .post({})
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async getAllLanguages() {
    this._paths.push('user', 'languages');

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async setNewLanguage(languageId: number) {
    this._paths.push('user', 'languages');

    return new Promise((resolve, reject) => {
      return this
        .post({
          language_id: languageId.toString()
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async reportUser(opts: IReportUser) {
    this._paths.push('users', encodeURIComponent(opts.username), 'report');

    const body: any = {
      category_id: opts.moderationCategoryId
    };

    if (opts.description) {
      body.description = opts.description;
    }

    return new Promise((resolve, reject) => {
      return this
        .post(body)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}

export {
  AuthAPI
};
