import { OkunaOpts } from "./typings";
import { RequestStrategy } from './utils/requestStrategies';

import { AuthAPI } from './api/auth';
import { CategoriesAPI } from './api/categories';
import { CirclesAPI } from './api/circles';
import { CommunitiesAPI } from './api/communities';
import { ConnectionsAPI } from './api/connections';
import { DevicesAPI } from './api/devices';
import { EmojisAPI } from './api/emojis';
import { FollowsAPI } from './api/follows';
import { HashtagsAPI } from './api/hashtags';
import { HealthAPI } from './api/health';
import { ListsAPI } from './api/lists';
import { ModerationAPI } from './api/moderation';
import { NotificationsAPI } from './api/notifications';
import { PostsAPI } from './api/posts';
import { UserInvitesAPI } from './api/userInvites';

/**
 * @api public
 */
class Client {
  /**
   * JavaScript API bindings for the Okuna social network
   *
   * @param {OkunaOpts} opts
   */

  public readonly apiUrl: string;
  public authToken: string | null;
  public readonly magicHeaderName: string | null | undefined;
  public readonly magicHeaderValue: string | null | undefined;
  public readonly requestStrategy: string | RequestStrategy;

  constructor(opts: OkunaOpts = {}) {
    this.apiUrl = opts.apiUrl || 'https://api.openbook.social';
    this.authToken = opts.authToken || null;

    const magicHeader = this._buildMagicHeader(opts.magicHeaderName, opts.magicHeaderValue);
    this.magicHeaderName = magicHeader.name;
    this.magicHeaderValue = magicHeader.value;

    this.requestStrategy = opts.requestStrategy || 'fetch';
  }

  /**
   * _buildMagicHeader() - Builds a magic header to add to the request headers
   * @param {string | null | undefined} name - the name of the magic header
   * @param {string | null | undefined} value - the value of the magic header
   * @returns {object} an object containing the provided data
   */
  _buildMagicHeader(name: string | null | undefined, value: string | null | undefined) {
    if (name === null || value === null) {
      return {
        name,
        value
      };
    }

    return {
      name: name || 'X-JESUS-TAKE-THE-WHEEL',
      value: value || 'jesusCantReallyDriveTho'
    };
  }

  /**
   * updateAuthToken() - Updates the authorization token of the current Client instance
   * @param {string} token - the new authorization token
   */
  updateAuthToken(token: string) {
    this.authToken = token;
  }

  /**
   * auth()
   * @returns { AuthAPI } - AuthAPI instance
   */
  auth() {
    return new AuthAPI({ okuna: this, endpoint: '/api/auth' });
  }

  /**
   * categories()
   * @returns {CategoriesAPI} - CategoriesAPI instance
   */
  categories() {
    return new CategoriesAPI({ okuna: this, endpoint: '/api/categories' });
  }

  /**
   * circles()
   * @returns {CirclesAPI} - CirclesAPI instance
   */
  circles() {
    return new CirclesAPI({ okuna: this, endpoint: '/api/circles' });
  }

  /**
   * communities()
   * @returns {CommunitiesAPI} - CommunitiesAPI instance
   */
  communities() {
    return new CommunitiesAPI({ okuna: this, endpoint: '/api/communities' });
  }

  /**
   * connections()
   * @returns {ConnectionsAPI} - ConnectionsAPI instance
   */
  connections() {
    return new ConnectionsAPI({ okuna: this, endpoint: '/api/connections' });
  }

  /**
   * devices()
   * @returns {DevicesAPI} - DevicesAPI instance
   */
  devices() {
    return new DevicesAPI({ okuna: this, endpoint: '/api/devices' });
  }

  /**
   * emojis()
   * @returns {EmojisAPI} - EmojisAPI instance
   */
  emojis() {
    return new EmojisAPI({ okuna: this, endpoint: '/api/emojis' });
  }

  /**
   * follows()
   * @returns {FollowsAPI} - FollowsAPI instance
   */
  follows() {
    return new FollowsAPI({ okuna: this, endpoint: '/api/follows' });
  }

  /**
   * hashtags()
   * @returns {HashtagsAPI} - HashtagsAPI instance
   */
  hashtags() {
    return new HashtagsAPI({ okuna: this, endpoint: '/api/hashtags' });
  }

  /**
   * health()
   * @returns {HealthAPI} - HealthAPI instance
   */
  health() {
    return new HealthAPI({ okuna: this, endpoint: '/api/health' });
  }

  /**
   * lists()
   * @returns {ListsAPI} - ListsAPI instance
   */
  lists() {
    return new ListsAPI({ okuna: this, endpoint: '/api/lists' });
  }

  /**
   * moderation()
   * @returns {ModerationAPI} - ModerationAPI instance
   */
  moderation() {
    return new ModerationAPI({ okuna: this, endpoint: '/api/moderation' });
  }

  /**
   * notifications()
   * @returns {NotificationsAPI} - NotificationsAPI instance
   */
  notifications() {
    return new NotificationsAPI({ okuna: this, endpoint: '/api/notifications' });
  }

  /**
   * posts()
   * @returns {PostsAPI} - PostsAPI instance
   */
  posts() {
    return new PostsAPI({ okuna: this, endpoint: '/api/posts' });
  }

  /**
   * userInvites()
   * @returns {UserInvitesAPI} - UserInvitesAPI instance
   */
  userInvites() {
    return new UserInvitesAPI({ okuna: this, endpoint: '/api/invites' });
  }
}

export {
  Client,
  RequestStrategy
};
