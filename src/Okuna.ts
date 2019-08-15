import { OkunaOpts } from "./typings";
import { RequestStrategy } from './utils/requestStrategies';

import { AuthAPI } from './api/auth';
import { CategoriesAPI } from './api/categories';
import { ConnectionsAPI } from './api/connections';
import { CirclesAPI } from './api/circles';
import { DevicesAPI } from './api/devices';
import { EmojisAPI } from './api/emojis';
import { FollowsAPI } from './api/follows';
import { HealthAPI } from './api/health';
import { ListsAPI } from './api/lists';
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
  public readonly authToken: string;
  public readonly magicHeaderName: string | null | undefined;
  public readonly magicHeaderValue: string | null | undefined;
  public readonly requestStrategy: string | RequestStrategy;

  constructor(opts: OkunaOpts) {
    this.apiUrl = opts.apiUrl || 'https://api.openbook.social';
    this.authToken = opts.authToken;

    const magicHeader = this._buildMagicHeader(opts.magicHeaderName, opts.magicHeaderValue);
    this.magicHeaderName = magicHeader.name;
    this.magicHeaderValue = magicHeader.value;
    
    this.requestStrategy = opts.requestStrategy || 'axios';
  }

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
