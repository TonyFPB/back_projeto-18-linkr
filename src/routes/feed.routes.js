import express from "express";
import {getFeed} from "../controllers/feed.controllers.js";
import { authTokenValidate } from "../middlewares/validateToken.middleware.js";


const router = express.Router()

router.get('/feed', authTokenValidate, getFeed)

export default router