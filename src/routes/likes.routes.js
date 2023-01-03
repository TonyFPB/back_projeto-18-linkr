import { Router } from "express";
import { getAllLikes, postLikes } from "../controllers/likes.controllers.js";
import { validUsers } from "../middlewares/likes.middlewares.js";
import { authTokenValidate } from "../middlewares/validateToken.middleware.js";

const route = Router();

route.post("/likes", authTokenValidate, validUsers, postLikes);
route.get("/likes", authTokenValidate, validUsers,getAllLikes);
export default route;