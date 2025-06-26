import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { toast } from "sonner";
import Loader from "../loaders/Loader";
import axios from "axios";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.userR);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitComment = async () => {

    if (commentText.length > 200) {
      return toast.error("Comments can be up to 200 characters long.")
    }

    try {
      setLoading(true);

      const res = await axios.post('/api/comment/create', {userId : currentUser._id,postId, content : commentText});

      if ( res.status === 201) {
        console.log(res.data);
      }
      setLoading(false);
      console.log(res)
    toast.success("Comment added", {style : {backgroundColor : "#008b8c", color : "white", border : "1px solid rgba(255, 255, 255, 0.4)"}});


    } catch (error) {
      setLoading(false);
      console.log(error)
      toast.error("Failed to comment")
    }
  }

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold">Comments</h2>

      <div className="mt-5">
        {!currentUser ? (
          <Link className="button-primary" to="/sign-in">
            Sign in to comment on this post
          </Link>
        ) : (
          <div>
            <div className="flex items-start gap-3">
              <Link to="/dashboard?tab=profile" className="shrink-0">
                <img
                  src={currentUser.profilePicture}
                  className="w-10 aspect-square object-cover rounded-full border border-gray-200/40"
                  alt="profile picture"
                />
              </Link>

              <div className="grow flex flex-col gap-2">
                <div className="relative focus-within:w-full group">
                  <textarea
                    className="border-b border-gray-300 dark:border-b-gray-200/40 w-full pb-1  outline-none resize-none overflow-hidden"
                    rows={1}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write your comment..."
                    maxLength={200}
                    onInput={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                  ></textarea>
                  <span className="absolute w-full h-[2px] bg-gray-400 dark:bg-gray-300 bottom-[7px] left-0 transition-transform scale-x-0 ease-out group-focus-within:scale-x-100 origin-center duration-300 pointer-events-none"></span>
                </div>

               <div className="flex items-start gap-2 justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">{200 - commentText.length} characters remaining</span>
                 <div className="flex items-center gap-2 justify-end">
                    <button className="button-primary bg-transparent text-sm text-gray-800 hover:bg-primary/30 dark:text-gray-200">Cancel</button>
                    <button onClick={handleSubmitComment} className="button-primary text-sm flex items-center gap-1.5" disabled={loading}>{loading && <Loader />} Comment</button>
                </div>
               </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
