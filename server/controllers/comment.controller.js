import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  const { content, postId, userId } = req.body;

  if (userId !== req.user.id) {
    return next(
      errorHandler(403, "You are not allowed to create this comment")
    );
  }
  try {
    const newComment = new Comment({
      content,
      postId,
      userId,
    });

    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};


export const getPostComments = async (req, res, next) => {
  if (!req.params.postId) {
    return next(errorHandler(400, "Please provide a post id"));
  }
  


  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};


export const getAllComments = async (req, res, next) => {

  if (req.user.role !== "admin") {
    return next(errorHandler(403, "You are not allowed to get all the comments"));
  }

    const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const sortDirection = req.query.sort === "desc" ? -1 : 1;

  try {
    const comments = await Comment.find({parentCommentId : null}).sort({
      createdAt: sortDirection,
    }).skip(startIndex).limit(limit);

    const totalComments = await Comment.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastMonthComments = await Comment.countDocuments({createdAt : {$gte : oneMonthAgo}});

    res.status(200).json({comments, totalComments, lastMonthComments});
  } catch (error) {
    next(error);
  }
};


export const likeComment = async (req, res, next) => {
  if (!req.params.commentId) {
    return next(errorHandler(400, "Please provide a comment id"));
  }

  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return next(errorHandler(400, "Comment not found"));
    }

    const userIndex = comment.likes.indexOf(req.user.id);

    if (userIndex === -1) {
      comment.likes.push(req.user.id);
    } else {
      comment.likes.splice(userIndex, 1);
    }

    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};


export const editComment = async (req, res, next) => {
  if (!req.params.commentId) {
    return next(errorHandler(400, "Please provide a comment id"));
  }

  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return next(errorHandler(400, "Comment not found"));
    }

    if (comment.userId !== req.user.id && !req.user.role === "admin") {
      return next(
        errorHandler(403, "You are not allowed to edit this comment")
      );
    }

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { content: req.body.content },
      { new: true }
    );

    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  if (!req.params.commentId) {
    return next(errorHandler(400, "Please provide a comment id"));
  }

  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return next(errorHandler(400, "Comment not found"));
    }

    if (comment.userId !== req.user.id && !req.user.role === "admin") {
      return next(
        errorHandler(403, "You are not allowed to edit this comment")
      );
    }

    if (comment.parentCommentId) {
           await Comment.findByIdAndUpdate(comment.parentCommentId, {
        $pull: { replies: comment._id },
      });
    }

    await Comment.findByIdAndDelete(req.params.commentId);

    res
      .status(200)
      .json({ message: `commentId : ${comment._id} deleted successfully` });
  } catch (error) {
    next(error);
  }
};



export const replyComment = async (req, res, next) => {

  if (!req.params.commentId) {
    return next(errorHandler(400, "Please provide a comment id"));
  }

  try {
    const parentComment = await Comment.findById(req.params.commentId);

    if (!parentComment) {
      return next(errorHandler(400, "Comment not found"));
    }

const newReplyComment = await Comment.create({
  userId: req.user.id,
  postId: req.body.postId,
  parentCommentId: parentComment._id,
  content: req.body.content,
});

        const updatedParent = await Comment.findByIdAndUpdate(
      parentComment._id,
      { $push: { replies: newReplyComment._id } },
      { new: true }
    );

    res
      .status(200)
      .json(updatedParent);
  } catch (error) {
    next(error);
  }
};



export const getCommentReplies = async (req, res, next) => {

  if (!req.params.commentId) {
    return next(errorHandler(400, "Please provide a comment id"));
  }

  try {
   
    const commentReplies = await Comment.find({parentCommentId : req.params.commentId});

    if (commentReplies.length === 0) {
       return next(errorHandler(404, "No replies found"));
    }
    
    res
      .status(200)
      .json(commentReplies);
  } catch (error) {
    next(error);
  }
};
