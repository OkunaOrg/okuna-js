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

  postMultiform(url: string, body: object, opts: object): Promise<any> {
    const contentType = { 'Content-Type': 'multipart/form-data' };
    return new Promise((resolve, reject) => {
      if (url.includes('/bad')) {
        return reject('bad');
      }

      return resolve({ method: 'POST', formdata: true, url, body, headers: {
        ...contentType,
        ...opts
      } })
    });
  }

  putMultiform(url: string, body: object, opts: object): Promise<any> {
    const contentType = { 'Content-Type': 'multipart/form-data' };
    return new Promise((resolve, reject) => {
      if (url.includes('/bad')) {
        return reject('bad');
      }

      return resolve({ method: 'PUT', formdata: true, url, body, headers: {
        ...contentType,
        ...opts
      } })
    });
  }

  patchMultiform(url: string, body: object, opts: object): Promise<any> {
    const contentType = { 'Content-Type': 'multipart/form-data' };
    return new Promise((resolve, reject) => {
      if (url.includes('/bad')) {
        return reject('bad');
      }

      return resolve({ method: 'PATCH', formdata: true, url, body, headers: {
        ...contentType,
        ...opts
      } })
    });
  }

  postUrlencoded(url: string, body: object, opts: object): Promise<any> {
    const contentType = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return new Promise((resolve, reject) => {
      if (url.includes('/bad')) {
        return reject('bad');
      }

      return resolve({ method: 'POST', formdata: true, url, body, headers: {
        ...contentType,
        ...opts
      } })
    });
  }

  putUrlencoded(url: string, body: object, opts: object): Promise<any> {
    const contentType = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return new Promise((resolve, reject) => {
      if (url.includes('/bad')) {
        return reject('bad');
      }

      return resolve({ method: 'PUT', formdata: true, url, body, headers: {
        ...contentType,
        ...opts
      } })
    });
  }

  patchUrlencoded(url: string, body: object, opts: object): Promise<any> {
    const contentType = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return new Promise((resolve, reject) => {
      if (url.includes('/bad')) {
        return reject('bad');
      }

      return resolve(
        { method: 'PATCH', formdata: true, url, body, headers: {
            ...contentType,
            ...opts
          }
        }
      )
    });
  }
}

export = MockRequestStrategy;
