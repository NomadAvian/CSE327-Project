import { autocompletion } from '@codemirror/autocomplete';
import { html } from '@codemirror/lang-html';
import { markdown } from '@codemirror/lang-markdown';

const supportedFormats = new Set(['markdown', 'plaintext', 'html']);

function noteLinkSource(noteTitles) {
  return (context) => {
    const match = context.matchBefore(/\[\[[^\]\n]*/);

    if (!match) return null;

    return {
      from: match.from + 2,
      validFor: /^[^\]]*$/,
      options: noteTitles.map((title) => ({
        label: title,
        type: 'text',
        apply(view, completion, from, to) {
          const insertion = `${completion.label}]]`;
          view.dispatch({
            changes: { from, to, insert: insertion },
            selection: { anchor: from + insertion.length },
          });
        },
      })),
    };
  };
}

export function createEditorExtensions(format, noteTitles = []) {
  if (!supportedFormats.has(format)) {
    throw new Error(`Unsupported note format: ${format}`);
  }

  const extensions = [];

  if (format === 'markdown') extensions.push(markdown());
  if (format === 'html') extensions.push(html());
  if (noteTitles.length > 0) {
    extensions.push(autocompletion({ override: [noteLinkSource(noteTitles)] }));
  }

  return extensions;
}
