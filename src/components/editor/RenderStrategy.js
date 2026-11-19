import DOMPurify from 'dompurify';
import MarkdownIt from 'markdown-it';

const markdown = new MarkdownIt({ html: false, linkify: true });
const htmlOnly = { USE_PROFILES: { html: true } };

export class RenderStrategy {
  render() {
    throw new Error('RenderStrategy.render must be implemented.');
  }
}

export class MarkdownRenderer extends RenderStrategy {
  render(content) {
    return DOMPurify.sanitize(markdown.render(content), htmlOnly);
  }
}

export class PlainTextRenderer extends RenderStrategy {
  render(content) {
    return content;
  }
}

export class HtmlRenderer extends RenderStrategy {
  render(content) {
    return DOMPurify.sanitize(content, htmlOnly);
  }
}

const renderers = Object.freeze({
  markdown: new MarkdownRenderer(),
  plaintext: new PlainTextRenderer(),
  html: new HtmlRenderer(),
});

export function renderNote(content, format) {
  const renderer = renderers[format];

  if (!renderer) {
    throw new Error(`Unsupported note format: ${format}`);
  }

  return renderer.render(content);
}
