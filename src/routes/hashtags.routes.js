import { Router } from "express";
import { getPostsWithTheHashtag, getTrendings } from "../controllers/hashtags.controllers.js";
import { hashtagValidation } from "../middlewares/hashtag.middlewares.js";
import { authTokenValidate } from "../middlewares/validateToken.middleware.js";

const route = Router()

route.get('/hashtag/:hashtag', authTokenValidate, hashtagValidation, getPostsWithTheHashtag)
route.get('/trending', authTokenValidate, getTrendings)

export default route