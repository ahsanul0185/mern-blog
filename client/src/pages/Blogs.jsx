import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/hero/PostCard";
import Loader from "../components/loaders/Loader";
import LoaderAllBlogPage from "../components/loaders/LoaderAllBlogPage";
import NewsLetter from "../components/hero/NewsLetter";

const POSTS_PER_PAGE = 9;

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);


  const fetchPosts = async () => {
  if (loading || !hasMore) return;

  setLoading(true);
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/get_posts?startIndex=${startIndex}`, {withCredentials : true});
    const newPosts = res.data.posts;
    const totalPosts = res.data.totalPosts;

    if (newPosts.length > 0) {
      setPosts(prev => [...prev, ...newPosts]);
      setStartIndex(prev => prev + POSTS_PER_PAGE);
    }

    const totalLoadedPosts = posts.length + newPosts.length;
    if (totalLoadedPosts >= totalPosts) {
      setHasMore(false);
    }
  } catch (err) {
    console.error("Fetch failed:", err);
  } finally {
    setLoading(false);
  }
};




  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollTop + clientHeight + 550 >= scrollHeight && hasMore && !loading) {
        fetchPosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  return (
    <>
      <div className="default-padding pb-20">
        {/* Header */}

      <div className="flex flex-col py-6 md:py-12 gap-3 md:gap-6 items-center max-w-[80%] md:max-w-[70%] mx-auto">
        <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 text-center font-semibold uppercase tracking-widest block">
          Our Blogs
        </span>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center">
          Find our all blogs from here
        </h2>

        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 text-center">
            Our blogs are written from very research research and well known
            writers writers so that we can provide you the best blogs and
            articles articles for you to read them all along
        </p>
      </div>


        {/* Posts */}
        {posts.length === 0 && loading ? (
          <LoaderAllBlogPage />
        ) : (
          <div className="mt-12 md:mt-14 grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-12 gap-y-10">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {/* Loader */}
        {loading && hasMore && (
          <div className="">
            <LoaderAllBlogPage />
          </div>
        )}

        {/* End Message */}
        {!hasMore && (
          <div className="mt-12 text-center text-sm text-gray-400">
            You've reached the end. 🎉
          </div>
        )}
      </div>
      <NewsLetter />
    </>
  );
};

export default Blogs;
