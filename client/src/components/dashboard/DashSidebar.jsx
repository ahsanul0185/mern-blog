
import { IoMdPerson } from "react-icons/io";
import { BiLogOutCircle, BiSolidCommentDots } from "react-icons/bi";
import useGetTab from "../../hooks/useGetTab";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../../features/user/userSlice";
import { HiRectangleStack } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { useEffect, useState } from "react";
import { TfiAngleRight } from "react-icons/tfi";
import { motion } from "motion/react";
import { useIsMobile } from "../../hooks/useIsMobile";

const sidebarItems = [
  {
    id: "profile",
    title: "Profile",
    icon: <IoMdPerson className="text-xl" />,
    path: "/dashboard?tab=profile",
    adminOption: false,
  },
];

const adminOptions = [
  {
    id: "insights",
    title: "Dashboard",
    icon: <MdSpaceDashboard className="text-xl" />,
    path: "/dashboard?tab=insights",
    adminOption: true,
  },
  {
    id: "blog_posts",
    title: "Blog Posts",
    icon: <HiRectangleStack className="text-xl" />,
    path: "/dashboard?tab=blog_posts",
    adminOption: true,
    routes: ["create-post", "update-post"],
  },
  {
    id: "users",
    title: "Users",
    icon: <FaUsers className="text-xl" />,
    path: "/dashboard?tab=users",
    adminOption: true,
  },
  {
    id: "comments",
    title: "Comments",
    icon: <BiSolidCommentDots className="text-xl" />,
    path: "/dashboard?tab=comments",
    adminOption: true,
  },
];

const DashSidebar = () => {
  const { currentUser } = useSelector((state) => state.userR);
    const isMobile = useIsMobile(1270);
  const { tab, path } = useGetTab();
  const [expended, setExpended] = useState(isMobile ? false : true);
  const [active, setActive] = useState(isMobile ? false : true);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSignout = () => {
    dispatch(signOut());
    navigate("/sign-in");
  };

  useEffect(() => {
    if (isMobile) {
      setExpended(false);
      setActive(false);
    }else{
      setExpended(true)
      setActive(true)
    }
  }, [isMobile]);

  return (
    <div
      className={`${
        expended && !isMobile ? "w-72" : "w-16 sm:w-20"
      } duration-300 h-[calc(100vh-58px)] lg:h-[calc(100vh-67px)] sticky top-[59px] lg:top-[67px] left-0  shrink-0 ${
        isMobile ? "z-[999]" : "z-auto"
      }`}
    >
      <motion.div
        // layout="size"
        // transition={{ duration: 3 }}
        className={`${
          (isMobile && expended)
            ? "sticky w-72 h-[calc(100vh-58px)] lg:h-[calc(100vh-67px)] shadow-2xl" : 
          isMobile ? "w-16 sm:w-20 h-full  relative"
            : "h-full"
        }  duration-300 bg-gray-100 dark:bg-primaryDark border-r border-r-gray-200 dark:border-r-gray-200/40 px-2 sm:px-4 py-6`}
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-8 w-full">
          <img
            src={currentUser.profilePicture}
            alt="profile"
            className={`${
              expended ? "size-16 md:size-20" : "size-8 md:size-12"
            } mx-auto rounded-full object-cover duration-300`}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: expended ? 1 : 0 }}
            transition={{
              delay: expended ? 0.3 : 0,
              duration: expended ? 0.3 : 0,
            }}
            className="text-center font-semibold text-gray-500 dark:text-gray-300 mt-3 text-sm md:text-base"
          >
            {currentUser.email}
          </motion.p>
        </div>

        <div onMouseEnter={() => !active && setExpended(true)} onMouseLeave={() => !active && setExpended(false)} className="flex flex-col gap-3 mt-40 text-sm md:text-base overflow-hidden">
          {sidebarItems.map((item, idx) => (
            <div className="relative" key={item.id}>
              {item.id === "profile" && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: expended ? 1 : 0,
                    visibility: expended ? "visible" : "hidden",
                  }}
                  transition={{
                    delay: expended ? 0.3 : 0,
                    duration: expended ? 0.3 : 0,
                  }}
                  className="bg-dark text-white absolute top-1/2 -translate-y-1/2 right-2 px-1.5 py-0.5 text-xs rounded"
                >
                  {currentUser.role.charAt(0).toUpperCase() +
                    currentUser.role.slice(1)}
                </motion.span>
              )}
              <Link
                to={item.path ? item.path : ""}
                className={`flex items-center gap-4 py-2 px-3  w-full rounded cursor-pointer text-nowrap ${
                  item.id === tab
                    ? "bg-primary text-white dark:bg-primary/40"
                    : "hover:bg-primary/40"
                }`}
              >
                <span className="shrink-0">{item.icon}</span>{" "}
                <span
                  className={`${
                    expended ? "opacity-100" : "opacity-0"
                  } duration-300`}
                >
                  {item.title}
                </span>
              </Link>
            </div>
          ))}

          {/* Admin tabs */}
          {currentUser.role === "admin" &&
            adminOptions.map((item, idx) => (
              <div className="relative" key={item.id}>
                <Link
                  to={item.path ? item.path : ""}
                  className={`flex items-center gap-4 py-2 px-3  w-full rounded cursor-pointer text-nowrap ${
                    item.id === tab || item.routes?.includes(path.split("/")[1])
                      ? "bg-primary text-white dark:bg-primary/40"
                      : "hover:bg-primary/40"
                  }`}
                >
                  <span className="shrink-0">{item.icon}</span>{" "}
                  <span
                    className={`${
                      expended ? "opacity-100" : "opacity-0"
                    } duration-300`}
                  >
                    {item.title}
                  </span>
                </Link>
              </div>
            ))}

          <button
            onClick={handleSignout}
            className={`flex items-center gap-4 py-2 px-3 mt-2  w-full rounded cursor-pointer text-nowrap hover:bg-primary/40`}
          >
            <BiLogOutCircle className="text-xl shrink-0" />{" "}
            <span
              className={`${
                expended ? "opacity-100" : "opacity-0"
              } duration-300`}
            >
              Sign Out
            </span>
          </button>
        </div>

        <button
          onClick={() => {setExpended((prev) => !prev); setActive(prev => !prev)}}
          className="absolute bg-white hover:bg-gray-200 dark:hover:bg-dark duration-200 transition-colors cursor-pointer bottom-20 right-0 translate-x-[40%] text-sm md:text-base size-6 md:size-8 grid place-items-center rounded-full dark:bg-primaryDark border border-gray-300 dark:border-gray-200/40"
        >
          <TfiAngleRight
            className={`${
              active ? "rotate-180" : ""
            } transition-transform duration-200`}
          />
        </button>
      </motion.div>
    </div>
  );
};

export default DashSidebar;
