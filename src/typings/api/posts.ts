import { LimitationParams } from '../';
import { IFileObjectOpts } from '../../utils/FileObject';

/**
 * Parameters for posts().getTimelinePosts()
 * @typedef {object} IGetTimelinePosts
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
}

/**
 * Parameters for posts().createPost()
 * @typedef {object} ICreatePost
 * @property {string} text - the full text of the post
 * @property {number[]} circleIds - an array of circle IDs that should have access to the post
 * @property {IFileObjectOpts} image - an image file object
 * @property {IFileObjectOpts} video - a video file object
 * @property {boolean} isDraft - specifies whether the post is a draft
 */
export interface ICreatePost {
  text: string;
  circleIds?: number[];
  image?: IFileObjectOpts;
  video?: IFileObjectOpts;
  isDraft?: boolean;
}

/**
 * Parameters for add media
 * @typedef {object} IAddMediaOpts
 * @property {IFileObjectOpts} file - the uploaded file
 */
export interface IAddMediaOpts {
  file: IFileObjectOpts;
};

/**
 * Parameters for posts().editPost()
 * @typedef {object} IEditPost
 * @property {string} uuid - the universally unique identifier of the post
 * @property {string} text - the updated full text of the post
 */
export interface IEditPost {
  uuid: string;
  text: string;
}

/**
 * Parameters for posts().getReactionsForPost()
 * @typedef {object} IGetReactionsForPost
 * @extends {LimitationParams}
 * @property {number} emojiId - the ID of the reaction emoji
 */
export interface IGetReactionsForPost extends LimitationParams {
  emojiId?: number;
}

/**
 * Parameters for posts().reportPost()
 * @typedef {object} IReportPost
 * @property {string} postUuid - universally unique identifier of the reported post
 * @property {number} moderationCategoryId - the id of the moderation category
 * @property {string} description - optional description of the report
 */
export interface IReportPost {
  postUuid: string;
  moderationCategoryId: number;
  description?: string;
}

/**
 * Parameters for posts().reportPostComment()
 * @typedef {object} IReportPostComment
 * @extends {IReportPost}
 * @property {number} commentId - the id of the reported comment
 */
export interface IReportPostComment extends IReportPost {
  commentId: number;
}

/**
 * Parameters for posts().getPostParticipants()
 * @typedef {object} IGetPostParticipants
 * @property {string} postUuid - universally unique identifier of the post
 * @property {number} count - max number of results
 */
export interface IGetPostParticipants {
  postUuid: string;
  count?: number;
}

/**
 * Parameters for posts().searchPostParticipants()
 * @typedef {object} ISearchPostParticipants
 * @extends {IGetPostParticipants}
 * @property {string} query - the search query
 */
export interface ISearchPostParticipants extends IGetPostParticipants {
  query: string;
}
