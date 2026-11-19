// ─── Strategy Pattern: SearchStrategy ────────────────────────────────────────
// PDF class diagram:
//   <<interface>> SearchStrategy
//     + search(query: String): List
//
//   TagSearch    implements SearchStrategy
//   AuthorSearch implements SearchStrategy
//   TextSearch   implements SearchStrategy
//
//   <<Abstract>> SearchService
//     - strategy: SearchStrategy
//     + set_strategy(s: SearchStrategy)
//     + search(query: String): List
//
//   LocalSearch extends SearchService  → searches local notes
//   BlogSearch  extends SearchService  → searches remote blog posts

// ── <<interface>> SearchStrategy ─────────────────────────────────────────────

export class SearchStrategy {
  /**
   * @param {string} query
   * @returns {any[]}
   */
  search(query) {
    throw new Error('search() must be implemented');
  }
}

// ── TagSearch ─────────────────────────────────────────────────────────────────

export class TagSearch extends SearchStrategy {
  /** @param {any[]} items */
  constructor(items) {
    super();
    this._items = items;
  }

  search(query) {
    const tags = query.split(',').map((t) => t.trim().toLowerCase());
    return this._items.filter((item) =>
      tags.some((tag) => item.tags?.map((t) => t.toLowerCase()).includes(tag)),
    );
  }
}

// ── AuthorSearch ──────────────────────────────────────────────────────────────

export class AuthorSearch extends SearchStrategy {
  /** @param {any[]} items */
  constructor(items) {
    super();
    this._items = items;
  }

  search(query) {
    const q = query.toLowerCase();
    return this._items.filter((item) =>
      item.author?.toLowerCase().includes(q) ||
      item.authorId?.toLowerCase().includes(q),
    );
  }
}

// ── TextSearch ────────────────────────────────────────────────────────────────

export class TextSearch extends SearchStrategy {
  /** @param {any[]} items */
  constructor(items) {
    super();
    this._items = items;
  }

  search(query) {
    const q = query.toLowerCase();
    return this._items.filter(
      (item) =>
        item.title?.toLowerCase().includes(q) ||
        item.content?.toLowerCase().includes(q),
    );
  }
}

// ── <<Abstract>> SearchService ────────────────────────────────────────────────

export class SearchService {
  constructor() {
    if (new.target === SearchService) throw new Error('SearchService is abstract');
    /** @type {SearchStrategy|null} */
    this.strategy = null;
  }

  /** @param {SearchStrategy} s */
  set_strategy(s) {
    this.strategy = s;
  }

  /**
   * @param {string} query
   * @returns {any[]}
   */
  search(query) {
    if (!this.strategy) throw new Error('No search strategy set');
    return this.strategy.search(query);
  }
}

// ── LocalSearch ───────────────────────────────────────────────────────────────

export class LocalSearch extends SearchService {
  /** @param {any[]} localNotes */
  constructor(localNotes) {
    super();
    this._notes = localNotes;
    this.strategy = new TextSearch(localNotes); // default strategy
  }

  search(query) {
    return this.strategy.search(query);
  }
}

// ── BlogSearch ────────────────────────────────────────────────────────────────

export class BlogSearch extends SearchService {
  /** @param {any[]} remoteNotes */
  constructor(remoteNotes) {
    super();
    this._posts = remoteNotes;
    this.strategy = new TextSearch(remoteNotes); // default strategy
  }

  search(query) {
    return this.strategy.search(query);
  }
}

// ── Usage example ─────────────────────────────────────────────────────────────
// const blogSearch = new BlogSearch(posts);
// blogSearch.set_strategy(new AuthorSearch(posts));  // swap strategy
// const results = blogSearch.search('toha');
