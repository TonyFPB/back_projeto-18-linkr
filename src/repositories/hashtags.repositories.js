import connection from "../db/db.js";

export function getTrendingsOrder(){
    return connection.query(`select hashtags.name, count(posts_hashtags.hashtag_id) as qnt from posts_hashtags join hashtags on posts_hashtags.hashtag_id=hashtags.id where posts_hashtags."createdAt" >= current_timestamp - INTERVAL '24' HOUR group by posts_hashtags.hashtag_id, hashtags.name order by qnt desc limit '10';`)
}

export function getPostsByHashtag(hashtagId){
    return connection.query(`SELECT posts.* FROM posts join posts_hashtags on posts.id = posts_hashtags.post_id where posts_hashtags.hashtag_id = ($1)`,[hashtagId])
}

export function hashtagExistValidate(hashtag){
    return connection.query(`SELECT * FROM hashtags WHERE name = ($1)`,[hashtag])
}