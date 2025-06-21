import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

const ProfileAvatar = ({ currentUser }) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  return (
    <div className="relative">
      <img
        className="size-9 rounded-full cursor-pointer"
        src={currentUser.profilePicture}
        alt=""
        onClick={() => setDropDownOpen(prev => !prev)}
      />

      <AnimatePresence>
        {dropDownOpen && (
        <motion.div initial={{y : -10, opacity : 0}} animate={{y : 0, opacity : 1}} exit={{y : 10, opacity : 0}} transition={{type : "tween"}} className="absolute bg-gray-100 top-full translate-y-2 right-0 p-2 rounded w-3xs border border-gray-300/60">
          <p className="text-gray-600 py-2 text-sm font-bold truncate">
            {currentUser.email}
          </p>
          {/* <p className="text-gray-700 text-sm">{currentUser.email}</p> */}

          <div className="flex flex-col gap-2 mt-3 text-gray-700 font-semibold">
            <Link to="/dashboard?tab=profile" onClick={() => setDropDownOpen(false)} className="button-primary text-center text-sm">
              Profile
            </Link>
            <Link
              to=""
              className="button-primary bg-gray-500 hover:bg-gray-700 text-center text-sm" onClick={() => setDropDownOpen(false)}
            >
             Sign Out
            </Link>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileAvatar;
