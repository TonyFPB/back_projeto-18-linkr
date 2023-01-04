import connection from "../db/db.js";

export async function hashtagValidation(req,res,next){
    const {hashtag} = req.params

    const hashtagValidate =  await connection.query(
    `
        SELECT * FROM hashtags WHERE name = ($1)
    `, [hashtag])

    if (hashtagValidate.rows.length===0){
        return res.sendStatus(404)
    }

    req.hashtag = hashtagValidate.rows[0]
    
    next()
}