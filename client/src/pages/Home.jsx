import React from "react";
import img_ai from "../assets/ai_image.jpg";
import Wave from "../assets/wave.svg?react";
import PostBanner from "../components/hero/PostBanner";
import OurRecentPost from "../components/hero/OurRecentPost";
import NewsLetter from "../components/hero/NewsLetter";
import { motion } from "motion/react";

const Home = () => {
  return (
    <div className="relative dark:bg-transparent z-0 overflow-clip">
      <Wave className="absolute -top-40 -left-36 -z-10 hidden w-[70%] lg:w-fit md:block" />
         <Wave className="absolute top-[50vh] -right-46 rotate-12 -z-10 hidden lg:block" />

      <div className="py-12 default-padding lg:py-0 flex flex-col lg:flex-row items-center gap-12 lg:gap-5 justify-between lg:h-[calc(100vh-120px)]">
        <div className="animate-fadeIn">
          <span className="text-sm text-gray-600 dark:text-gray-300 font-semibold mb-6 lg:mb-12 uppercase tracking-widest block">
            Featured Post
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-6xl">
            How AI will <br /> Change the Future
          </h1>

          <p className="my-6 lg:my-12 lg:max-w-1/2 text-gray-600 dark:text-gray-300">
            The future of AI will see home robots having enhanced intelligence,
            increased capabilities, and becoming more personal and possibly
            cute. For example, home robots will overcome navigation, direction
          </p>

          <button className="button-primary px-5 lg:px-8 py-2 lg:py-3">
            Read More
          </button>
        </div>

        <motion.img
        layout={false}
          src={img_ai}
           style={{ willChange: 'transform' }}
          loading="lazy"
          alt=""
          className="lg:w-[40%] rounded-xl aspect-video lg:aspect-square object-cover"
          animate={{
            x: [0, 5, -3, 4, 0],
            y: [0, -4, 6, -2, 0], 
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <PostBanner />

      <OurRecentPost />

      <NewsLetter />

   
    </div>
  );
};

export default Home;
