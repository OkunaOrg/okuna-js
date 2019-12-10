import { APIRequest } from '../utils/APIRequest';
import { RequestOpts, ExtraLimitationParams } from '../typings';
import {
  IGetTimelinePosts,
  ICreatePost,
  IEditPost,
  IGetReactionsForPost,
  IReportPost,
  IReportPostComment,
  IGetPostParticipants,
  ISearchPostParticipants,
  IAddMediaOpts,
  IGetTopPostsOpts,
  IGetTrendingPostsOpts
} from '../typings/api/posts';
import { FileObject } from '../utils/FileObject';

class PostsAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  async getTimelinePosts(opts: IGetTimelinePosts) {
    if (opts.listIds && opts.listIds.length) {
      this._params['list_id'] = opts.listIds.join(',');
    }

    if (opts.circleIds && opts.circleIds.length) {
      this._params['circle_id'] = opts.circleIds.join(',');
    }

    if (opts.count !== undefined) {
      this._params['count'] = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params['max_id'] = opts.maxId;
    }

    if (opts.username) {
      this._params['username'] = opts.username;
    }

    return this.get();
  }

  async createPost(opts: ICreatePost) {
    const payload: any = {};

    if (opts.text) {
      payload['text'] = opts.text;
    }

    if (opts.isDraft !== undefined) {
      payload['is_draft'] = opts.isDraft;
    }

    if (opts.circleIds && opts.circleIds.length) {
      payload['circle_id'] = opts.circleIds.join(',');
    }

    return this.putFormdata(payload);
  }

  async addMediaToPost(uuid: string, opts: IAddMediaOpts) {
    this._paths.push(encodeURIComponent(uuid), 'media');
    const payload = {
      file: new FileObject(opts.file)
    };

    return this.putFormdata(payload);
  }

  async getPostMedia(uuid: string) {
    this._paths.push(encodeURIComponent(uuid), 'media');
    return this.get();
  }

  async publishPost(uuid: string) {
    this._paths.push(encodeURIComponent(uuid), 'publish');
    return this.post({});
  }

  async getPostStatus(uuid: string) {
    this._paths.push(encodeURIComponent(uuid), 'status');
    return this.get();
  }

  async getTopPosts(opts: IGetTopPostsOpts) {
    this._paths.push('top');

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    if (opts.minId !== undefined) {
      this._params.min_id = opts.minId;
    }

    if (opts.excludeJoinedCommunities !== undefined) {
      this._params.exclude_joined_communities = opts.excludeJoinedCommunities;
    }

    return this.get();
  }

  async getTrendingPosts(opts: IGetTrendingPostsOpts) {
    this._paths.push('trending', 'new');

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    if (opts.minId !== undefined) {
      this._params.min_id = opts.minId;
    }

    return this.get();
  }

  async editPost(opts: IEditPost) {
    this._paths.push(encodeURIComponent(opts.uuid));

    const payload: any = {
      post_uuid: opts.uuid
    };

    if (opts.text) {
      payload['text'] = opts.text;
    }

    return this.patchFormdata(payload);
  }

  async getPostWithUuid(uuid: string) {
    this._paths.push(encodeURIComponent(uuid));

    return this.get();
  }

  async deletePostWithUuid(uuid: string) {
    this._paths.push(encodeURIComponent(uuid));

    return this.delete();
  }

  async getCommentsForPost(uuid: string, opts: ExtraLimitationParams) {
    this._paths.push(encodeURIComponent(uuid), 'comments');

    if (opts.countMax !== undefined) {
      this._params.count_max = opts.countMax;
    }

    if (opts.countMin !== undefined) {
      this._params.count_min = opts.countMin;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    if (opts.minId !== undefined) {
      this._params.min_id = opts.minId;
    }

    if (opts.sort) {
      this._params.sort = opts.sort;
    }

    return this.get();
  }

  async getRepliesForPostComment(postUuid: string, postCommentId: number, opts: ExtraLimitationParams) {
    this._paths.push(encodeURIComponent(postUuid), 'comments', postCommentId.toString());

    if (opts.countMax !== undefined) {
      this._params.count_max = opts.countMax;
    }

    if (opts.countMin !== undefined) {
      this._params.count_min = opts.countMin;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    if (opts.minId !== undefined) {
      this._params.min_id = opts.minId;
    }

    if (opts.sort) {
      this._params.sort = opts.sort;
    }

    return this.get();
  }

  async commentOnPost(uuid: string, text: string) {
    this._paths.push(encodeURIComponent(uuid), 'comments');
    return this.put({ text });
  }

  async getPostComment(postUuid: string, commentId: number) {
    this._paths.push(encodeURIComponent(postUuid), 'comments', commentId.toString());
    return this.get();
  }

  async editPostComment(postUuid: string, commentId: number, text: string) {
    this._paths.push(encodeURIComponent(postUuid), 'comments', commentId.toString());
    return this.patch({ text });
  }

  async replyPostComment(postUuid: string, commentId: number, text: string) {
    this._paths.push(encodeURIComponent(postUuid), 'comments', commentId.toString(), 'replies');
    return this.put({ text });
  }

  async deletePostComment(postUuid: string, commentId: number) {
    this._paths.push(encodeURIComponent(postUuid), 'comments', commentId.toString());
    return this.delete();
  }

  async getReactionsForPost(uuid: string, opts: IGetReactionsForPost) {
    this._paths.push(encodeURIComponent(uuid), 'reactions');

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    if (opts.emojiId !== undefined) {
      this._params.emoji_id = opts.emojiId;
    }

    return this.get();
  }

  async getReactionsEmojiCountForPost(uuid: string) {
    this._paths.push(encodeURIComponent(uuid), 'reactions', 'emoji-count');
    return this.get();
  }

  async reactToPost(uuid: string, emojiId: number) {
    this._paths.push(encodeURIComponent(uuid), 'reactions');
    return this.put({ emoji_id: emojiId });
  }

  async deletePostReaction(postUuid: string, reactionId: number) {
    this._paths.push(encodeURIComponent(postUuid), 'reactions', reactionId.toString());
    return this.delete();
  }

  async getReactionsForPostComment(postUuid: string, commentId: number, opts: IGetReactionsForPost) {
    this._paths.push(encodeURIComponent(postUuid), 'comments', commentId.toString(), 'reactions');

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    if (opts.emojiId !== undefined) {
      this._params.emoji_id = opts.emojiId;
    }

    return this.get();
  }

  async getReactionsEmojiCountForPostComment(postUuid: string, commentId: number) {
    this._paths.push(
      encodeURIComponent(postUuid),
      'comments',
      commentId.toString(),
      'reactions',
      'emoji-count'
    );
    return this.get();
  }

  async reactToPostComment(postUuid: string, commentId: number, emojiId: number) {
    this._paths.push(encodeURIComponent(postUuid), 'comments', commentId.toString(), 'reactions');
    return this.put({ emoji_id: emojiId });
  }

  async deletePostCommentReaction(postUuid: string, commentId: number, reactionId: number) {
    this._paths.push(
      encodeURIComponent(postUuid),
      'comments',
      commentId.toString(),
      'reactions',
      reactionId.toString()
    );

    return this.delete();
  }

  async mutePostComment(postUuid: string, commentId: number) {
    this._paths.push(
      encodeURIComponent(postUuid),
      'comments',
      commentId.toString(),
      'notifications',
      'mute'
    );

    return this.post({});
  }

  async unmutePostComment(postUuid: string, commentId: number) {
    this._paths.push(
      encodeURIComponent(postUuid),
      'comments',
      commentId.toString(),
      'notifications',
      'unmute'
    );

    return this.post({});
  }

  async mutePost(uuid: string) {
    this._paths.push(encodeURIComponent(uuid), 'notifications', 'mute');
    return this.post({});
  }

  async unmutePost(uuid: string) {
    this._paths.push(encodeURIComponent(uuid), 'notifications', 'unmute');
    return this.post({});
  }

  async disableCommentsForPost(uuid: string) {
    this._paths.push(encodeURIComponent(uuid), 'comments', 'disable');
    return this.post({});
  }

  async enableCommentsForPost(uuid: string) {
    this._paths.push(encodeURIComponent(uuid), 'comments', 'enable');
    return this.post({});
  }

  async openPost(uuid: string) {
    this._paths.push(encodeURIComponent(uuid), 'open');
    return this.post({});
  }

  async closePost(uuid: string) {
    this._paths.push(encodeURIComponent(uuid), 'close');
    return this.post({});
  }

  async getReactionEmojiGroups() {
    this._paths.push('emojis/groups');
    return this.get();
  }

  async reportPost(opts: IReportPost) {
    this._paths.push(encodeURIComponent(opts.postUuid), 'report');

    const body: any = {
      category_id: opts.moderationCategoryId.toString()
    };

    if (opts.description) {
      body.description = opts.description;
    }

    return this.post(body);
  }

  async reportPostComment(opts: IReportPostComment) {
    this._paths.push(encodeURIComponent(opts.postUuid), 'comments', opts.commentId.toString(), 'report');

    const body: any = {
      category_id: opts.moderationCategoryId.toString()
    };

    if (opts.description) {
      body.description = opts.description;
    }

    return this.post(body);
  }

  async translatePost(uuid: string) {
    this._paths.push(encodeURIComponent(uuid), 'translate');
    return this.post({});
  }

  async getPreviewData(uuid: string) {
    this._paths.push(encodeURIComponent(uuid), 'link-preview');
    return this.get();
  }

  async translatePostComment(postUuid: string, commentId: number) {
    this._paths.push(encodeURIComponent(postUuid), 'comments', commentId.toString(), 'translate');
    return this.post({});
  }

  async getPostParticipants(opts: IGetPostParticipants) {
    this._paths.push(encodeURIComponent(opts.postUuid), 'participants');

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    return this.get();
  }

  async searchPostParticipants(opts: ISearchPostParticipants) {
    this._paths.push(encodeURIComponent(opts.postUuid), 'participants', 'search');

    this._params.query = opts.query;

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    return this.get();
  }
}

export {
  PostsAPI
};
