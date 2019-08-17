import { APIRequest } from '../../utils/APIRequest';
import { RequestOpts } from '../index';

/**
 * Parameters for circles().createCircle()
 * @typedef {object} ICreateCircle
 * @property {string} name
 * @property {string} color
 */
export interface ICreateCircle {
  name: string;
  color?: string;
}

/**
 * Parameters for circles().updateCircle()
 * @typedef {object} IUpdateCircle
 * @property {string} name
 * @property {string} color
 */
export interface IUpdateCircle {
  name?: string;
  color?: string;
  usernames?: string[];
}

/**
 * CirclesAPI - Provides methods to interact with the Circles API
 */
export interface CirclesAPI extends APIRequest {
  /**
   * `GET /api/circles/` - promises to retrieve all circles
   * @returns - an array of circles
   */
  getCircles(): Promise<any>;

  /**
   * `PUT /api/circles/` - promises to create a new circle
   * @param {ICreateCircle} opts - The circle's properties
   * @returns - the circle
   */
  createCircle(opts: ICreateCircle): Promise<any>;

  /**
   * `PATCH /api/circles/:id/` - promises to update a circle
   * @param {number} id - The ID of the circle
   * @param {IUpdateCircle} - The circle's new properties
   * @returns - the updated circle
   */
  updateCircle(id: number, opts: IUpdateCircle): Promise<any>;

  /**
   * `GET /api/circles/:id/` - promises to get a circle
   * @param {number} id - The ID of the circle
   * @returns - the requested circle
   */
  getCircle(id: number): Promise<any>;

  /**
   * `DELETE /api/circles/:id/` - promises to delete a circle
   * @param {number} id - The ID of the circle
   */
  deleteCircle(id: number): Promise<any>;

  /**
   * `POST /api/circles/name-check/` - promises to check if a circle name is available
   * @param {string} name - The desired name
   */
  checkNameIsAvailable(name: string): Promise<any>;
}
