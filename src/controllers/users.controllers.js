import {getPostsLikesUser, getTrending, findUserByName} from "../repositories/users.repositories.js"

export async function getUserById(req, res) {
  try {

    const  id = res.locals;

    const postsUser = await  getPostsLikesUser (id)

    const trending = await getTrending()


    const result = {
                        user: {
                            name: postsUser.rows[0].name,
                            image: postsUser.rows[0].image
                        },
                        posts: postsUser.rows.map( (p) => {
                           
                            return {
                                url: p.url,
                                message: p.message

                            }
                        }),
                        trending: trending.rows.map( (t => t.name))

                    }

   

    return res.status(200).send(result)

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Erro interno no servidor!" });
  }
}

export async function getUserByName(req, res) {

    try {

        const { name } = req.params

        const user = await findUserByName(name)

         
       
    
        return res.status(200).send(user.rows)
    
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Erro interno no servidor!" });
      }





}
