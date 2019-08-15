import { APIRequest } from "../utils/APIRequest";
import { RequestOpts, LimitationParams } from '../typings';
import {
  IGetGlobalModeratedObjects,
  IModeratedObject,
  IUpdateModeratedObject
} from '../typings/api/moderation';

class ModerationAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  getGlobalModeratedObjects(opts: IGetGlobalModeratedObjects) {
    this._paths.push('moderated-objects', 'global');

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    if (opts.statuses && opts.statuses.length) {
      this._params.statuses = opts.statuses.join(',');
    }

    if (opts.types && opts.types.length) {
      this._params.types = opts.types.join(',');
    }

    if (opts.verified !== undefined) {
      this._params.verified = opts.verified;
    }

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  getModeratedObjectLogs(opts: IModeratedObject) {
    this._paths.push('moderated-objects', encodeURIComponent(opts.id), 'logs');

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  getModeratedObjectReports(opts: IModeratedObject) {
    this._paths.push('moderated-objects', encodeURIComponent(opts.id), 'reports');

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  getModerationCategories() {
    this._paths.push('categories');

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  getUserModerationPenalties(opts: LimitationParams) {
    this._paths.push('user', 'penalties');

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  getUserPendingModeratedObjectsCommunities(opts: LimitationParams) {
    this._paths.push('user', 'pending-moderated-objects-communities');

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    return new Promise((resolve, reject) => {
      return this
        .get()
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  verifyModeratedObject(id: number) {
    this._paths.push('moderated-objects', id.toString(), 'verify');

    return new Promise((resolve, reject) => {
      return this
        .post({})
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  unverifyModeratedObject(id: number) {
    this._paths.push('moderated-objects', id.toString(), 'unverify');

    return new Promise((resolve, reject) => {
      return this
        .post({})
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  approveModeratedObject(id: number) {
    this._paths.push('moderated-objects', id.toString(), 'approve');

    return new Promise((resolve, reject) => {
      return this
        .post({})
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  rejectModeratedObject(id: number) {
    this._paths.push('moderated-objects', id.toString(), 'reject');

    return new Promise((resolve, reject) => {
      return this
        .post({})
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  updateModeratedObject(id: number, opts: IUpdateModeratedObject) {
    this._paths.push('moderated-objects', id.toString());

    return new Promise((resolve, reject) => {
      return this
        .post(opts)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}

export {
  ModerationAPI
};
