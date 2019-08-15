/**
 * Parameters for lists().createList()
 * @typedef object ICreateList
 * @property {string} name
 * @property {number} emojiId
 */
export interface ICreateList {
  name: string;
  emojiId?: number;
}

/**
 * Parameters for lists().updateList()
 * @typedef object IUpdateList
 * @property {string} name
 * @property {number} emojiId
 * @property {string[]} usernames
 */
export interface IUpdateList {
  name?: string;
  emojiId?: number;
  usernames?: string[];
}
