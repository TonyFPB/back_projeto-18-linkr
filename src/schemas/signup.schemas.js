import Joi from 'joi'

const signUpSchema = Joi.object({
    name:Joi.string().min(3).trim().required(),
    email:Joi.string().email().trim().required(),
    image:Joi.string().pattern(/\.(jpg|jpeg|png|webp|avif|gif)$/, 'image_url').required(),
    password:Joi.string().alphanum().trim().min(6).max(10).required()    
})

export default signUpSchema