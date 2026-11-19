/**
 * BlogService – remote CRUD for posts, comments, votes, follows, bookmarks.
 * Requires a live MySQL connection (see db/mysql.js).
 */

export const BlogService = {
  async listPosts(filters = {}) {
    // TODO: SELECT from MySQL blog_posts WHERE status = 'published' + apply filters
    // filters: { tag, authorId, search }
    return [];
  },

  async readPost(id) {
    // TODO: fetch post by id (only published, unless requesting own draft)
    return null;
  },

  async createPost(payload) {
    // TODO: insert into blog_posts with status = 'draft'
    throw new Error('Not implemented');
  },

  async updatePost(id, payload) {
    // TODO: UPDATE blog_posts
    throw new Error('Not implemented');
  },

  async deletePost(id) {
    // TODO: DELETE from blog_posts (moderator or owner only)
  },

  async publishPost(id) {
    // TODO: set status = 'published', published_at = now()
    throw new Error('Not implemented');
  },

  async votePost(id, direction) {
    // direction: 'up' | 'down' | 'none'
    // TODO: upsert into blog_votes
  },

  async listComments(postId) {
    // TODO: SELECT from blog_comments WHERE post_id = ?
    return [];
  },

  async createComment(payload) {
    // TODO: insert into blog_comments
    throw new Error('Not implemented');
  },

  async deleteComment(id) {
    // TODO: DELETE from blog_comments (moderator or owner only)
  },

  async toggleFollow(targetUserId) {
    // TODO: insert or delete from user_follows
  },

  async toggleBookmark(postId) {
    // TODO: insert or delete from blog_bookmarks
  },

  async getProfile(userId) {
    // TODO: fetch from blog_profiles JOIN users
    return null;
  },

  async updateProfile(payload) {
    // TODO: upsert into blog_profiles (theme, fontFamily, bio)
    throw new Error('Not implemented');
  },
};
