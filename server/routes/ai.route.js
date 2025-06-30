import express from "express"
import {generateBlogIdeas} from "../controllers/ai.controller.js"
import { verifyToken } from "../utils/verifyUser.js";
import { generateBlogPost } from "../controllers/ai.controller.js";
import { generateCommentReply } from "../controllers/ai.controller.js";
import { generatePostSummary } from "../controllers/ai.controller.js";

const router = express.Router();


router.post("/generate_post_ideas", verifyToken, generateBlogIdeas);
router.post("/generate_blog_post", verifyToken, generateBlogPost);
router.post("/generate_commment_reply", verifyToken, generateCommentReply);
router.post("/generate_post_summary", verifyToken, generatePostSummary);




export default router