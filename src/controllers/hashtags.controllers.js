import connection from "../db/db.js";
import { getPostsByHashtag, getTrendingsOrder } from "../repositories/hashtags.repositories.js";

export async function getPostsWithTheHashtag(req,res){
    const hashtagId = req.hashtagId
    const user_id = res.locals

    console.log(hashtagId)

    try {
        const postsWithTheHashtag = await getPostsByHashtag(user_id, hashtagId)

        console.log(postsWithTheHashtag)

        res.status(200).send(postsWithTheHashtag.rows)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function getTrendings(req,res){
    try {
        const trendings = await getTrendingsOrder()
        res.status(200).send(trendings.rows)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
    
}