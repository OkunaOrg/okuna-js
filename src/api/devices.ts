import { APIRequest } from '../utils/APIRequest';
import { RequestOpts } from '../typings';

/**
 * @api public
 * DevicesAPI - Provides methods to interact with the Devices API
 */
class DevicesAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  /**
   * `GET /api/devices/` - Promises to retrieve an array of devices
   */
  async getDevices(): Promise<any> {
    return this.get();
  }

  /**
   * `DELETE /api/devices/` - Promises to delete the devices
   */
  async deleteDevices(): Promise<any> {
    return this.delete();
  }

  /**
   * `GET /api/devices/uuid/` - Promises to get a device based on its UUID
   * @param {string} uuid - The universally unique identifier of the device
   */
  async getDevice(uuid: string): Promise<any> {
    this._paths.push(encodeURIComponent(uuid));

    return this.get();
  }

  /**
   * `PUT /api/devices/` - Promises to create a device
   * @param {string} uuid - The universally unique identifier of the device
   * @param {string} name - The name of the device
   */
  async createDevice(uuid: string, name: string): Promise<any> {
    return this.put({ uuid, name });
  }

  /**
   * `PATCH /api/devices/:uuid/` - Promises to update a device
   * @param {string} uuid - The universally unique identifier of the device
   * @param {string} name - The name of the device
   */
  async updateDevice(uuid: string, name: string): Promise<any> {
    this._paths.push(encodeURIComponent(uuid));

    return this.patch({ name });
  }

  /**
   * `DELETE /api/devices/:uuid/` - Promise to delete a device
   * @param {string} uuid - The universally unique identifier of the device
   */
  async deleteDevice(uuid: string) {
    this._paths.push(encodeURIComponent(uuid));

    return this.delete();
  }
}

export {
  DevicesAPI
};
