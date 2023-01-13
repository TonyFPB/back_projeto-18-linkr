import { more, newFeed, now } from "../repositories/feed.respositories.js"

export async function moreFeed (req, res) {
    const user_id = res.locals
    const {n} = req.params
    const a = n*10

    try {
        const {rows} = await more(a, user_id)

        const response = rows.map(post => {
            const aux = {
                id: post.id,
                repost: post.is_repost,
                repost_name: post.repost_name,
                post_id: post.post_id,
                feed_user:post.feed_user,
                post_user: post.post_user,
                owner: post.owner,
                image: post.user_image,
                name: post.user_name,
                message: post.message,
                url: post.url,
                metadata: {
                  title: post.title,
                  description: post.description,
                  image: post.image,
                },
              };

              if (post.feed_user === user_id) aux.repost_name = "you"
            return aux
        })

        const agora = await now()
        const {last_update} = agora.rows[0]
        res.send({last_update, posts:response})
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}
export async function getNew (req, res) {
    const {last_update} = req.body

    if (!last_update) return res.sendStatus(400)

    try {
        const {rowCount} = await newFeed(last_update)

        res.send({num: rowCount})
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}