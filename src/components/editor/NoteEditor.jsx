import { useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { createEditorExtensions } from './editorExtensions.js';
import './NoteEditor.css';

const EMPTY_NOTE_TITLES = Object.freeze([]);

export default function NoteEditor({
  value = '',
  format = 'markdown',
  noteTitles = EMPTY_NOTE_TITLES,
  onChange,
}) {
  if (typeof onChange !== 'function') {
    throw new TypeError('NoteEditor requires an onChange handler.');
  }

  const extensions = useMemo(
    () => createEditorExtensions(format, noteTitles),
    [format, noteTitles],
  );

  return (
    <section className="note-editor">
      <label className="note-editor__label" htmlFor="note-content-editor">
        Note content
      </label>
      <CodeMirror
        id="note-content-editor"
        aria-label="Note content"
        className="note-editor__input"
        value={value}
        height="420px"
        placeholder="Write your note…"
        extensions={extensions}
        onChange={onChange}
      />
    </section>
  );
}
