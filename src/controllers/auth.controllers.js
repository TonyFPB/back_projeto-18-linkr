import bcrypt from 'bcrypt'

import { genereteToken, insertUser } from '../repositories/auth.repositories.js'

export async function postSignUp(req, res) {
    const { name, email, password, image } = req.body
    try {
        const passwordHash = bcrypt.hashSync(password, 10)
        await insertUser(name, email, passwordHash, image)
        return res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export function sendToken(req, res) {
    const id = res.locals

    const token = genereteToken(id)
    
    res.send({ token })
}