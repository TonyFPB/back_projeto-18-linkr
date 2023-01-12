import { deleteFollow, insertFollow, selectPostsByFollows } from "../repositories/follows.repositories.js"

export async function follow(req,res){
    const user = req.user
    const idFollower = res.locals
    try {
        await insertFollow(user.id,idFollower)
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function unfollow(req,res){
    const followId = req.followId

    try {
        await deleteFollow(followId)
        res.sendStatus(204)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getPostsByFollows(req,res){
    const idFollower = res.locals

    try {
        const posts = await selectPostsByFollows(idFollower)
        res.status(200).send(posts.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}