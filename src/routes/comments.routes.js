import { Router } from "express";
import { postComments } from "../controllers/comments.controllers.js";
import { validatePostIdComments } from "../middlewares/comments.middlewares.js";
import { validateSchema } from "../middlewares/schemaValidator.middleware.js";
import { authTokenValidate } from '../middlewares/validateToken.middleware.js'
import commentsSchema from "../schemas/comments.schema.js";
const commentsRoutes = Router()

commentsRoutes.get('/comments', authTokenValidate)
commentsRoutes.post('/comments/:post_id', validateSchema(commentsSchema), authTokenValidate, validatePostIdComments, postComments)

export default commentsRoutes