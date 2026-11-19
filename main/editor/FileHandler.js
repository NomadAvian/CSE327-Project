// ─── FileHandler (used by BaseEditor) ─────────────────────────────────────────
// PDF class diagram: FileHandler
//   - vaultPath: String
//   + loadpath(path: String)
//   + savepath(String, content: String)

import fs from 'node:fs/promises';
import path from 'node:path';

export class FileHandler {
  /** @param {string} vaultPath */
  constructor(vaultPath) {
    this.vaultPath = vaultPath;
  }

  /**
   * Load a note's raw content from disk.
   * @param {string} filePath
   * @returns {Promise<string>}
   */
  async loadpath(filePath) {
    const abs = path.isAbsolute(filePath)
      ? filePath
      : path.join(this.vaultPath, filePath);
    return fs.readFile(abs, 'utf8');
  }

  /**
   * Save content to disk at the given path.
   * @param {string} filePath
   * @param {string} content
   */
  async savepath(filePath, content) {
    const abs = path.isAbsolute(filePath)
      ? filePath
      : path.join(this.vaultPath, filePath);
    await fs.mkdir(path.dirname(abs), { recursive: true });
    await fs.writeFile(abs, content, 'utf8');
  }
}
