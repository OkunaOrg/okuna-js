import { APIRequest } from '../utils/APIRequest';
import { RequestOpts, LimitationParams } from '../typings';
import {
  UserCreatorOpts,
  IUpdateUser,
  ISearchLinkedUsers,
  IGetLinkedUsers,
  ISearchFollowers,
  ISearchFollowings,
  IRequestPasswordReset,
  IVerifyPasswordReset,
  IUpdateNotificationSettings,
  IReportUser
} from '../typings/api/auth';
import { FileObject } from '../utils/FileObject';

class AuthAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  async isUsernameAvailable(username: string) {
    this._paths.push('username-check');
    this.requiresToken = false;

    return new Promise((resolve, reject) => {
      return this.post({ username })
        .then(() => resolve(true))
        .catch((err: any) => {
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
      return this.post({ email })
        .then(() => resolve(true))
        .catch((err: any) => {
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

    if (payload.avatar) {
      (body as any)['avatar'] = new FileObject(payload.avatar);
    }

    this._paths.push('register');
    this.requiresToken = false;

    return this.postFormdata(body);
  }

  async updateUser(payload: IUpdateUser) {
    this._paths.push('user');

    const { avatar, cover, name, username, url, followersCountVisible, bio, location }: IUpdateUser = payload;

    const body: any = {};

    if (avatar !== undefined) {
      body.avatar = avatar === null
        ? avatar
        : new FileObject(avatar);
    }

    if (cover !== undefined) {
      body.cover = cover === null
        ? cover
        : new FileObject(cover);
    }

    if (name) {
      body.name = name;
    }

    if (username) {
      body.username = username;
    }

    if (url) {
      body.url = url;
    }

    if (bio) {
      body.bio = bio;
    }

    if (followersCountVisible !== undefined) {
      body.followers_count_visible = followersCountVisible;
    }

    if (location) {
      body.location = location;
    }

    return this.patchFormdata(body);
  }

  async updateUserEmail(email: string) {
    this._paths.push('user', 'settings');

    return this.patchFormdata({ email });
  }

  async updateUserPassword(currentPassword: string, newPassword: string) {
    this._paths.push('user', 'settings');

    return this.patchFormdata({
      current_password: currentPassword,
      new_password: newPassword
    });
  }

  async verifyEmailWithToken(token: string) {
    this._paths.push('email', 'verify');

    return this.post({ token });
  }

  async getUserWithAuthToken(authToken: string) {
    this.requiresToken = false;
    (this._headers as any)['Authorization'] = `Token: ${authToken}`;
    this._paths.push('user');

    return this.get();
  }

  async getUserWithUsername(username: string, authenticatedRequest: boolean = true) {
    if (!authenticatedRequest) {
      this.requiresToken = false;
    }

    this._paths.push('users', encodeURIComponent(username));

    return this.get();
  }

  async getUsersWithQuery(query: string, authenticatedRequest: boolean = true) {
    this.requiresToken = authenticatedRequest;

    this._paths.push('users');
    this._params.query = query;

    return this.get();
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

    return this.get();
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

    return this.get();
  }

  async searchBlockedUsers(query: string, count: number | undefined = undefined) {
    this._paths.push('blocked-users', 'search');
    this._params.query = query;
    
    if (count !== undefined) {
      this._params.count = count;
    }

    return this.get();
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

    return this.get();
  }

  async blockUserWithName(username: string) {
    this._paths.push('users', encodeURIComponent(username), 'block');

    return this.post({});
  }

  async unblockUserWithName(username: string) {
    this._paths.push('users', encodeURIComponent(username), 'unblock');

    return this.post({});
  }

  async searchFollowers(opts: ISearchFollowers) {
    this._paths.push('followers', 'search');

    this._params.query = opts.query;

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    return this.get();
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

    return this.get();
  }

  async searchFollowings(opts: ISearchFollowings) {
    this._paths.push('followings', 'search');

    this._params.query = opts.query;

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    return this.get();
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

    return this.get();
  }

  async login(username: string, password: string) {
    this._paths.push('login');
    this.requiresToken = false;

    return this.post({ username, password });
  }

  async requestPasswordReset(opts: IRequestPasswordReset) {
    this.requiresToken = false;
    this._paths.push('password', 'reset');

    return this.post(opts);
  }

  async verifyPasswordReset(opts: IVerifyPasswordReset) {
    this.requiresToken = false;
    this._paths.push('password', 'verify');

    return this.post({
      new_password: opts.password,
      token: opts.token
    });
  }

  async getAuthenticatedUserNotificationSettings() {
    this._paths.push('user', 'notifications-settings');

    return this.get();
  }

  async updateAuthenticatedUserNotificationSettings(opts: IUpdateNotificationSettings) {
    this._paths.push('user', 'notifications-settings');

    return this.post(opts);
  }

  async acceptGuidelines() {
    this._paths.push('user', 'accept-guidelines');

    return this.post({});
  }

  async getAllLanguages() {
    this._paths.push('user', 'languages');

    return this.get();
  }

  async setNewLanguage(languageId: number) {
    this._paths.push('user', 'languages');

    return this.post({
      language_id: languageId.toString()
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

    return this.post(body);
  }
}

export {
  AuthAPI
};
