import express from "express"
import { deletePost, getPosts,getPostsFromFollows, getPostsWithTheHashtag, postNew, putPost } from "../controllers/post.controllers.js"
import { hashtagValidation } from "../middlewares/hashtag.middlewares.js"
import { validateDeletePost, validatePost, validatePutPost } from "../middlewares/posts.middlewares.js"
import { authTokenValidate } from "../middlewares/validateToken.middleware.js"

const router = express.Router();

router.post("/post", authTokenValidate, validatePost, postNew)
//router.get("/post", authTokenValidate, getPosts)
router.put("/post/:id", authTokenValidate, validatePutPost, putPost)
router.delete("/post/:post_id", authTokenValidate, validateDeletePost, deletePost)
router.get('/post/:hashtag', authTokenValidate, hashtagValidation, getPostsWithTheHashtag)
router.get("/posts", authTokenValidate, getPostsFromFollows)

export default router;