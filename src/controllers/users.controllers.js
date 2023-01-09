import {
  getPostsLikesUser,
  getTrending,
  findUserByName,
  findUserImageById
} from "../repositories/users.repositories.js";

export async function getUserById(req, res) {
  try {
    const user_id = res.locals;
    const { id } = req.params;

    const postsUser = await getPostsLikesUser(id);

    const trending = await getTrending();

    // const result = {
    //   user: {
    //     name: postsUser.rows[0].name,
    //     image: postsUser.rows[0].image,
    //   },
    //   posts: postsUser.rows.map((p) => {
    //     return {
    //       url: p.url,
    //       message: p.message,
    //       title: p.title,
    //       image: p.image,
    //       description: p.description,
    //     };
    //   }),
    //   trending: trending.rows.map((t) => t.name),
    // };

    const result = {
      user: {
        id: postsUser.rows[0].user_id,
        name: postsUser.rows[0].name,
        image: postsUser.rows[0].user_image,
      },
      posts: postsUser.rows.map((p) => {
        return {
          post_user_id: postsUser.rows[0].post_user_id,
          image: postsUser.rows[0].user_image,
          name: postsUser.rows[0].name,
          id: p.id,
          owner: user_id === p.user_id,
          url: p.url,
          message: p.message,
          metadata: {
            title: p.title,
            image: p.image,
            description: p.description,
          },
        };
      }),
      trending: trending.rows.map((t) => t.name),
    };
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Erro interno no servidor!" });
  }
}

export async function getUserByName(req, res) {
  try {
    const { name } = req.params;

    const user = await findUserByName(name);

    return res.status(200).send(user.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Erro interno no servidor!" });
  }
}

export async function getUser(req,res){
  const id = res.locals
  try{
    const user = await findUserImageById(id)

    res.send(user.rows[0])
  }catch(err){}
}
