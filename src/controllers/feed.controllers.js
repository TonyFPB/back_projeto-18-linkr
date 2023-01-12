import { more, newFeed, now, selectFeed } from "../repositories/feed.respositories.js"

export async function getFeed (req, res) {
    const user_id = res.locals

    try {
        const {rows} = await selectFeed()
        
        const response = rows.map(post => {
            const aux = {
                id: post.id,
                repost: post.is_repost,
                repost_name: post.repost_name,
                post_id: post.post_id,
                post_user: post.user_id,
                owner: post.user_id === user_id,
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
export async function moreFeed (req, res) {
    const {n} = req.params
    
    try {
        const {rows} = more(n*10)

        res.send(rows)
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