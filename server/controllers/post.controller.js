import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";
import slugify from "slugify";

export const createPost = async (req, res, next) => {
  const { title, content, coverImage } = req.body;

  if (req.user.role !== "admin") {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }

  if (!title || !content) {
    return next(errorHandler(400, "Please provide all required fileds"));
  }

  if (!coverImage) {
    const {coverImage, ...rest} = req.body;
    req.body = rest;
  }

  const slug = slugify(title.toLowerCase());

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const createdPost = await newPost.save();
    res.status(201).json(createdPost);
  } catch (error) {
    next(error);
  }
};
