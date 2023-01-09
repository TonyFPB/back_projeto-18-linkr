import connection from "../db/db.js";

export function getTrendingsOrder(){
    return connection.query(`SELECT hashtags.name, count(posts_hashtags.hashtag_id) AS qnt FROM posts_hashtags JOIN hashtags ON posts_hashtags.hashtag_id=hashtags.id WHERE posts_hashtags."createdAt" >= current_timestamp - INTERVAL '24' HOUR GROUP BY posts_hashtags.hashtag_id, hashtags.name ORDER BY qnt DESC LIMIT '10';`)
}

export function hashtagExistValidate(hashtag){
    return connection.query(`SELECT * FROM hashtags WHERE name = ($1)`,[hashtag])
}