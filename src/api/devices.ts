import { APIRequest } from '../utils/APIRequest';
import { RequestOpts } from '../typings';
import { AxiosResponse, AxiosError } from 'axios';

class DevicesAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  async getDevices(): Promise<any> {
    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res: AxiosResponse) => resolve(res.data))
        .catch((err: AxiosError) => reject(err));
    });
  }

  async deleteDevices(): Promise<any> {
    return new Promise((resolve, reject) => {
      return this
        .delete()
        .then((res: AxiosResponse) => resolve(res.data))
        .catch((err: AxiosError) => reject(err));
    });
  }

  async getDevice(uuid: string): Promise<any> {
    this._paths.push(encodeURIComponent(uuid));

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res: AxiosResponse) => resolve(res.data))
        .catch((err: AxiosError) => reject(err));
    });
  }

  async createDevice(uuid: string, name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      return this
        .put({ uuid, name })
        .then((res: AxiosResponse) => resolve(res.data))
        .catch((err: AxiosError) => reject(err));
    });
  }

  async updateDevice(uuid: string, name: string): Promise<any> {
    this._paths.push(encodeURIComponent(uuid));

    return new Promise((resolve, reject) => {
      return this
        .patch({ name })
        .then((res: AxiosResponse) => resolve(res.data))
        .catch((err: AxiosError) => reject(err));
    });
  }

  async deleteDevice(uuid: string) {
    this._paths.push(encodeURIComponent(uuid));

    return new Promise((resolve, reject) => {
      return this
        .delete()
        .then((res: AxiosResponse) => resolve(res.data))
        .catch((err: AxiosError) => reject(err));
    });
  }
}

export {
  DevicesAPI
};
