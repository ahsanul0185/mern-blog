import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loader from "../loaders/Loader";
import axios from "axios";
import Comment from "./Comment";
import InputCommentField from "./InputCommentField";
import CommentReplies from "./CommentReplies";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.userR);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  


  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(`/api/comment/get_post_comments/${postId}`);

        if (res.status === 200) {
          setComments(res.data);
        }
      } catch (error) {
        console.log(error);
        toast.error("Could not get the comments");
      }
    };

    getComments();
  }, [postId]);

  const handleSubmitComment = async () => {
    if (commentText.length > 200) {
      return toast.error("Comments can be up to 200 characters long.");
    }

    try {
      setLoading(true);

      const res = await axios.post("/api/comment/create", {
        userId: currentUser._id,
        postId,
        content: commentText,
      });

      if (res.status === 201) {
        setCommentText("");
        setComments((prev) => [res.data, ...prev]);
      }
      setLoading(false);
      toast.success("Comment added", {
        style: {
          backgroundColor: "#008b8c",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.4)",
        },
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Failed to comment");
    }
  };

  const handleLike = async (comment) => {
    const commentId = comment._id;
    if (!currentUser) {
      return toast("You need sign in first to like the comment");
    }

    try {
      const res = await axios.put(`/api/comment/like_comment/${commentId}`);

      if (res.status === 200) {
        setComments((prev) =>
          prev.map((comment) =>
            comment._id === commentId
              ? { ...comment, likes: res.data.likes }
              : comment
          )
        );
        console.log(res.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <span>
          {comments.length > 0 &&
            (comments.length < 10 ? "0" + comments.length : comments.length)}
        </span>
        Comments
      </h2>

      <div className="mt-7">
        {!currentUser ? (
          <Link className="button-primary" to="/sign-in">
            Sign in to comment on this post
          </Link>
        ) : (
          <div>
            <InputCommentField
              text={commentText}
              setText={setCommentText}
              loading={loading}
              onSubmit={handleSubmitComment}
              onCancel={() => setCommentText("")}
              buttonText="Comment"
            />
          </div>
        )}

        {/* Comments */}
        <div className="mt-6 flex flex-col gap-6">
          {comments.length !== 0 ? (
            comments.map((comment) => (
              comment.parentCommentId === null && <div key={comment._id}>
                <Comment
                  comment={comment}
                  onLike={handleLike}
                  setComments={setComments}
                />
                {comment.replies.length !== 0 && <div className="ml-13"><CommentReplies parentComment={comment} replies={comment.replies} setParentComments={setComments}/></div>}
              </div>
            ))
          ) : (
            <h2 className="text-gray-600 dark:text-gray-300 italic">
              No comments yet!
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
