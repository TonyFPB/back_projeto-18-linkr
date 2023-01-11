import express from "express";
import { authTokenValidate } from "../middlewares/validateToken.middleware";


const router = express.Router()

router.get('/feed', authTokenValidate, (req, res) => res.send("ok"))