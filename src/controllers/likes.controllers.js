import { deleteLike, getAllPostLikes, getLikesFromUser, insertLikes } from "../repositories/likes.repositories.js";

//adicionando o like
export async function postLikes(req, res) {
    const user_id = res.locals.user_id;
    const post_id = res.locals.post_id;

    try {
        const createdAt = new Date();

        await insertLikes(user_id, post_id, createdAt);

        res.sendStatus(201);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
export async function removeLikes(req, res) {
    const user_id = res.locals.user_id;
    const post_id = res.locals.post_id;

    try {

        const like = await getLikesFromUser(user_id, post_id);

        if (like.rowCount === 0) {
            return res.sendStatus(404);
        }

        await deleteLike(user_id, post_id);

        res.sendStatus(204);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
export async function getAllLikes(req, res) {
    const user_id = res.locals.user_id;
    const post_id = res.locals.post_id;
    try {
        const likes = await getAllPostLikes(post_id, user_id);

        res.send(
            { likes: likes.rows }
        );

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}