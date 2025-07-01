import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { FaXmark } from "react-icons/fa6";
import Loader from "./loaders/Loader";
import { IoSparkles } from "react-icons/io5";
import SkeltonLoader from "./loaders/SkeltonLoader";

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



