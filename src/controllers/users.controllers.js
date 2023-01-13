import {
  getPostsLikesUser,
  getTrending,
  findUserByName,
  findUserImageById,
  findUserByNameFollowsFirst,
} from "../repositories/users.repositories.js";

export async function getUserPostsById(req, res) {
  try {
    const user_id = res.locals;
    const { id } = req.params;

    const postsUser = await getPostsLikesUser(id);

    console.log(postsUser.rows)

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

    // let result = {};

    // if (postsUser.rows.length === 0) {
    //   const userData = await findUserImageById(id);
    //   result = {
    //     user: {
    //       id: id,
    //       name: userData.rows[0].name,
    //       image: userData.rows[0].image,
    //     },
    //     posts: [],
    //     trending: trending.rows.map((t) => t.name),
    //   };
    // } else {
    //   result = {
    //     user: {
    //       id: postsUser.rows[0].user_id,
    //       name: postsUser.rows[0].name,
    //       image: postsUser.rows[0].user_image,
    //     },
    //     posts: postsUser.rows.map((p) => {
    //       return {
    //         post_user_id: postsUser.rows[0].post_user_id,
    //         image: postsUser.rows[0].user_image,
    //         name: postsUser.rows[0].name,
    //         id: p.id,
    //         owner: user_id === p.user_id,
    //         url: p.url,
    //         message: p.message,
    //         metadata: {
    //           title: p.title,
    //           image: p.image,
    //           description: p.description,
    //         },
    //       };
    //     }),
    //     trending: trending.rows.map((t) => t.name),
    //   };
    // }
    res.status(200).send(postsUser.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Erro interno no servidor!" });
  }
}

export async function getUserByName(req, res) {
  try {
    const { name } = req.params;
    const idFollower = res.locals

    //const user = await findUserByName(name);
    const user = await findUserByNameFollowsFirst(name, idFollower)

    return res.status(200).send(user.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Erro interno no servidor!" });
  }
}

export async function getUser(req, res) {
  const id = res.locals;
  try {
    const user = await findUserImageById(id);

    res.send(user.rows[0]);
  } catch (err) {}
}

export async function getUserById(req,res){
  const user = req.user
  try {
    res.send(user)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
