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

export function selectAllFollowsByUser(idFollower){
    return connection.query(`SELECT * FROM follows WHERE "user" = $1`,[idFollower])
}