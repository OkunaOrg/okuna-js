import { APIRequest } from "../utils/APIRequest";
import { RequestOpts } from '../typings';
import { ICreateCircle, IUpdateCircle } from '../typings/api/circles';

class CirclesAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  async getCircles() {
    return this.get();
  }

  async createCircle(opts: ICreateCircle) {
    return this.put(opts);
  }

  async updateCircle(id: number, opts: IUpdateCircle) {
    this._paths.push(id.toString());

    return this.patch(opts);
  }

  async getCircle(id: number) {
    this._paths.push(id.toString());

    return this.get();
  }

  async deleteCircle(id: number) {
    this._paths.push(id.toString());

    return this.delete();
  }

  async checkNameIsAvailable(name: string) {
    this._paths.push('name-check');

    return this.post({ name });
  }
}

export {
  CirclesAPI
};
