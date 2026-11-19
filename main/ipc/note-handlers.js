import { IPC } from '../../shared/constants/ipc-channels.js';

/** Register all note-related IPC handlers. */
export function registerNoteHandlers(ipcMain) {
  ipcMain.handle(IPC.NOTES_LIST, async () => {
    // TODO: return NoteService.listNotes()
    return [];
  });

  ipcMain.handle(IPC.NOTES_READ, async (_e, id) => {
    // TODO: return NoteService.readNote(id)
    return null;
  });

  ipcMain.handle(IPC.NOTES_CREATE, async (_e, payload) => {
    // TODO: return NoteService.createNote(payload)
    return null;
  });

  ipcMain.handle(IPC.NOTES_UPDATE, async (_e, id, payload) => {
    // TODO: return NoteService.updateNote(id, payload)
    return null;
  });

  ipcMain.handle(IPC.NOTES_RENAME, async (_e, id, title) => {
    // TODO: return NoteService.renameNote(id, title)
    // Remember to update all backlinks in other notes.
    return null;
  });

  ipcMain.handle(IPC.NOTES_DELETE, async (_e, id) => {
    // TODO: NoteService.softDeleteNote(id) → moves to Recently Deleted
  });

  ipcMain.handle(IPC.NOTES_RESTORE, async (_e, id) => {
    // TODO: NoteService.restoreNote(id)
  });

  ipcMain.handle(IPC.NOTES_PURGE, async (_e, id) => {
    // TODO: NoteService.purgeNote(id) → permanent delete
  });

  ipcMain.handle(IPC.NOTES_DELETED_LIST, async () => {
    // TODO: return NoteService.listDeletedNotes()
    return [];
  });
}
