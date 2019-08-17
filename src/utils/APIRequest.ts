import { RequestOpts, IRequestStrategy, RequestParams } from '../typings';
import { Client } from '../Okuna';
import buildUrl from './buildUrl';
import { getRequestStrategy } from './requestStrategies';

import 'isomorphic-form-data';
import { FileObject } from './FileObject';

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
  protected _params: RequestParams = {};
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
   * passed to the request performee.
   * @returns {object}
   */
  generateHeaders(contentType: string | null = null): object {
    const headers: object = {
      'Accept': 'application/json'
    };

    if (contentType !== 'auto') {
      Object.assign(headers, { 'Content-Type': contentType || 'application/json' });
    }

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
   * constructFormdata()
   * Constructs a FormData instance from an object.
   * @param {object} opts - the object to generate the FormData from
   * @returns {FormData}
   */
  _constructFormdata(opts: object | null = null): FormData {
    const form = new FormData();

    if (!opts) {
      return form;
    }
    
    Object.keys(opts).forEach((key: string) => {
      const value = (opts as any)[key];

      // istanbul ignore next
      if (value.isValidFileObject) {
        return form.append(key, value.file, value.name);
      }

      return form.append(key, value);
    });

    return form;
  }

  /**
   * get()
   * GET request
   * @returns {Promise<any>}
   */
  protected get(): Promise<any> {
    this._headers = this.generateHeaders();
    this._url = buildUrl(this._okuna.apiUrl, this._paths, this._params);
    return new Promise((resolve, reject) => {
      return this._api.get(this._url, { headers: this._headers })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  /**
   * put()
   * PUT request
   * @param {object} body - Request body
   */
  protected put(body: object): Promise<any> {
    this._headers = this.generateHeaders();
    this._url = buildUrl(this._okuna.apiUrl, this._paths, this._params);
    return new Promise((resolve, reject) => {
      return this._api.put(this._url, JSON.stringify(body), { headers: this._headers })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  /**
   * post()
   * POST request
   * @param {object} body - Request body
   */
  protected post(body: object): Promise<any> {
    this._headers = this.generateHeaders();
    this._url = buildUrl(this._okuna.apiUrl, this._paths, this._params);
    return new Promise((resolve, reject) => {
      return this._api.post(this._url, JSON.stringify(body), { headers: this._headers })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  /**
   * patch()
   * PATCH request
   * @param {object} body - Request body
   */
  protected patch(body: object): Promise<any> {
    this._headers = this.generateHeaders();
    this._url = buildUrl(this._okuna.apiUrl, this._paths, this._params);
    return new Promise((resolve, reject) => {
      return this._api.patch(this._url, JSON.stringify(body), { headers: this._headers })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  /**
   * delete()
   * DELETE request
   * @returns {Promise<any>}
   */
  protected delete(): Promise<any> {
    this._headers = this.generateHeaders();
    this._url = buildUrl(this._okuna.apiUrl, this._paths, this._params);
    return new Promise((resolve, reject) => {
      return this._api.delete(this._url, { headers: this._headers })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  /**
   * putFormdata()
   * PUT request (multipart/form-data, application/x-www-form-urlencoded)
   */
  protected putFormdata(body: object): Promise<any> {
    const form = this._constructFormdata(body);
    this._headers = this.generateHeaders('auto');
    this._url = buildUrl(this._okuna.apiUrl, this._paths, this._params);
    return new Promise((resolve, reject) => {
      return this._api.put(this._url, form, { headers: this._headers })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  /**
   * postFormdata()
   * POST request (multipart/form-data, application/x-www-form-urlencoded)
   */
  protected postFormdata(body: object): Promise<any> {
    const form = this._constructFormdata(body);
    this._headers = this.generateHeaders('auto');
    this._url = buildUrl(this._okuna.apiUrl, this._paths, this._params);
    return new Promise((resolve, reject) => {
      return this._api.post(this._url, form, { headers: this._headers })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  /**
   * patchFormdata()
   * PATCH request (multipart/form-data, application/x-www-form-urlencoded)
   */
  protected patchFormdata(body: object): Promise<any> {
    const form = this._constructFormdata(body);
    this._headers = this.generateHeaders('auto');
    this._url = buildUrl(this._okuna.apiUrl, this._paths, this._params);
    return new Promise((resolve, reject) => {
      return this._api.patch(this._url, form, { headers: this._headers })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}

export {
  APIRequest
};
