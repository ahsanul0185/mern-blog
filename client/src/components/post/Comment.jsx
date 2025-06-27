import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";
import moment from "moment";
import { useSelector } from "react-redux";

const Comment = ({ comment, onLike }) => {
  const [user, setUser] = useState(null);
  const {currentUser} = useSelector(state => state.userR);

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

  return (
    <div className="flex gap-3 items-start">
      <img
        src={
          user?.profilePicture ||
          "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
        }
        alt="user profile"
        className="w-10 aspect-square shrink-0 object-cover rounded-full border border-gray-200/40"
      />
      <div>
        <div className="flex text-sm gap-2 items-center text-gray-600 dark:text-gray-300">
          <h3 className="font-semibold">
            {user ? `@${user.username}` : "Anonymous"}
          </h3>
          <span className="text-xs">{moment(comment.createdAt).fromNow()}</span>
        </div>
        <p>{comment.content}</p>
        <div className="text-xs mt-2 flex items-center gap-4">
          <button
            onClick={() => onLike(comment._id)}
            className="cursor-pointer hover:bg-primary/30 size-6 grid place-items-center rounded duration-200"
          >
            {comment.likes.indexOf(currentUser?._id) === -1 ? (<RiThumbUpLine size={16} />) : (<RiThumbUpFill size={16} />)}
          </button>
            <span>{comment.likes.length} {comment.likes.length > 1 ? "Likes" : "Like"}</span>
          <button>Edit</button>
          <button>Delete </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
