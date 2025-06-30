import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { FaXmark } from "react-icons/fa6";
import Loader from "./loaders/Loader";
import { IoSparkles } from "react-icons/io5";

const Drawer = ({ openDrawer, setOpenDrawer, children, loading, title }) => {
  return createPortal(
    <AnimatePresence>
      {openDrawer && (
        <motion.div
          initial={{ opacity: 0.5, x : "100%" }}
          animate={{ opacity: 1 , x : 0 }}
          exit={{ opacity: 0.5, x: "100%" }}
          transition={{type : "", ease : "easeInOut", duration : 0.3}}
          className="fixed top-18 right-2 w-[96%] text-gray-800 overflow-auto hide-scrollbar dark:text-gray-200 md:max-w-[480px] h-[90%] border border-gray-200 dark:border-gray-200/40 dark:bg-primaryDark bg-white shadow-2xl rounded-2xl z-[9999] py-4 px-5"
        >
          <button onClick={() => setOpenDrawer(false)} className="absolute text-2xl text-gray-700 dark:text-gray-300 top-3 cursor-pointer right-3 size-8 grid place-items-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-100/20">
            <FaXmark />
          </button>

           <h2 className="text-xl  font-semibold flex items-center gap-2 text-primary dark:text-white mt-5"> <IoSparkles /> {title}</h2>

            {loading ? <SkeltonLoader /> : <div className="mt-5 ">{children}</div>}
          
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("modal-root")
  );
};

export default Drawer;




const SkeltonLoader = () => {
  const delays = Array.from({ length: 20 }, (_, i) => `${i * 0.1}s`);

  return (
    <div className="mt-5 space-y-4">
      {/* Title */}
      <div
        className="bg-gray-300 dark:bg-primary/40 h-10 w-[90%] rounded animate-shimmer"
        style={{ animationDelay: delays[0], animationFillMode: 'both' }}
      ></div>

      {/* Subtitles with different widths */}
      {[
        'w-[85%]',
        'w-[92%]',
        'w-[78%]',
        'w-[88%]',
        'w-[60%]',
        'w-[73%]',
      ].map((width, i) => (
        <div
          key={i}
          className={`bg-gray-300 dark:bg-primary/40 h-6 rounded ${width} mx-2 animate-shimmer`}
          style={{ animationDelay: delays[i + 1], animationFillMode: 'both' }}
        ></div>
      ))}

      {/* Author / Date Line */}
      <div
        className="bg-gray-300 dark:bg-primary/40 h-5 w-[25%] mt-6 rounded animate-shimmer"
        style={{ animationDelay: delays[7], animationFillMode: 'both' }}
      ></div>

      {/* Paragraph preview lines with varied widths */}
      {['w-[88%]', 'w-[84%]', 'w-[79%]', 'w-[91%]'].map((width, i) => (
        <div
          key={i}
          className={`bg-gray-300 dark:bg-primary/40 h-4 ml-5 rounded ${width} animate-shimmer`}
          style={{ animationDelay: delays[i + 8], animationFillMode: 'both' }}
        ></div>
      ))}

      {/* List style preview lines with different widths */}
      <ul className="mt-6 space-y-3 ml-6">
        {['w-[65%]', 'w-[72%]', 'w-[58%]'].map((width, i) => (
          <li
            key={i}
            className={`bg-gray-300 dark:bg-primary/40 h-4 rounded ${width} animate-shimmer`}
            style={{ animationDelay: delays[i + 12], animationFillMode: 'both' }}
          ></li>
        ))}
      </ul>
    </div>
  );
};
