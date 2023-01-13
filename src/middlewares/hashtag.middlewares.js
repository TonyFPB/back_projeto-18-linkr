import { hashtagExistValidate } from "../repositories/hashtags.repositories.js";

export async function hashtagValidation(req,res,next){
    const {hashtag} = req.params

    console.log(hashtag)

    const hashtagValidate =  await hashtagExistValidate(hashtag)

    console.log(hashtagValidate.rows)

    if (hashtagValidate.rows.length===0){
        return res.sendStatus(404)
    }

    req.hashtagId = hashtagValidate.rows[0].id
    
    next()
}