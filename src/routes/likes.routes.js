import { Router } from "express";
import { getAllLikes, postLikes, removeLikes } from "../controllers/likes.controllers.js";
import { validUsers } from "../middlewares/likes.middlewares.js";
import { authTokenValidate } from "../middlewares/validateToken.middleware.js";

const route = Router();

route.post("/likes/:post_id", authTokenValidate, validUsers, postLikes);
route.get("/likes/:post_id", authTokenValidate, validUsers, getAllLikes);
route.delete("/likes/:post_id",authTokenValidate, validUsers, removeLikes);
export default route;