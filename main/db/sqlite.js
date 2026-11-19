/**
 * SQLite database bootstrap.
 * Uses better-sqlite3 (synchronous) for local note storage.
 *
 * Install: npm install better-sqlite3
 */

// import Database from 'better-sqlite3';
// import path from 'node:path';
// import { app } from 'electron';

/** Opens (or creates) the SQLite database and runs migrations. */
export async function initDb() {
  // const dbPath = path.join(app.getPath('userData'), 'andesite.db');
  // const db = new Database(dbPath);
  // db.pragma('journal_mode = WAL');
  // runMigrations(db);
  console.log('[sqlite] initDb – stub, implement with better-sqlite3');
}

// function runMigrations(db) {
//   db.exec(`
//     CREATE TABLE IF NOT EXISTS notes (
//       id         TEXT PRIMARY KEY,
//       title      TEXT NOT NULL,
//       content    TEXT NOT NULL DEFAULT '',
//       format     TEXT NOT NULL DEFAULT 'markdown',
//       file_path  TEXT NOT NULL,
//       created_at TEXT NOT NULL,
//       updated_at TEXT NOT NULL,
//       deleted_at TEXT
//     );
//
//     CREATE TABLE IF NOT EXISTS note_links (
//       source_id TEXT NOT NULL,
//       target_id TEXT NOT NULL,
//       PRIMARY KEY (source_id, target_id)
//     );
//   `);
// }
