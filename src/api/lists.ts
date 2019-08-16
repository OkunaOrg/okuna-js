import { APIRequest } from "../utils/APIRequest";
import { RequestOpts } from '../typings';
import { ICreateList, IUpdateList } from '../typings/api/lists';

class ListsAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  async getLists() {
    return this.get();
  }

  async createList(opts: ICreateList) {
    return this.put(opts);
  }

  async updateList(id: number, opts: IUpdateList) {
    this._paths.push(id.toString());

    return this.patch(opts);
  }

  async deleteList(id: number) {
    this._paths.push(id.toString());

    return this.delete();
  }

  async getList(id: number) {
    this._paths.push(id.toString());

    return this.get();
  }

  async checkNameIsAvailable(name: string) {
    this._paths.push('name-check');

    return this.post({ name });
  }
}

export {
  ListsAPI
};
