import { IPC } from '../../shared/constants/ipc-channels.js';

/** Register all blog-related IPC handlers. */
export function registerBlogHandlers(ipcMain) {
  ipcMain.handle(IPC.BLOG_LIST, async (_e, filters) => {
    // TODO: BlogService.listPosts(filters)
    return [];
  });

  ipcMain.handle(IPC.BLOG_READ, async (_e, id) => {
    // TODO: BlogService.readPost(id)
    return null;
  });

  ipcMain.handle(IPC.BLOG_CREATE, async (_e, payload) => {
    // TODO: BlogService.createPost(payload)
    return null;
  });

  ipcMain.handle(IPC.BLOG_UPDATE, async (_e, id, payload) => {
    // TODO: BlogService.updatePost(id, payload)
    return null;
  });

  ipcMain.handle(IPC.BLOG_DELETE, async (_e, id) => {
    // TODO: BlogService.deletePost(id)
  });

  ipcMain.handle(IPC.BLOG_PUBLISH, async (_e, id) => {
    // TODO: BlogService.publishPost(id) → status: 'published', publishedAt: Date.now()
  });

  ipcMain.handle(IPC.BLOG_VOTE, async (_e, id, dir) => {
    // TODO: BlogService.votePost(id, dir)
  });

  ipcMain.handle(IPC.BLOG_COMMENT_LIST, async (_e, postId) => {
    // TODO: BlogService.listComments(postId)
    return [];
  });

  ipcMain.handle(IPC.BLOG_COMMENT_CREATE, async (_e, payload) => {
    // TODO: BlogService.createComment(payload)
    return null;
  });

  ipcMain.handle(IPC.BLOG_COMMENT_DELETE, async (_e, id) => {
    // TODO: BlogService.deleteComment(id)
  });

  ipcMain.handle(IPC.BLOG_FOLLOW, async (_e, userId) => {
    // TODO: BlogService.toggleFollow(userId)
  });

  ipcMain.handle(IPC.BLOG_BOOKMARK, async (_e, postId) => {
    // TODO: BlogService.toggleBookmark(postId)
  });

  ipcMain.handle(IPC.BLOG_PROFILE_READ, async (_e, userId) => {
    // TODO: BlogService.getProfile(userId)
    return null;
  });

  ipcMain.handle(IPC.BLOG_PROFILE_UPDATE, async (_e, payload) => {
    // TODO: BlogService.updateProfile(payload)
    return null;
  });
}
