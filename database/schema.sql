CREATE TABLE users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(80) NOT NULL UNIQUE,
  email VARCHAR(254) NOT NULL UNIQUE,
  password_salt BINARY(16) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('user', 'moderator') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notes (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  owner_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(255) NOT NULL DEFAULT 'Untitled',
  content MEDIUMTEXT NOT NULL,
  format ENUM('markdown', 'plaintext', 'html') NOT NULL DEFAULT 'markdown',
  tags JSON NOT NULL DEFAULT (JSON_ARRAY()),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  INDEX notes_owner_deleted (owner_id, deleted_at),
  CONSTRAINT notes_owner_fk FOREIGN KEY (owner_id) REFERENCES users(id)
);

CREATE TABLE note_links (
  source_note_id BIGINT UNSIGNED NOT NULL,
  target_note_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (source_note_id, target_note_id),
  CONSTRAINT note_links_source_fk FOREIGN KEY (source_note_id) REFERENCES notes(id) ON DELETE CASCADE,
  CONSTRAINT note_links_target_fk FOREIGN KEY (target_note_id) REFERENCES notes(id) ON DELETE CASCADE
);

CREATE TABLE blog_profiles (
  user_id BIGINT UNSIGNED NOT NULL PRIMARY KEY,
  bio TEXT NOT NULL,
  theme VARCHAR(40) NOT NULL DEFAULT 'light',
  font_family VARCHAR(80) NOT NULL DEFAULT 'system-ui',
  CONSTRAINT profiles_user_fk FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE blog_posts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  author_id BIGINT UNSIGNED NOT NULL,
  source_note_id BIGINT UNSIGNED NULL,
  title VARCHAR(255) NOT NULL,
  content MEDIUMTEXT NOT NULL,
  format ENUM('markdown', 'plaintext', 'html') NOT NULL DEFAULT 'markdown',
  tags JSON NOT NULL DEFAULT (JSON_ARRAY()),
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  published_at TIMESTAMP NULL,
  INDEX posts_status_published (status, published_at),
  INDEX posts_author (author_id),
  CONSTRAINT posts_author_fk FOREIGN KEY (author_id) REFERENCES users(id),
  CONSTRAINT posts_source_note_fk FOREIGN KEY (source_note_id) REFERENCES notes(id) ON DELETE SET NULL
);

CREATE TABLE comments (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  post_id BIGINT UNSIGNED NOT NULL,
  author_id BIGINT UNSIGNED NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX comments_post_created (post_id, created_at),
  CONSTRAINT comments_post_fk FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
  CONSTRAINT comments_author_fk FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE post_votes (
  post_id BIGINT UNSIGNED NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  direction TINYINT NOT NULL,
  PRIMARY KEY (post_id, user_id),
  CONSTRAINT votes_post_fk FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
  CONSTRAINT votes_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE follows (
  follower_id BIGINT UNSIGNED NOT NULL,
  author_id BIGINT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (follower_id, author_id),
  CONSTRAINT follows_follower_fk FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT follows_author_fk FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE bookmarks (
  user_id BIGINT UNSIGNED NOT NULL,
  post_id BIGINT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, post_id),
  CONSTRAINT bookmarks_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT bookmarks_post_fk FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
);

CREATE TABLE notifications (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  recipient_id BIGINT UNSIGNED NOT NULL,
  actor_id BIGINT UNSIGNED NOT NULL,
  post_id BIGINT UNSIGNED NOT NULL,
  type ENUM('post_published', 'post_updated') NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP NULL,
  INDEX notifications_recipient_unread (recipient_id, read_at, created_at),
  CONSTRAINT notifications_recipient_fk FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT notifications_actor_fk FOREIGN KEY (actor_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT notifications_post_fk FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
);
