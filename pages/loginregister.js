// import React, { useState,useEffect } from 'react';
// import Image from "next/image";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGoogle } from '@fortawesome/free-brands-svg-icons';
// import { useRouter } from 'next/router';
// import jwt_decode from 'jwt-decode';
// import axios from 'axios';
// import { url,base_path } from '@/constant';
// import Spinner from '@/components/Spinner';
// import "../GoogleLogo.module.css";
// import image1 from "../Utility/icons/shoppana.svg";
// import image2 from "../Utility/icons/Onlinedating.gif";


// const loginregister = ({ onClose }) => {
//    const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const [userName, setUserName] = useState('');
//   const [email, setEmail] = useState('');
//   const [spinner,setSpinner]=useState(false);
//   const router = useRouter();
//   // useEffect(() => {
//   //   // Check if user is logged in (you may have a token or session check here)
//   //   // Example: Check if a token exists in local storage or a cookie
//   //   const token = localStorage.getItem('token'); // Example: Adjust this based on your authentication method
//   //   console.log(token)
//   //   if (token) {
//   //     setIsLoggedIn(true);
//   //   }
//   // }, []);
//   console.log("email",email);
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const token = urlParams.get('token');
//     console.log("token:"+token)

//     if (token) {
//       localStorage.setItem('token', token);
//       router.replace(`/`); // Redirect to the home page
//     }
//   }, [router]);
//   console.log("islogin"+isLoggedIn)
//   const handleGoogleLogin = () => {
//     // Implement Google login functionality here
//     window.location.href = `${url}api/users/auth/google`;
//   };

//   const handleGetOtp =async (event) => {
//     event.preventDefault();
//     try{
//       setSpinner(true);
//       const response = await axios.post(`${url}api/users/otp/request-email-otp`, {
//         email
        
//       });
//       console.log(response);
      
//       router.push(`/verifyotp?email=${email}`);
//     }catch(err){
//       console.log("mail not send",err)
//     }
//     // Redirect to the verifyotp component with the email as a query parameter
   
//   };
// if(spinner) return <Spinner/>
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//     <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//     <Image src={image1} alt="Share" className="w-100 h-60 cursor-pointer" />
    
     
//       {/* <h2 className="text-xl font-bold mb-4">Login/Register</h2> */}
//       <div className="space-y-4">
//         <button
//           onClick={handleGoogleLogin}
//           className="w-full flex justify-center py-1  border border-gray-300 rounded-md shadow-sm text-sm font-medium  bg-white-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//         >
//           {/* <FontAwesomeIcon icon={faGoogle} className="mr-2" />
//           Login with Google */}
//           <div className=''>
//           <img
//           className='h-8'
//           src={`${url}uploads/google.png`}
//           />
//           </div>
         
//         </button>
//         <form onSubmit={handleGetOtp} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-xl font-bold text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Get OTP
//           </button>
//         </form>
//       </div>
//       <button
//         onClick={onClose}
//         className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//       >
//         Close
//       </button>
//     </div>
//     </div>
//   );
// };

// export default loginregister;




import React, { useState, useEffect } from "react";
import Image from "next/image";
import { url } from '@/constant';
import { useRouter } from "next/router";
import { googleLoginApi, requestOtpApi } from "@/api/authApi"; // Import API functions
import Spinner from "@/components/Spinner";
import image1 from "../Utility/icons/shoppana.svg";
import { mergeCartOnLogin, mergeWishlistOnLogin } from "../commonFun/commonFunction"; // adjust the path
import { getUserProfile, getCart } from "../api/userApi"; // adjust imports
import { useDispatch } from "react-redux";
import { setCartItems } from '@/store/slices/cartSlice';


// import { toast } from "react-toastify";

const LoginRegister = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const redirectPath = router.query.redirect || '/';
  console.log("redirectPath:", redirectPath); 

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const token = urlParams.get("token");

  //   if (token) {
  //     localStorage.setItem("token", token);
  //     router.replace(`/`);
  //   }
  // }, [router]);



  useEffect(() => {
    const handleGoogleLoginCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      
    console.log("----------------jbvgjvggjvvjhbjh-------1---------");
    console.log(token);
    console.log("----------------jbvgjvggjvvjhbjh---------2-------");
      if (!token) {"token not found"};
  
      try {
        setSpinner(true)
        // 1. Save token
        localStorage.setItem("token", token);
  
        // 2. Get user
        const user = await getUserProfile(token); // should return {_id, email, ...}
        console.log("User data:", user);
        const userId = user._id;
        console.log("User ID:", userId);
        // 3. Merge cart & wishlist
        await Promise.all([
                mergeCartOnLogin(userId, token),
                mergeWishlistOnLogin(userId, token),
              ]);
  
        // 4. Fetch merged cart and update redux
        // const res = await getCart(userId);
        // dispatch(setCartItems(res.items));
              router.replace(redirectPath);
      } catch (err) {
        console.error("Post-Google-login flow failed:", err);
      } finally {
       
        setSpinner(false);
      }
    };
  
    handleGoogleLoginCallback();
  }, []);



  const handleGoogleLogin = () => {
    window.location.href = googleLoginApi();
  };

  const handleGetOtp = async (event) => {
    event.preventDefault();
    try {
      setSpinner(true);
      await requestOtpApi(email); 
      // toast.success("OTP sent successfully!");
      router.push(`/verifyotp?email=${email}&redirect=${redirectPath}`);
    } catch (err) {
      console.error("Error sending OTP:", err);
      // toast.error("Failed to send OTP. Please try again.");
    } finally {
      setSpinner(false);
    }
  };

  if (spinner) return <Spinner />;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <Image src={image1} alt="Shoppana Logo" className="w-100 h-60 cursor-pointer" />
        <div className="space-y-4">

          <button
            onClick={handleGoogleLogin}
            className="w-full flex justify-center py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            aria-label="Login with Google"
          >
            <img
              className="h-8"
              src={`${url}uploads/google.png`}
              alt="Google Login"
            />
          </button>

          <form onSubmit={handleGetOtp} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xl font-bold text-gray-700">
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
          aria-label="Close Login/Register Modal"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginRegister;