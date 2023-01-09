import {
  deleteHashtagById,
  deleteHashtags,
  deleteLikes,
  deletePostId,
  insertPost,
  insertPostHashtag,
  insertPostNoMsg,
  insertMetadata,
  selectPostByMessage,
  selectPosts,
  updateUrl,
} from "../repositories/posts.repositories.js";

export async function postNew(req, res) {
  const { user_id, url, message, hashtags } = req.post;

  try {
    if (!message) {
      await insertPostNoMsg(user_id, url);
      return res.sendStatus(201);
    }

    if (hashtags.length === 0) {
      await insertPost(user_id, url, message);
      return res.sendStatus(201);
    }

    await insertPost(user_id, url, message);

    const { rows } = await selectPostByMessage(message);

    const post_id = rows[rows.length - 1].id;

    const { title, description, image } = metadata;
    await insertMetadata(post_id, title, description, image);

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
        post_user_id: post.user_id,
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
    res.sendStatus(500);
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
    await deletePostId(post_id);

    res.sendStatus(204);
  } catch (erro) {
    console.log(erro);
    res.sendStatus(500);
  }
}
