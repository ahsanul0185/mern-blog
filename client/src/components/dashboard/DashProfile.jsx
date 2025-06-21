import React from "react";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.userR);

  return (
    <div>
      <h1 className="font-bold text-3xl">Your Profile</h1>

      <form className="mt-20 flex flex-col items-center max-w-xl w-full mx-auto">
        <div className="w-32 h-32 cursor-pointer">
          <img
            src={currentUser.profilePicture}
            alt="user profile"
            className="object-cover w-full h-full rounded-full border-6 border-primary"
          />
        </div>

        <div className="w-full mt-12 flex flex-col gap-6">
          <input
            type="text"
            defaultValue={currentUser.username}
            className="input-field-style "
          />
          <input
            type="email"
            defaultValue={currentUser.email}
            className="input-field-style "
          />
          <button type="submit" className="button-primary">Update</button>
        </div>

        <div className="flex items-center justify-between w-full mt-5 text-sm text-red-500 dark:text-red-400">
          <button className="cursor-pointer">Delete Account</button>
          <button className="cursor-pointer">Sign Out</button>
        </div>
      </form>
    </div>
  );
};

export default DashProfile;
