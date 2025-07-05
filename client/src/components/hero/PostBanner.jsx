import React from "react";
import img_vr from "../../assets/img_man_vr.jpg";
import { BsDot } from "react-icons/bs";
import { motion } from "motion/react";

const PostBanner = () => {
  return (
    <div className="default-padding py-12 lg:py-32">
      <div className="relative">
        <img
          src={img_vr}
          loading="lazy"
          alt=""
          className="aspect-[2/3] sm:aspect-[3/2] md:aspect-[16/8] rounded-3xl object-cover"
        />

        <motion.div
          initial={{opacity : 0, filter: "blur(18px)" }}
          whileInView={{opacity : 1, filter: "blur(0px)" }}
          transition={{ duration: 0.4, ease: "backIn" }}
          viewport={{ once: true, amount: 0.5 }}
          className=" absolute bottom-0 lg:-bottom-28 w-full h-full lg:h-auto lg:w-[80%] right-0 py-0 backdrop-blur-sm rounded-2xl"
        >
          <div className="lg:shadow-2xl bg-white/80 backdrop-blur-sm lg:bg-white dark:bg-primary/70 lg:dark:bg-primary/65 p-8 rounded-2xl h-full  outline-2 outline-white dark:outline-white/10 lg:outline-0 overflow-hidden">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm md:text-base">
              <h3 className="uppercase font-semibold text-gray-800 dark:text-gray-300">
                Programming
              </h3>
              <BsDot />
              <p>2 June 2025</p>
            </div>

            <h1 className="text-xl md:text-2xl lg:text-4xl my-5">
              How to make a Game look more attractive with New VR & AI
              Technology
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
              Google has been investing in AI for many years and bringing its
              benefits to individuals, businesses and communities. Whether it’s
              publishing state-of-the-art research, building helpful products or
              developing tools and resources that enable others, we’re committed
              to making AI accessible to everyone.
            </p>

            <button className="mt-8 lg:mt-12 text-sm md:text-base rounded cursor-pointer bg-transparent border border-primary dark:border-gray-300 dark:text-white px-8 py-2 text-primary hover:text-white hover:bg-primary duration-300 ease-in-out hover:border-transparent dark:hover:bg-white dark:hover:text-gray-700">
              Read More
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PostBanner;
