import { Client } from '../Okuna';
import { RequestStrategy } from '../utils/requestStrategies';

/**
 * Okuna API options
 * @typedef {object} OkunaOpts
 * @property {string} [apiUrl] - The apiUrl to which the requests will be sent
 * @property {string} [authToken] - The authentication token
 * @property {string} [magicHeaderName] - Magic header name (temporary)
 * @property {string} [magicHeaderValue] - Magic header value (temporary)
 * @property 
 */
export interface OkunaOpts {
  apiUrl?: string;
  authToken: string;
  magicHeaderName?: string | null | undefined;
  magicHeaderValue?: string | null | undefined;
  requestStrategy?: string | RequestStrategy;
}

/**
 * Request handler options
 * @typedef {object} RequestOpts
 * @property {Client} [okuna] - The current Okuna instance
 * @property {string} [endpoint] - The requested endpoint
 */
export interface RequestOpts {
  okuna: Client;
  endpoint: string;
}

/**
 * Request strategy interface
 * @class RequestStrategy
 * @property {string} name - The name of the strategy
 */
export interface IRequestStrategy {
  name: string;

  get(url: string, opts: object): Promise<any>;
  post(url: string, body: object, opts: object): Promise<any>;
  put(url: string, body: object, opts: object): Promise<any>;
  patch(url: string, body: object, opts: object): Promise<any>;
  delete(url: string, opts: object): Promise<any>;
  postMultiform(url: string, body: object, opts: object): Promise<any>;
  putMultiform(url: string, body: object, opts: object): Promise<any>;
  patchMultiform(url: string, body: object, opts: object): Promise<any>;
  postUrlencoded(url: string, body: object, opts: object): Promise<any>;
  putUrlencoded(url: string, body: object, opts: object): Promise<any>;
  patchUrlencoded(url: string, body: object, opts: object): Promise<any>;
}

/**
 * Request parameters
 * @object
 */
export interface RequestParams {
  [key: string]: any;
}
