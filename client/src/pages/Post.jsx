import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import LoaderPostPage from "../components/loaders/LoaderPostPage";
import moment from "moment";
import { IoSparkles, IoSparklesOutline } from "react-icons/io5";
import MarkdownContent from "../components/post/MarkdownContent";
import { FacebookShareButton, LinkedinShareButton } from "react-share";
import { LuCheck, LuCopy, LuLink } from "react-icons/lu";
import { FaFacebook, FaLinkedin } from "react-icons/fa6";
import icon_facebook from "../assets/icon_facebook.webp";
import icon_linkedin from "../assets/icon_linkedin.png";
import CommentSection from "../components/post/CommentSection"
import RecentPosts from "../components/post/RecentPosts";
import NewsLetter from "../components/hero/NewsLetter";
import Drawer from "../components/Drawer";
import { useSelector } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";


const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const [openDrawer, setOpenDrawer] = useState(false);
  const [postSummary, setPostSummary] = useState(null);
  const [loadingS, setLoadingS] = useState({summary : false});

  const {currentUser} = useSelector(state => state.userR);
  const navigate = useNavigate();


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
        const res =await axios.get("/api/post/get_posts?limit=4");
        if (res.status === 200) {
          setRecentPosts(res.data.posts)
        }
      } catch (error) { 
        console.log(error)
      }
    }
    getRecentPosts()
  }, [slug]);
  

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


  const handleSummarizePost = async () => {

    if (!currentUser) {
      navigate("/sign-in");
      return
    }

    try {
      setOpenDrawer(true);
      setLoadingS(prev => ({...prev, summary : true}))
    const res = await axios.post("/api/ai/generate_post_summary", {content : post.content});

    if (res.status === 200) {
      setPostSummary(res.data);
    }

      console.log("Drawer Open")
    } catch (error) {
      console.log(error)
    }finally {
      setLoadingS(prev => ({...prev, summary : false}))
    }
  }



  if (!post || loading)
    return (
     <LoaderPostPage />
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
    <>
    <div className="default-padding pt-12 flex flex-col lg:flex-row items-start gap-6 relative">
      <div className="w-full md:flex-1 min-w-0">

        <div className="flex items-center justify-between gap-2">
          <h2 className="font-semibold md:font-bold md:text-2xl">{post.title}</h2>
                 {currentUser?.role === "admin" &&  <button
                    onClick={() =>
                      navigate(`/dashboard/update-post/${post._id}`, { state: post })
                    }
                    className="duration-200 cursor-pointer px-3 py-1 rounded flex items-center hover:bg-gray-200 dark:hover:bg-primary/50 gap-2 bg-gray-100 dark:bg-primaryDark"
                  >
                    <FaPencilAlt size={12} className="text-gray-600 dark:text-gray-300"/>Edit
                  </button>}
        </div>

        <div className="mt-2 md:mt-4 flex items-center gap-4">
          <h3 className="text-sm md:font-semibold md:text-base text-gray-600 dark:text-gray-300">
            {capitalizedText(post.category)}
          </h3>
          <div className="size-1 rounded-full bg-gray-600 dark:bg-gray-300" />
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
            {moment(post.updatedAt).format("Do MMMM YYYY")}
          </p>
          <div className="size-1 rounded-full bg-gray-600 dark:bg-gray-300" />
          <button onClick={handleSummarizePost} className="button-primary text-xs md:text-sm flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-500 py-0.5 hover:from-primaryDark  duration-300">
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
        <div id="comments">
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

      
      <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} loading={loadingS.summary} title="Summary of the post">
         

          <div className="mt-5">
            <h3 className="font-semibold mb-5 text-[17px]">{postSummary?.title}</h3>
            <MarkdownContent content={postSummary && sanitizeMarkdown(postSummary?.summary)} />
          </div>
      </Drawer>


    </div>
    <NewsLetter />
    </>
  );
};

export default Post;
