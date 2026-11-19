// ─── Strategy Pattern: RenderStrategy ────────────────────────────────────────
// PDF class diagram: <<interface>> RenderStrategy → MarkdownRenderer, PlainTextRenderer, HtmlRenderer
// BaseEditor holds a strategy: RenderStrategy

// ── <<interface>> RenderStrategy ─────────────────────────────────────────────

export class RenderStrategy {
  /** @param {string} content @returns {string} */
  render(content) {
    throw new Error('render() must be implemented');
  }
}

// ── MarkdownRenderer ──────────────────────────────────────────────────────────

export class MarkdownRenderer extends RenderStrategy {
  render(content) {
    // TODO: const md = new MarkdownIt(); return md.render(content);
    return `<markdown-rendered>${content}</markdown-rendered>`;
  }
}

// ── PlainTextRenderer ─────────────────────────────────────────────────────────

export class PlainTextRenderer extends RenderStrategy {
  render(content) {
    // Wrap in <pre> so whitespace is preserved
    return `<pre>${content}</pre>`;
  }
}

// ── HtmlRenderer ──────────────────────────────────────────────────────────────

export class HtmlRenderer extends RenderStrategy {
  render(content) {
    // Raw HTML passthrough (trust level handled upstream)
    return content;
  }
}
