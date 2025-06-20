import React from "react";
import { Link, NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import MobileMenu from "./MobileMenu";
import { IoIosMenu } from "react-icons/io";

const Header = ({setIsMenuOpen}) => {
  return (
    <div className="border-b border-b-gray-200">
      <div className="default-padding flex gap-2 justify-between items-center">
        <Link to="/">
          <h2 className="font-logo text-xl md:text-2xl font-bold text-dark select-none">
            Blog by Ahsanul
          </h2>
        </Link>

        <nav className="hidden md:flex gap-4 md:gap-8 text-dark">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/projects">Projects</NavLink>
        </nav>

        <div className="flex gap-5 items-center">
          <form className="hidden lg:block">
            <div className="relative">
              <span className="block absolute top-1/2 -translate-y-1/2 right-3 text-gray-600 text-xl">
                <CiSearch />
              </span>
              <input
                type="text"
                className="input-field-style"
                placeholder="Search"
              />
            </div>
          </form>

          <button className="block lg:hidden text-gray-700 text-2xl cursor-pointer">
            <CiSearch />
          </button>

          <Link to="/sign-in" className="bg-primary hover:bg-primaryDark duration-200 px-3 py-1.5 text-white rounded cursor-pointer text-sm md:text-base">
            Sign In
          </Link>

          {/* <MobileMenu /> */}

      <button className="cursor-pointer block md:hidden" onClick={() => setIsMenuOpen(prev => !prev)}>
        <IoIosMenu className="text-dark text-3xl mt-2" />
      </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
