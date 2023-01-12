import { findUserImageById } from "../repositories/users.repositories.js"

export async function userValidation(req,res,next){
    const {id} = req.params

    if(isNaN(parseInt(id))){
        return res.sendStatus(400)
    }

    const userValidate = await findUserImageById(id)

    if (userValidate.rows.length===0){
        return res.sendStatus(404)
    }
    
    req.user = {id: userValidate.rows[0].id,
    name: userValidate.rows[0].name,
    image: userValidate.rows[0].image}
    
    next()
}