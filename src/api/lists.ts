import { APIRequest } from "../utils/APIRequest";
import { RequestOpts } from '../typings';
import { ICreateList, IUpdateList } from '../typings/api/lists';

class ListsAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  getLists() {
    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  createList(opts: ICreateList) {
    return new Promise((resolve, reject) => {
      return this
        .put(opts)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  updateList(id: number, opts: IUpdateList) {
    this._paths.push(id.toString());

    return new Promise((resolve, reject) => {
      return this
        .patch(opts)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  deleteList(id: number) {
    this._paths.push(id.toString());

    return new Promise((resolve, reject) => {
      return this
        .delete()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  getList(id: number) {
    this._paths.push(id.toString());

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  checkNameIsAvailable(name: string) {
    this._paths.push('name-check');

    return new Promise((resolve, reject) => {
      return this
        .post({ name })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}

export {
  ListsAPI
};
