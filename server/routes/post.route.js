import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createPost, getPosts, deletePost, updatePost, getPostStateByCategory } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/get_posts", getPosts);
router.get("/get_post_state_by_category", verifyToken, getPostStateByCategory);

router.post("/create", verifyToken, createPost);
router.delete("/delete/:postId/:userId", verifyToken, deletePost);
router.put("/update/:postId/:userId", verifyToken, updatePost);


export default router;  