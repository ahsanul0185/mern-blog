import React, { useState } from "react";
import Logo from "../components/Logo";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loader from "../components/loaders/Loader";
import OAuth from "../components/OAuth";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const SignUp = () => {

  const [formData, setFormData] = useState({username: '', email: '', password: ''});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const {currentUser} = useSelector(state => state.userR);

  const navigate = useNavigate();

  const handleChange = (e) => {
      setFormData(prev => ({...prev, [e.target.id] : e.target.value.trim()}));
      setErrorMessage(null)
  }

  const handleSubmit = async (e) => {
      e.preventDefault();

      if (!formData.username || !formData.email || !formData.password) {
        return setErrorMessage("Please fill out all fields.")
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(formData.email);

      if (!isValidEmail) {
        return setErrorMessage("Invalid email address")
      }

      if (formData.password.length < 6) {
        return setErrorMessage("Password must be at least 6 characters long")
      }

      try {
        setLoading(true);
        setErrorMessage(null);
        const res = await fetch("/api/auth/signup", {
          method : "POST",
          headers : { 'Content-Type' : 'application/json'},
          body : JSON.stringify(formData)
        });

        const data = await res.json();

        if (data.success === false) {
          setLoading(false);
          return setErrorMessage(data.message);
        }
        setErrorMessage(null);
        setLoading(false);

        if (res.ok) {
          toast.success("Signed up successfully", {style : {backgroundColor : "#008b8c", color : "white", border : "1px solid rgba(255, 255, 255, 0.4)"}});
          navigate("/sign-in");
        }

      } catch (error) {
        setErrorMessage(error.message)
        setLoading(false);
      }
  }

  if (currentUser) return <Navigate to="/dashboard?tab=profile"/>

  return (
    <div className="default-padding min-h-[calc(100vh-67px)] grid place-items-center">
      <div className="flex flex-col md:flex-row justify-center place-items-center max-w-4xl gap-12">
        <div>
          <Logo className="text-4xl md:text-4xl" />
          <p className="mt-5 text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Discover stories, ideas, and perspectives from voices that matter.
            Join Blog by Ahsanul and be part of the conversation.
          </p>
        </div>

        <div className="w-full md:w-1/2 shrink-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="username" className="text-sm text-gray-600 dark:text-gray-400 font-bold">Username</label>
              <input id="username" onChange={handleChange} value={formData.username} type="text" className="input-field-style" placeholder="e.g. ahsan_writer123"/>
            </div>
            <div>
              <label htmlFor="email" className="text-sm text-gray-600 dark:text-gray-400 font-bold">Email</label>
              <input id="email" onChange={handleChange} value={formData.email} type="email" className="input-field-style" placeholder="name@company.com"/>
            </div>
            <div>
              <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-400 font-bold">Password</label>
              <input id="password" onChange={handleChange} value={formData.password} type="password" className="input-field-style password-dot" placeholder="Create a password"/>
            </div>

            {errorMessage && (
              <p className="text-red-600 my-">{errorMessage}</p>
            )}

            <button type="submit" className={`button-primary py-1.5 ${loading ? "bg-primaryDark flex justify-center gap-3 items-center" : "bg-primary"} hover:bg-primaryDark duration-300`} disabled={loading}>
              {
                loading && (
                  <Loader/>
                )
              }
              
              {loading ? "Signing up" : "Sign Up"}
            </button>
          </form>

         <OAuth />


          <p className="text-gray-600 dark:text-gray-400 text-sm mt-5">Have an account? <Link to="/sign-in" className="text-primary ml-2">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
