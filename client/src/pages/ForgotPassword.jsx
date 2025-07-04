import axios from 'axios';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa'; // Import arrow icon
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Loader from '../components/loaders/Loader';
import { motion } from 'motion/react';
import { FaEnvelopeOpenText } from 'react-icons/fa';

const ForgotPassword = () => {

  const location = useLocation();
  const emailFromRoute = location.state;

  const [email, setEmail] = useState(emailFromRoute && emailFromRoute || '');
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('Please enter your email address.');
      return;
    }

    try {
        setIsLoading(true);
     const res = await axios.post("/api/auth/forgot-password", {email});
        if (res.status === 200) {
            setIsSubmitted(true);
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message)
    }finally {
        setIsLoading(false)
    }
    
  };

  return (
    !isSubmitted ?
    <div className="min-h-screen bg-white dark:bg-dark grid place-items-center px-4">
      <div className="max-w-md w-full bg-gray-50 dark:bg-primaryDark shadow-2xl rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4">
          Enter your email address and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field-style"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#00adae] hover:bg-[#009192] cursor-pointer flex items-center justify-center gap-2 text-white font-medium py-2 rounded-md transition"
            disabled={loading}
          >
            {loading ? <><Loader /> Sending</> : "Send Reset Link"}
          </button>

          {/* Back to Sign in */}
          <button
            type="button"
            onClick={() => navigate('/sign-in')}
            className="w-full flex items-center justify-center gap-2 text-[#00adae] hover:underline mt-2"
          >
            <FaArrowLeft className="text-sm" />
            Back to Sign in
          </button>
        </form>
      </div>
    </div>
    : <ResetLinkSuccess />
  );
};

export default ForgotPassword;



const ResetLinkSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-dark flex items-center justify-center px-4">
      <div className="bg-gray-50 dark:bg-primaryDark rounded-xl shadow-md p-8 max-w-md w-full text-center">
        
        {/* Animated Icon */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="flex justify-center mb-6"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 5, -5, 0],
              transition: { duration: 2, repeat: Infinity },
            }}
            className="text-teal-400 text-5xl"
          >
            <FaEnvelopeOpenText />
          </motion.div>
        </motion.div>

        {/* Success Text */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          Reset Link Sent!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
          We’ve sent a password reset link to your email address.  
          Please check your inbox (and spam folder).
        </p>

        {/* Back to Sign In */}
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
