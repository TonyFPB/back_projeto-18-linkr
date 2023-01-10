import { findUserById } from "../repositories/likes.repositories.js";

export async function validUsers(req, res, next) {
    const id = res.locals;
    const { post_id } = req.params;
    try {
        const userExists = await findUserById(id);

        if (userExists.rowCount === 0) {
            return res.sendStatus(404);
        }

        if (!post_id) {
            return res.sendStatus(404);
        }

        req.data = { user_id: userExists.rows[0].id, post_id: post_id }
        next();
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}