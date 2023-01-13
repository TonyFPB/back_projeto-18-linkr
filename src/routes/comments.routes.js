import { Router } from "express";
import { getAmount, getComments, postComments } from "../controllers/comments.controllers.js";
import { validatePostIdComments } from "../middlewares/comments.middlewares.js";
import { validateSchema } from "../middlewares/schemaValidator.middleware.js";
import { authTokenValidate } from '../middlewares/validateToken.middleware.js'
import commentsSchema from "../schemas/comments.schema.js";
const commentsRoutes = Router()

commentsRoutes.get('/comments/:post_id', authTokenValidate, validatePostIdComments, getComments)
commentsRoutes.get('/comments/amount/:post_id',authTokenValidate, validatePostIdComments, getAmount)
commentsRoutes.post('/comments/:post_id', validateSchema(commentsSchema), authTokenValidate, validatePostIdComments, postComments)

export default commentsRoutes
