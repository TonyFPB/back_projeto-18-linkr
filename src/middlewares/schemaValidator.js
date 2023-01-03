
export function validateSchema(schema) {
    return(req, res, next) => {
        const { body } = req
        const validation = schema.validate(body, { abortEarly: false })
        if (validation.error) {
            const errors = validation.error.details.map(d => d.message)
            return res.status(422).send({ message: errors })
        }
        req.body = validation.value
        next()
    }
}