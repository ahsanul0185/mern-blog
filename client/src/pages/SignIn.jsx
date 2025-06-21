import React, { useState } from "react";
import Logo from "../components/Logo";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const SignIn = () => {

  const [formData, setFormData] = useState({username: '', email: '', password: ''});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
      setFormData(prev => ({...prev, [e.target.id] : e.target.value.trim()}));
      setErrorMessage(null)
  }

  const handleSubmit = async (e) => {
      e.preventDefault();

      if (!formData.email || !formData.password) {
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
        const res = await fetch("/api/auth/signin", {
          method : "POST",
          headers : { 'Content-Type' : 'application/json'},
          body : JSON.stringify(formData)
        });

        const data = await res.json();

        console.log(data)

        if (data.success === false) {
          setLoading(false);
          return setErrorMessage(data.message);
        }
        setErrorMessage(null);
        setLoading(false);

        if (res.ok) {
          navigate("/")
        }

      } catch (error) {
        setErrorMessage(error.message)
        setLoading(false);
      }
  }

  return (
    <div className="default-padding min-h-[calc(100vh-67px)] grid place-items-center">
      <div className="flex flex-col md:flex-row justify-center place-items-center max-w-4xl gap-12">
        <div>
          <Logo className="text-4xl md:text-4xl" />
          <p className="mt-5 text-gray-600 text-sm md:text-base">
            Discover stories, ideas, and perspectives from voices that matter.
            Join Blog by Ahsanul and be part of the conversation.
          </p>
        </div>

        <div className="w-full md:w-1/2 shrink-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="email" className="text-sm text-gray-600 font-bold">Email</label>
              <input id="email" onChange={handleChange} value={formData.email} type="email" className="input-field-style" placeholder="name@company.com"/>
            </div>
            <div>
              <label htmlFor="password" className="text-sm text-gray-600 font-bold">Password</label>
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
              
              {loading ? "Signing" : "Sign In"}
            </button>
          </form>

          <button className="px-3 py-1.5 flex justify-center items-center gap-4 border border-gray-300 cursor-pointer hover:bg-gray-100 rounded w-full mt-5 duration-200"> <FcGoogle /> Continue with Google</button>


          <p className="text-gray-600 text-sm mt-5">Don't have an account? <Link to="/sign-up" className="text-primary ml-2">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
