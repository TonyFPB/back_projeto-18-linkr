import express from "express";
import {getFeed, moreFeed} from "../controllers/feed.controllers.js";
import { authTokenValidate } from "../middlewares/validateToken.middleware.js";


const router = express.Router()

router.get('/feed', authTokenValidate, getFeed)
router.get("/new", authTokenValidate, )
router.get("/more/:n", authTokenValidate, moreFeed)

export default router