import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaPencilAlt } from "react-icons/fa";
import {
  updateFalied,
  updateStart,
  updateSuccess,
} from "../../features/user/userSlice";
import Loader from "../Loader";
import { toast } from "sonner";

const DashProfile = () => {
  const {
    currentUser,
    loading,
    error: updateError,
  } = useSelector((state) => state.userR);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [progress, setProgress] = useState("");
  const imageFileRef = useRef();
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file.size > 2 * 1024 * 1024) {
      setError("File size exceeds 2MB limit.");
      return;
    }
    if (file) {
      setError(null);
      setImageFile(e.target.files[0]);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      handeUploadImage();
    }
  }, [imageFile]);

  const handeUploadImage = async () => {
    const fileName = new Date().getTime() + imageFile.name;

    const imageData = new FormData();
    imageData.append("file", imageFile);
    imageData.append("upload_preset", "mern-blog");
    imageData.append("cloud_name", "dw8bzha3e");
    imageData.append("public_id", fileName);

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dw8bzha3e/image/upload",
        imageData,
        {
          onUploadProgress: (event) => {
            const percent = Math.round((event.loaded * 100) / event.total);
            setProgress(percent);
          },
        }
      );
      setError(null);
      setImageFileUrl(res.data.url);
      setProgress("");
      setImageFile(null);
      setFormData((prev) => ({ ...prev, profilePicture: res.data.url }));
    } catch (error) {
      console.log(error);
      setError("Upload failed. Try again.");
    }
  };

  const handleChange = async (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(formData).length === 0 || loading) {
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(updateSuccess(data));
        setFormData({});
        toast.success("User profile updated successfully", {
          style: {
            backgroundColor: "#008b8c",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.4)",
          },
        });
      } else {
        dispatch(updateFalied(data.message));
      }
    } catch (error) {
      console.log(error);
      dispatch(updateFalied(error));
    }
  };

  const showToast = () => {
    // toast.error("User updated successfully", {style : {backgroundColor : "#a93800", color : "white", border : "1px solid rgba(255, 255, 255, 0.4)"}});
    // toast.success("User updated successfully", {style : {backgroundColor : "#008b8c", color : "white", border : "1px solid rgba(255, 255, 255, 0.4)"}});
  };

  return (
    <div>
      <h1 className="font-bold text-3xl">Your Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-20 flex flex-col items-center max-w-xl w-full mx-auto"
      >
        <div
          className="relative w-32 h-32 cursor-pointer group z-0 rounded-full overflow-hidden"
          onClick={() => progress ? toast("Please wait for image to upload") :  imageFileRef.current.click()}
        >
          <CircularProgressbar
            value={progress}
            text={progress ? `${progress}%` : ""}
            className={`z-10 ${progress ? "bg-black/40" : ""} text-white`}
            strokeWidth={5}
            styles={{
              path: { stroke: "#00ADAE" },
              text: { fill: "#fff" },
              trail: { stroke: progress ? "#d6d6d6" : "#00ADAE" },
            }}
          />

          {!progress && (
            <div className="absolute inset-1.5 rounded-full bg-black/50 z-20 grid place-items-center text-white scale-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:scale-100 duration-300 ease-in-out">
              <FaPencilAlt />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={imageFileRef}
            hidden
          />

          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user profile"
            className="object-cover w-full h-full rounded-full absolute inset-0 p-1.5 -z-10"
          />
        </div>

        {/* <button onClick={handeUploadImage} className="button-primary mt-3">
          upload image
        </button> */}
        {error && <p className="text-red-400 mt-5">{error}</p>}

        <div className="w-full mt-12 flex flex-col gap-6">
          <input
            type="text"
            id="username"
            defaultValue={currentUser.username}
            onChange={handleChange}
            className="input-field-style "
          />
          <input
            type="email"
            id="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
            className="input-field-style "
          />
          {updateError && (
            <p className="text-red-500 dark:text-red-400">{updateError}</p>
          )}
          <button
            type="submit"
            className="button-primary disabled:bg-primary/50 flex justify-center gap-3 items-center disabled:cursor-auto disabled:opacity-70"
            disabled={progress || Object.keys(formData).length === 0}
          >
            {loading && <Loader />}

            {loading ? "Updating" : "Update"}
          </button>
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
