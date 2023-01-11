import {
  deleteHashtagById,
  deleteHashtags,
  deleteLikes,
  deletePostId,
  insertPost,
  insertPostHashtag,
  insertMetadata,
  selectPostByMessage,
  selectPosts,
  updateUrl,
  deleteMetadata,
  insertPostOnFeed,
  insertRepostOnFeed,
  deletePostOnFeed,
} from "../repositories/posts.repositories.js";

export async function postNew(req, res) {
  const { user_id, url, message, hashtags, metadata } = req.post;
  const { title, description, image } = metadata;

  if ((!title, !description, !image)) return res.send(400);

  try {
    await insertPost(user_id, url, message);
    const { rows } = await selectPostByMessage(message);
    const post_id = rows[rows.length - 1].id;

    await insertMetadata(post_id, title, description, image);
    await insertPostOnFeed(post_id, user_id);

    if (hashtags.length === 0) return res.sendStatus(201);

    for (let id of hashtags) await insertPostHashtag(post_id, id);

    res.sendStatus(201);
  } catch (erro) {
    console.log(erro);
    res.sendStatus(500);
  }
}

export async function getPosts(req, res) {
  const user_id = res.locals;

  try {
    const { rows } = await selectPosts();

    const response = rows.map((post) => {
      const aux = {
        id: post.id,
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
      return aux;
    });

    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Unavaible url");
  }
}

export async function putPost(req, res) {
  const { id, url, message, changed, toDelete, toUpdate } = req.post;

  try {
    await updateUrl(url, message, id);

    if (!changed) return res.sendStatus(201);

    if (toDelete.length !== 0)
      for (let hashtag_id of toDelete) await deleteHashtagById(id, hashtag_id);
    if (toUpdate.length !== 0)
      for (let hashtag_id of toUpdate) await insertPostHashtag(id, hashtag_id);

    return res.sendStatus(201);
  } catch (erro) {
    console.log(erro);
    res.sendStatus(500);
  }
}

export async function deletePost(req, res) {
  const { post_id, user_id } = req.post;

  try {
    await deleteHashtags(post_id);
    await deleteLikes(post_id);
    await deleteMetadata(post_id);
    await deletePostOnFeed(post_id);
    await deletePostId(post_id);

    res.sendStatus(204);
  } catch (erro) {
    console.log(erro);
    res.sendStatus(500);
  }
}

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
