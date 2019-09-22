import { LimitationParams } from '..';

/**
 * Parameters for notifications().get()
 * @typedef {object} IGetNotificationOpts
 * @extends {LimitationParams}
 * @property {string[]} types - notification types
 */
export interface IGetNotificationOpts extends LimitationParams {
  types?: string[];
}
