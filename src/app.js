import express from "express";
import cors from  "cors";
import dotenv from "dotenv";

import postRouter from "./routes/posts.routes.js"
import authRoutes from "./routes/auth.routes.js"
import usersRoutes from "./routes/users.routes.js";
import likes from "./routes/likes.routes.js";
import hashtagsRoutes from "./routes/hashtags.routes.js"
import commentsRoutes from "./routes/comments.routes.js";
import feedRouter from "./routes/feed.routes.js"
import repostRouter from "./routes/reposts.routes.js"

dotenv.config();

const app = express()
app.use(express.json())
app.use(cors())

app.use(postRouter)
app.use(authRoutes)
app.use(usersRoutes)
app.use(likes)
app.use(hashtagsRoutes)
app.use(commentsRoutes)
app.use(feedRouter)
app.use(repostRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Projeto rodando na porta " + PORT)
});