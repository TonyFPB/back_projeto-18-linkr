import Router from "express";
import { postSignUp, sendToken } from "../controllers/auth.controllers.js";
import { authenticationSignIn, conflictUserEmail } from "../middlewares/auth.middlewares.js";
import { validateSchema } from "../middlewares/schemaValidator.middleware.js";
import signInSchema from "../schemas/signin.schema.js";
import signUpSchema from "../schemas/signup.schemas.js";

const authRoutes = Router()

authRoutes.post('/signin', validateSchema(signInSchema), authenticationSignIn, sendToken)

authRoutes.post('/signup', validateSchema(signUpSchema), conflictUserEmail, postSignUp)

export default authRoutes