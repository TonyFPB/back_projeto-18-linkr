import { insertComment } from "../repositories/comments.repositories.js"

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