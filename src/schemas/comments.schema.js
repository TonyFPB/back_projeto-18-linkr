import Joi from 'joi'

const commentsSchema = Joi.object({
    comment: Joi.string().trim().required()
})

export default commentsSchema