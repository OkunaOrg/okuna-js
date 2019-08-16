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

    return this.get();
  }

  getModeratedObjectLogs(opts: IModeratedObject) {
    this._paths.push('moderated-objects', encodeURIComponent(opts.id), 'logs');

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    return this.get();
  }

  getModeratedObjectReports(opts: IModeratedObject) {
    this._paths.push('moderated-objects', encodeURIComponent(opts.id), 'reports');

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    return this.get();
  }

  getModerationCategories() {
    this._paths.push('categories');

    return this.get();
  }

  getUserModerationPenalties(opts: LimitationParams) {
    this._paths.push('user', 'penalties');

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    return this.get();
  }

  getUserPendingModeratedObjectsCommunities(opts: LimitationParams) {
    this._paths.push('user', 'pending-moderated-objects-communities');

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    return this.get();
  }

  verifyModeratedObject(id: number) {
    this._paths.push('moderated-objects', id.toString(), 'verify');

    return this.post({});
  }

  unverifyModeratedObject(id: number) {
    this._paths.push('moderated-objects', id.toString(), 'unverify');

    return this.post({});
  }

  approveModeratedObject(id: number) {
    this._paths.push('moderated-objects', id.toString(), 'approve');

    return this.post({});
  }

  rejectModeratedObject(id: number) {
    this._paths.push('moderated-objects', id.toString(), 'reject');

    return this.post({});
  }

  updateModeratedObject(id: number, opts: IUpdateModeratedObject) {
    this._paths.push('moderated-objects', id.toString());

    return this.post(opts);
  }
}

export {
  ModerationAPI
};
