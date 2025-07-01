import React, { useEffect, useState } from "react";
import moment from "moment"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostCard = ({post}) => {

  const [author, setAuthor] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getPostAuthor = async () => {
      try {
        const res = await axios.get(`/api/user/${post.userId}`);
        if (res.status === 200) {
          setAuthor(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPostAuthor();
  }, []);

  return (
    <div className="w-full flex flex-col gap-2 sm:gap-3 justify-between cursor-pointer group" onClick={() => navigate(`/post/${post.slug}`)}>
      <div className="overflow-clip rounded-2xl">
        <img
        src={post.coverImage || null}
        alt=""
        className="aspect-video w-full rounded-2xl object-cover scale-110 group-hover:scale-100 duration-300 ease-in-out"
      />
      </div>
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-xs md:text-sm">
        <h3 className="text-xs sm:text-sm text-gray-800 dark:text-gray-300">
          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
        </h3>
      </div>
      <h2 className="text-sm sm:text-[18px] font-semibold line-clamp-2 grow group-hover:text-primary duration-300 ease-in-out">
       {post.title}
      </h2>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 sm:gap-2">
            <img src={author?.profilePicture} alt="author profile" className="size-5 sm:size-7 bg-gray-500 rounded-full object-cover" />
            <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-semibold">@{author?.username}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{moment(post.createdAt).format("DD MMMM YYYY")}</p>
      </div>
    </div>
  );
};

export default PostCard;
