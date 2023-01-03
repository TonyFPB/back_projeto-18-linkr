import bcrypt from 'bcrypt'
import connection from '../db/db.js'

export async function postSignUp(req, res) {
    const { name, email, password, image } = req.body
    try {
        const passwordHash = bcrypt.hashSync(password, 10)
        await connection.query(`INSERT INTO users (name,email,password,image) VALUES ($1,$2,$3,$4)`, [name, email, passwordHash, image])
        return res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}