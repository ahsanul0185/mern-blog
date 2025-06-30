import React, { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import img_travel from "../../assets/img_travel.jpg";
import { BsDot } from "react-icons/bs";
import PostCard from "./PostCard";
import axios from "axios";
import { motion } from "motion/react";

const OurRecentPost = () => {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const getGetRecentPosts = async () => {
      try {
        const res = await axios.get("/api/post/get_posts?limit=3&order=desc");
        if (res.status === 200) {
          setRecentPosts(res.data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getGetRecentPosts();
  }, []);

  return (
    <div className="default-padding py-12 lg:py-40">
      <SectionTitle title="Our Recent Post" buttonLink="/all_blogs" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-white dark:bg-primary/20 lg:dark:bg-transparent p-6 rounded-2xl border border-gray-300 dark:border-gray-300/40 lg:border-0 lg:p-0 lg:bg-transparent">
        <img
          src={img_travel}
          alt="travel blog"
          className="lg:w-[60%] rounded-2xl aspect-[3/2] object-cover z-10"
          loading="lazy"
        />
        <motion.div initial={{opacity : 0, x : -100}} whileInView={{opacity : 1, x : 0}} transition={{duration : 0.6, ease : "circOut"}} viewport={{once : true, amount : 0.4}}>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm md:text-base">
            <h3 className="uppercase font-semibold text-gray-800 dark:text-gray-300">
              Travel
            </h3>
            <BsDot />
            <p>2 June 2025</p>
          </div>

          <h1 className="text-2xl lg:text-2xl xl:text-3xl my-5">
            8 Rules of Travelling In Sea You Need To Know
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            officia officiis beatae aperiam aut incidunt rem, doloremque
            reiciendis asperiores. Quos dignissimos, tenetur, fugit placeat
            temporibus autem modi mollitia quibusdam, pariatur id maxime quam et
            tempore dolorem cum rem minus sit! Eaque dolores molestiae labore
            voluptatibus illo nihil sed ab perspiciatis?
          </p>

          <button className="mt-8 lg:mt-12 text-sm md:text-base rounded cursor-pointer bg-transparent border border-primary  dark:border-gray-300/40 dark:text-white px-8 py-2 text-primary hover:text-white hover:bg-primary duration-300 ease-in-out hover:border-transparent dark:hover:bg-white dark:hover:text-gray-700">
            Read More
          </button>
        </motion.div>
      </div>

      <motion.div initial={{opacity : 0}} whileInView={{opacity : 1}} transition={{duration : 0.35, ease : "backInOut"}} viewport={{once : true, amount : 0.4}} className="mt-14 grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-12 gap-y-10">
        {recentPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </motion.div>
    </div>
  );
};

export default OurRecentPost;
