import connection from "../db/db.js";

export function insertRepostOnFeed(post_id, user_id) {
  return connection.query(
    "INSERT INTO feed (post_id, user_id, is_repost) VALUES ($1,$2, true)",
    [post_id, user_id]
  );
}

export function deleteFeed(feed_id) {
  return connection.query("DELETE FROM feed WHERE id = $1", [feed_id]);
}

export function selectReposts(post_id) {
  return connection.query(
    "SELECT * FROM feed WHERE post_id = $1 AND is_repost = true",
    [post_id]
  );
}
