// ─── Singleton Pattern: SessionManager ───────────────────────────────────────
// PDF class diagram: <<Singleton>> SessionManager
//   - _instance: SessionManager
//   - currentUser: User
//   + getInstance(): SessionManager
//   + get_instance_SessionManager()     (alias shown in diagram)
//   + login()
//   + logout()
//   + get_current_user(): User

import { Subject } from './Observer.js';

export class SessionManager extends Subject {
  static _instance = null;

  /** @returns {SessionManager} */
  static getInstance() {
    if (!SessionManager._instance) {
      SessionManager._instance = new SessionManager();
    }
    return SessionManager._instance;
  }

  constructor() {
    super();
    /** @type {Object|null} */
    this.currentUser = null;
  }

  /**
   * @param {Object} user
   */
  login(user) {
    this.currentUser = user;
    this.notify({ type: 'LOGIN', user });
  }

  logout() {
    const user = this.currentUser;
    this.currentUser = null;
    this.notify({ type: 'LOGOUT', user });
  }

  /** @returns {Object|null} */
  get_current_user() {
    return this.currentUser;
  }
}
