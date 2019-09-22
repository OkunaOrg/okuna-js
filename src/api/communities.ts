import { APIRequest } from "../utils/APIRequest";

import {
  RequestOpts,
  LimitationParamsWithAuthenticationCheck,
  LimitationParams
} from '../typings';

import { ICreatePost } from '../typings/api/posts';

import {
  ICreateCommunity,
  IUpdateCommunity,
  IGetMembersForCommunity,
  ISearchMembers,
  IGetJoinedCommunities,
  ISearchJoinedCommunities,
  IGetFavoriteCommunities,
  IGetAdministratedCommunities,
  IReportCommunity
} from '../typings/api/communities';

import { IGetGlobalModeratedObjects } from '../typings/api/moderation';
import { FileObject, IFileObjectOpts } from '../utils/FileObject';

class CommunitiesAPI extends APIRequest {
  constructor(opts: RequestOpts) {
    super(opts);
  }

  async checkNameIsAvailable(name: string) {
    this._paths.push('name-check');
    return this.post({ name });
  }

  async getTrendingCommunities(authenticatedRequest: boolean = true, category: string | null = null) {
    this._paths.push('trending');
    this.requiresToken = authenticatedRequest;
    
    if (category) {
      this._params.category = category;
    }

    return this.get();
  }

  async createPost(communityName: string, opts: ICreatePost) {
    this._paths.push(encodeURIComponent(communityName), 'posts');

    const payload: any = {};
    
    if (opts.image) {
      payload.image = new FileObject(opts.image);
    }

    if (opts.video) {
      payload.video = new FileObject(opts.video);
    }

    if (opts.isDraft !== undefined) {
      payload.is_draft = opts.isDraft;
    }

    if (opts.text) {
      payload.text = opts.text;
    }

    if (opts.circleIds && opts.circleIds.length) {
      payload.circle_id = opts.circleIds.join(',');
    }

    return this.putFormdata(payload);
  }

  async getPostsForCommunity(name: string, opts: LimitationParamsWithAuthenticationCheck) {
    this._paths.push(encodeURIComponent(name), 'posts');
    this.requiresToken = opts.authenticatedRequest || opts.authenticatedRequest === undefined;

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    return this.get();
  }

  async getClosedPostsForCommunity(name: string, opts: LimitationParamsWithAuthenticationCheck) {
    this._paths.push(encodeURIComponent(name), 'posts', 'closed');
    this.requiresToken = opts.authenticatedRequest || opts.authenticatedRequest === undefined;

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    return this.get();
  }

  async getCommunitiesWithQuery(query: string, authenticatedRequest: boolean = true) {
    this._paths.push('search');
    this._params.query = query;
    this.requiresToken = authenticatedRequest;

    return this.get();
  }

  async getCommunity(name: string, authenticatedRequest: boolean = true) {
    this._paths.push(encodeURIComponent(name));
    this.requiresToken = authenticatedRequest;

    return this.get();
  }

  async createCommunity(opts: ICreateCommunity) {
    const payload: any = {
      name: opts.name,
      title: opts.title,
      categories: opts.categories.join(','),
      type: opts.type
    };

    if (opts.avatar) {
      payload.avatar = new FileObject(opts.avatar);
    }

    if (opts.cover) {
      payload.cover = new FileObject(opts.cover);
    }

    if (opts.color) {
      payload.color = opts.color;
    }

    if (opts.rules) {
      payload.rules = opts.rules;
    }

    if (opts.description) {
      payload.description = opts.description;
    }

    if (opts.userAdjective) {
      payload.user_adjective = opts.userAdjective;
    }

    if (opts.usersAdjective) {
      payload.users_adjective = opts.usersAdjective;
    }

    if (opts.invitesEnabled !== undefined) {
      payload.invites_enabled = opts.invitesEnabled;
    }

    return this.putFormdata(payload);
  }

  async updateCommunity(name: string, opts: IUpdateCommunity) {
    this._paths.push(encodeURIComponent(name));

    const payload: any = {};

    if (opts.name) {
      payload.name = opts.name;
    }

    if (opts.title) {
      payload.title = opts.title;
    }

    if (opts.categories && opts.categories.length) {
      payload.categories = opts.categories.join(',');
    }

    if (opts.type) {
      payload.type = opts.type;
    }

    if (opts.color) {
      payload.color = opts.color;
    }

    if (opts.rules) {
      payload.rules = opts.rules;
    }

    if (opts.description) {
      payload.description = opts.description;
    }

    if (opts.userAdjective) {
      payload.user_adjective = opts.userAdjective;
    }

    if (opts.usersAdjective) {
      payload.users_adjective = opts.usersAdjective;
    }

    if (opts.invitesEnabled !== undefined) {
      payload.invites_enabled = opts.invitesEnabled;
    }

    return this.patchFormdata(payload);
  }

  async updateCommunityAvatar(name: string, avatar: IFileObjectOpts) {
    if (!avatar.name) {
      throw new Error('Invalid community avatar!');
    }

    this._paths.push(encodeURIComponent(name), 'avatar');

    return this.putFormdata({ avatar: new FileObject(avatar) });
  }

  async deleteCommunityAvatar(name: string) {
    this._paths.push(encodeURIComponent(name), 'avatar');
    return this.delete();
  }

  async updateCommunityCover(name: string, cover: IFileObjectOpts) {
    if (!cover.name) {
      throw new Error('Invalid community cover!');
    }

    this._paths.push(encodeURIComponent(name), 'cover');

    return this.putFormdata({ cover: new FileObject(cover) });
  }

  async deleteCommunityCover(name: string) {
    this._paths.push(encodeURIComponent(name), 'cover');
    return this.delete();
  }

  async deleteCommunity(name: string) {
    this._paths.push(encodeURIComponent(name));
    return this.delete();
  }

  async getMembersForCommunity(name: string, opts: IGetMembersForCommunity) {
    this._paths.push(encodeURIComponent(name), 'members');

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    if (opts.exclude && opts.exclude.length) {
      this._params.exclude = opts.exclude.join(',');
    }

    return this.get();
  }

  async searchMembers(name: string, opts: ISearchMembers) {
    this._paths.push(encodeURIComponent(name), 'members', 'search');

    this._params.query = opts.query;

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    if (opts.exclude && opts.exclude.length) {
      this._params.exclude = opts.exclude.join(',');
    }

    return this.get();
  }

  async inviteUserToCommunity(communityName: string, username: string) {
    this._paths.push(encodeURIComponent(communityName), 'invite');
    return this.post({ username });
  }

  async uninviteUserToCommunity(communityName: string, username: string) {
    this._paths.push(encodeURIComponent(communityName), 'uninvite');
    return this.post({ username });
  }

  async getJoinedCommunities(opts: IGetJoinedCommunities) {
    this._paths.push('joined');
    this.requiresToken = opts.authenticatedRequest || opts.authenticatedRequest === undefined;

    if (opts.offset !== undefined) {
      this._params.offset = opts.offset;
    }

    return this.get();
  }

  async searchJoinedCommunities(opts: ISearchJoinedCommunities) {
    this._paths.push('joined', 'search');
    this._params.query = opts.query;

    if (opts.count !== undefined) {
      this._params.offset = opts.count;
    }

    return this.get();
  }

  async joinCommunity(name: string) {
    this._paths.push(encodeURIComponent(name), 'members', 'join');
    return this.post({});
  }

  async leaveCommunity(name: string) {
    this._paths.push(encodeURIComponent(name), 'members', 'leave');
    return this.post({});
  }

  async getModeratorsForCommunity(name: string, opts: LimitationParams) {
    this._paths.push(encodeURIComponent(name), 'moderators');

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    return this.get();
  }

  async searchModerators(communityName: string, query: string) {
    this._paths.push(encodeURIComponent(communityName), 'moderators', 'search');
    this._params.query = query;
    return this.get();
  }

  async addCommunityModerator(communityName: string, username: string) {
    this._paths.push(encodeURIComponent(communityName), 'moderators');
    return this.put({ username });
  }

  async removeCommunityModerator(communityName: string, username: string) {
    this._paths.push(encodeURIComponent(communityName), 'moderators', encodeURIComponent(username));
    return this.delete();
  }

  async getAdministratorsForCommunity(name: string, opts: LimitationParams) {
    this._paths.push(encodeURIComponent(name), 'administrators');

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    return this.get();
  }

  async searchAdministrators(communityName: string, query: string) {
    this._paths.push(encodeURIComponent(communityName), 'administrators', 'search');
    this._params.query = query;
    return this.get();
  }

  async addCommunityAdministrator(communityName: string, username: string) {
    this._paths.push(encodeURIComponent(communityName), 'administrators');
    return this.put({ username });
  }

  async removeCommunityAdministrator(communityName: string, username: string) {
    this._paths.push(encodeURIComponent(communityName), 'administrators', encodeURIComponent(username));
    return this.delete();
  }

  async getBannedUsersForCommunity(name: string, opts: LimitationParams) {
    this._paths.push(encodeURIComponent(name), 'banned-users');

    if (opts.count !== undefined) {
      this._params.count = opts.count;
    }

    if (opts.maxId !== undefined) {
      this._params.max_id = opts.maxId;
    }

    return this.get();
  }

  async searchBannedUsers(communityName: string, query: string) {
    this._paths.push(encodeURIComponent(communityName), 'banned-users', 'search');
    this._params.query = query;
    return this.get();
  }

  async banCommunityUser(communityName: string, username: string) {
    this._paths.push(encodeURIComponent(communityName), 'banned-users', 'ban');
    return this.post({ username });
  }

  async unbanCommunityUser(communityName: string, username: string) {
    this._paths.push(encodeURIComponent(communityName), 'banned-users', 'unban');
    return this.post({ username });
  }

  async getFavoriteCommunities(opts: IGetFavoriteCommunities) {
    this._paths.push('favorites');
    this.requiresToken = opts.authenticatedRequest || opts.authenticatedRequest === undefined;
    
    if (opts.offset !== undefined) {
      this._params.offset = opts.offset;
    }

    return this.get();
  }

  async favoriteCommunity(communityName: string) {
    this._paths.push(encodeURIComponent(communityName), 'favorite');
    return this.put({});
  }

  async unfavoriteCommunity(communityName: string) {
    this._paths.push(encodeURIComponent(communityName), 'favorite');
    return this.delete();
  }

  async getAdministratedCommunities(opts: IGetAdministratedCommunities) {
    this._paths.push('administrated');
    this.requiresToken = opts.authenticatedRequest || opts.authenticatedRequest === undefined;

    if (opts.offset !== undefined) {
      this._params.offset = opts.offset;
    }

    return this.get();
  }

  async getModeratedCommunities(opts: IGetAdministratedCommunities) {
    this._paths.push('moderated');
    this.requiresToken = opts.authenticatedRequest || opts.authenticatedRequest === undefined;

    if (opts.offset !== undefined) {
      this._params.offset = opts.offset;
    }

    return this.get();
  }

  async reportCommunity(opts: IReportCommunity) {
    this._paths.push(encodeURIComponent(opts.communityName), 'report');

    const body: any = {
      category_id: opts.moderationCategoryId.toString()
    };

    if (opts.description) {
      body.description = opts.description;
    }

    return this.post(body);
  }

  async getModeratedObjects(communityName: string, opts: IGetGlobalModeratedObjects) {
    this._paths.push(encodeURIComponent(communityName), 'moderated-objects');

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
}

export {
  CommunitiesAPI
};
