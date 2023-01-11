import connection from "../db/db.js";

export function insertComment(post_id, user_id, comment) {
    return connection.query('INSERT INTO comments (post_id,user_id,comment) VALUES($1,$2,$3)',[post_id, user_id, comment])
}