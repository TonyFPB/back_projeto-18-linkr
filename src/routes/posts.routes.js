import express from "express"
import { postNew } from "../controllers/post.controllers.js"
import { validatePost } from "../middlewares/posts.middlewares.js"
import { authTokenValidate } from "../middlewares/validateToken.middleware.js"

const router = express.Router()

router.post("/post", authTokenValidate, validatePost, postNew)

export default router