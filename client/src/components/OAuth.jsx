import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const auth = getAuth(app);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/google`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials : "include",
          body: JSON.stringify({
            name: resultFromGoogle.user.displayName,
            email: resultFromGoogle.user.email,
            googlePhotoUrl: resultFromGoogle.user.photoURL,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      className="px-3 py-1.5 flex justify-center items-center gap-4 border border-gray-300 dark:border-gray-200/40 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded w-full mt-5 duration-200"
    >
      {" "}
      <FcGoogle /> Continue with Google
    </button>
  );
};

export default OAuth;
