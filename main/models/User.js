// ─── Abstract User classes (from PDF class diagram) ───────────────────────────
// <<Abstract>> User → BasicUser, Moderator

export class User {
  /**
   * @param {string} id
   * @param {string} username
   * @param {string} email
   * @param {string} password_hash
   * @param {string} created_at
   */
  constructor(id, username, email, password_hash, created_at) {
    if (new.target === User) throw new Error('User is abstract');
    this.id            = id;
    this.username      = username;
    this.email         = email;
    this.password_hash = password_hash;
    this.created_at    = created_at;
    // from diagram: blog: Blog, note_service: NoteService, post_service: PostService
    // following: List<User>, bookmarks: List<RemoteNote>
    this.following  = [];
    this.bookmarks  = [];
  }

  delete_account()                             { throw new Error('Not implemented'); }
  /** @param {Object} note */ add_page(note)   { throw new Error('Not implemented'); }
  /** @param {Object} note */ remove_page(note){ throw new Error('Not implemented'); }
  /** @param {Object} note */ edit_page(note)  { throw new Error('Not implemented'); }
  notify_post()                                { throw new Error('Not implemented'); }
  /** @param {Object} note */ bookmark(note)   { throw new Error('Not implemented'); }
  /** @param {Object} user */ follow(user)     { throw new Error('Not implemented'); }
  /**
   * @param {Object} note
   * @param {string[]} values
   * @param {string} body
   */
  comment(note, values, body)                  { throw new Error('Not implemented'); }
}

// ── BasicUser ─────────────────────────────────────────────────────────────────

export class BasicUser extends User {
  /**
   * @param {string} item - local note or blog post to save/open
   */
  save(item) {
    // TODO: delegate to NoteService or PostService
  }
}

// ── Moderator ─────────────────────────────────────────────────────────────────

export class Moderator extends User {
  /** @param {Object} comment */
  remove_comment(comment) {
    // TODO: call API to delete comment
  }

  /** @param {Object} note */
  remove_page(note) {
    // TODO: moderator-level page removal
  }

  /** @param {Object} user */
  ban_user(user) {
    // TODO: flag user as banned in DB
  }

  /** @param {Object} user */
  unban_user(user) {
    // TODO: clear ban flag
  }
}
