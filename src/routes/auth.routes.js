import Router from "express";
import { postSignUp } from "../controllers/auth.controllers.js";
import { conflictUserEmail } from "../middlewares/auth.middlewares.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import signUpSchema from "../schemas/signup.schemas.js";

const authRoutes = Router()

authRoutes.post('/signin')

authRoutes.post('/signup', validateSchema(signUpSchema), conflictUserEmail, (req,res)=>res.send("ok"))

export default authRoutes