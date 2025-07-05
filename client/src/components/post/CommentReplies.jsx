import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import axios from "axios";
import { useSelector } from "react-redux";

const CommentReplies = ({ replies, parentComment, setParentComments }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replyComments, setReplyComments] = useState([]);

  const { currentUser } = useSelector((state) => state.userR);

  useEffect(() => {
    const getReplies = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/comment/get_comment_replies/${
            parentComment._id
          }`, {withCredentials : true}
        );
        if (res.status === 200) {
          setReplyComments(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getReplies();
  }, [showReplies, replies]);

  const handleLike = async (comment) => {
    const commentId = comment._id;
    if (!currentUser) {
      return toast("You need sign in first to like the comment");
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/comment/like_comment/${commentId}`, {}, {withCredentials : true}
      );

      if (res.status === 200) {
        setReplyComments((prev) =>
          prev.map((comment) =>
            comment._id === commentId
              ? { ...comment, likes: res.data.likes }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <button
        onClick={() => setShowReplies((prev) => !prev)}
        className="text-sm my-2 flex items-center gap-2 cursor-pointer hover:bg-primary/30 px-2 rounded py-0.5"
      >
        {replies.length} {replies.length > 1 ? "Replies" : "Reply"}{" "}
        {!showReplies ? <FaAngleDown /> : <FaAngleUp />}
      </button>

      {showReplies && (
        <div className="flex flex-col gap-4">
          {replyComments.map((reply) => (
            <Comment
              key={reply._id}
              onLike={handleLike}
              setComments={setReplyComments}
              comment={reply}
              setParentComments={setParentComments}
              type="reply"
              setShowReplies={setShowReplies}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentReplies;
