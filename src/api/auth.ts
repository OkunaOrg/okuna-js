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

/**
 * @api public
 * AuthAPI - provides methods to interact with the Auth API
 */
class AuthAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  /**
   * `POST /api/auth/username-check/` - Promises to check if a username is available
   * @param {string} username - The desired username
   * @returns - a boolean
   */
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

  /**
   * `POST /api/auth/email-check/` - Promises to check if an email address is available
   * @param {string} email - The desired email address
   * @returns - a boolean
   */
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

  /**
   * `POST /api/auth/register/` (urlencoded) - Promises to create a user
   * @param {UserCreatorOpts} payload - The user's properties
   * @returns - the created user
   */
  async createUser(payload: UserCreatorOpts) {
    const { email, token, name, username, isOfLegalAge, areGuidelinesAccepted, password }: UserCreatorOpts = payload;
    const body = {
      email,
      token,
      name,
      username,
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

  /**
   * `POST /api/auth/register/verify-token` - Promises to verify a user token
   * @param {string} token - the token to verify
   */
  async verifyRegisterToken(token: string) {
    this._paths.push('register', 'verify-token');
    return this.post({ token });
  }

  /**
   * `PATCH /api/auth/user/` (urlencoded) - Promises to create a user
   * @param {IUpdateUser} payload - The user's properties
   * @returns - the updated user
   */
  async updateUser(payload: IUpdateUser) {
    this._paths.push('user');

    const {
      avatar,
      cover,
      name,
      username,
      url,
      followersCountVisible,
      communityPostsVisible,
      bio,
      location
    }: IUpdateUser = payload;

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

    if (communityPostsVisible !== undefined) {
      body.community_posts_visible = communityPostsVisible;
    }

    if (location) {
      body.location = location;
    }

    return this.patchFormdata(body);
  }

   /**
   * `PATCH /api/auth/user/settings/` (urlencoded) - Promises to update the user's email
   * @param {string} email - The desired email address
   */
  async updateUserEmail(email: string) {
    this._paths.push('user', 'settings');

    return this.patchFormdata({ email });
  }

  /**
   * `PATCH /api/auth/user/settings/` (urlencoded) - Promises to update the user's passord
   * @param {string} currentPassword - The user's current password
   * @param {string} newPassword - The user's desired new password
   */
  async updateUserPassword(currentPassword: string, newPassword: string) {
    this._paths.push('user', 'settings');

    return this.patchFormdata({
      current_password: currentPassword,
      new_password: newPassword
    });
  }

  /**
   * `POST /api/auth/email/verify/` - Promises to verify a user's email
   * @param {string} token - The verification token
   */
  async verifyEmailWithToken(token: string) {
    this._paths.push('email', 'verify');

    return this.post({ token });
  }

  /**
   * `GET /api/auth/user/` - Promises to get a user by auth token
   * @param {string} authToken - The authentication token
   */
  async getUserWithAuthToken(authToken: string) {
    this.requiresToken = false;
    (this._headers as any)['Authorization'] = `Token: ${authToken}`;
    this._paths.push('user');

    return this.get();
  }

  /**
   * `GET /api/auth/user/` - Promises to get a user by username
   * @param {string} username - The username to search for
   * @param {boolean} authenticatedRequest - Checks whether the request is authenticated
   */
  async getUserWithUsername(username: string, authenticatedRequest: boolean = true) {
    if (!authenticatedRequest) {
      this.requiresToken = false;
    }

    this._paths.push('users', encodeURIComponent(username));

    return this.get();
  }

  /**
   * `GET /api/auth/user/` - Promises to get a user by a certain query
   * @param {string} query - The search query
   * @param {boolean} authenticatedRequest - Checks whether the request is authenticated
   */
  async getUsersWithQuery(query: string, authenticatedRequest: boolean = true) {
    this.requiresToken = authenticatedRequest;

    this._paths.push('users');
    this._params.query = query;

    return this.get();
  }

  /**
   * `GET /api/auth/linked-users/search/` - Promises to search a linked user
   * @param {ISearchLinkedUsers}
   */
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

  /**
   * `GET /api/auth/linked-users/` - Promises to get an array of linked users
   * @param {IGetLinkedUsers}
   * @param {boolean} authenticatedRequest - Checks whether the request is authenticated
   */
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

  /**
   * `GET /api/auth/blocked-users/search/` - Promises to search between blocked users
   * @param {string} query - The search query
   * @param {number | undefined} count - The max number of results
   */
  async searchBlockedUsers(query: string, count: number | undefined = undefined) {
    this._paths.push('blocked-users', 'search');
    this._params.query = query;

    if (count !== undefined) {
      this._params.count = count;
    }

    return this.get();
  }

  /**
   * `GET /api/auth/blocked-users/` - Promises to get an array of blocked users
   * @param {LimitationParams} opts - Query limitation parameters
   * @param {boolean} authenticatedRequest - Checks whether the request is authenticated
   */
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

  /**
   * `POST /api/auth/users/:username/block/` - Promises to block a user by username
   * @param {string} username - The username of the user to block
   */
  async blockUserWithName(username: string) {
    this._paths.push('users', encodeURIComponent(username), 'block');

    return this.post({});
  }

  /**
   * `POST /api/auth/users/:username/unblock/` - Promises to unblock a user by username
   * @param {string} username - The username of the user to unblock
   */
  async unblockUserWithName(username: string) {
    this._paths.push('users', encodeURIComponent(username), 'unblock');

    return this.post({});
  }

  /**
   * `PUT /api/auth/users/:username/notifications/subscribe` - Promises to subscribe a user to notifications
   * @param {string} username - The username of the user to subscribe
   */
  async subscribeUserWithUsername(username: string) {
    this._paths.push('users', encodeURIComponent(username), 'notifications', 'subscribe');
    return this.put({});
  }

  /**
   * `DELETE /api/auth/users/:username/notifications/subscribe` - Promises to unsubscribe a user from notifications
   * @param {string} username - The username of the user to unsubscribe
   */
  async unsubscribeUserWithUsername(username: string) {
    this._paths.push('users', encodeURIComponent(username), 'notifications', 'subscribe');
    return this.delete();
  }

  /**
   * `GET /api/auth/followers/search` - Promises to search between followers
   * @param {ISearchFollowers}
   */
  async searchFollowers(opts: ISearchFollowers) {
    this._paths.push('followers', 'search');

    this._params.query = opts.query;

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    return this.get();
  }

  /**
   * `GET /api/auth/followers/` - Promises to get an array of followers
   * @param {LimitationParams} opts - Query limitation parameters
   * @param {boolean} authenticatedRequest - Checks whether the request is authenticated
   */
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

  /**
   * `GET /api/auth/followings/search` - Promises to search between followings
   * @param {ISearchFollowings}
   */
  async searchFollowings(opts: ISearchFollowings) {
    this._paths.push('followings', 'search');

    this._params.query = opts.query;

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    return this.get();
  }

  /**
   * `GET /api/auth/followings/` - Promises to get an array of followings
   * @param {LimitationParams} opts - Query limitation parameters
   * @param {boolean} authenticatedRequest - Checks whether the request is authenticated
   */
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

  /**
   * `POST /api/auth/login/` - Promises to log a user in
   * @param {string} username - The username of the user
   * @param {string} password - The password of the user
   */
  async login(username: string, password: string) {
    this._paths.push('login');
    this.requiresToken = false;

    return this.post({ username, password });
  }

  /**
   * `POST /api/auth/password/reset/` - Promises to initiate a password reset process
   * @param {IRequestPasswordReset} opts
   */
  async requestPasswordReset(opts: IRequestPasswordReset) {
    this.requiresToken = false;
    this._paths.push('password', 'reset');

    return this.post(opts);
  }

  /**
   * `POST /api/auth/password/verify/` - Promises to verify a password
   * @param {IVerifyPasswordReset} opts
   */
  async verifyPasswordReset(opts: IVerifyPasswordReset) {
    this.requiresToken = false;
    this._paths.push('password', 'verify');

    return this.post({
      new_password: opts.password,
      token: opts.token
    });
  }

  /**
   * `GET /api/auth/user/notifications-settings/` - Promises to retrieve the user's notification settings
   */
  async getAuthenticatedUserNotificationSettings() {
    this._paths.push('user', 'notifications-settings');

    return this.get();
  }

  /**
   * `POST /api/auth/user/notifications-settings/` - Promises to update the user's notification settings
   * @param {IUpdateNotificationSettings} opts
   */
  async updateAuthenticatedUserNotificationSettings(opts: IUpdateNotificationSettings) {
    this._paths.push('user', 'notifications-settings');

    return this.post(opts);
  }

  /**
   * `POST /api/auth/user/accept-guidelines/` - Promises to accept the user guidelines
   */
  async acceptGuidelines() {
    this._paths.push('user', 'accept-guidelines');

    return this.post({});
  }

  /**
   * `GET /auth/auth/user/languages/` - Promises to get the user's languages
   */
  async getAllLanguages() {
    this._paths.push('user', 'languages');

    return this.get();
  }

  /**
   * `POST /api/auth/user/languages/` - Promises to set a new user language
   * @param {number} languageId - The id of the desired language
   */
  async setNewLanguage(languageId: number) {
    this._paths.push('user', 'languages');

    return this.post({
      language_id: languageId.toString()
    });
  }

  /**
   * `POST /api/auth/users/:username/report/` - Promises to report a user
   * @param {IReportUser} opts
   */
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
