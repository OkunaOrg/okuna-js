import { APIRequest } from '../../utils/APIRequest';

/**
 * Parameters for lists().createList()
 * @typedef {object} ICreateList
 * @property {string} name
 * @property {number} emojiId
 */
export interface ICreateList {
  name: string;
  emojiId: number;
}

/**
 * Parameters for lists().updateList()
 * @typedef {object} IUpdateList
 * @property {string} name
 * @property {number} emojiId
 * @property {string[]} usernames
 */
export interface IUpdateList {
  name?: string;
  emojiId?: number;
  usernames?: string[];
}

/**
 * ListsAPI - Provides methods to interact with the Lists API
 */
export interface ListsAPI extends APIRequest {
  /**
   * `GET /api/lists/` - promises to retrieve all lists
   * @returns - an array of lists
   */
  getLists(): Promise<any>;

  /**
   * `PUT /api/lists/` - promises to create a new circle
   * @param {ICreateList} opts - The circle's properties
   * @returns - the circle
   */
  createList(opts: ICreateList): Promise<any>;

  /**
   * `PATCH /api/lists/:id/` - promises to update a circle
   * @param {number} id - The ID of the circle
   * @param {IUpdateList} - The circle's new properties
   * @returns - the updated circle
   */
  updateList(id: number, opts: IUpdateList): Promise<any>;

  /**
   * `GET /api/lists/:id/` - promises to get a circle
   * @param {number} id - The ID of the circle
   * @returns - the requested circle
   */
  getList(id: number): Promise<any>;

  /**
   * `DELETE /api/lists/:id/` - promises to delete a circle
   * @param {number} id - The ID of the circle
   */
  deleteList(id: number): Promise<any>;

  /**
   * `POST /api/lists/name-check/` - promises to check if a circle name is available
   * @param {string} name - The desired name
   */
  checkNameIsAvailable(name: string): Promise<any>;
}
