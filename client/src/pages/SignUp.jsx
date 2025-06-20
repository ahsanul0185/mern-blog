import React from "react";
import Logo from "../components/Logo";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="default-padding min-h-[calc(100vh-67px)] grid place-items-center">
      <div className="flex flex-col md:flex-row justify-center place-items-center max-w-4xl gap-12">
        <div>
          <Logo className="text-4xl md:text-4xl" />
          <p className="mt-5 text-gray-600">
            Discover stories, ideas, and perspectives from voices that matter.
            Join Blog by Ahsanul and be part of the conversation.
          </p>
        </div>

        <div className="w-full md:w-1/2 shrink-0">
          <form className="flex flex-col gap-5">
            <div>
              <label htmlFor="username" className="text-sm text-gray-600 font-bold">Username</label>
              <input id="username" type="text" className="input-field-style" placeholder="e.g. ahsan_writer123"/>
            </div>
            <div>
              <label htmlFor="email" className="text-sm text-gray-600 font-bold">Email</label>
              <input id="email" type="email" className="input-field-style" placeholder="name@company.com"/>
            </div>
            <div>
              <label htmlFor="password" className="text-sm text-gray-600 font-bold">Password</label>
              <input id="password" type="text" className="input-field-style" placeholder="Create a password"/>
            </div>
            <button type="submit" className="button-primary py-1.5">
              Sign Up
            </button>
          </form>

          <button className="px-3 py-1.5 flex justify-center items-center gap-4 border border-gray-300 cursor-pointer hover:bg-gray-100 rounded w-full mt-5 duration-200"> <FcGoogle /> Continue with Google</button>


          <p className="text-gray-600 text-sm mt-5">Have an account? <Link to="/sign-in" className="text-primary ml-2">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
