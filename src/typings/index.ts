import { Okuna } from '../Okuna';

/**
 * Okuna API options
 * @typedef {object} OkunaOpts
 * @property {string} [apiUrl] - The apiUrl to which the requests will be sent
 * @property {string} [authToken] - The authentication token
 * @property {string} [magicHeaderName] - Magic header name (temporary)
 * @property {string} [magicHeaderValue] - Magic header value (temporary)
 */
export interface OkunaOpts {
  apiUrl?: string;
  authToken: string;
  magicHeaderName?: string;
  magicHeaderValue?: string;
}

/**
 * Request handler options
 * @typedef {object} RequestOpts
 * @property {Okuna} [okuna] - The current Okuna instance
 * @property {string} [endpoint] - The requested endpoint
 */
export interface RequestOpts {
  okuna: Okuna;
  endpoint: string;
}
