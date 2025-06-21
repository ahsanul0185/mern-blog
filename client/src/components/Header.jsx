import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import MobileMenu from "./MobileMenu";
import { IoIosMenu } from "react-icons/io";
import Logo from "./Logo";
import MobileMenu2 from "./MobileMenu2";

const Header = () => {

      const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky left-0 top-0 w-full bg-white">
    <div className="border-b border-b-gray-200">
      <div className="default-padding flex gap-2 justify-between items-center py-3.5">
        <Link to="/">
          <Logo />
        </Link>

        <nav id="desktop-nav" className="hidden md:flex gap-4 md:gap-8 text-dark mt-0.5">
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

          <Link to="/sign-in" className="button-primary">
            Sign In
          </Link>

          {/* <MobileMenu /> */}

      <button className="cursor-pointer block md:hidden" onClick={() => setIsMenuOpen(prev => !prev)}>
        <IoIosMenu className="text-dark text-3xl mt-2" />
      </button>
        </div>
      </div>
    </div>
    <MobileMenu2 isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
    </header>
  );
};

export default Header;
