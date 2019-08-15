/**
 * Parameters for posts().getTimelinePosts()
 * @typedef object IGetTimelinePosts
 * @property {number[]} listIds - list IDs to filter posts on
 * @property {number[]} circleIds - circle IDs to filter posts on
 * @property {number} maxId - maximum post ID
 * @property {number} count - number of posts to return
 * @property {username} string - return certain user's posts only
 * @property {authenticatedRequest} boolean - whether the request is public or authenticated
 */
export interface IGetTimelinePosts {
  listIds?: number[];
  circleIds?: number[];
  maxId?: number;
  count?: number;
  username?: string;
  authenticatedRequest: boolean;
};

/**
 * Parameters for posts().createPost()
 * @typedef object ICreatePost
 * @property {string} text - the full text of the post
 * @property {number[]} circleIds - an array of circle IDs that should have access to the post
 * @property {File} image - an image file object
 * @property {File} video - a video file object
 */
export interface ICreatePost {
  text: string;
  circleIds?: number[];
  image?: File;
  video?: File;
};

/**
 * Parameters for posts().editPost()
 * @typedef object IEditPost
 * @property {string} uuid - the universally unique identifier of the post
 * @property {string} text - the updated full text of the post
 */
export interface IEditPost {
  uuid: string;
  text: string;
};
