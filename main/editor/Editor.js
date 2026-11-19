// ─── Decorator Pattern: Editor ────────────────────────────────────────────────
// PDF class diagram:
//   <<interface>> Editor
//     + open(note: LocalNote)
//     + edit(content: String)
//
//   BaseEditor  (implements Editor)
//     - strategy: RenderStrategy
//     - handler:  NoteHandler (FileHandler in diagram)
//     + open(note), edit(content), preview(): String, raw(): String
//
//   EditorDecorator  (wraps Editor)
//     # wrapped: Editor
//     + open(note), edit(content)
//
//   SyntaxHighlightDecorator  extends EditorDecorator  → adds syntax highlighting
//   LivePreviewDecorator      extends EditorDecorator  → adds live preview
//   LinkAutocompleteDecorator extends EditorDecorator  → adds autocomplete suggestions
//
// Sequence diagram shows the wrapping order:
//   new BaseEditor(note)
//   wrap(syntaxHighlightDecorator)
//   wrap(livePreviewDecorator)
//   wrap(linkAutocompleteDecorator)

import { MarkdownRenderer } from '../renderer/RenderStrategy.js';
import { FileHandler } from './FileHandler.js';

// ── <<interface>> Editor ──────────────────────────────────────────────────────

export class Editor {
  /** @param {Object} note */
  open(note)         { throw new Error('Not implemented'); }
  /** @param {string} content */
  edit(content)      { throw new Error('Not implemented'); }
}

// ── BaseEditor ────────────────────────────────────────────────────────────────

export class BaseEditor extends Editor {
  /**
   * @param {import('../renderer/RenderStrategy.js').RenderStrategy} [strategy]
   * @param {FileHandler} [handler]
   */
  constructor(strategy = new MarkdownRenderer(), handler = null) {
    super();
    this.strategy = strategy;
    this.handler  = handler;
    this._note    = null;
    this._content = '';
  }

  open(note) {
    this._note    = note;
    this._content = note.content ?? '';
    // TODO: this.handler.loadpath(note.filePath).then(c => this._content = c)
  }

  edit(content) {
    this._content = content;
    // TODO: trigger autosave via handler.savepath(note.filePath, content)
  }

  /** @returns {string} Rendered HTML */
  preview() {
    return this.strategy.render(this._content);
  }

  /** @returns {string} Raw content */
  raw() {
    return this._content;
  }
}

// ── EditorDecorator ───────────────────────────────────────────────────────────

export class EditorDecorator extends Editor {
  /** @param {Editor} wrapped */
  constructor(wrapped) {
    super();
    this.wrapped = wrapped;
  }

  open(note)    { this.wrapped.open(note); }
  edit(content) { this.wrapped.edit(content); }
}

// ── SyntaxHighlightDecorator ──────────────────────────────────────────────────

export class SyntaxHighlightDecorator extends EditorDecorator {
  open(note) {
    super.open(note);
    // TODO: apply CodeMirror syntax highlighting extensions
  }

  edit(content) {
    super.edit(content);
    // TODO: re-run syntax highlight pass
  }

  extra() {
    // Returns syntax-highlighted version of raw content
    // TODO: return highlighter.highlight(this.wrapped.raw())
    return '';
  }
}

// ── LivePreviewDecorator ──────────────────────────────────────────────────────

export class LivePreviewDecorator extends EditorDecorator {
  open(note) {
    super.open(note);
    // TODO: mount preview panel, subscribe to edit events
  }

  edit(content) {
    super.edit(content);
    // TODO: re-render preview panel after each edit
  }

  extra() {
    // Returns rendered HTML for the live preview pane
    return this.wrapped.preview ? this.wrapped.preview() : '';
  }
}

// ── LinkAutocompleteDecorator ─────────────────────────────────────────────────

export class LinkAutocompleteDecorator extends EditorDecorator {
  open(note) {
    super.open(note);
    // TODO: pre-load note titles for autocomplete index
  }

  edit(content) {
    super.edit(content);
    // TODO: detect [[ trigger and show autocomplete suggestions
  }

  extra() {
    // Returns list of autocomplete suggestions for current cursor position
    // TODO: return autocompleteIndex.suggest(currentToken)
    return [];
  }
}

// ── Factory helper: build the full decorated editor stack ─────────────────────
// Matches the sequence diagram: BaseEditor → Syntax → LivePreview → LinkAutocomplete

/**
 * @param {Object} note
 * @param {import('../renderer/RenderStrategy.js').RenderStrategy} strategy
 * @param {FileHandler} handler
 * @returns {Editor}
 */
export function createDecoratedEditor(note, strategy, handler) {
  let editor = new BaseEditor(strategy, handler);
  editor.open(note);
  editor = new SyntaxHighlightDecorator(editor);
  editor = new LivePreviewDecorator(editor);
  editor = new LinkAutocompleteDecorator(editor);
  return editor;
}
