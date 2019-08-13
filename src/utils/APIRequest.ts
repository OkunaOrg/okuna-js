import { RequestOpts, IRequestStrategy } from '../typings';
import { Client } from '../Okuna';
import buildUrl from './buildUrl';
import { getRequestStrategy } from './requestStrategies';

/**
 * @api
 */
class APIRequest {
  /**
   * Defines an API request.
   * 
   * @param {RequestOpts} opts
   */

  protected _okuna: Client;
  protected _endpoint: string;
  protected _url: string;
  protected _paths: string[] = [];
  protected _params: object = {};
  protected _headers: object = {};
  protected _api: IRequestStrategy;
  public requiresToken: boolean = true;

  constructor(opts: RequestOpts) {
    this._okuna = opts.okuna;
    this._endpoint = opts.endpoint;
    this._paths = [ this._endpoint ];
    this._url = `${this._okuna.apiUrl}${this._endpoint}`;
    this._api = getRequestStrategy(this._okuna.requestStrategy);
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
      'Content-Type': 'application/json'
    };

    if (this._okuna.magicHeaderName && this._okuna.magicHeaderValue) {
      Object.assign(headers, { [this._okuna.magicHeaderName]: this._okuna.magicHeaderValue });
    }

    if (this.requiresToken) {
      if (!this._okuna.authToken) {
        throw new Error('Authorization token not provided.');
      }

      Object.assign(headers, { 'Authorization': `Token ${this._okuna.authToken}` });
    }

    return headers;
  }

  /**
   * get()
   * GET request
   * @returns {Promise<any>}
   */
  get(): Promise<any> {
    this._headers = this.generateHeaders();
    this._url = buildUrl(this._okuna.apiUrl, this._paths, this._params);
    return this._api.get(this._url, { headers: this._headers });
  }

  /**
   * put()
   * PUT request
   * @param {object} body - Request body
   */
  put(body: object): Promise<any> {
    this._headers = this.generateHeaders();
    this._url = buildUrl(this._okuna.apiUrl, this._paths, this._params);
    return this._api.put(this._url, body, { headers: this._headers });
  }

  /**
   * post()
   * POST request
   * @param {object} body - Request body
   */
  post(body: object): Promise<any> {
    this._headers = this.generateHeaders();
    this._url = buildUrl(this._okuna.apiUrl, this._paths, this._params);
    return this._api.post(this._url, body, { headers: this._headers });
  }

  /**
   * patch()
   * PATCH request
   * @param {object} body - Request body
   */
  patch(body: object): Promise<any> {
    this._headers = this.generateHeaders();
    this._url = buildUrl(this._okuna.apiUrl, this._paths, this._params);
    return this._api.patch(this._url, body, { headers: this._headers });
  }

  /**
   * delete()
   * DELETE request
   */
  delete(): Promise<any> {
    this._headers = this.generateHeaders();
    this._url = buildUrl(this._okuna.apiUrl, this._paths, this._params);
    return this._api.delete(this._url, { headers: this._headers });
  }
}

export {
  APIRequest
};
