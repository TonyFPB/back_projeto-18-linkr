import connection from "../db/db.js"
import bcrypt from 'bcrypt'
import { findUser } from "../repositories/auth.repositories.js"


export async function conflictUserEmail(req, res, next) {
    const { email } = req.body
    try {
        const userExists = await findUser(email)
        if (userExists.rowCount > 0) {
            return res.sendStatus(409)
        }
        next()
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function authenticationSignIn(req, res, next) {
    const { email, password } = req.body
    try {
        const userExists = await findUser(email)
        if (userExists.rowCount === 0 || !bcrypt.compareSync(password, userExists.rows[0].password)) {
            return res.status(401).send({ message: "Email e/ou password incorretos." })
        }
        res.locals = userExists.rows[0].id
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    next()
}

