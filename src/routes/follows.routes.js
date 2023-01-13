import { Router } from "express";
import { follow, getAllFollowsByUser, getFollows, unfollow } from "../controllers/follows.controllers.js";
import { checkFollowOrUnfollow, followValidate, unfollowValidate } from "../middlewares/follows.middleware.js";
import { userValidation } from "../middlewares/users.middleware.js";
import { authTokenValidate } from "../middlewares/validateToken.middleware.js";

const route = Router()

route.post("/user/:id/follow", authTokenValidate,userValidation,followValidate,follow)
route.delete("/user/:id/follow", authTokenValidate, userValidation,unfollowValidate, unfollow)
route.get("/user/:id/follows", authTokenValidate,userValidation,checkFollowOrUnfollow, getFollows)
route.get("/users/follows", authTokenValidate, getAllFollowsByUser)

export default route