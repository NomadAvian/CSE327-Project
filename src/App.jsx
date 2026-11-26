import CodeEditor from "./components/editor/editor";

export default function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Andesite">
        <a className="brand" href="/">Andesite</a>
        <p className="sidebar-caption">Knowledge base and blog</p>
      </aside>

      <main className="workspace" aria-label="Workspace">
        <CodeEditor />
      </main>
    </div>
  );
}
