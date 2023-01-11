import Router from "express";
import { authTokenValidate } from "../middlewares/validateToken.middleware.js";
import {getUser, getUserById, getUserByName, getUserPostsById} from "../controllers/users.controllers.js"
import { userValidation } from "../middlewares/users.middleware.js";

const usersRoutes = Router()

usersRoutes.get('/user/:id/posts', authTokenValidate, getUserPostsById)

usersRoutes.get('/user/:id', authTokenValidate, userValidation, getUserById)

usersRoutes.get('/user-by-name/:name', authTokenValidate, getUserByName)

usersRoutes.get('/user', authTokenValidate, getUser)

export default usersRoutes