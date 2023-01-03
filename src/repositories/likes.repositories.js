import connection from "../db/db.js";

export function findUserById(id) {
    return connection.query(`SELECT * FROM users WHERE id=$1;`, [id]);
}

export function insertLikes(user_id, post_id,createdAt){
    return connection.query(`INSERT INTO likes (user_id,post_id, createdAt) VALUES ($1,$2,$3);`,[user_id,post_id,createdAt]);
}

export function getLikes(){
    return connection.query(`SELECT likes`)
}