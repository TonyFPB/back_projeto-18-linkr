import { Router } from "express";
import { getPostsWithTheHashtag } from "../controllers/hashtags.controllers.js";
import { hashtagValidation } from "../middlewares/hashtag.middlewares.js";
import { authTokenValidate } from "../middlewares/validateToken.middleware.js";

const route = Router()

route.get('/hashtag/:hashtag', authTokenValidate, hashtagValidation, getPostsWithTheHashtag)

export default route