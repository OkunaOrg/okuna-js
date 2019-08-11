import { OkunaOpts } from "./typings";

import { CategoriesAPI } from './api/categories';
import { DevicesAPI } from './api/devices';

/**
 * @api public
 */
class Okuna {
  /**
   * JavaScript API bindings for the Okuna social network
   * 
   * @param {OkunaOpts} opts
   */

  public readonly apiUrl: string;
  public readonly authToken: string;
  public readonly magicHeaderName: string;
  public readonly magicHeaderValue: string;

  constructor(opts: OkunaOpts) {
    this.apiUrl = opts.apiUrl || 'https://api.openbook.social';
    this.authToken = opts.authToken;
    this.magicHeaderName = opts.magicHeaderName || 'X-JESUS-TAKE-THE-WHEEL';
    this.magicHeaderValue = opts.magicHeaderValue || 'jesusCantReallyDriveTho';  
  }

  /**
   * categories()
   * @returns {CategoriesAPI} - CategoriesAPI instance
   */
  categories() {
    return new CategoriesAPI({ okuna: this, endpoint: '/api/categories' });
  }

  /**
   * devices()
   * @returns {DevicesAPI} - DevicesAPI instance
   */
  devices() {
    return new DevicesAPI({ okuna: this, endpoint: '/api/devices' });
  }
}

export {
  Okuna
};
