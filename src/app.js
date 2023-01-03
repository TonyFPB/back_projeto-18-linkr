import express from "express";
import cors from  "cors";
import dotenv from "dotenv";

import postRouter from "./routes/posts.routes.js"

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())

app.use(postRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Projeto rodando na porta " + PORT)
})