import axios, { AxiosPromise } from 'axios';
import { RequestStrategy } from '.';

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
}

export = AxiosStrategy;
