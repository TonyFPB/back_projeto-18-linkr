import { findAmountComments, findWithComments, insertComment } from "../repositories/comments.repositories.js"

export async function postComments(req, res) {
    const { post_id } = req.params
    const { comment } = req.body
    const user_id = res.locals
    try {
        await insertComment(post_id, user_id, comment)
        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getComments(req, res) {
    const user_id = res.locals
    const { post_id } = req.params

    try {
        const comments = await findWithComments(user_id, post_id)
        res.send(comments.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getAmount(req, res) {
    const { post_id } = req.params
    
    try{
        const amount = await findAmountComments(post_id)
        res.send(amount.rows[0])
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}
