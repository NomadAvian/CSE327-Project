import { useMemo, useState } from 'react';
import { searchPosts } from './SearchStrategy.js';
import './BlogFeedPage.css';

export default function BlogFeedPage({ posts, onSelectPost }) {
  if (!Array.isArray(posts) || typeof onSelectPost !== 'function') {
    throw new TypeError('BlogFeedPage requires posts and an onSelectPost handler.');
  }

  const [query, setQuery] = useState('');
  const [strategy, setStrategy] = useState('text');
  const visiblePosts = useMemo(
    () => searchPosts(posts, query, strategy),
    [posts, query, strategy],
  );

  return (
    <section className="blog-feed" aria-labelledby="blog-feed-title">
      <header className="blog-feed__header">
        <div>
          <p className="blog-feed__eyebrow">Andesite</p>
          <h1 id="blog-feed-title">Published posts</h1>
        </div>
        <div className="blog-feed__search" role="search" aria-label="Search posts">
          <label>
            <span>Search by</span>
            <select value={strategy} onChange={(event) => setStrategy(event.target.value)}>
              <option value="text">Text</option>
              <option value="tag">Tag</option>
              <option value="author">Author</option>
            </select>
          </label>
          <label>
            <span>Query</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search published posts"
            />
          </label>
        </div>
      </header>

      {visiblePosts.length === 0 ? (
        <p className="blog-feed__empty">No published posts match this search.</p>
      ) : (
        <ul className="blog-feed__list">
          {visiblePosts.map((post) => (
            <li key={post.id}>
              <button
                className="blog-feed__post"
                type="button"
                onClick={() => onSelectPost(post.id)}
              >
                <span className="blog-feed__post-title">{post.title}</span>
                <span className="blog-feed__post-meta">
                  {post.author_name ?? post.author ?? 'Author'}
                  {post.published_at
                    ? ` · ${new Date(post.published_at).toLocaleDateString()}`
                    : ''}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
