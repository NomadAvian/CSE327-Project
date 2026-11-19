/**
 * NoteService – local file + SQLite operations.
 * All methods work offline.
 */

export const NoteService = {
  async listNotes() {
    // TODO: query SQLite for all notes where deleted_at IS NULL
    return [];
  },

  async readNote(id) {
    // TODO: fetch from SQLite, read file content from disk
    return null;
  },

  async createNote(payload) {
    // TODO: generate id, write file, insert row
    throw new Error('Not implemented');
  },

  async updateNote(id, payload) {
    // TODO: write file, update row; triggers autosave path
    throw new Error('Not implemented');
  },

  async renameNote(id, title) {
    // TODO: rename file on disk, update row, update all backlinks
    throw new Error('Not implemented');
  },

  async softDeleteNote(id) {
    // TODO: set deleted_at = now() in SQLite (Recently Deleted)
  },

  async restoreNote(id) {
    // TODO: clear deleted_at
  },

  async purgeNote(id) {
    // TODO: delete file from disk, delete row
  },

  async listDeletedNotes() {
    // TODO: query SQLite for notes where deleted_at IS NOT NULL
    return [];
  },
};
