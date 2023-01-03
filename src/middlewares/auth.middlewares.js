import connection from "../db/db.js"

export async function conflictUserEmail(req, res, next) {
    const {email} = req.body
    try{    
        const userExists = await connection.query(`SELECT * FROM users WHERE email=$1`,[email])
        if(userExists.rowCount > 0 ){
            return res.sendStatus(409)
        }
        next()
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}