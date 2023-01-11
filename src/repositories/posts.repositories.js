import connection from "../db/db.js";

export function selectHashtag(body) {
  return connection.query("SELECT * FROM hashtags WHERE name = $1", [body]);
}

export function insertHashtag(body) {
  return connection.query("INSERT INTO hashtags (name) VALUES ($1)", [body]);
}

export function insertPostNoMsg(user_id, url) {
  return connection.query("INSERT INTO posts (user_id, url) VALUES ($1,$2)", [
    user_id,
    url,
  ]);
}

export function insertPost(user_id, url, message) {
  return connection.query(
    "INSERT INTO posts (user_id, url, message) VALUES ($1,$2,$3)",
    [user_id, url, message]
  );
}

export function selectPostByMessage(message) {
  return connection.query("SELECT id FROM posts WHERE message=$1", [message]);
}

export function insertPostHashtag(post_id, hashtag_id) {
  return connection.query(
    "INSERT INTO posts_hashtags (post_id, hashtag_id) VALUES ($1,$2)",
    [post_id, hashtag_id]
  );
}

export function selectPosts() {
  return connection.query(`
        SELECT 
            p.id,
            u.id AS user_id,
            u.image AS user_image,
            u.name AS user_name,
            p.url,
            p.message,
            m.title,
            m.description,
            m.image
        FROM posts p
        JOIN users u ON u.id = p.user_id
        JOIN metadata m ON m."post_id" = p.id
        ORDER BY p.id DESC
        LIMIT 20
    `);
}

export function selectPostById(id) {
  return connection.query("SELECT * FROM posts WHERE id=$1", [id]);
}

export function deleteHashtags(post_id) {
  return connection.query("DELETE FROM posts_hashtags WHERE post_id=$1", [
    post_id,
  ]);
}

export function deletePostId(id) {
  return connection.query("DELETE FROM posts WHERE id=$1", [id]);
}

export function deleteLikes(post_id) {
  return connection.query("DELETE FROM likes WHERE post_id=$1", [post_id]);
}
export function deleteMetadata(post_id) {
  return connection.query("DELETE FROM metadata WHERE post_id=$1", [post_id]);
}
export function updateUrl(url, message, id) {
  return connection.query("UPDATE posts SET url=$1, message=$2 WHERE id=$3", [
    url,
    message,
    id,
  ]);
}

export function deleteHashtagById(post_id, hashtag_id) {
  return connection.query(
    "DELETE FROM posts_hashtags WHERE post_id = $1 AND hashtag_id = $2",
    [post_id, hashtag_id]
  );
}

export function insertMetadata(post_id, title, description, image) {
  return connection.query(
    "INSERT INTO metadata (post_id, title, description, image) VALUES ($1,$2,$3,$4)",
    [post_id, title, description, image]
  );
}

export function insertPostOnFeed(post_id, user_id) {
  return connection.query(
    "INSERT INTO feed (post_id, user_id, is_repost) VALUES ($1,$2, false)",
    [post_id, user_id]
  );
}

export function insertRepostOnFeed(post_id, user_id) {
  return connection.query(
    "INSERT INTO feed (post_id, user_id, is_repost) VALUES ($1,$2, true)",
    [post_id, user_id]
  );
}
export function deletePostOnFeed(post_id) {
  return connection.query("DELETE FROM feed WHERE post_id=$1", [post_id]);
}
