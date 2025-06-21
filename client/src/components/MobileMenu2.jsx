import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { AnimatePresence, motion, spring } from "motion/react";
import { NavLink } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const MobileMenu2 = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <>
      <AnimatePresence>
        {isMenuOpen && (
        <motion.div initial={{height : 0}} animate={{height : "auto"}} exit={{height : 0}} className="overflow-hidden">
            <nav
            id="mobile-nav"
          className={`h-fit  min-w-72 flex flex-col md:hidden`}
        >
          <NavLink
            to="/"
            className="border-b border-b-gray-300 dark:border-b-gray-200/40 py-2 px-4 hover:bg-gray-100 dark:hover:bg-dark"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="border-b border-b-gray-300 dark:border-b-gray-200/40 py-2 px-4 hover:bg-gray-100 dark:hover:bg-dark"
          >
            About
          </NavLink>
          <NavLink
            to="/projects"
            className="border-b border-b-gray-300 dark:border-b-gray-200/40 py-2 px-4 hover:bg-gray-100 dark:hover:bg-dark"
          >
            Projects
          </NavLink>
        </nav>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu2;
