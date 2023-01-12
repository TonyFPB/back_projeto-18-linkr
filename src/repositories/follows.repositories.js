import connection from "../db/db.js";

export function insertFollow(user,idFollower){
    return connection.query(`INSERT INTO follows ("user", "account") VALUES ($1,$2)`, [idFollower, user])
}

export function selectFollow(idFollower, user){
    return connection.query(`SELECT * FROM follows WHERE "user"=($1) AND "account"=($2)`, [idFollower, user])
}

export function deleteFollow(followId){
    return connection.query(`DELETE FROM follows WHERE id=($1)`,[followId])
}

export function selectPostsByFollows(idFollower){
    return connection.query(`SELECT posts.id, (user_id = 6) AS owner, users.image, users.name, posts.message, posts.url, (SELECT row_to_json(m) FROM (SELECT metadata.title, metadata.description, metadata.image FROM metadata WHERE post_id = posts.id)m) AS metadata FROM posts JOIN metadata ON post_id = posts.id JOIN users ON posts.user_id = users.id JOIN follows ON follows."account" = posts.user_id WHERE follows.user = ($1) ORDER BY posts.id DESC LIMIT '20' 
    `, [idFollower])
}