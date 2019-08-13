import RequestStrategy from '../../src/utils/requestStrategies/core';

/**
 * @api private
 */
class MockRequestStrategy extends RequestStrategy {
  constructor() {
    super('mock');
  }

  get(url: string, opts: object): Promise<any> {
    return new Promise((resolve) => resolve({ method: 'GET', url, headers: opts }));
  }

  post(url: string, body: object, opts: object): Promise<any> {
    return new Promise((resolve) => resolve({ method: 'POST', url, body, headers: opts }));
  }

  put(url: string, body: object, opts: object): Promise<any> {
    return new Promise((resolve) => resolve({ method: 'PUT', url, body, headers: opts }));
  }

  patch(url: string, body: object, opts: object): Promise<any> {
    return new Promise((resolve) => resolve({ method: 'PATCH', url, body, headers: opts }));
  }

  delete(url: string, opts: object): Promise<any> {
    return new Promise((resolve) => resolve({ method: 'DELETE', url, headers: opts }));
  }

  postFormdata(url: string, body: object, opts: object): Promise<any> {
    return new Promise((resolve) => resolve({ method: 'POST', formdata: true, url, body, headers: opts }));
  }

  putFormdata(url: string, body: object, opts: object): Promise<any> {
    return new Promise((resolve) => resolve({ method: 'PUT', formdata: true, url, body, headers: opts }));
  }

  patchFormdata(url: string, body: object, opts: object): Promise<any> {
    return new Promise((resolve) => resolve({ method: 'PATCH', formdata: true, url, body, headers: opts }));
  }
}

export = MockRequestStrategy;
