import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaPencilAlt } from "react-icons/fa";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.userR);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [progress, setProgress] = useState("");
  const imageFileRef = useRef();
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file.size > 2 * 1024 * 1024) {
      console.log(file.size);
      setError("'File size exceeds 2MB limit.'");
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
    } catch (error) {
      console.log(error);
      setError("Upload failed. Try again.");
    }
  };

  console.log(progress);

  return (
    <div>
      <h1 className="font-bold text-3xl">Your Profile</h1>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-20 flex flex-col items-center max-w-xl w-full mx-auto"
      >
        <div
          className="relative w-32 h-32 cursor-pointer group z-0 rounded-full overflow-hidden"
          onClick={() => imageFileRef.current.click()}
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
            defaultValue={currentUser.username}
            className="input-field-style "
          />
          <input
            type="email"
            defaultValue={currentUser.email}
            className="input-field-style "
          />
          <button type="submit" className="button-primary">
            Update
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
