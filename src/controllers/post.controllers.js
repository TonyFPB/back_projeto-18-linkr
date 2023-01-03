import { insertPost, insertPostHashtag, insertPostNoMsg, selectPostByMessage } from "../repositories/posts.repositories.js"

export async function postNew (req, res) {
    const {user_id,url,message,hashtags_id} = req.post
    
    try {
        if (!message) {
            await insertPostNoMsg(user_id,url)
            return res.sendStatus(201)
        }

        if (!hashtags_id) { 
            await insertPost(user_id,url,message)
            return res.sendStatus(201)
        }

        await insertPost(user_id,url,message)
        const {rows} = await selectPostByMessage(message)
        const post_id = rows[rows.length - 1].id

        hashtags_id.forEach(async (id) => await insertPostHashtag(post_id, id))

        return res.sendStatus(201)
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }

}