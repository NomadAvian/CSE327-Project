// AuthService  registration, login, session management.

export const AuthService = {
  async register(username, email, password) {
    // TODO:
    // 1. Generate a unique salt (crypto.randomBytes)
    // 2. Hash password+salt with argon2/bcrypt
    // 3. Insert into MySQL users table
    throw new Error('Not implemented');
  },

  async login(email, password) {
    // TODO:
    // 1. Fetch user row (and stored salt+hash) by email
    // 2. Re-hash submitted password with stored salt and compare
    // 3. Create and return a signed session token
    throw new Error('Not implemented');
  },

  async logout(token) {
    // TODO: invalidate session token in DB / token store
  },

  async getSession(token) {
    // TODO: validate token, return session or null if expired
    return null;
  },
};
