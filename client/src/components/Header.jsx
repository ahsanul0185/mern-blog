import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import MobileMenu from "./MobileMenu";
import { IoIosMenu } from "react-icons/io";
import Logo from "./Logo";
import MobileMenu2 from "./MobileMenu2";
import { useSelector } from "react-redux";
import ProfileAvatar from "./ProfileAvatar";
import DarkToggleButton from "./DarkToggleButton";
import useGetTab from "../hooks/useGetTab";
import { useIsMobile } from "../hooks/useIsMobile";
import { motion } from "motion/react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.userR);
  const { path } = useGetTab();

  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile(500);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (isMobile) {
      setIsSearchbarOpen((prev) => !prev);
    }

    if ((isMobile && !isSearchbarOpen)) {
      return
    }

    const urlParams = new URLSearchParams(location.search);
    if (searchTerm.trim() === "") {
      urlParams.delete("searchTerm");
    } else {
      urlParams.set("searchTerm", searchTerm.trim());
    }
    navigate(`/search?${urlParams.toString()}`);
  };

  useEffect(() => {
    if (isMobile) {
      setIsSearchbarOpen(false);
    } else {
      setIsSearchbarOpen(true);
    }
  }, [isMobile]);


  return (
    <header className="sticky left-0 top-0 w-full bg-white dark:bg-primaryDark dark:text-gray-200 z-[9999]">
      <div className="border-b border-b-gray-200 dark:border-b-gray-200/30">
        <div
          className={`${
            path.startsWith("dashboard") ? "px-4" : "default-padding"
          } flex gap-2 justify-between items-center py-3.5`}
        >
          <div className="flex items-center gap-3">
            <button
              className="cursor-pointer block md:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <IoIosMenu className="text-dark dark:text-gray-200 text-3xl" />
            </button>
            <motion.div
              initial={{ display: "block" }}
              animate={{ display: isMobile && isSearchbarOpen ? "none" : "block" }}
              transition={{ delay: isMobile && isSearchbarOpen ? 0 : 0.3, duration : 0.2 }}
              style={{ visibility: isMobile && isSearchbarOpen ? "hidden" : "visible" }}
            >
              <Link to="/" className={`text-nowrap`}>
                <Logo />
              </Link>
            </motion.div>
          </div>

          <nav
            id="desktop-nav"
            className="hidden md:flex gap-4 md:gap-8 text-dark dark:text-gray-200 mt-0.5"
          >
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/all_blogs">Blogs</NavLink>
          </nav>

          <div className="flex gap-2 sm:gap-5 items-center">
            <form onSubmit={handleSearch} className="block">
              <div className="relative">
                <span
                  onClick={handleSearch}
                  className="block cursor-pointer absolute top-1/2 -translate-y-1/2 right-3 text-gray-600 dark:text-gray-200 text-xl"
                >
                  <CiSearch />
                </span>
                <input
                  type="text"
                  className={`${
                    isSearchbarOpen
                      ? "w-48 opacity-100 visible  delay-200"
                      : "w-0 opacity-0 invisible"
                  } duration-300 input-field-style pr-9 py-1 sm:py-1.5`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search"
                />
              </div>
            </form>

            <DarkToggleButton />
            <div className="shrink-0">
              {currentUser ? (
                !path.startsWith("dashboard") && (
                  <ProfileAvatar currentUser={currentUser} />
                )
              ) : (
                <Link to="/sign-in" className="button-primary">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <MobileMenu2 isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </header>
  );
};

export default Header;
