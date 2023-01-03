import { insertLikes } from "../repositories/likes.repositories.js";

export async function postLikes(req, res) {
    const user_id = res.locals.user_id;
    const post_id = res.locals.post_id;

    try {
        const createdAt = new Date();

        await insertLikes(user_id, post_id, createdAt);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function getLikes(req, res){

}