import { APIRequest } from "../utils/APIRequest";
import { RequestOpts } from '../typings';
import { ICreateCircle, IUpdateCircle } from '../typings/api/circles';

/**
 * @api public
 * CirclesAPI - Provides methods to interact with the Circles API
 */
class CirclesAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  /**
   * `GET /api/circles/` - promises to retrieve all circles
   * @returns - an array of circles
   */
  async getCircles() {
    return this.get();
  }

  /**
   * `PUT /api/circles/` - promises to create a new circle
   * @param {ICreateCircle} opts - The circle's properties
   * @returns - the circle
   */
  async createCircle(opts: ICreateCircle) {
    return this.put(opts);
  }

  /**
   * `PATCH /api/circles/:id/` - promises to update a circle
   * @param {number} id - The ID of the circle
   * @param {IUpdateCircle} - The circle's new properties
   * @returns - the updated circle
   */
  async updateCircle(id: number, opts: IUpdateCircle) {
    this._paths.push(id.toString());

    return this.patch(opts);
  }

  /**
   * `GET /api/circles/:id/` - promises to get a circle
   * @param {number} id - The ID of the circle
   * @returns - the requested circle
   */
  async getCircle(id: number) {
    this._paths.push(id.toString());

    return this.get();
  }

  /**
   * `DELETE /api/circles/:id/` - promises to delete a circle
   * @param {number} id - The ID of the circle
   */
  async deleteCircle(id: number) {
    this._paths.push(id.toString());

    return this.delete();
  }

  /**
   * `POST /api/circles/name-check/` - promises to check if a circle name is available
   * @param {string} name - The desired name
   */
  async checkNameIsAvailable(name: string) {
    this._paths.push('name-check');

    return this.post({ name });
  }
}

export {
  CirclesAPI
};
