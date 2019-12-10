import { LimitationParams } from '../';
import { IFileObjectOpts } from '../../utils/FileObject';

/**
 * Parameters for communities().createCommunity()
 * @typedef {object} ICreateCommunity
 * @property {string} name - the name (i.e. slug/ID) of the community
 * @property {string} title - the title of the community
 * @property {string[]} categories - an array of categories the community belongs to
 * @property {string} type - the type of the community
 * @property {boolean} invitesEnabled - whether community invites can be created
 * @property {string} color - the theme color of the community
 * @property {string} userAdjective - the adjective to be used for "user" (singular), e.g.: "geek"
 * @property {string} usersAdjective - the adjective to be used for "users" (plural), e.g.: "geeks"
 * @property {string} description - the description of the group
 * @property {string} rules - the rules of the group
 * @property {IFileObjectOpts} cover - the cover photo of the group
 * @property {IFileObjectOpts} avatar - the avatar picture of the group
 */
export interface ICreateCommunity {
  name: string;
  title: string;
  categories: string[];
  type: string;
  invitesEnabled?: boolean;
  color?: string;
  userAdjective?: string;
  usersAdjective?: string;
  description?: string;
  rules?: string;
  cover?: IFileObjectOpts;
  avatar?: IFileObjectOpts;
}

/**
 * Parameters for communities().updateCommunity()
 * @typedef {object} IUpdateCommunity
 * @property {string} name - the name (i.e. slug/ID) of the community
 * @property {string} title - the title of the community
 * @property {string[]} categories - an array of categories the community belongs to
 * @property {string} type - the type of the community
 * @property {boolean} invitesEnabled - whether community invites can be created
 * @property {string} color - the theme color of the community
 * @property {string} userAdjective - the adjective to be used for "user" (singular), e.g.: "geek"
 * @property {string} usersAdjective - the adjective to be used for "users" (plural), e.g.: "geeks"
 * @property {string} description - the description of the group
 * @property {string} rules - the rules of the group
 */
export interface IUpdateCommunity {
  name?: string;
  title?: string;
  categories?: string[];
  type?: string;
  invitesEnabled?: boolean;
  color?: string;
  userAdjective?: string;
  usersAdjective?: string;
  description?: string;
  rules?: string;
}

/**
 * Parameters for communities().getMembersForCommunity()
 * @typedef {object} IGetMembersForCommunity
 * @extends LimitationParams
 * @property {string[]} exclude - a list of members to exclude
 */
export interface IGetMembersForCommunity extends LimitationParams {
  exclude?: string[];
}

/**
 * Parameters for communities().searchMembers()
 * @typedef {object} ISearchMembers
 * @extends IGetMembersForCommunity
 * @property {string} query - the search query
 */
export interface ISearchMembers extends IGetMembersForCommunity {
  query: string;
}

/**
 * Parameters for communities().getJoinedCommunities()
 * @typedef {object} IGetJoinedCommunities
 * @property {boolean} authenticatedRequest - whether the request is authenticated
 * @property {number} offset - query offset
 */
export interface IGetJoinedCommunities {
  authenticatedRequest?: boolean;
  offset?: number;
}

/**
 * Parameters for search functions
 * @typedef {object} ISearchCommunityOpts
 * @property {string} query - the search query
 * @property {number} count - max number of results
 */
export interface ISearchCommunityOpts {
  query: string;
  count?: number;
}

/**
 * Parameters for communities().getFavoriteCommunities()
 * @typedef {object} IGetFavoriteCommunities
 * @property {boolean} authenticatedRequest - whether the request is authenticated
 * @property {number} offset - query offset
 */
export interface IGetFavoriteCommunities {
  authenticatedRequest?: boolean;
  offset?: number;
}

/**
 * Parameters for communities().getAdministratedCommunities()
 * and communities().getModeratedCommunities()
 * @typedef {object} IGetAdministratedCommunities
 * @property {boolean} authenticatedRequest - whether the request is authenticated
 * @property {number} offset - query offset
 */
export interface IGetAdministratedCommunities {
  authenticatedRequest?: boolean;
  offset?: number;
}

/**
 * Parameters for communities().reportCommunity()
 * @typedef {object} IReportCommunity
 * @property {string} communityName - name of the reported community
 * @property {number} moderationCategoryId - category id of the report
 * @property {string} description - an optional description of the report
 */
export interface IReportCommunity {
  communityName: string;
  moderationCategoryId: number;
  description?: string;
}

/**
 * Parameters for GET communities().getExcludedCommunities()
 * @typedef {object} IGetExcludedCommunitiesOpts
 * @extends {IGetFavoriteCommunities}
 * @property {number} count
 */
export interface IGetExcludedCommunitiesOpts extends IGetFavoriteCommunities {
  count?: number;
}
