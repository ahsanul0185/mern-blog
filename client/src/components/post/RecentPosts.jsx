import React from "react";
import { useNavigate } from "react-router-dom";

const RecentPosts = ({ recentPosts }) => {

    const navigate = useNavigate();

  return (
    <div className="">
      <h2 className="text-[19px] font-semibold">Recent Posts</h2>

      <div className="flex flex-col gap-5 mt-6">
        {recentPosts.map((post, idx) => (
          <div key={post._id} className="flex flex-col items-start gap-2">
            <span className="text-xs font-semibold text-teal-300">
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </span>
            <div className="flex items-start gap-3">
              <img
               onClick={() => navigate(`/post/${post.slug}`)}
                src={post.coverImage}
                className="size-14 aspect-square rounded object-cover cursor-pointer"
                alt="post image"
              />
              <h3 onClick={() => navigate(`/post/${post.slug}`)} className="text-sm cursor-pointer line-clamp-2">{post.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
