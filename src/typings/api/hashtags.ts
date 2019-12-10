/**
 * Parameters for hashtags().reportHashtagByName()
 * @typedef {IReportHashtagOpts}
 * @param {string} hashtagName - the name of the hashtag to report
 * @param {number} moderationCategoryId - the ID of the report moderation category
 * @param {string} description - an optional description of the hashtag report
 */
export interface IReportHashtagOpts {
  hashtagName: string;
  moderationCategoryId: number;
  description?: string;
}
