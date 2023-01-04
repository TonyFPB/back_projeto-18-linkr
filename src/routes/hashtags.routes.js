import { Router } from "express";
import { authTokenValidate } from "../middlewares/validateToken.middleware.js";

const route = Router()

route.get('/hashtag/:hashtag', authTokenValidate, getPostsWithTheHashtag)

export default route