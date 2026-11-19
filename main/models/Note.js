// ─── Abstract Note classes (from PDF class diagram) ───────────────────────────
// <<Abstract>> Note → LocalNote, RemoteNote
// Blog holds a list of RemoteNote entries.

// ── <<Abstract>> Note ─────────────────────────────────────────────────────────

export class Note {
  /**
   * @param {string} id
   * @param {string} content
   * @param {string} title
   * @param {string} type   - 'markdown' | 'plaintext' | 'html'
   * @param {string[]} tags
   * @param {Date}   created_at
   */
  constructor(id, content, title, type, tags, created_at) {
    if (new.target === Note) throw new Error('Note is abstract');
    this.id         = id;
    this.content    = content;
    this.title      = title;
    this.type       = type;
    this.tags       = tags;
    this.created_at = created_at;
  }

  /**
   * @param {string} from
   * @param {string} to
   */
  update_links(from, to) { throw new Error('Not implemented'); }

  update_tags()          { throw new Error('Not implemented'); }

  /** @param {string} content */
  edit(content)          { throw new Error('Not implemented'); }
}

// ── LocalNote ─────────────────────────────────────────────────────────────────

export class LocalNote extends Note {
  /**
   * @param {string} from
   * @param {string} to
   */
  update_links(from, to) {
    // TODO: scan content, replace [[from]] links with [[to]]
    this.content = this.content.replaceAll(`[[${from}]]`, `[[${to}]]`);
  }

  edit(content) {
    this.content    = content;
    // TODO: persist via FileHandler
  }
}

// ── RemoteNote ────────────────────────────────────────────────────────────────

export class RemoteNote extends Note {
  /**
   * @param {string} id
   * @param {string} content
   * @param {string} title
   * @param {string} type
   * @param {string[]} tags
   * @param {Date} created_at
   * @param {Date} published_at
   * @param {Date} updated_at
   * @param {Object[]} comments
   * @param {number} upvotes
   * @param {string[]} downvote_list
   */
  constructor(id, content, title, type, tags, created_at, published_at, updated_at, comments, upvotes, downvote_list) {
    super(id, content, title, type, tags, created_at);
    this.published_at  = published_at;
    this.updated_at    = updated_at;
    this.comments      = comments ?? [];
    this.upvotes       = upvotes  ?? 0;
    this.downvote_list = downvote_list ?? [];
  }

  /**
   * @param {string} from
   * @param {string} to
   */
  update_links(from, to) {
    // TODO: update links via API (remote note)
  }

  edit(content) {
    this.content    = content;
    this.updated_at = new Date();
    // TODO: persist via API PUT /notes/{id}
  }
}

// ── Blog ──────────────────────────────────────────────────────────────────────
// PDF diagram: Blog has entries: List<RemoteNote>, style: CSS File
//   + edit_entry(note), + remove_entry(note), + edit_theme()

export class Blog {
  constructor() {
    /** @type {RemoteNote[]} */
    this.entries = [];
    this.style   = null; // CSS file reference
  }

  /** @param {RemoteNote} note */
  edit_entry(note) {
    const idx = this.entries.findIndex((e) => e.id === note.id);
    if (idx !== -1) this.entries[idx] = note;
  }

  /** @param {RemoteNote} note */
  remove_entry(note) {
    this.entries = this.entries.filter((e) => e.id !== note.id);
  }

  edit_theme() {
    // TODO: apply new CSS theme to blog
  }
}
