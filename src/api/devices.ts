import { APIRequest } from '../utils/APIRequest';
import { RequestOpts } from '../typings';

class DevicesAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  async getDevices(): Promise<any> {
    return this.get();
  }

  async deleteDevices(): Promise<any> {
    return this.delete();
  }

  async getDevice(uuid: string): Promise<any> {
    this._paths.push(encodeURIComponent(uuid));

    return this.get();
  }

  async createDevice(uuid: string, name: string): Promise<any> {
    return this.put({ uuid, name });
  }

  async updateDevice(uuid: string, name: string): Promise<any> {
    this._paths.push(encodeURIComponent(uuid));

    return this.patch({ name });
  }

  async deleteDevice(uuid: string) {
    this._paths.push(encodeURIComponent(uuid));

    return this.delete();
  }
}

export {
  DevicesAPI
};
