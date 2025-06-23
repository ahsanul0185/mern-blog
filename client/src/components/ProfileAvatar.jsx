import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useDispatch } from "react-redux";
import { signOut } from "../features/user/userSlice";
import { useEffect } from "react";

const ProfileAvatar = ({ currentUser }) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="relative" id="avatar">
      <img
        className="size-9 rounded-full cursor-pointer"
        src={currentUser.profilePicture}
        alt=""
        onClick={() => setDropDownOpen((prev) => !prev)}
      />

      <AnimatePresence>
        {dropDownOpen && (
          <motion.div
          id="avatar-dropdown"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ type: "tween" }}
            className="absolute bg-gray-100 dark:bg-primaryDark top-full translate-y-2 right-0 p-2 rounded w-3xs border border-gray-200/40"
          >
            <p className="text-gray-600 dark:text-gray-200 py-2 text-sm font-bold truncate">
              {currentUser.email}
            </p>
            {/* <p className="text-gray-700 text-sm">{currentUser.email}</p> */}

            <div className="flex flex-col gap-2 mt-3 text-gray-700 dark:text-gray-200 font-semibold">
              <Link
                to="/dashboard?tab=profile"
                onClick={() => setDropDownOpen(false)}
                className="button-primary text-center text-sm"
              >
                Profile
              </Link>
              <button
                className="button-primary bg-gray-500 hover:bg-gray-700 text-center text-sm"
                onClick={() => {
                  setDropDownOpen(false);
                  dispatch(signOut());
                  navigate("/sign-in");
                }}
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileAvatar;
