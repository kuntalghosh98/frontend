import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const { email } = router.query;
  console.log(email);
  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/users/verify-email-otp', {
        email,
        otp,
      });

      // Assuming the response contains the token
      const { token } = response.data;
      console.log("VerifyOtp",response)
      // Save the token to local storage
      localStorage.setItem('token', token);

      // Redirect to the home page
      router.push('/');
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-80">
        <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;