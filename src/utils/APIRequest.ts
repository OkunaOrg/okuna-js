import { RequestOpts } from '../typings';
import { Okuna } from '../Okuna';
import buildUrl from './buildUrl';

import axios, { AxiosPromise } from 'axios';

/**
 * @api
 */
class APIRequest {
  /**
   * Defines an API request.
   * 
   * @param {RequestOpts} opts
   */

  protected _okuna: Okuna;
  protected _endpoint: string;
  protected _url: string;
  protected _paths: string[] = [];
  protected _params: object = {};
  protected _headers: object;

  constructor(opts: RequestOpts) {
    this._okuna = opts.okuna;
    this._endpoint = opts.endpoint;
    this._paths = [ this._endpoint ];
    this._url = `${this._okuna.apiUrl}${this._endpoint}`;
    this._headers = this.generateHeaders();
  }

  /**
   * generateHeaders()
   * A function used to generate the headers that need to be
   * passed to Axios.
   * @returns {object}
   */
  generateHeaders(): object {
    const headers: object = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Token ${this._okuna.authToken}`
    };

    if (this._okuna.magicHeaderName && this._okuna.magicHeaderValue) {
      Object.assign(headers, { [this._okuna.magicHeaderName]: this._okuna.magicHeaderValue });
    }

    return headers;
  }

  /**
   * get()
   * GET request
   * @returns {AxiosPromise}
   */
  get(): AxiosPromise {
    this._url = buildUrl(this._okuna.apiUrl, this._paths, this._params);
    return axios.get(this._url, { headers: this._headers });
  }

  /**
   * put()
   * PUT request
   * @param {object} body - Request body
   */
  put(body: object): AxiosPromise {
    this._url = buildUrl(this._okuna.apiUrl, this._paths, this._params);
    return axios.put(this._url, body, { headers: this._headers });
  }

  /**
   * post()
   * POST request
   * @param {object} body - Request body
   */
  post(body: object): AxiosPromise {
    this._url = buildUrl(this._okuna.apiUrl, this._paths, this._params);
    return axios.post(this._url, body, { headers: this._headers });
  }

  /**
   * patch()
   * PATCH request
   * @param {object} body - Request body
   */
  patch(body: object): AxiosPromise {
    this._url = buildUrl(this._okuna.apiUrl, this._paths, this._params);
    return axios.patch(this._url, body, { headers: this._headers });
  }

  /**
   * delete()
   * DELETE request
   * @returns {AxiosPromise}
   */
  delete(): AxiosPromise {
    this._url = buildUrl(this._okuna.apiUrl, this._paths, this._params);
    return axios.delete(this._url, { headers: this._headers });
  }
}

export {
  APIRequest
};
