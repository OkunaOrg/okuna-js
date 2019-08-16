import { APIRequest } from "../utils/APIRequest";
import { RequestOpts } from '../typings';
import { ICreateList, IUpdateList } from '../typings/api/lists';

class ListsAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  getLists() {
    return this.get();
  }

  createList(opts: ICreateList) {
    return this.put(opts);
  }

  updateList(id: number, opts: IUpdateList) {
    this._paths.push(id.toString());

    return this.patch(opts);
  }

  deleteList(id: number) {
    this._paths.push(id.toString());

    return this.delete();
  }

  getList(id: number) {
    this._paths.push(id.toString());

    return this.get();
  }

  checkNameIsAvailable(name: string) {
    this._paths.push('name-check');

    return this.post({ name });
  }
}

export {
  ListsAPI
};
