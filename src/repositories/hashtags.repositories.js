import connection from "../db/db.js";

export function getTrendingsOrder(){
    return connection.query(`SELECT hashtags.name, count(posts_hashtags.hashtag_id) AS qnt FROM posts_hashtags JOIN hashtags ON posts_hashtags.hashtag_id=hashtags.id WHERE posts_hashtags."createdAt" >= current_timestamp - INTERVAL '24' HOUR GROUP BY posts_hashtags.hashtag_id, hashtags.name ORDER BY qnt DESC LIMIT '10';`)
}

export function getPostsByHashtag(user_id, hashtagId){
    return connection.query(`SELECT posts.id, (user_id = ($1)) AS owner, users.image, users.name, posts.message, posts.url, (SELECT row_to_json(m) FROM (SELECT metadata.title, metadata.description, metadata.image FROM metadata WHERE post_id = posts.id)m) AS metadata FROM posts JOIN metadata ON post_id = posts.id JOIN users ON user_id = users.id JOIN posts_hashtags ON posts_hashtags.post_id = posts.id WHERE posts_hashtags.hashtag_id = ($2)`,[user_id, hashtagId])
}

export function hashtagExistValidate(hashtag){
    return connection.query(`SELECT * FROM hashtags WHERE name = ($1)`,[hashtag])
}