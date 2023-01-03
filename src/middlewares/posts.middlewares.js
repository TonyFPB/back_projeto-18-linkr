import { insertHashtag, selectHashtag } from "../repositories/posts.repositories.js";
import { postSchema } from "../schemas/posts.schemas.js";

export async function validatePost (req, res, next) {
    const body = req.body

    const validation = postSchema.validate(body, { abortEarly: false });
    if (validation.error) {
        const erros = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(erros);
      }

    if (!body.message) {
      req.post = {
        user_id: 1,
        url: body.url,
      }
      return next()
    }

    const {message} = body
    const msg = message.split(" ")
    
    const hashtags = []
    for (let word of msg) {
      if (word[0] === "#") hashtags.push(word.replace("#",""))
    }
    
    if (hashtags.length === 0) {
      req.post = {
        user_id: 1,
        url: body.url,
        message
      }
      return next()
    }
    
    try {
      const hashtags_id = []
      for (let word of hashtags) {
        const find = await selectHashtag(word)
  
        if (find.rowCount === 0) {
          await insertHashtag(word)        
          const newFind = await selectHashtag(word)
          hashtags_id.push(newFind.rows[0].id)
          break
        }
  
        hashtags_id.push(find.rows[0].id)
      }
     
      req.post = {
        user_id: 1,
        url: body.url,
        message,
        hashtags_id
      }
      return next()

    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
 
}