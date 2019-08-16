import { APIRequest } from '../../utils/APIRequest';

/**
 * CategoriesAPI - Provides methods to interact with the Categories API
 */
export interface CategoriesAPI extends APIRequest {
  /**
   * `GET /api/categories/` - Promises to return a list of categories
   * @returns - an array of categories
   */
  getCategories(): Promise<any>;
}
