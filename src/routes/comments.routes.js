import { Router } from "express";
import { getComments, postComments } from "../controllers/comments.controllers.js";
import { validatePostIdComments } from "../middlewares/comments.middlewares.js";
import { validateSchema } from "../middlewares/schemaValidator.middleware.js";
import { authTokenValidate } from '../middlewares/validateToken.middleware.js'
import commentsSchema from "../schemas/comments.schema.js";
const commentsRoutes = Router()

commentsRoutes.get('/comments/:post_id', authTokenValidate, validatePostIdComments, getComments)
commentsRoutes.post('/comments/:post_id', validateSchema(commentsSchema), authTokenValidate, validatePostIdComments, postComments)

export default commentsRoutes

// `
// SELECT 
//     p.id,u1.name AS owner,p.url,p.message, 
//     ARRAY_AGG(
//          JSON_BUILD_OBJECT
//              ('id',c.id,
//                  'ownerComment',u2.name,
//                   'text',c.comment,
//                   'isOwner', CASE WHEN u1.id=u2.id THEN true ELSE false END    
//          )
//     ) AS comments
// FROM 
//     posts p 
// JOIN 
//     comments c 
// ON 
//     c.post_id = p.id
// JOIN 
//     users u1
// ON
//     u1.id=p.user_id
// JOIN
//     users u2
// ON
//     u2.id=c.user_id
// WHERE 
//     p.id=80
// GROUP BY
//     p.id, u1.name;`