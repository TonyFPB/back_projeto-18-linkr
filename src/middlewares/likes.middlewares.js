import { findUserById } from "../repositories/likes.repositories.js";

export async function validUsers(req, res, next) {
    const id = res.locals;
    const { postId } = req.body;
    try {
        const userExists = await findUserById(id);

        if (userExists.rowCount === 0) {
            return res.sendStatus(404);
        }
        if (!postId) {
            return res.sendStatus(404);
        }

        res.locals.user_id = userExists.rows[0].id;
        res.locals.post_id = postId;
        next();
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}