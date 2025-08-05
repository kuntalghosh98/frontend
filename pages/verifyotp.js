// export default VerifyOtp;
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Spinner from '@/components/Spinner';
import { verifyEmailOtp } from '@/api/userApi';
import UserInitializer from '@/components/UserInitializer';
import { mergeCartOnLogin, mergeWishlistOnLogin } from '../commonFun/commonFunction';
const VerifyOtp = () => {
  const router = useRouter();
  const { email } = router.query;

  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const redirectPath = router.query.redirect || '/';
  console.log("redirectPath   ----555:", redirectPath); 

  // const handleOtpSubmit = async (event) => {
  //   event.preventDefault();
  //   setError(null);
  //   setSpinner(true);

  //   try {
  //     const data = await verifyEmailOtp({ email, otp });
  //     localStorage.setItem('token', data.token);
  //     const userId = data.user._id;
  //     await mergeCartOnLogin(userId, data.token);
  //     await mergeWishlistOnLogin(userId, data.token);

  //     window.location.href = '/';
  //   } catch (err) {
  //     console.error('OTP verification failed:', err);
  //     setError('Invalid OTP. Please try again.');
  //   } finally {
  //     setSpinner(false);
  //   }
  // };




  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSpinner(true);
  
    try {
      // 1. Verify OTP and get token + user
      const data = await verifyEmailOtp({ email, otp });
  
      // 2. Save token locally
      localStorage.setItem('token', data.token);
  
      // 3. Extract userId for merging guest data
      const userId = data.user._id;
  
      // 4. Merge guest cart and wishlist (sequentially or in parallel)
      await Promise.all([
        mergeCartOnLogin(userId, data.token),
        mergeWishlistOnLogin(userId, data.token),
      ]);
  
      // 5. Reload app to hydrate Redux state with token
      window.location.href = '/';
  
    } catch (err) {
      console.error('OTP verification failed:', err);
      setError('Invalid OTP. Please try again.');
    } finally {
      setSpinner(false);
    }
  };
  



  if (spinner) return <Spinner />;

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
