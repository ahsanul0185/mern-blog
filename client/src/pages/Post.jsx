import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import Loader from "../components/loaders/Loader";
import moment from "moment";
import { IoSparkles } from "react-icons/io5";
import MarkdownContent from "../components/post/MarkdownContent";
import { FacebookShareButton, LinkedinShareButton } from "react-share";
import { LuCheck, LuCopy, LuLink } from "react-icons/lu";
import { FaFacebook, FaLinkedin } from "react-icons/fa6";
import icon_facebook from "../assets/icon_facebook.webp";
import icon_linkedin from "../assets/icon_linkedin.png";
import CommentSection from "../components/post/CommentSection"
import RecentPosts from "../components/post/RecentPosts";


const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";


  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`/api/post/get_posts?slug=${slug}`);

        if (res.status === 200) {
          setPost(res.data.posts[0]);
          setError(null);
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError("Faild to get the post");
        console.log(error);
        toast.error("Could not get the post");
      }
    };

    getPost();
  }, [slug]);

  useEffect(() => {
    const getRecentPosts = async () => {
      try {
        const res =await axios.get("/api/post/get_posts?limit=5");
        if (res.status === 200) {
          setRecentPosts(res.data.posts)
        }
      } catch (error) { 
        console.log(error)
      }
    }
    getRecentPosts()
  }, [slug])
  

  const handleCopyClick = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const capitalizedText = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const sanitizeMarkdown = (content) => {
    return content.replace(/\\`/g, "`");
  };

  if (!post || loading)
    return (
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        {" "}
        <Loader lg />{" "}
      </div>
    );

    if (error) {
       return (
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        {" "}
        <h2 className="font-semibold text-2xl">Failed to get the post</h2>
      </div>
    );
    }

  return (
    <div className="default-padding pt-12 flex flex-col lg:flex-row items-start gap-6 relative">
      <div className="grow">
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

        {/* cover image */}
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

        {/* tags */}
        <div className="mt-10 mb-4 flex gap-2 md:gap-3 text-xs mdtext-sm flex-wrap">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              className="px-2 py-1 bg-primary/20 rounded text-primaryDark dark:text-gray-300 whitespace-nowrap"
            >
              # {capitalizedText(tag)}
            </Link>
          ))}
        </div>



        {/* comment section */}
        <div>
          <CommentSection postId={post._id}/>
        </div>


        {/* share post */}
        <div className="my-12">
          <h2 className="font-semibold text-xl">Share Post</h2>
          <div className="flex items-center gap-2 mt-2">
            <FacebookShareButton url={shareUrl} quote={post.title}>
              <img src={icon_facebook} alt="social icon" className="size-6" />
            </FacebookShareButton>
            <LinkedinShareButton url={shareUrl} title={post.title}>
              <img src={icon_linkedin} alt="social icon" className="size-8" />
            </LinkedinShareButton>
            {copied ? (
              <span className="flex items-center gap-2">
                <LuCheck className="text-green-500 size-6" />
              </span>
            ) : (
              <LuCopy
                onClick={handleCopyClick}
                className="size-8 rounded cursor-pointer p-1.5"
              />
            )}
          </div>
        </div>
      </div>

     <div className="lg:w-[29%] shrink-0 rounded sticky right-0 top-[90px] lg:px-5 mb-16">
        <RecentPosts recentPosts={recentPosts}/>
      </div>
    </div>
  );
};

export default Post;
