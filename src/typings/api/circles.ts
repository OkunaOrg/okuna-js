/**
 * Parameters for circles().createCircle()
 * @typedef object ICreateCircle
 * @property {string} name
 * @property {string} color
 */
export interface ICreateCircle {
  name: string;
  color?: string;
}

/**
 * Parameters for circles().updateCircle()
 * @typedef object IUpdateCircle
 * @property {string} name
 * @property {string} color
 */
export interface IUpdateCircle {
  name?: string;
  color?: string;
  usernames?: string[];
}
