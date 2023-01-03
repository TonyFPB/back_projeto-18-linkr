import { deleteHashtags, deleteLikes, deletePostId, insertPost, insertPostHashtag, insertPostNoMsg, selectPostByMessage, selectPosts } from "../repositories/posts.repositories.js"

export async function postNew (req, res) {
    const {user_id,url,message, hashtags} = req.post

    try {
        if (!message) {
            await insertPostNoMsg(user_id,url)
            return res.sendStatus(201)
        }

        if (hashtags.length === 0) { 
            await insertPost(user_id,url,message)
            return res.sendStatus(201)
        }
       
        await insertPost(user_id,url,message)

        const {rows} = await selectPostByMessage(message)
        
        const post_id = rows[rows.length - 1].id
        console.log(post_id)
        //tá dando errado
        for (let id of hashtags) {await insertPostHashtag(post_id, id); console.log(id)}

        res.sendStatus(201)
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }

}

export async function getPosts (req, res) {
    try {
        const {rows}  = await selectPosts()
        res.send(rows)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function putPost (req, res) {
    const {url, message, changed} = req.post

    res.send(req.post)
}

export async function deletePost (req, res) {
    const {post_id, user_id} = req.post 

    try {
        await deleteHashtags(post_id)
        await deleteLikes(post_id)
        await deletePostId(post_id)

        res.sendStatus(204)
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}