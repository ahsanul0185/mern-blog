import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";
import moment from "moment";
import { useSelector } from "react-redux";
import InputCommentField from "./InputCommentField";
import Modal from "../Modal";
import { IoAlertCircleOutline } from "react-icons/io5";
import { toast } from "sonner";
import Loader from "../loaders/Loader";

const Comment = ({ comment, onLike, setComments, type, setParentComments }) => {
  const [user, setUser] = useState(null);
  const { currentUser } = useSelector((state) => state.userR);

  const [editCommentText, setEditCommentText] = useState(comment.content || "");
  const [loading, setLoading] = useState(false);
  const [activeModal, setActiveModal] = useState("");

  const [isReplying, setIsReplying] = useState(false);
  const [replyCommentText, setReplyCommentText] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/user/${comment.userId}`);
        if (res.status === 200) {
          setUser(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [comment]);

  const handleEditComment = async () => {
    try {
      const res = await axios.put(`/api/comment/edit_comment/${comment._id}`, {
        content: editCommentText,
      });
      if (res.status === 200) {
        setComments((prev) =>
          prev.map((c) =>
            c._id === comment._id
              ? { ...c, isEditing: false, content: res.data.content }
              : c
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await axios.delete(
        `/api/comment/delete_comment/${commentId}`
      );

      if (res.status === 200) {
        setComments((prev) => prev.filter((c) => c._id !== comment._id));

        if (type === "reply") {
          setParentComments((prev) =>
            prev.map((c) =>
              c.replies.includes(commentId)
                ? {
                    ...c,
                    replies: c.replies.filter((rId) => rId !== commentId),
                  }
                : c
            )
          );
        }

        setActiveModal(null);
        toast("Comment deleted successfully");
      }
    } catch (error) {
      setActiveModal(null);
      console.log(error);
    }
  };

  const handleReplyComment = async () => {
    try {
      const res = await axios.put(`/api/comment/reply_comment/${comment._id}`, {
        postId: comment.postId,
        userId: currentUser._id,
        content: replyCommentText,
      });

      if (res.status === 200) {
        setComments((prev) =>
          prev.map((c) => (c._id === comment._id ? res.data : c))
        );
        setIsReplying(false);
        setReplyCommentText("");
        toast("Replied successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return <Loader />;

  return !comment.isEditing ? (
    <div className="flex gap-3 items-start">
      <img
        src={
          user?.profilePicture ||
          "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
        }
        alt="user profile"
        className={`${
          type === "reply" ? "w-8" : "w-10"
        } aspect-square shrink-0 object-cover rounded-full border border-gray-200/40`}
      />
      <div className="grow">
        <div className="flex text-sm gap-2 items-center text-gray-600 dark:text-gray-300">
          <h3 className="font-semibold">
            {user ? `@${user.username}` : "Anonymous"}
          </h3>
          <span className="text-xs">{moment(comment.createdAt).fromNow()}</span>
        </div>

        <p>{comment.content}</p>

        {/* Comment Actions */}
        {type !== "dash" && (
          <div className="text-xs mt-2 flex items-center gap-2">
            <button
              onClick={() => onLike(comment)}
              className="cursor-pointer hover:bg-primary/30 size-6 grid place-items-center rounded duration-200"
            >
              {comment.likes.indexOf(currentUser?._id) === -1 ? (
                <RiThumbUpLine size={16} />
              ) : (
                <RiThumbUpFill size={16} />
              )}
            </button>
            <span>
              {comment.likes.length}{" "}
              {comment.likes.length > 1 ? "Likes" : "Like"}
            </span>
            {(currentUser?._id === comment.userId ||
              currentUser?.role === "admin") && (
              <>
                <button
                  onClick={() =>
                    setComments((prev) =>
                      prev.map((item) =>
                        item._id === comment._id
                          ? { ...item, isEditing: true }
                          : { ...item, isEditing: false }
                      )
                    )
                  }
                  className="cursor-pointer hover:bg-primary/30 rounded px-1 py-0.5"
                >
                  Edit
                </button>
                <button
                  onClick={() => setActiveModal("delete-comment")}
                  className="cursor-pointer hover:bg-red-500/60 rounded px-1 py-0.5"
                >
                  Delete{" "}
                </button>
              </>
            )}
            {type !== "reply" && (
              <button
                onClick={() => setIsReplying(true)}
                className="cursor-pointer hover:bg-primary/30 rounded px-1 py-0.5"
              >
                Reply{" "}
              </button>
            )}
          </div>
        )}

        {isReplying && (
          <InputCommentField
            text={replyCommentText}
            setText={setReplyCommentText}
            onSubmit={handleReplyComment}
            onCancel={() => setIsReplying(false)}
            buttonText="Reply"
            parentComment={comment}
          />
        )}
      </div>

      <Modal
        showModal={activeModal === "delete-comment"}
        setShowModal={setActiveModal}
      >
        <IoAlertCircleOutline className="text-7xl mx-auto text-gray-300" />
        <h2 className="font-bold text-2xl mt-2 text-center">
          Are you sure you want to delete this comment?
        </h2>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => handleDeleteComment(comment._id)}
            className="button-primary bg-red-600 hover:bg-red-700"
          >
            Delete
          </button>
          <button
            className="button-primary bg-gray-400 dark:bg-gray-400/30 dark:hover:bg-gray-400/50"
            onClick={() => setActiveModal(null)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  ) : (
    <InputCommentField
      text={editCommentText}
      setText={setEditCommentText}
      onSubmit={handleEditComment}
      loading={loading}
      buttonText="Save"
      onCancel={() =>
        setComments((prev) =>
          prev.map((item) => ({ ...item, isEditing: false }))
        )
      }
    />
  );
};

export default Comment;
