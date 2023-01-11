import express from "express"

import { authTokenValidate } from "../middlewares/validateToken.middleware.js";
import {validateRepost, validateUnrepost} from "../middlewares/reposts.middlewares.js"
import {repost, unrepost} from "../controllers/reposts.controllers.js"

const router = express.Router()

router.post("/repost/:post_id", authTokenValidate, validateRepost, repost);
router.delete("/repost/:post_id", authTokenValidate, validateUnrepost, unrepost)
router.get("/reposts")

export default router