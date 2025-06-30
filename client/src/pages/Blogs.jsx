import React, { useEffect, useState } from "react";
import PostCard from "../components/hero/PostCard";
import axios from "axios";
import Loader from "../components/loaders/Loader";
import LoaderAllBlogPage from "../components/loaders/LoaderAllBlogPage";
import NewsLetter from "../components/hero/NewsLetter";

const Blogs = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const res = await axios.get("/api/post/get_posts");
        if (res.status === 200) {
          setPosts(res.data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllPosts();
  }, []);

  return (
    <>
    <div className="default-padding pb-20">
      <div className="flex flex-col py-12 gap-6 items-center max-w-[80%] lg:max-w-1/2 mx-auto">
        <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 text-center font-semibold uppercase tracking-widest block">
          Our Blogs
        </span>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
          Find our all blogs from here
        </h2>

        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 text-center">
          Our blogs are written from very research research and well known
          writers writers so that we can provide you the best blogs and articles
          articles for you to read them all along
        </p>
      </div>

      {!posts ? <LoaderAllBlogPage /> : 
      <div className="mt-14 grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-12 gap-y-10 ">
        {posts?.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      }
    </div>
      <NewsLetter />
      </>
  );
};

export default Blogs;
