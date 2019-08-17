import { APIRequest } from "../utils/APIRequest";
import { RequestOpts } from '../typings';
import { ICreateList, IUpdateList } from '../typings/api/lists';

/**
 * @api public
 * ListsAPI - Provides methods to interact with the Lists API
 */
class ListsAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  /**
   * `GET /api/lists/` - promises to retrieve all lists
   * @returns - an array of lists
   */
  async getLists() {
    return this.get();
  }

  /**
   * `PUT /api/lists/` - promises to create a new circle
   * @param {ICreateList} opts - The circle's properties
   * @returns - the circle
   */
  async createList(opts: ICreateList) {
    const body: any = {
      name: opts.name
    };

    if (opts.emojiId !== undefined) {
      body.emoji_id = opts.emojiId;
    }

    return this.put(body);
  }

  /**
   * `PATCH /api/lists/:id/` - promises to update a circle
   * @param {number} id - The ID of the circle
   * @param {IUpdateList} - The circle's new properties
   * @returns - the updated circle
   */
  async updateList(id: number, opts: IUpdateList) {
    this._paths.push(id.toString());

    const body: any = {
      name: opts.name,
    };

    if (opts.emojiId !== undefined) {
      body.emoji_id = opts.emojiId;
    }

    if (opts.usernames && opts.usernames.length) {
      body.usernames = opts.usernames;
    }

    return this.patch(body);
  }

  /**
   * `DELETE /api/lists/:id/` - promises to delete a circle
   * @param {number} id - The ID of the circle
   */
  async deleteList(id: number) {
    this._paths.push(id.toString());

    return this.delete();
  }

  /**
   * `GET /api/lists/:id/` - promises to get a circle
   * @param {number} id - The ID of the circle
   * @returns - the requested circle
   */
  async getList(id: number) {
    this._paths.push(id.toString());

    return this.get();
  }

  /**
   * `POST /api/lists/name-check/` - promises to check if a circle name is available
   * @param {string} name - The desired name
   */
  async checkNameIsAvailable(name: string) {
    this._paths.push('name-check');

    return this.post({ name });
  }
}

export {
  ListsAPI
};
