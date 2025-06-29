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



export const getPosts = async (req, res, next) => {

  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 9;

  const sortDirection = req.query.order === "asc" ? 1 : -1;

  try {

    const posts = await Post.find({
      ...(req.query.userId && {userId : req.query.userId}),
      ...(req.query.category && {category : req.query.category}),
      ...(req.query.slug && {slug : req.query.slug}),
      ...(req.query.postId && {_id : req.query.postId}),
      ...(req.query.searchTerm && {
        $or : [
          {title : {$regex : req.query.searchTerm, $options : "i"}},
          {content : {$regex : req.query.searchTerm, $options : "i"}},
        ]
      }),
    }).sort({updatedAt : sortDirection}).skip(startIndex).limit(limit);

    const totalPosts = await Post.countDocuments();
    
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt : {$gte : oneMonthAgo}
    });

    res.status(200).json({posts, totalPosts, lastMonthPosts});
    
  } catch (error) {
    next(error)
  }
}


export const getPostStateByCategory = async (req, res, next) => {

  if (req.user.role !== "admin") {
    return next(errorHandler(403, "You are not allowed to get the post stats by category"))
  }

  try {

    const stats = await Post.aggregate([
      {
        $group : {
          _id : "$category",
          posts : {$sum : 1}
        }
      },
      {
        $project : {
          _id : 0,
          category : "$_id",
          posts : 1
        }
      },
      {
        $sort : {posts : -1}
      }
    ]);

    
    res.status(200).json(stats);
    
  } catch (error) {
    next(error)
  }
}




export const deletePost = async (req, res, next) => {

  if (req.user.role !== "admin" || req.user.id !== req.params.userId) {
    return next(403, 'You are not allowed to delete this post')
  }
  
  try {
   
    await Post.findByIdAndDelete(req.params.postId)
    res.status(200).json({message : "The post has been deleted"})
    
  } catch (error) {
    next(error);
  }

}

export const updatePost = async (req, res, next) => {

  const {userId, postId} = req.params;
  let {title, content, category, tags, coverImage } = req.body;

  if (!coverImage) {
    coverImage = "https://blog.kanalysis.com/wp-content/uploads/2023/01/placeholder-116.png";
  }


  if (req.user.role !== "admin" || req.user.id !== userId) {
    return next(403, 'You are not allowed to update this post')
  }

  try {
   
    const updatedPost = await Post.findByIdAndUpdate(postId, {
      $set : {
        title,
        content,
        coverImage,
        category,
        tags
      }
    }, {new : true})
    
    res.status(200).json(updatedPost);
    
  } catch (error) {
    next(error);
  }

}