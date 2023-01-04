import connection from "../db/db.js";

export async function getPostsWithTheHashtag(req,res){
    const hashtagId = req.hashtagId

    console.log(hashtagId)

    try {
        const postsWithTheHashtag = await connection.query(`
            SELECT posts.* FROM posts join posts_hashtags on posts.id = posts_hashtags.post_id where posts_hashtags.hashtag_id = ($1)
        `,[hashtagId])

        console.log(postsWithTheHashtag)

        res.status(200).send(postsWithTheHashtag.rows)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}