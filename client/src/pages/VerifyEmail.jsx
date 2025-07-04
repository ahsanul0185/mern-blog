// import React from 'react'

// const VerifyEmail = () => {
//   return (
//     <div className='bg-white dark:bg-dark h-screen grid place-items-center'>

//     </div>
//   )
// }

// export default VerifyEmail

import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import Loader from '../components/loaders/Loader';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (code[index] !== '') {
        // Just clear the current input
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      } else if (index > 0) {
        // Move to the previous input
        document.getElementById(`code-${index - 1}`).focus();
      }
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalCode = code.join('');
    if (finalCode.length !== 6) {
      toast.error('Please enter all 6 digits');
      return;
    }
    
    try {
        setError(null);
        setLoading(true)
        const res = await axios.post("/api/auth/verify-email", {code : finalCode});

        if (res.status === 200) {
             dispatch(signInSuccess(res.data));
                      toast.success("Signed in", {style : {backgroundColor : "#008b8c", color : "white", border : "1px solid rgba(255, 255, 255, 0.4)"}});
                      setError(null);
                      navigate("/");
        }
    } catch (error) {
        setError(error.response.data.message)
        console.log(error)
    }finally {
        setLoading(false);
    }

  };

  useEffect(() => {
  const firstInput = document.getElementById('code-0');
  if (firstInput) {
    firstInput.focus();
  }
}, []);


  return (
    <div className="bg-white dark:bg-dark h-screen grid place-items-center">
      <div className="max-w-md w-full flex flex-col items-center mx-auto bg-gray-50 dark:bg-primaryDark rounded-xl p-8 shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
          Verify Your Email
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4">
          Please enter the 6-digit code sent to your email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {code.map((digit, idx) => (
              <input
                key={idx}
                id={`code-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-12 h-12 text-center text-xl border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            ))}
          </div>

          {error && <p className='text-red-500 mb-5'>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 cursor-pointer px-4 flex items-center gap-2 justify-center bg-primary hover:bg-primary/50 text-white font-medium rounded-md transition"
          >
            {loading ? <><Loader /> Verifying...</> : "Verify"}
          </button>
        </form>

        {/* <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Didn't receive the code?{' '}
          <button className="text-primary font-medium hover:underline cursor-pointer">
            Resend
          </button>
        </p> */}
      </div>
    </div>
  );
};

export default VerifyEmail;
