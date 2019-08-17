import RequestStrategy from '../../src/utils/requestStrategies/core';

/**
 * @api private
 */
class MockRequestStrategy extends RequestStrategy {
  constructor() {
    super('mock');
  }

  get(url: string, opts: object): Promise<any> {
    const contentType = { 'Content-Type': 'application/json' };
    return new Promise((resolve, reject) => {
      if (url.includes('/bad')) {
        return reject('bad');
      }

      return resolve({ method: 'GET', url, headers: {
        ...contentType,
        ...opts
      } })
    });
  }

  post(url: string, body: object, opts: object): Promise<any> {
    const contentType = { 'Content-Type': 'application/json' };
    return new Promise((resolve, reject) => {
      if (url.includes('/bad')) {
        return reject('bad');
      }

      return resolve({ method: 'POST', url, body, headers: {
        ...contentType,
        ...opts
      } })
    });
  }

  put(url: string, body: object, opts: object): Promise<any> {
    const contentType = { 'Content-Type': 'application/json' };
    return new Promise((resolve, reject) => {
      if (url.includes('/bad')) {
        return reject('bad');
      }

      return resolve({ method: 'PUT', url, body, headers: {
        ...contentType,
        ...opts
      } })
    });
  }

  patch(url: string, body: object, opts: object): Promise<any> {
    const contentType = { 'Content-Type': 'application/json' };
    return new Promise((resolve, reject) => {
      if (url.includes('/bad')) {
        return reject('bad');
      }

      return resolve({ method: 'PATCH', url, body, headers: {
        ...contentType,
        ...opts
      } })
    });
  }

  delete(url: string, opts: object): Promise<any> {
    const contentType = { 'Content-Type': 'application/json' };
    return new Promise((resolve, reject) => {
      if (url.includes('/bad')) {
        return reject('bad');
      }

      return resolve({ method: 'DELETE', url, headers: {
        ...contentType,
        ...opts
      } })
    });
  }
}

export = MockRequestStrategy;
