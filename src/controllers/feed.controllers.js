import { selectFeed } from "../repositories/feed.respositories.js"

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

        res.send(response)
        
    } catch (erro) {
        console.log(erro)
        res.sendStatus(500)
    }
}
