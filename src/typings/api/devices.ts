import { APIRequest } from '../../utils/APIRequest';

/**
 * DevicesAPI - Provides methods to interact with the Devices API
 */
export interface DevicesAPI extends APIRequest {
  /**
   * `GET /api/devices/` - Promises to retrieve an array of devices
   */
  getDevices(): Promise<any>;

  /**
   * `DELETE /api/devices/` - Promises to delete the devices
   */
  deleteDevices(): Promise<any>;

  /**
   * `GET /api/devices/uuid/` - Promises to get a device based on its UUID
   * @param {string} uuid - The universally unique identifier of the device
   */
  getDevice(uuid: string): Promise<any>;

  /**
   * `PUT /api/devices/` - Promises to create a device
   * @param {string} uuid - The universally unique identifier of the device
   * @param {string} name - The name of the device
   */
  createDevice(uuid: string, name: string): Promise<any>;

  /**
   * `PATCH /api/devices/:uuid/` - Promises to update a device
   * @param {string} uuid - The universally unique identifier of the device
   * @param {string} name - The name of the device
   */
  updateDevice(uuid: string, name: string): Promise<any>;

  /**
   * `DELETE /api/devices/:uuid/` - Promise to delete a device
   * @param {string} uuid - The universally unique identifier of the device
   */
  deleteDevice(uuid: string): Promise<any>;
}
