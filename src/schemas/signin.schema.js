import Joi from "joi"

const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().trim().min(6).max(10).required()
})

export default signInSchema