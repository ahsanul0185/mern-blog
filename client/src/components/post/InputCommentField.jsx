import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../loaders/Loader";
import { IoSparkles } from "react-icons/io5";
import { toast } from "sonner";
import axios from "axios";

const InputCommentField = ({
  text,
  setText,
  loading,
  onSubmit,
  buttonText,
  onCancel,
  parentComment = null,
}) => {
  const { currentUser } = useSelector((state) => state.userR);
  const initialText = useRef(text);

  const isChanged = text.trim() !== initialText.current.trim();

  const [loadingGReply, setLoadingGReply] = useState(false);

  const handleGenerateReply = async () => {
    try {
      setLoadingGReply(true);
      if (!parentComment.content) {
        return;
      }

      const res = await axios.post("/api/ai/generate_commment_reply", {
        content: parentComment.content,
      });

      if (res.status === 200) {
        setText(res.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to generate reply");
    } finally {
      setLoadingGReply(false);
    }
  };

  return (
    <div className="flex items-start gap-3 mt-2">
      <Link to="/dashboard?tab=profile" className="shrink-0">
        <img
          src={currentUser?.profilePicture}
          className={`${
            buttonText === "Reply" ? "w-8" : "w-10"
          } aspect-square object-cover rounded-full border border-gray-200/40`}
          alt="profile picture"
        />
      </Link>

      <div className="grow flex flex-col gap-1">
        <div className="relative focus-within:w-full group">
          <textarea
            className="border-b border-gray-300 dark:border-b-gray-200/40 w-full pb-1  outline-none resize-none overflow-hidden"
            rows={1}
            autoFocus={buttonText !== "Comment"}
            onChange={(e) => setText(e.target.value)}
            placeholder={buttonText === "Reply" ? "" : "Write your comment..."}
            maxLength={200}
            value={text}
            ref={(e) =>
              e && (e.selectionStart = e.selectionEnd = e.value.length)
            }
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.maxHeight = "200px";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          ></textarea>
          <span className="absolute w-full h-[2px] bg-gray-400 dark:bg-gray-300 bottom-[7px] left-0 transition-transform scale-x-0 ease-out group-focus-within:scale-x-100 origin-center duration-300 pointer-events-none"></span>
        </div>

        <div className="flex items-center gap-2 justify-between">
         <div className="flex items-center gap-5">
           <span className="text-sm text-gray-600 dark:text-gray-300">
            {200 - text?.length} characters remaining
          </span>

            {currentUser.role === "admin" && buttonText === "Reply" && (
              <button
                onClick={handleGenerateReply}
                disabled={loadingGReply}
                className="button-primary text-nowrap text-xs flex items-center gap-2 bg-gradient-to-r from-teal-700 to-teal-600 py-1 hover:from-primaryDark  duration-300"
              >
                {loadingGReply ? <Loader /> : <IoSparkles />}
                {loadingGReply ? "Generating" : "Generate Reply"}
              </button>
            )}
         </div>


          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={onCancel}
              className="button-primary bg-transparent text-sm text-gray-800 hover:bg-primary/30 dark:text-gray-200"
            >
              Cancel
            </button>

            <button
              onClick={onSubmit}
              className="button-primary text-sm flex items-center gap-1.5"
              disabled={loading || !isChanged || text.trim() === ""}
            >
              {loading && <Loader />} {buttonText || "Comment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputCommentField;
