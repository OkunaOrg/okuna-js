/**
 * User creator options
 * @typedef {object} UserCreatorOpts
 * @property {string} email
 * @property {string} token
 * @property {string} name
 * @property {boolean} isOfLegalAge
 * @property {boolean} areGuidelinesAccepted
 * @property {string} password
 * @property {File} avatar
 */
export interface UserCreatorOpts {
  email: string;
  token: string;
  name: string;
  isOfLegalAge: boolean;
  areGuidelinesAccepted: boolean;
  password: string;
  avatar?: File;
}
