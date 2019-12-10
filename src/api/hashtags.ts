import { APIRequest } from '../utils/APIRequest';
import { RequestOpts, LimitationParamsWithAuthenticationCheck } from '../typings';
import { IReportHashtagOpts } from '../typings/api/hashtags';

/**
 * HashtagsAPI - Prodivdes methods to interface with hashtag API endpoints
 */
class HashtagsAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  /**
   * `GET /api/hashtags/trending` - promises to retrieve the trending hashtags
   * @param {boolean} authenticatedRequest - specifies whether the current session is authenticated
   */
  async getTrendingHashtags(authenticatedRequest: boolean = true) {
    this._paths.push('trending');
    this.requiresToken = authenticatedRequest;
    return this.get();
  }

  /**
   * `GET /api/hashtags/suggested` - promises to retrieve the suggested hashtags
   * @param {boolean} authenticatedRequest - specifies whether the current session is authenticated
   */
  async getSuggestedHashtags(authenticatedRequest: boolean = true) {
    this._paths.push('suggested');
    this.requiresToken = authenticatedRequest;
    return this.get();
  }

  /**
   * `GET /api/hashtags/search` - promises to search for hashtags
   * @param {string} query - the search query
   * @param {boolean} authenticatedRequest - specifies whether the current session is authenticated
   */
  async getHashtagsWithQuery(query: string, authenticatedRequest: boolean = true) {
    this._paths.push('search');
    this._params.query = query;
    this.requiresToken = authenticatedRequest;
    return this.get();
  }

  /**
   * `GET /api/hashtags/:name` - promises to get a hashtag by name
   * @param {string} name - the name of the hashtag
   * @param {boolean} authenticatedRequest - specifies whether the current session is authenticated
   */
  async getHashtagWithName(name: string, authenticatedRequest: boolean = true) {
    this._paths.push(encodeURIComponent(name));
    this.requiresToken = authenticatedRequest;
    return this.get();
  }

  /**
   * `POST /api/hashtags/:name/report` - promises to report a hashtag
   * @param {IReportHashtagOpts} opts - options for hashtag reporting
   */
  async reportHashtagWithName(opts: IReportHashtagOpts) {
    const payload = {
      category_id: opts.moderationCategoryId.toString()
    };

    if (opts.description) {
      (payload as any).description = opts.description;
    }

    this._paths.push(encodeURIComponent(opts.hashtagName), 'report');
    return this.post(payload);
  }

  /**
   * `GET /api/hashtags/:name/posts` - promises to get a list of posts that contain the specified hashtag
   * @param {string} name - the name of the hashtag
   * @param {LimitationParamsWithAuthenticationCheck} - limitation options
   */
  async getPostsForHashtagWithName(name: string, opts: LimitationParamsWithAuthenticationCheck) {
    this._paths.push(encodeURIComponent(name), 'posts');

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    this.requiresToken = opts.authenticatedRequest || opts.authenticatedRequest === undefined;

    return this.get();
  }
}

export {
  HashtagsAPI
};
