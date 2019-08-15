import { APIRequest } from '../utils/APIRequest';
import { RequestOpts } from '../typings';
import { IGetTimelinePosts, ICreatePost, IEditPost } from '../typings/api/posts';

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

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async createPost(opts: ICreatePost) {
    const payload: any = {};
    
    if (opts.image && opts.image.name) {
      payload['image'] = opts.image;
    }

    if (opts.video && opts.video.name) {
      payload['video'] = opts.video;
    }

    if (opts.text) {
      payload['text'] = opts.text;
    }

    if (opts.circleIds && opts.circleIds.length) {
      payload['circle_id'] = opts.circleIds.join(',');
    }

    return new Promise((resolve, reject) => {
      return this
        .putUrlencoded(payload)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async getTrendingPosts() {
    this._paths.push('trending');

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async editPost(opts: IEditPost) {
    this._paths.push(encodeURIComponent(opts.uuid));

    const payload: any = {
      post_uuid: opts.uuid
    };

    if (opts.text) {
      payload['text'] = opts.text;
    }

    return new Promise((resolve, reject) => {
      return this
        .patchUrlencoded(payload)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async getPostWithUuid(uuid: string) {
    this._paths.push(encodeURIComponent(uuid));

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  async deletePostWithUuid(uuid: string) {
    this._paths.push(encodeURIComponent(uuid));

    return new Promise((resolve, reject) => {
      return this
        .delete()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}

export {
  PostsAPI
};
