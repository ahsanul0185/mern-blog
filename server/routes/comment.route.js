import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createComment,
  getPostComments,
  likeComment,
  editComment,
  deleteComment,
  replyComment,
  getCommentReplies,
  getAllComments
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);

router.get("/get_post_comments/:postId", getPostComments);
router.get("/get_comment_replies/:commentId", getCommentReplies);
router.get("/get_all_comments", verifyToken, getAllComments);

router.put("/like_comment/:commentId", verifyToken, likeComment);
router.put("/edit_comment/:commentId", verifyToken, editComment);
router.put("/reply_comment/:commentId", verifyToken, replyComment);

router.delete("/delete_comment/:commentId", verifyToken, deleteComment);

export default router;
