import { selectFollow } from "../repositories/follows.repositories.js"

export async function followValidate(req,res,next){
    const user = req.user
    const idFollower = res.locals

    const follow = await selectFollow(idFollower, user.id)
    if (follow.rows.length !== 0){
        return res.sendStatus(409)
    }
    
    next()
}

export async function unfollowValidate(req,res,next){
    const user = req.user
    const idFollower = res.locals

    const follow = await selectFollow(idFollower, user.id)
    if (follow.rows.length === 0){
        return res.sendStatus(404)
    }
    
    req.followId = follow.rows[0].id
    
    next()
}

export async function checkFollowOrUnfollow(req,res,next){
    const user = req.user
    const idFollower = res.locals

    const follow = await selectFollow(idFollower, user.id)

    if (follow.rows.length === 0){
        req.isFollow = false
    } else {
        req.isFollow = true
    }

    next()
}