import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { url } from '@/constant';

const LoginRegister = ({ onClose }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();
  // useEffect(() => {
  //   // Check if user is logged in (you may have a token or session check here)
  //   // Example: Check if a token exists in local storage or a cookie
  //   const token = localStorage.getItem('token'); // Example: Adjust this based on your authentication method
  //   console.log(token)
  //   if (token) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);
  console.log("email",email);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log("token:"+token)

    if (token) {
      localStorage.setItem('token', token);
      router.replace('/'); // Redirect to the home page
    }
  }, [router]);
  console.log("islogin"+isLoggedIn)
  const handleGoogleLogin = () => {
    // Implement Google login functionality here
    window.location.href = `${url}/api/users/auth/google`;
  };

  const handleGetOtp =async (event) => {
    event.preventDefault();
    try{
      const response = await axios.post(`${url}/api/users/request-email-otp`, {
        email
        
      });
      console.log(response);
      router.push(`/VerifyOtp?email=${email}`);
    }catch(err){
      console.log("mail not send",err)
    }
    // Redirect to the VerifyOtp component with the email as a query parameter
   
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-xl font-bold mb-4">Login/Register</h2>
      <div className="space-y-4">
        <button
          onClick={handleGoogleLogin}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <FontAwesomeIcon icon={faGoogle} className="mr-2" />
          Login with Google
        </button>
        <form onSubmit={handleGetOtp} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Get OTP
          </button>
        </form>
      </div>
      <button
        onClick={onClose}
        className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Close
      </button>
    </div>
  );
};

export default LoginRegister;
