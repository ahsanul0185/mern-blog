import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { AnimatePresence, motion, spring } from "motion/react";
import { NavLink } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="block md:hidden">
      <button className="cursor-pointer" onClick={() => setIsMenuOpen(true)}>
        <IoIosMenu className="text-dark text-3xl mt-2" />
      </button>

      {/* dark overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            onClick={() => setIsMenuOpen(false)}
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            exit={{ opacity: 0, visibility: "hidden" }}
            transition={{duration : 0.5}}
            className="fixed z-50 bg-black/50 top-0 left-0 w-full h-full"
          />
        )}
      </AnimatePresence>

        <nav className={`fixed h-screen bg-white p-12 min-w-72 top-0 right-0 z-[999] flex flex-col gap-3 pt-20 duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 left-4 text-xl">
            <RxCross1 />
          </button>
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
          <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</NavLink>
          <NavLink to="/projects" onClick={() => setIsMenuOpen(false)}>Projects</NavLink>
        </nav>
      
    </div>
  );
};

export default MobileMenu;
