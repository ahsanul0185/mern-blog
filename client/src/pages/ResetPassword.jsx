import axios from 'axios';
import React, { useState } from 'react';
import { FaArrowLeft, FaLock } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { FaCheckCircle } from 'react-icons/fa';
import Loader from '../components/loaders/Loader';
import { toast } from 'sonner';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isResetSuccess, setIsResetSuccess] = useState(false);

  const {token} = useParams();

  const handleChange = (e) => {
    setError(null)
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
  
    
    if (password.trim().length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!password || !confirmPassword) {
      setError('Please fill out both fields.');
      return;
    }


    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
        setLoading(true)
        setError(null);
        const res = await axios.post(`/api/auth/reset-password/${token}`, {password});
        if (res.status === 200) {
            setIsResetSuccess(true)
        }
    } catch (error) {
        toast.error(error?.response?.data?.message)
        console.log(error)
    }finally {
        setLoading(false);
    }
  };

  return (
    !isResetSuccess ? 
    <div className="min-h-screen bg-white dark:bg-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-50 dark:bg-primaryDark rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
          Reset Your Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              className="input-field-style w-full py-2 password-dot"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input-field-style w-full py-2 password-dot"
              required
            />
          </div>

          {error && <p className='text-red-400 mb-4'>{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00adae] cursor-pointer flex items-center justify-center gap-2 hover:bg-[#009192] text-white font-medium py-2 rounded-md transition"
          >
             {loading ? <><Loader /> Reset Password</> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
    : 
    <ResetSuccess />
  );
};

export default ResetPassword;



const ResetSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-dark flex items-center justify-center px-4">
      <div className="bg-gray-50 dark:bg-primaryDark rounded-xl shadow-md p-8 max-w-md w-full text-center">

        {/* Animated Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 5, -5, 0],
              transition: { duration: 2, repeat: Infinity },
            }}
            className="text-[#00adae] text-5xl"
          >
            <FaCheckCircle />
          </motion.div>
        </motion.div>

        {/* Success Message */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          Password Reset Successful!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
          Your password has been successfully updated. You can now log in using your new password.
        </p>

        {/* Back to Login Button */}
        <button
                      type="button"
                      onClick={() => navigate('/sign-in')}
                      className="w-full flex items-center justify-center gap-2 text-[#00adae] hover:underline mt-2"
                    >
                      <FaArrowLeft className="text-sm" />
                      Back to Sign in
                    </button>
      </div>
    </div>
  );
};