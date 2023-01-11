import {
  findOnFeed,
  insertHashtag,
  selectHashtag,
  selectPostById,
} from "../repositories/posts.repositories.js";

async function arrayHashtags(message) {
  const msg = message.split(" ");

  const hashtags = [];
  for (let word of msg) {
    if (word[0] === "#") hashtags.push(word.replace("#", ""));
  }

  if (hashtags.length === 0) return [];

  try {
    const hashtags_id = [];
    for (let word of hashtags) {
      const find = await selectHashtag(word);

      if (find.rowCount === 0) {
        await insertHashtag(word);
        const newFind = await selectHashtag(word);
        hashtags_id.push(newFind.rows[0].id);
        break;
      }

      hashtags_id.push(find.rows[0].id);
    }

    return hashtags_id;
  } catch (error) {
    return error;
  }
}

export async function validateRepost(req, res, next) {
  const id = res.locals;
  const { post_id } = req.params;

  try {
    const { rows } = await selectPostById(post_id);
    if (rows.length === 0) return res.sendStatus(404);

    const { rowCount } = await findOnFeed(post_id, id);
    if (rowCount !== 0) return res.sendStatus(401);

    const { message, user_id } = rows[0];
    if (user_id === id)
      return res.status(401).send("Não pode respostar seu próprio tweet");

    const hashtags = await arrayHashtags(message);

    req.data = { user_id: id, post_id, hashtags };
    next();
  } catch (erro) {
    console.log(erro);
    res.sendStatus(500);
  }
}

export async function validateUnrepost(req, res, next) {
  const id = res.locals;
  const { post_id } = req.params;

  try {
    const { rows } = await selectPostById(post_id);
    if (rows.length === 0) return res.sendStatus(404);

    const postFeed = await findOnFeed(post_id, id);
    if (postFeed.rowCount === 0) return res.sendStatus(401);

    const { message, user_id } = rows[0];
    if (user_id === id)
      return res.status(401).send("Não pode respostar seu próprio tweet");

    const hashtags = await arrayHashtags(message);

    req.data = { user_id: id, post_id, hashtags, feed_id: postFeed.rows[0].id };
    next();
  } catch (erro) {
    console.log(erro);
    res.sendStatus(500);
  }
}

export async function validateGetRepost(req, res, next) {
  const { post_id } = req.params;

  try {
    const { rowCount } = await selectPostById(post_id);
    if (rowCount === 0) return res.sendStatus(404);

    req.data = { post_id };
    next();
  } catch (erro) {
    console.log(erro);
    res.sendStatus(500);
  }
}
