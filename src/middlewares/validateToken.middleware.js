import jwt from 'jsonwebtoken'

export function authTokenValidate(req, res, next) {
    const { authorization } = req.headers
    if (!authorization) {
        return res.sendStatus(401)
    }
    const [schema, token] = authorization.split(' ')

    if (schema !== 'Bearer' || !token) {
        return res.sendStatus(401)
    }

    let errorJWT;
    let decodedJWT;

    jwt.verify(token, process.env.SECRET_JWT, (error, decoded) => {
        errorJWT = error
        decodedJWT = decoded
    })

    if (errorJWT) {
        return res.sendStatus(401)
    }

    res.locals = decodedJWT.id

    next()
}