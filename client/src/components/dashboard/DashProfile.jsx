import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaPencilAlt } from "react-icons/fa";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
  updateFalied,
  updateStart,
  updateSuccess,
} from "../../features/user/userSlice";
import Loader from "../Loader";
import { toast } from "sonner";
import Modal from "../Modal";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const DashProfile = () => {
  const {
    currentUser,
    loading,
    error: updateError,
  } = useSelector((state) => state.userR);

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [progress, setProgress] = useState("");
  const [formData, setFormData] = useState({});
  const [activeModal, setActiveModal] = useState(null);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");

  const imageFileRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // Uploading image to cloudinary
  const handeUploadImage = async () => {
    const fileName = new Date().getTime() + imageFile.name;

    const imageData = new FormData();
    imageData.append("file", imageFile);
    imageData.append("upload_preset", "mern-blog");
    imageData.append("folder", "mern_blog_users");
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

  // input field change
  const handleChange = async (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(formData).length === 0 || loading) {
      return;
    }

    const nothingToChange = Object.keys(currentUser).some(
      (key) =>
        formData.hasOwnProperty(key) && currentUser[key] === formData[key]
    );

    if (nothingToChange) {
      return toast("Nothing to change");
    }

    try {
      dispatch(updateStart());

      const res = await axios.put(
        `/api/user/update/${currentUser._id}`,
        formData
      );
      const data = await res.data;

      if (res.status === 200) {
        dispatch(updateSuccess(data));
        setFormData({});
        toast.success("Profile updated successfully", {
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
      dispatch(updateFalied(error.message));
    }
  };

  // delete account
  const handleDeleteAccount = async (password) => {

    try {
      const res = await axios.delete(`/api/user/delete/${currentUser._id}`, {
        data: { password },
      });
      if (res.status === 200) {
        dispatch(deleteUserSuccess());
        toast.error("Account deleted", {
          style: {
            backgroundColor: "#a93800",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.4)",
          },
        });
      } else {
        dispatch(deleteUserFailure("Deletation failed"));
      }
    } catch (error) {
      toast.error(error.response.data.message || "Deletation failed", {
        style: {
          backgroundColor: "#a93800",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.4)",
        },
      });
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
          onClick={() =>
            progress
              ? toast("Please wait for image to upload")
              : imageFileRef.current.click()
          }
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
            className="button-primary  flex justify-center gap-3 items-center"
            disabled={progress || Object.keys(formData).length === 0}
          >
            {loading && <Loader />}

            {loading ? "Updating" : "Update"}
          </button>
        </div>

        <div className="flex items-center justify-between w-full mt-5 text-sm text-red-500 dark:text-red-400">
          <button
            className="cursor-pointer"
            onClick={() => setActiveModal("delete")}
          >
            Delete Account
          </button>
          <Modal
            showModal={activeModal === "delete"}
            setShowModal={setActiveModal}
          >
            <IoAlertCircleOutline className="text-7xl mx-auto text-gray-300" />
            <h2 className="font-bold text-2xl mt-2 text-center">
              Confirm Account Deletion
            </h2>
            <p className="mt-5">
              Please enter your password to confirm you want to permanently
              delete your account.{" "}
            </p>
            <input
              type="password"
              className="input-field-style mt-5 password-dot"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => handleDeleteAccount(password)}
                className="button-primary bg-red-600 hover:bg-red-700"
              >
                Delete Account
              </button>
              <button
                className="button-primary bg-gray-400 dark:bg-gray-400/30 dark:hover:bg-gray-400/50"
                onClick={() => setActiveModal(null)}
              >
                Cancel
              </button>
            </div>
          </Modal>

          <button
            className="cursor-pointer"
            onClick={() => {
              dispatch(signOut());
              navigate("/sign-in");
            }}
          >
            Sign Out
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashProfile;
