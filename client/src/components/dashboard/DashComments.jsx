import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../loaders/Loader";
import { useNavigate } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Comment from "../post/Comment";
import DashCommentsSkeleton from "../loaders/DashCommentsSkeleton";
import { toast } from "sonner";

const DashComments = () => {
  const { currentUser } = useSelector((state) => state.userR);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showMoreLoading, setShowMoreLoading] = useState(false);

  useEffect(() => {
    const getAllComments = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/comment/get_all_comments?sort=desc`, {withCredentials : true}
        );
        if (res.status === 200) {
          setComments(res.data.comments);
        }

        if (
          res.data.comments.map((comment) => comment.parentCommentId === null)
            .length < 10
        ) {
          setShowMore(false);
        } else {
          setShowMore(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser.role === "admin") getAllComments();
  }, []);

  const handleShowMorePosts = async () => {
    const startIndex = comments.map(
      (comment) => comment.parentCommentId === null
    ).length;

    try {
      setShowMoreLoading(true);
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/comment/get_all_comments?startIndex=${startIndex}&sort=desc`, {withCredentials : true}
      );
      if (res.status === 200) {
        setComments((prev) => [...prev, ...res.data.comments]);
      }
      if (
        res.data.comments.length < 9 ||
        res.data.totalComments === comments.length + res.data.comments.length
      ) {
        setShowMore(false);
      }
      setShowMoreLoading(false);
    } catch (error) {
      setShowMoreLoading(false);
      toast.error(error?.response?.data?.messasge);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold">Comments</h2>
      {loading ? (
        <DashCommentsSkeleton />
      ) : (
        <div className="mt-12 flex flex-col gap-5">
          {comments?.map(
            (comment) =>
              comment.parentCommentId === null && (
                <CommentRow
                  setComments={setComments}
                  setLoading={setLoading}
                  key={comment._id}
                  comment={comment}
                />
              )
          )}
        </div>
      )}

      {showMore && !loading && (
          <button
            onClick={handleShowMorePosts}
            className={`button-primary mt-6 w-full flex gap-2 items-center justify-center ${showMoreLoading ? "bg-primary/40" : ""}`}
          >
            {showMoreLoading && <Loader />}Show More
          </button>
        )}
    </div>
  );
};

export default DashComments;

const CommentRow = ({ comment, setComments }) => {
  const [post, setPost] = useState(null);

  const [showReplies, setShowReplies] = useState(false);
  const [replyComments, setReplyComments] = useState([]);

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.userR);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/post/get_posts?postId=${
            comment.postId
          }`, {withCredentials : true}
        );
        if (res.status === 200) {
          setPost(res.data.posts[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, []);

  useEffect(() => {
    const getReplies = async () => {
      if (comment.replies.length === 0) return;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/comment/get_comment_replies/${
            comment._id
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
  }, [showReplies, comment]);

  const handleLike = async (commentToLike) => {
    const commentId = commentToLike._id;
    if (!currentUser) {
      return toast("You need sign in first to like the comment");
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/comment/like_comment/${commentId}`,{}, {withCredentials : true}
      );

      if (res.status === 200) {
        if (commentToLike.parentCommentId === null) {
          setComments((prev) =>
            prev.map((comment) =>
              comment._id === commentId
                ? { ...comment, likes: res.data.likes }
                : comment
            )
          );
        } else {
          setReplyComments((prev) =>
            prev.map((comment) =>
              comment._id === commentId
                ? { ...comment, likes: res.data.likes }
                : comment
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" bg-white/10 dark:bg-primaryDark p-4 rounded group border border-gray-300 dark:border-gray-200/20">
      <div className="flex flex-col xl:flex-row justify-between items-start gap-3">
        <div className="w-full">
          <div className="w-full ">
            <Comment
              setComments={setComments}
              comment={comment}
              onLike={handleLike}
              setShowReplies={setShowReplies}
            />
            {replyComments.length > 0 && (
              <button
                onClick={() => setShowReplies((prev) => !prev)}
                className="text-sm mt-2 flex items-center gap-2 ml-11 cursor-pointer hover:bg-primary/30 px-2 rounded py-0.5"
              >
                {replyComments?.length}{" "}
                {replyComments?.length > 1 ? "Replies" : "Reply"}{" "}
                {!showReplies ? <FaAngleDown /> : <FaAngleUp />}
              </button>
            )}
          </div>

          {showReplies && (
            <div className="mt-3 flex flex-col gap-3 ml-13">
              {replyComments.map((reply) => (
                // <div>{reply.content}</div>
                <Comment
                  key={reply._id}
                  setComments={setReplyComments}
                  comment={reply}
                  setParentComments={setComments}
                  type="reply"
                  setShowReplies={setShowReplies}
                  onLike={handleLike}
                />
              ))}
            </div>
          )}
        </div>

        {/* Post */}
        <div
          className="flex items-center gap-3 xl:w-[40%] shrink-0 cursor-pointer mt-4"
          onClick={() => navigate(`/post/${post?.slug}`)}
        >
          <img
            src={post?.coverImage || null}
            alt="post image"
            className="w-16 aspect-[3/2] shrink-0 object-cover rounded"
          />
          <h3 className="text-sm line-clamp-2 hover:text-teal-400 duration-200">
            {post?.title}
          </h3>
        </div>
      </div>
    </div>
  );
};
