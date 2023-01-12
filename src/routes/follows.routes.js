import { Router } from "express";
import { follow, getPostsByFollows, unfollow } from "../controllers/follows.controllers.js";
import { followValidate, unfollowValidate } from "../middlewares/follows.middleware.js";
import { userValidation } from "../middlewares/users.middleware.js";
import { authTokenValidate } from "../middlewares/validateToken.middleware.js";

const route = Router()

route.post("/user/:id/follow", authTokenValidate,userValidation,followValidate,follow)
route.delete("/user/:id/follow", authTokenValidate, userValidation,unfollowValidate, unfollow)
route.get("/posts/follows", authTokenValidate, getPostsByFollows)

export default route