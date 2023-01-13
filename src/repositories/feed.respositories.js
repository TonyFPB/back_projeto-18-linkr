import connection from "../db/db.js";

export function more(offset, user_id) {
  return connection.query(
    `
            SELECT distinct
              f.id,
              f.is_repost,
              f.user_id AS feed_user,
              W.name AS repost_name, 
              p.id AS post_id,
              u.id AS post_user,
              (u.id=$1) AS owner,
              u.image AS user_image,
              u.name AS user_name,
              p.url,
              p.message,
              m.title,
              m.description,
              m.image
            FROM feed f 
            JOIN posts p ON f.post_id = p.id
            JOIN users u ON u.id = p.user_id 
            JOIN users w ON w.id = f.user_id
            JOIN metadata m ON m."post_id" = p.id
            JOIN follows ON follows."account" = f.user_id 
            WHERE follows.user = $1 
            ORDER BY p.id DESC
            OFFSET $2 ROWS
            FETCH NEXT 10 ROWS ONLY
        `,
    [user_id, offset]
  );
}

export function newFeed(time) {
  return connection.query('SELECT * FROM feed WHERE "createdAt" > $1', [time]);
}

export function now() {
  return connection.query("SELECT NOW() AS last_update");
}
