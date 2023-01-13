import {
  deleteFeed,
  insertRepostOnFeed,
  selectReposts,
} from "../repositories/reposts.repositories.js";
import { insertPostHashtag } from "../repositories/posts.repositories.js";

export async function repost(req, res) {
  const { user_id, post_id, hashtags } = req.data;

  try {
    await insertRepostOnFeed(post_id, user_id);

    if (hashtags.length === 0) return res.sendStatus(201);
    for (let id of hashtags) await insertPostHashtag(post_id, id);

    res.sendStatus(201);
  } catch (erro) {
    console.log(erro);
    res.sendStatus(500);
  }
}

export async function unrepost(req, res) {
  const { feed_id } = req.data;

  try {
    await deleteFeed(feed_id);

    res.sendStatus(204);
  } catch (erro) {
    console.log(erro);
    res.sendStatus(500);
  }
}

export async function getReposts(req, res) {
  const { post_id, allowed, avaible } = req.data;

  try {

    const  {rowCount} = await selectReposts(post_id)

    res.send({rowCount, allowed, avaible })
  } catch (erro) {
    console.log(erro)
    res.sendStatus(500)
  }
}
