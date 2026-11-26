import { useState, useCallback, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

const MODES = [
  { id: "editor", label: "Editor" },
  { id: "split", label: "Split" },
  { id: "preview", label: "Preview" },
];

export default function CodeEditor() {
  const [code, setCode] = useState("# New Note");
  const [mode, setMode] = useState("split");

  const handleChange = useCallback((value) => setCode(value), []);

  const renderedMarkdown = useMemo(() => md.render(code), [code]);

  const showEditor = mode === "editor" || mode === "split";
  const showPreview = mode === "preview" || mode === "split";

  return (
    <div className="editor-container">
      <div className="toolbar" role="group" aria-label="View mode">
        {MODES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={mode === id ? "active" : ""}
            aria-pressed={mode === id}
            onClick={() => setMode(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="editor-layout">
        {showEditor && (
          <div className="editor-pane">
            <CodeMirror
              className="editor-cm"
              value={code}
              height="100%"
              width="100%"
              theme="dark"
              extensions={[markdown()]}
              onChange={handleChange}
            />
          </div>
        )}

        {showPreview && (
          <div
            className="preview-pane"
            dangerouslySetInnerHTML={{ __html: renderedMarkdown }}
          />
        )}
      </div>
    </div>
  );
}
