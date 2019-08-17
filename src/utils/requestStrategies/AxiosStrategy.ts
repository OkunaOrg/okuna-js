import axios, { AxiosPromise } from 'axios';
import RequestStrategy from './core';

/**
 * @api
 * WARNING: The Axios strategy currently does not work well with
 * multipart/form-data and application/x-www-form-urlencoded
 */
class AxiosStrategy extends RequestStrategy {
  constructor() {
    super('axios');
  }

  get(url: string, opts: object): AxiosPromise {
    return axios.get(url, opts);
  }

  post(url: string, body: object | string | FormData, opts: object): AxiosPromise {
    return axios.post(url, body, opts);
  }

  put(url: string, body: object | string | FormData, opts: object): AxiosPromise {
    return axios.put(url, body, opts);
  }

  patch(url: string, body: object | string | FormData, opts: object): AxiosPromise {
    return axios.patch(url, body, opts);
  }

  delete(url: string, opts: object): AxiosPromise {
    return axios.delete(url, opts);
  }
}

export = AxiosStrategy;
