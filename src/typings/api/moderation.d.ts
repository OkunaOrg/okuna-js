/**
 * Parameters for moderation().getGlobalModeratedObjects()
 * @typedef {object} IGetGlobalModeratedObjects
 * @property {number} count
 * @property {number} maxId
 * @property {string} type
 * @property {boolean} verified
 * @property {string[]} statuses
 * @property {string[]} types
 */
export interface IGetGlobalModeratedObjects {
  count?: number;
  maxId?: number;
  type?: string;
  verified?: boolean;
  statuses?: string[];
  types?: string[];
}

/**
 * @typedef {object} IModeratedObject
 * @property {number} id
 * @property {number} count
 * @property {number} maxId
 */
export interface IModeratedObject {
  id: number;
  count?: number;
  maxId?: number;
}

/**
 * @typedef {object} IUpdateModeratedObject
 * @property {string} description
 * @property {number} category_id
 */
export interface IUpdateModeratedObject {
  description?: string;
  category_id?: number;
}
