import { GoogleGenerativeAI } from "@google/generative-ai";
import { errorHandler } from "../utils/error.js";
import {blogPostIdeasPrompt, blogSummeryPrompt, generateReplyPrompt} from "../utils/prompts.js"
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


// GENERATE BLOG POST
export const generateBlogPost = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      errorHandler(403, "You are not allowed to generate ideas using ai")
    );
  }

  try {
    const { title, tone } = req.body;

    if (!title || !tone) {
      return next(errorHandler(400, "Missing required fields"));
    }

    const prompt = `Write a markdown-formatted blog post titled "${title}". Use a tone ${tone}. Include an introduction, subheadings, code examples if relevent, and a conclusion. Just return the markdown only.`

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    const cleanedText = response.replace(/^```markdown\s*/, "").replace(/```$/, "").trim();

    res.status(200).json(cleanedText);
  } catch (error) {
    next(error);
  }
};


// BLOG POST IDEAS
export const generateBlogIdeas = async (req, res, next) => {

    const {topics} = req.body;

  if (req.user.role !== "admin") {
    return next(
      errorHandler(403, "You are not allowed to generate ideas using ai")
    );
  }
   if (!topics) {
      return next(errorHandler(400, "Missing required fields"));
    }

    const prompt = blogPostIdeasPrompt(topics)
  

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    const cleanedText = response.replace(/^```json\s*/, "").replace(/```$/, "").trim();

    const data = JSON.parse(cleanedText);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};


// COMMENT REPLY
export const generateCommentReply = async (req, res, next) => {

    const {content} = req.body;

  if (req.user.role !== "admin") {
    return next(
      errorHandler(403, "You are not allowed to generate ideas using ai")
    );
  }
   if (!content) {
      return next(errorHandler(400, "Missing required fields"));
    }

    const prompt = generateReplyPrompt({content})
  

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};



// BLOG SUMMARY
export const generatePostSummary = async (req, res, next) => {

    const {content} = req.body;

   if (!content) {
      return next(errorHandler(400, "Missing required fields"));
    }

    const prompt = blogSummeryPrompt(content)

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();


    const cleanedText = response.replace(/^```json\s*/, "").replace(/```$/, "").trim();

    const data = JSON.parse(cleanedText);


    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
