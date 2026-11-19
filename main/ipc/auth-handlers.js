import { IPC } from '../../shared/constants/ipc-channels.js';

/**
 * Register auth IPC handlers.
 * Passwords must be salted and hashed server-side; never store plaintext.
 */
export function registerAuthHandlers(ipcMain) {
  ipcMain.handle(IPC.AUTH_REGISTER, async (_e, payload) => {
    // TODO: generate salt, hash password, persist user via AuthService
    return null;
  });

  ipcMain.handle(IPC.AUTH_LOGIN, async (_e, payload) => {
    // TODO: verify credentials, return AuthSession token
    return null;
  });

  ipcMain.handle(IPC.AUTH_LOGOUT, async () => {
    // TODO: invalidate session
  });

  ipcMain.handle(IPC.AUTH_SESSION, async () => {
    // TODO: return current AuthSession or null
    return null;
  });
}
