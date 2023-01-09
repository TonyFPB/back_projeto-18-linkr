import connection from "../db/db.js";
import { getTrendingsOrder } from "../repositories/hashtags.repositories.js";

export async function getTrendings(req,res){
    try {
        const trendings = await getTrendingsOrder()
        res.status(200).send(trendings.rows)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
    
}