// ─── Observer Pattern: Subject & Observer interfaces ──────────────────────────
// Defined in the PDF class diagram as <<interface>> Observer and <<interface>> Subject.
// SessionManager uses Subject to notify listeners when the current user changes.

// ── <<interface>> Observer ────────────────────────────────────────────────────

export class Observer {
  /** @param {Object} event */
  update(event) {
    throw new Error('update() must be implemented');
  }
}

// ── <<interface>> Subject ─────────────────────────────────────────────────────

export class Subject {
  constructor() {
    /** @type {Observer[]} */
    this._observers = [];
  }

  /** @param {Observer} observer */
  subscribe(observer) {
    this._observers.push(observer);
  }

  /** @param {Observer} observer */
  unsubscribe(observer) {
    this._observers = this._observers.filter((o) => o !== observer);
  }

  /** @param {Object} event */
  notify(event) {
    for (const o of this._observers) o.update(event);
  }
}
