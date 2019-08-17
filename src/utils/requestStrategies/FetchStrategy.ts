import RequestStrategy from './core';

import es6promise from 'es6-promise';
es6promise.polyfill();

import 'isomorphic-form-data';
import 'isomorphic-fetch';

/**
 * @api
 */
class FetchStrategy extends RequestStrategy {
  constructor() {
    super('fetch');
  }

  get(url: string, opts: object): Promise<any> {
    return new Promise((resolve, reject) => {
      return fetch(url, {
        method: 'GET',
        ...opts
      })
        .then((response) => {
          if (!response.ok) {
            return reject(response);
          }

          return response.json();
        })
        .then(json => {
          return {
            data: json
          };
        })
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }

  post(url: string, payload: object | string | FormData, opts: object): Promise<any> {
    return new Promise((resolve, reject) => {
      const body: any = typeof payload === 'object' && payload.constructor === Object
        ? JSON.stringify(payload)
        : payload;

      return fetch(url, {
        method: 'POST',
        body,
        ...opts
      })
        .then((response) => {
          if (!response.ok) {
            return reject(response);
          }

          return response.json();
        })
        .then(json => {
          return {
            data: json
          };
        })
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }

  put(url: string, payload: object | string | FormData, opts: object): Promise<any> {
    return new Promise((resolve, reject) => {
      const body: any = typeof payload === 'object' && payload.constructor === Object
        ? JSON.stringify(payload)
        : payload;

      return fetch(url, {
        method: 'PUT',
        body,
        ...opts
      })
        .then((response) => {
          if (!response.ok) {
            return reject(response);
          }

          return response.json();
        })
        .then(json => {
          return {
            data: json
          };
        })
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }

  patch(url: string, payload: object | string | FormData, opts: object): Promise<any> {
    return new Promise((resolve, reject) => {
      const body: any = typeof payload === 'object' && payload.constructor === Object
        ? JSON.stringify(payload)
        : payload;

      return fetch(url, {
        method: 'PATCH',
        body,
        ...opts
      })
        .then((response) => {
          if (!response.ok) {
            return reject(response);
          }

          return response.json();
        })
        .then(json => {
          return {
            data: json
          };
        })
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }

  delete(url: string, opts: object): Promise<any> {
    return new Promise((resolve, reject) => {
      return fetch(url, {
        method: 'DELETE',
        ...opts
      })
        .then((response) => {
          if (!response.ok) {
            return reject(response);
          }

          return response.json();
        })
        .then(json => {
          return {
            data: json
          };
        })
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }
}

export = FetchStrategy;
