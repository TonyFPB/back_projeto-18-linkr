import express from "express";
import { getNew, moreFeed} from "../controllers/feed.controllers.js";
import { authTokenValidate } from "../middlewares/validateToken.middleware.js";


const router = express.Router()

router.post("/new", authTokenValidate, getNew)
router.get("/more/:n", authTokenValidate, moreFeed)

export default router
