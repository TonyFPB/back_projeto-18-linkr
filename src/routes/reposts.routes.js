import express from "express";

import { authTokenValidate } from "../middlewares/validateToken.middleware.js";
import {
  validateGetRepost,
  validateRepost,
  validateUnrepost,
} from "../middlewares/reposts.middlewares.js";
import {
  getReposts,
  repost,
  unrepost,
} from "../controllers/reposts.controllers.js";

const router = express.Router();
console.log("rote")
router.post("/repost/:post_id", authTokenValidate, (req, res, next) => {
  console.log("validated"); next()
},validateRepost, repost);
router.delete(
  "/repost/:post_id",
  authTokenValidate,
  validateUnrepost,
  unrepost
);
router.get(
  "/repost/:post_id",
  authTokenValidate,
  validateGetRepost,
  getReposts
);

export default router;
