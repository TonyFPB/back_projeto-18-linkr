import connection from "../db/db.js";

export function findUserById(id) {
    return connection.query(`SELECT * FROM users WHERE id=$1;`, [id]);
}

export function insertLikes(user_id, post_id) {
    return connection.query(`INSERT INTO likes (user_id,post_id) VALUES ($1,$2);`, [user_id, post_id]);
}

export function getLikesFromUser(post_id, user_id) {
    return connection.query(`
    SELECT * FROM likes WHERE user_id = $1 AND post_id = $2;`, [post_id, user_id]
    );
}

export function getAllPostLikes(post_id) {
    console.log("aqui", post_id)
    return connection.query(`
    SELECT likes.user_id, users.id, users.name 
    FROM likes 
    JOIN users 
    ON  likes.user_id = users.id
    WHERE likes.post_id = $1 
    ORDER BY RANDOM();
    `[post_id]);
}

export function deleteLike(user_id, post_id) {
    return connection.query(`DELETE FROM likes WHERE user_id = $1 AND post_id = $2;`, [user_id, post_id]);
}