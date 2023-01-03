import { getLikes, insertLikes } from "../repositories/likes.repositories.js";

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

export async function getAllLikes(req, res) {
    const post_id = res.locals.post_id;
    try {
        const likes = await getLikes(post_id);

        res.send(
            { likes: likes.rows[0].count }
        );

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}