import { Router } from "express";
import { getTrendings } from "../controllers/hashtags.controllers.js";
import { authTokenValidate } from "../middlewares/validateToken.middleware.js";

const route = Router()

route.get('/trending', authTokenValidate, getTrendings)

export default route