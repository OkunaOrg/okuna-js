import { APIRequest } from "../utils/APIRequest";
import { RequestOpts } from '../typings/index';
import { ICreateCircle, IUpdateCircle } from '../typings/api/circles';

class CirclesAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  async getCircles() {
    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async createCircle(opts: ICreateCircle) {
    const body: any = {
      name: opts.name
    };

    if (opts.color) {
      body.color = opts.color;
    }

    return new Promise((resolve, reject) => {
      return this
        .put(body)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async updateCircle(id: number, opts: IUpdateCircle) {
    this._paths.push(id.toString());

    return new Promise((resolve, reject) => {
      return this
        .patch(opts)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async getCircle(id: number) {
    this._paths.push(id.toString());

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async deleteCircle(id: number) {
    this._paths.push(id.toString());

    return new Promise((resolve, reject) => {
      return this
        .delete()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async checkNameIsAvailable(name: string) {
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
  CirclesAPI
};
