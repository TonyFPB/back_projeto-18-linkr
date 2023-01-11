import { findOnFeed, insertHashtag, selectHashtag, selectPostById } from "../repositories/posts.repositories.js";
import { postSchema } from "../schemas/posts.schemas.js";
import getMetaData from "metadata-scraper"

async function arrayHashtags (message) {
  const msg = message.split(" ")

  const hashtags = []
  for (let word of msg) {
    if (word[0] === "#") hashtags.push(word.replace("#",""))
  }

  if (hashtags.length === 0) return []
    
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

    return hashtags_id

  } catch (error) {
    return error
  }
}

export async function validatePost (req, res, next) {
    const body = req.body
    const user_id = res.locals

    const validation = postSchema.validate(body, { abortEarly: false });
    if (validation.error) {
        const erros = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(erros);
      }
    
    try {
      const {message, url} = req.body
      const hashtags = await arrayHashtags(message)
      const {title, description, image} = await getMetaData(url)
      const metadata = {title, description, image}
  
      req.post = {
        ...body,
        user_id,
        hashtags,
        metadata
      }
      
      next()

    } catch (error) {
      console.log(error)
      res.status(500).send("Unavaible url")
    }
}

export async function validatePutPost (req, res, next) {
  const body = req.body //message e url
  const {id} = req.params
  const user_id = res.locals

  const validation = postSchema.validate(body, { abortEarly: false });
  if (validation.error) {
      const erros = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(erros);
    }

  try {
    const {rows} = await selectPostById(id)
    
    if (rows.length === 0) return res.sendStatus(404)
    if (user_id !== rows[0].user_id) return res.sendStatus(401)

    if (rows[0].message === body.message) {req.post = {...body, changed: false}; next()}
    else {
     
      const newHashtags = await arrayHashtags(body.message)
      const oldHashtags = await arrayHashtags(rows[0].message)
      
      const toDelete = []
      const toUpdate = []

      for (let i of oldHashtags) if (!newHashtags.includes(i)) toDelete.push(i)
      for (let i of newHashtags) if (!oldHashtags.includes(i)) toUpdate.push(i)

      req.post = {...body, id, changed: true, toDelete, toUpdate}
      next()
    }

  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }  
}

export async function validateDeletePost (req, res, next) {
  const {post_id} = req.params
  const user_id = res.locals

  try {
    const {rows} = await selectPostById(post_id)
    if (rows.length === 0) return res.status(404).send("Post não encontrado")
    if (rows[0].user_id !== user_id) return res.sendStatus(401)

    req.post = {post_id, user_id}
    next()
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export async function validateRepost (req, res, next) {
  const id = res.locals
  const {post_id} = req.params

  try {
    const {rows} = await selectPostById(post_id)
    if (rows.length === 0) return res.sendStatus(404)

    const {rowCount} = await findOnFeed(post_id, id)
    if (rowCount !== 0) return res.sendStatus(401)

    const {message, user_id} = rows[0]
    if (user_id === id) return res.status(401).send("Nãom pode respostar seu próprio tweet")

    const hashtags = await arrayHashtags(message)
    
    req.data = {user_id: id, post_id, hashtags}
    next()
    
  } catch (erro) {
    console.log(erro)
    res.sendStatus(500)
  }
}

export async function validateUnrepost (req, res, next) {
  const id = res.locals
  const {post_id} = req.params

  try {
    const {rows} = await selectPostById(post_id)
    if (rows.length === 0) return res.sendStatus(404)

    const postFeed = await findOnFeed(post_id, id)
    if (postFeed.rowCount === 0) return res.sendStatus(401)

    const {message, user_id} = rows[0]
    if (user_id === id) return res.status(401).send("Não pode respostar seu próprio tweet")

    const hashtags = await arrayHashtags(message)
    
    req.data = {user_id: id, post_id, hashtags, feed_id:postFeed.rows[0].id}
    next()
    
  } catch (erro) {
    console.log(erro)
    res.sendStatus(500)
  }
}