import Router from "express";
import { authTokenValidate } from "../middlewares/validateToken.middleware.js";
import {getUser, getUserById, getUserByName} from "../controllers/users.controllers.js"

const usersRoutes = Router()

usersRoutes.get('/user/:id', authTokenValidate, getUserById)

usersRoutes.get('/user-by-name/:name', authTokenValidate, getUserByName)

usersRoutes.get('/user', authTokenValidate, getUser)

export default usersRoutes