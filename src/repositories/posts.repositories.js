import connection from "../db/db.js";

export function selectHashtag (body) {
    return connection.query('SELECT * FROM hashtags WHERE name = $1', [body])
}

export function insertHashtag (body) {
    return connection.query('INSERT INTO hashtags (name) VALUES ($1)', [body])
}

export function insertPostNoMsg (user_id, url) {
    return connection.query('INSERT INTO posts (user_id, url) VALUES ($1,$2)', [user_id, url])
}

export function insertPost (user_id, url, message) {
    return connection.query('INSERT INTO posts (user_id, url, message) VALUES ($1,$2,$3)', [user_id, url, message])
}

export function selectPostByMessage (message) {
    return connection.query('SELECT id FROM posts WHERE message=$1',[message])
}

export function insertPostHashtag (post_id, hashtag_id) {
    return connection.query('INSERT INTO posts_hashtags (post_id, hashtag_id) VALUES ($1,$2)', [post_id, hashtag_id])
}