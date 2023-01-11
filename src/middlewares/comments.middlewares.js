import { selectPostById } from '../repositories/posts.repositories.js'

export async function validatePostIdComments(req, res, next) {
    const { post_id } = req.params
    
    try {
        if (isNaN(post_id)) {
            return res.sendStatus(404)
        }

        const postExists = await selectPostById(post_id)
        if (postExists.rowCount === 0){
            return res.status(404).send({message:"Post not found."})
        }

    } catch (err) {
        console.log(err)
        res.send(500)
    }
    next()
}