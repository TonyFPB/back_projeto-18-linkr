import express from "express";
import cors from  "cors";
import dotenv from "dotenv";

import postRouter from "./routes/posts.routes.js"
import authRouter from "./routes/auth.routes.js"

dotenv.config();

const app = express()
app.use(express.json())
app.use(cors())

app.use(postRouter)
app.use(authRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Projeto rodando na porta " + PORT)
})