import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import Loader from "../components/loaders/Loader";
import moment from "moment";
import { IoSparkles } from "react-icons/io5";
import MarkdownContent from "../components/MarkdownContent";

const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`/api/post/get_posts?slug=${slug}`);

        if (res.status === 200) {
          setPost(res.data.posts[0]);
        }
      } catch (error) {
        console.log(error);
        toast.error("Could not get the post");
      }
    };

    getPost();
  }, [slug]);

  const capitalizedText = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const sanitizeMarkdown = (content) => {
    return content.replace(/\\`/g, "`");
  };

  if (!post)
    return (
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        {" "}
        <Loader lg />{" "}
      </div>
    );

  return (
    <div className="default-padding pt-12">
      <div>
        <h2 className="font-semibold md:font-bold md:text-2xl">{post.title}</h2>

        <div className="mt-2 md:mt-4 flex items-center gap-4">
          <h3 className="text-sm md:font-semibold md:text-base text-gray-600 dark:text-gray-300">
            {capitalizedText(post.category)}
          </h3>
          <div className="size-1 rounded-full bg-gray-600 dark:bg-gray-300" />
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
            {moment(post.updatedAt).format("Do MMMM YYYY")}
          </p>
          <div className="size-1 rounded-full bg-gray-600 dark:bg-gray-300" />
          <button className="button-primary text-xs md:text-sm flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-500 py-0.5">
            <IoSparkles />
            Summerize Post
          </button>
        </div>

        <img
          src={post.coverImage}
          alt="post image"
          loading="lazy"
          className="w-full rounded-md mt-3 md:mt-6 aspect-[23/9] object-cover"
        />

        {/* content */}
        <div className="mt-3 md:mt-6 overflow-clip text-wrap">
          <MarkdownContent content={sanitizeMarkdown(post.content)} />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Post;
