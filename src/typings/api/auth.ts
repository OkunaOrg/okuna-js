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
  username: string;
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
 * @property {boolean} communityPostsVisible
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
  communityPostsVisible?: boolean;
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
  community_new_post_notifications?: boolean;
  user_new_post_notifications?: boolean;
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
