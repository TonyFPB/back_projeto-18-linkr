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
  deleteMetadata,
  getPostsByHashtag,
  selectPostsFromFollows,
} from "../repositories/posts.repositories.js";

export async function postNew(req, res) {
  const { user_id, url, message, hashtags, metadata } = req.post;
  
  try {
    await insertPost(user_id, url, message);
    const { rows } = await selectPostByMessage(message);
    const post_id = rows[rows.length - 1].id;
    
    const { title, description, image } = metadata;
    await insertMetadata(post_id, title, description, image);

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
    await deleteMetadata(post_id)
    await deletePostId(post_id);
    
    res.sendStatus(204);
  } catch (erro) {
    console.log(erro);
    res.sendStatus(500);
  }
}

export async function getPostsWithTheHashtag(req,res){
  const hashtagId = req.hashtagId
  const user_id = res.locals

  console.log(hashtagId)

  try {
      const postsWithTheHashtag = await getPostsByHashtag(user_id, hashtagId)

      res.status(200).send(postsWithTheHashtag.rows)
  } catch (error) {
      console.log(error)
      res.sendStatus(500)
  }
}

export async function getPostsFromFollows(req,res){
  const user_id = res.locals
  try {
    const postsFromFollowers = await selectPostsFromFollows(user_id)
    res.status(200).send(postsFromFollowers.rows)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
