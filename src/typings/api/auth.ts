import { APIRequest } from '../../utils/APIRequest';
import { LimitationParams } from '../';
import { IFileObjectOpts } from '../../utils/FileObject';

/**
 * User creator options
 * @typedef {object} UserCreatorOpts
 * @property {string} email
 * @property {string} token
 * @property {string} name
 * @property {boolean} isOfLegalAge
 * @property {boolean} areGuidelinesAccepted
 * @property {string} password
 * @property {IFileObjectOpts} avatar
 */
export interface UserCreatorOpts {
  email: string;
  token: string;
  name: string;
  isOfLegalAge: boolean;
  areGuidelinesAccepted: boolean;
  password: string;
  avatar?: IFileObjectOpts;
}

/**
 * Parameters for auth().updateUser()
 * @typedef {object} IUpdateUser
 * @property {IFileObjectOpts} avatar
 * @property {IFileObjectOpts} cover
 * @property {string} name
 * @property {string} username
 * @property {string} url
 * @property {boolean} followersCountVisible
 * @property {string} bio
 * @property {string} location
 */
export interface IUpdateUser {
  avatar?: IFileObjectOpts;
  cover?: IFileObjectOpts;
  name?: string;
  username?: string;
  url?: string;
  followersCountVisible?: boolean;
  bio?: string;
  location?: string;
}

/**
 * Parameters for auth().searchLinkedUsers()
 * @typedef {object} ISearchLinkedUsers
 * @property {string} query - search query
 * @property {number} count - max number of results
 * @property {string} withCommunity - community the user is member of
 */
export interface ISearchLinkedUsers {
  query: string;
  count?: number;
  withCommunity?: string;
}

/**
 * Parameters for auth().getLinkedUsers()
 * @typedef {object} IGetLinkedUsers
 * @property {number} maxId - maximum ID to fetch
 * @property {number} count - max number of results
 * @property {string} withCommunity - community the user is member of
 */
export interface IGetLinkedUsers {
  maxId?: number;
  count?: number;
  withCommunity?: string;
}

/**
 * Parameters for auth().searchFollowers()
 * @typedef {object} ISearchFollowers
 * @property {string} query - search query
 * @property {number} count - max number of results
 */
export interface ISearchFollowers {
  query: string;
  count: number;
}

/**
 * Parameters for auth().searchFollowings()
 * @typedef {object} ISearchFollowings
 * @property {string} query - search query
 * @property {number} count - max number of results
 */
export interface ISearchFollowings {
  query: string;
  count: number;
}

/**
 * Parameters for auth().requestPasswordReset()
 * @typedef {object} IRequestPasswordReset
 * @property {string} username
 * @property {string} email
 */
export interface IRequestPasswordReset {
  username: string;
  email: string;
}

/**
 * Parameters for auth().verifyPasswordReset()
 * @typedef {object} IVerifyPasswordReset
 * @property {string} password
 * @property {string} token
 */
export interface IVerifyPasswordReset {
  password: string;
  token: string;
}

/**
 * Parameters for auth().updateAuthenticatedUserNotificationSettings()
 * @typedef {object} IUpdateNotificationSettings
 * @property {boolean} post_comment_notifications
 * @property {boolean} post_comment_reply_notifications
 * @property {boolean} post_comment_user_mention_notifications
 * @property {boolean} post_user_mention_notifications
 * @property {boolean} post_comment_reaction_notifications
 * @property {boolean} post_reaction_notifications
 * @property {boolean} follow_notifications
 * @property {boolean} connection_request_notifications
 * @property {boolean} community_invite_notifications
 * @property {boolean} connection_confirmed_notifications
 */
export interface IUpdateNotificationSettings {
  post_comment_notifications?: boolean;
  post_comment_reply_notifications?: boolean;
  post_comment_user_mention_notifications?: boolean;
  post_user_mention_notifications?: boolean;
  post_comment_reaction_notifications?: boolean;
  post_reaction_notifications?: boolean;
  follow_notifications?: boolean;
  connection_request_notifications?: boolean;
  community_invite_notifications?: boolean;
  connection_confirmed_notifications?: boolean;
}

/**
 * Parameters for auth().reportUser()
 * @typedef {object} IReportUser
 * @property {string} username
 * @property {number} moderationCategoryId
 * @property {string} description
 */
export interface IReportUser {
  username: string;
  moderationCategoryId: number;
  description?: string;
}

/**
 * AuthAPI - provides methods to interact with the Auth API
 */
export interface AuthAPI extends APIRequest {
  /**
   * `POST /api/auth/username-check/` - Promises to check if a username is available
   * @param {string} username - The desired username
   * @returns - a boolean
   */
  isUsernameAvailable(username: string): Promise<boolean>;
  
  /**
   * `POST /api/auth/email-check/` - Promises to check if an email address is available
   * @param {string} email - The desired email address
   * @returns - a boolean
   */
  isEmailAvailable(email: string): Promise<boolean>;
  
  /**
   * `POST /api/auth/register/` (urlencoded) - Promises to create a user
   * @param {UserCreatorOpts} payload - The user's properties
   * @returns - the created user
   */
  createUser(payload: UserCreatorOpts): Promise<any>;

  /**
   * `PATCH /api/auth/user/` (urlencoded) - Promises to create a user
   * @param {IUpdateUser} payload - The user's properties
   * @returns - the updated user
   */
  updateUser(payload: IUpdateUser): Promise<any>;

  /**
   * `PATCH /api/auth/user/settings/` (urlencoded) - Promises to update the user's email
   * @param {string} email - The desired email address
   */
  updateUserEmail(email: string): Promise<any>;

  /**
   * `PATCH /api/auth/user/settings/` (urlencoded) - Promises to update the user's passord
   * @param {string} currentPassword - The user's current password
   * @param {string} newPassword - The user's desired new password
   */
  updateUserPassword(currentPassword: string, newPassword: string): Promise<any>;

  /**
   * `POST /api/auth/email/verify/` - Promises to verify a user's email
   * @param {string} token - The verification token
   */
  verifyEmailWithToken(token: string): Promise<any>;

  /**
   * `GET /api/auth/user/` - Promises to get a user by auth token
   * @param {string} authToken - The authentication token
   */
  getUserWithAuthToken(authToken: string): Promise<any>;

  /**
   * `GET /api/auth/user/` - Promises to get a user by username
   * @param {string} username - The username to search for
   * @param {boolean} authenticatedRequest - Checks whether the request is authenticated
   */
  getUserWithUsername(username: string, authenticatedRequest: boolean): Promise<any>;

  /**
   * `GET /api/auth/user/` - Promises to get a user by a certain query
   * @param {string} query - The search query
   * @param {boolean} authenticatedRequest - Checks whether the request is authenticated
   */
  getUsersWithQuery(query: string, authenticatedRequest: boolean): Promise<any>;

  /**
   * `GET /api/auth/linked-users/search/` - Promises to search a linked user
   * @param {ISearchLinkedUsers}
   */
  searchLinkedUsers(opts: ISearchLinkedUsers): Promise<any>;

  /**
   * `GET /api/auth/linked-users/` - Promises to get an array of linked users
   * @param {IGetLinkedUsers}
   * @param {boolean} authenticatedRequest - Checks whether the request is authenticated
   */
  getLinkedUsers(opts: IGetLinkedUsers, authenticatedRequest: boolean): Promise<any>;

  /**
   * `GET /api/auth/blocked-users/search/` - Promises to search between blocked users
   * @param {string} query - The search query
   * @param {number | undefined} count - The max number of results
   */
  searchBlockedUsers(query: string, count: number | undefined): Promise<any>;

  /**
   * `GET /api/auth/blocked-users/` - Promises to get an array of blocked users
   * @param {LimitationParams} opts - Query limitation parameters
   * @param {boolean} authenticatedRequest - Checks whether the request is authenticated
   */
  getBlockedUsers(opts: LimitationParams, authenticatedRequest: boolean): Promise<any>;

  /**
   * `POST /api/auth/users/:username/block/` - Promises to block a user by username
   * @param {string} username - The username of the user to block
   */
  blockUserWithName(username: string): Promise<any>;

  /**
   * `POST /api/auth/users/:username/unblock/` - Promises to unblock a user by username
   * @param {string} username - The username of the user to unblock
   */
  unblockUserWithUsername(username: string): Promise<any>;

  /**
   * `GET /api/auth/followers/search` - Promises to search between followers
   * @param {ISearchFollowers}
   */
  searchFollowers(opts: ISearchFollowers): Promise<any>;

  /**
   * `GET /api/auth/followers/` - Promises to get an array of followers
   * @param {LimitationParams} opts - Query limitation parameters
   * @param {boolean} authenticatedRequest - Checks whether the request is authenticated
   */
  getFollowers(opts: LimitationParams, authenticatedRequest: boolean): Promise<any>;

  /**
   * `GET /api/auth/followings/search` - Promises to search between followings
   * @param {ISearchFollowings}
   */
  searchFollowings(opts: ISearchFollowings): Promise<any>;

  /**
   * `GET /api/auth/followings/` - Promises to get an array of followings
   * @param {LimitationParams} opts - Query limitation parameters
   * @param {boolean} authenticatedRequest - Checks whether the request is authenticated
   */
  getFollowings(opts: LimitationParams, authenticatedRequest: boolean): Promise<any>;

  /**
   * `POST /api/auth/login/` - Promises to log a user in
   * @param {string} username - The username of the user
   * @param {string} password - The password of the user
   */
  login(username: string, password: string): Promise<any>;

  /**
   * `POST /api/auth/password/reset/` - Promises to initiate a password reset process
   * @param {IRequestPasswordReset} opts
   */
  requestPasswordReset(opts: IRequestPasswordReset): Promise<any>;

  /**
   * `POST /api/auth/password/verify/` - Promises to verify a password
   * @param {IVerifyPasswordReset} opts
   */
  verifyPasswordReset(opts: IVerifyPasswordReset): Promise<any>;

  /**
   * `GET /api/auth/user/notifications-settings/` - Promises to retrieve the user's notification settings
   */
  getAuthenticatedUserNotificationSettings(): Promise<any>;

  /**
   * `POST /api/auth/user/notifications-settings/` - Promises to update the user's notification settings
   * @param {IUpdateNotificationSettings} opts
   */
  updateAuthenticatedUserNotificationSettings(opts: IUpdateNotificationSettings): Promise<any>;

  /**
   * `POST /api/auth/user/accept-guidelines/` - Promises to accept the user guidelines
   */
  acceptGuidelines(): Promise<any>;

  /**
   * `GET /auth/auth/user/languages/` - Promises to get the user's languages
   */
  getAllLanguages(): Promise<any>;

  /**
   * `POST /api/auth/user/languages/` - Promises to set a new user language
   * @param {number} languageId - The id of the desired language
   */
  setNewLanguage(languageId: number): Promise<any>;

  /**
   * `POST /api/auth/users/:username/report/` - Promises to report a user
   * @param {IReportUser} opts
   */
  reportUser(opts: IReportUser): Promise<any>;
}
