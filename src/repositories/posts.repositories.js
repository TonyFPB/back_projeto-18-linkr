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
    return connection.query('INSERT INTO posts_hashtags (post_id, hashtag_id) VALUES ($1,$2)',[post_id, hashtag_id])
}

export function selectPosts () {
    return connection.query(`
        SELECT 
            p.id,
            u.image AS user_image,
            u.name AS user_name,
            p.url,
            p.message
        FROM posts p
        JOIN users u ON u.id = p.user_id
        LIMIT 20
    `)
}

export function selectPostById (id) {
    return connection.query('SELECT * FROM posts WHERE id=$1', [id])
}

export function deleteHashtags (post_id) {
    return connection.query('DELETE FROM posts_hashtags WHERE post_id=$1', [post_id])
}

export function deletePostId (id) {
    return connection.query('DELETE FROM posts WHERE id=$1',[id])
}

export function deleteLikes (post_id) {
    return connection.query('DELETE FROM likes WHERE post_id=$1', [post_id])
}

export function updateUrl (url, message, id) {
    return connection.query('UPDATE posts SET url=$1, message=$2 WHERE id=$3',[url, message, id])
}

export function deleteHashtagById (post_id, hashtag_id) {
    return connection.query('DELETE FROM posts_hashtags WHERE post_id = $1 AND hashtag_id = $2',[post_id, hashtag_id])
}
