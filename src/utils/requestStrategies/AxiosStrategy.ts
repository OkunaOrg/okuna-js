import axios, { AxiosPromise } from 'axios';
import RequestStrategy from './core';
import 'isomorphic-form-data';

import queryString from '../queryString';

/**
 * @api
 */
class AxiosStrategy extends RequestStrategy {
  constructor() {
    super('axios');
  }

  get(url: string, opts: object): AxiosPromise {
    return axios.get(url, opts);
  }

  post(url: string, body: object, opts: object): AxiosPromise {
    return axios.post(url, body, opts);
  }

  put(url: string, body: object, opts: object): AxiosPromise {
    return axios.put(url, body, opts);
  }

  patch(url: string, body: object, opts: object): AxiosPromise {
    return axios.patch(url, body, opts);
  }

  delete(url: string, opts: object): AxiosPromise {
    return axios.delete(url, opts);
  }

  postMultiform(url: string, body: object, opts: object): AxiosPromise {
    const data = new FormData();
    Object.keys(body).forEach(key => {
      data.append(key, (body as any)[key]);
    });

    return axios.post(url, data, opts);
  }

  putMultiform(url: string, body: object, opts: object): AxiosPromise {
    const data = new FormData();
    Object.keys(body).forEach(key => {
      data.append(key, (body as any)[key]);
    });

    return axios.put(url, data, opts);
  }

  patchMultiform(url: string, body: object, opts: object): AxiosPromise {
    const data = new FormData();
    Object.keys(body).forEach(key => {
      data.append(key, (body as any)[key]);
    });

    return axios.patch(url, data, opts);
  }

  postUrlencoded(url: string, body: object, opts: object): AxiosPromise {
    return axios.post(url, queryString(body), opts);
  }

  putUrlencoded(url: string, body: object, opts: object): AxiosPromise {
    return axios.put(url, queryString(body), opts);
  }

  patchUrlencoded(url: string, body: object, opts: object): AxiosPromise {
    return axios.patch(url, queryString(body), opts);
  }
}

export = AxiosStrategy;
