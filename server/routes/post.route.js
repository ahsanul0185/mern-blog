import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createPost, getPosts, deletePost } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/get_posts", getPosts);
router.post("/create", verifyToken, createPost);
router.delete("/delete/:postId/:userId", verifyToken, deletePost);


export default router;