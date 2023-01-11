import express from "express";
import {
  repost,
  deletePost,
  getPosts,
  postNew,
  putPost,
  getPostsWithTheHashtag,
  unrepost
} from "../controllers/post.controllers.js";
import {
  validateDeletePost,
  validatePost,
  validatePutPost,
  validateRepost,
  validateUnrepost,
  // hashtagValidation
} from "../middlewares/posts.middlewares.js";
import { authTokenValidate } from "../middlewares/validateToken.middleware.js";


const router = express.Router();

router.post("/post", authTokenValidate, validatePost, postNew);
router.get("/post", authTokenValidate, getPosts);
router.put("/post/:id", authTokenValidate, validatePutPost, putPost);
router.delete(
  "/post/:post_id",
  authTokenValidate,
  validateDeletePost,
  deletePost)
router.post("/repost/:post_id", authTokenValidate, validateRepost, repost);
router.delete("/repost/:post_id", authTokenValidate, validateUnrepost, unrepost)
// router.get('/post/:hashtag', authTokenValidate, hashtagValidation, getPostsWithTheHashtag)


export default router;
