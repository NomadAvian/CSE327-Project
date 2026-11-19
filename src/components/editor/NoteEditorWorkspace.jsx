import NoteEditor from './NoteEditor.jsx';
import NotePreview from './NotePreview.jsx';
import './NoteEditorWorkspace.css';

export default function NoteEditorWorkspace({ note, noteTitles = [], onContentChange }) {
  if (!note || typeof onContentChange !== 'function') {
    throw new TypeError('NoteEditorWorkspace requires a note and change handler.');
  }

  return (
    <div className="note-editor-workspace">
      <NoteEditor
        value={note.content}
        format={note.format}
        noteTitles={noteTitles}
        onChange={onContentChange}
      />
      <section className="note-editor-workspace__preview" aria-labelledby="note-preview-title">
        <h2 id="note-preview-title">Preview</h2>
        <NotePreview content={note.content} format={note.format} />
      </section>
    </div>
  );
}
