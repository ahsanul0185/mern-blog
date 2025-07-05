import React, { useState, useSyncExternalStore } from "react";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import Loader from "../loaders/Loader";
const DashChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const { currentUser } = useSelector((state) => state.userR);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmNewPassword } = formData;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (
      currentPassword.trim().length < 6 ||
      newPassword.trim().length < 6 ||
      confirmNewPassword.trim().length < 6
    ) {
      setError("Password must me at least 6 character long");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    setError("");

    try {
      setLoading(true);
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/change-password`,
        { oldPassword: currentPassword, newPassword }, {withCredentials : true}
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      }

    } catch (error) {
      setError(error?.response?.data?.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-10">
      <h1 className="font-bold text-3xl text-center mb-10">
        Change Your Password
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-xl w-full mx-auto"
      >
        <div className="relative">
          <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
            className="input-field-style password-dot w-full py-2 pl-10"
            required
          />
        </div>

        <div className="relative">
          <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            className="input-field-style password-dot w-full py-2 pl-10"
            required
          />
        </div>

        <div className="relative">
          <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="password"
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            className="input-field-style password-dot w-full py-2 pl-10"
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm text-start -mt-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#00adae] flex items-center gap-2 justify-center cursor-pointer hover:bg-[#009192] text-white font-medium py-2 rounded-md transition"
        >
          {loading ? (
            <>
              <Loader /> Updating
            </>
          ) : (
            "Update Password"
          )}
        </button>

        <p className="text-sm text-end  text-gray-500">
          <button
            type="button"
            onClick={() =>
              navigate("/forgot-password", { state: currentUser.email })
            }
            className="text-[#00adae] hover:underline cursor-pointer"
          >
            Forgot Password?
          </button>
        </p>
      </form>
    </div>
  );
};

export default DashChangePassword;
