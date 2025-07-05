import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loader from "../components/loaders/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  inputFieldTyping,
  signInFailure,
  signInStart,
  signInSuccess,
} from "../features/user/userSlice";
import OAuth from "../components/OAuth";
import { toast } from "sonner";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const {
    currentUser,
    loading,
    error: errorMessage,
  } = useSelector((state) => state.userR);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value.trim() }));
    dispatch(inputFieldTyping());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      dispatch(signInFailure("Please fill out all fields."));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(formData.email);

    if (!isValidEmail) {
      dispatch(signInFailure("Invalid email address"));
    }

    if (formData.password.length < 6) {
      dispatch(signInFailure("Password must be at least 6 characters long"));
    }

    try {
      dispatch(signInStart());
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/signin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials : "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();



      if (res.status === 403) {
        toast.success("Please verify your email");
        navigate("/verify-email");
        return;
      }

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        toast.success("Signed in", {
          style: {
            backgroundColor: "#008b8c",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.4)",
          },
        });
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  useEffect(() => {
    dispatch(inputFieldTyping());
  }, []);

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
              <label
                htmlFor="email"
                className="text-sm text-gray-600 dark:text-gray-400 font-bold"
              >
                Email
              </label>
              <input
                id="email"
                onChange={handleChange}
                value={formData.email}
                type="email"
                className="input-field-style"
                placeholder="name@company.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm text-gray-600 dark:text-gray-400 font-bold"
              >
                Password
              </label>
              <input
                id="password"
                onChange={handleChange}
                value={formData.password}
                type="password"
                className="input-field-style password-dot"
                placeholder="Create a password"
              />
            </div>

            {errorMessage && <p className="text-red-600 my-">{errorMessage}</p>}

            <button
              type="submit"
              className={`button-primary py-1.5 ${
                loading
                  ? "bg-primaryDark flex justify-center gap-3 items-center"
                  : "bg-primary"
              } hover:bg-primaryDark duration-300`}
              disabled={loading}
            >
              {loading && <Loader />}

              {loading ? "Signing" : "Sign In"}
            </button>
          </form>

          <OAuth />

          <div className="flex flex-col sm:flex-row items-center justify-between mt-5 text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link to="/sign-up" className="hover:underline text-primary ml-2">
                Sign Up
              </Link>
            </p>
            <Link
              to="/forgot-password"
              className="text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
