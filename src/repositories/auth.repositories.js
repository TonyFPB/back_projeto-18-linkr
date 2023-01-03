import connection from "../db/db.js";
import jwt from 'jsonwebtoken'

export async function findUser(email){
    return connection.query(`SELECT * FROM users WHERE email=$1`, [email])
}

export async function insertUser(name,email,password,image){
    return connection.query(`INSERT INTO users (name,email,password,image) VALUES ($1,$2,$3,$4)`, [name, email, password, image])
}

export function genereteToken(id){
    return jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: 86400 })
}