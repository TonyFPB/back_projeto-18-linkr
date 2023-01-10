import { deleteLike, getAllPostLikes, getLikesFromUser, insertLikes } from "../repositories/likes.repositories.js";

export async function postLikes(req, res) {
    const { user_id, post_id } = req.data;

    try {

        await insertLikes(user_id, Number(post_id));

        res.sendStatus(201);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
export async function removeLikes(req, res) {
    const { user_id, post_id } = req.data;

    try {

        const like = await getLikesFromUser(user_id, Number(post_id));

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
    const { post_id } = req.data;

    try {
        const likes = await getAllPostLikes(Number(post_id));

        res.send(
            { likes: likes.rows }
        );

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}