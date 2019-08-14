import RequestStrategy from './core';
import queryString from '../queryString';

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

  post(url: string, body: object, opts: object): Promise<any> {
    return new Promise((resolve, reject) => {
      return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
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

  put(url: string, body: object, opts: object): Promise<any> {
    return new Promise((resolve, reject) => {
      return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
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

  patch(url: string, body: object, opts: object): Promise<any> {
    return new Promise((resolve, reject) => {
      return fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(body),
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

  postMultiform(url: string, body: object, opts: object): Promise<any> {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      Object.keys(body).forEach(key => {
        data.append(key, (body as any)[key]);
      });

      return fetch(url, {
        method: 'POST',
        body: data,
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

  putMultiform(url: string, body: object, opts: object): Promise<any> {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      Object.keys(body).forEach(key => {
        data.append(key, (body as any)[key]);
      });

      return fetch(url, {
        method: 'PUT',
        body: data,
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

  patchMultiform(url: string, body: object, opts: object): Promise<any> {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      Object.keys(body).forEach(key => {
        data.append(key, (body as any)[key]);
      });

      return fetch(url, {
        method: 'PATCH',
        body: data,
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

  postUrlencoded(url: string, body: object, opts: object): Promise<any> {
    return new Promise((resolve, reject) => {
      return fetch(url, {
        method: 'POST',
        body: queryString(body),
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

  putUrlencoded(url: string, body: object, opts: object): Promise<any> {
    return new Promise((resolve, reject) => {
      return fetch(url, {
        method: 'PUT',
        body: queryString(body),
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

  patchUrlencoded(url: string, body: object, opts: object): Promise<any> {
    return new Promise((resolve, reject) => {
      return fetch(url, {
        method: 'PATCH',
        body: queryString(body),
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
