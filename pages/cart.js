// // pages/cart.js
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import Image from "next/image";
// import { setCartItems,selectCartCount } from '../store/slices/cartSlice';
// import { setUser,isDataAvailable } from '../store/slices/userSlice';
// import CartItem from '../components/Cart/CartItem';
// import CartSummary from '../components/Cart/CartSummary';
// import Router from 'next/router';
// import { useRouter } from "next/router";
// import { url } from '@/constant';
// import {fetchUserData} from '../commonFun/commonFunction';
// import emptyCart from '../Utility/icons/emptyCart.jpg';
// const Cart = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);
//   const cartCount = useSelector(selectCartCount);
//   const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
//   const isDataAvailable = useSelector((state) => state.user.isDataAvailable);
//   const router = useRouter();
 

//   console.log("isDataAvailable",isDataAvailable)
//   const user = useSelector((state) => state.user.user);
  

  
 
//   const fetchCart = async (userId) => {
//     const response = await axios.get(`${url}api/cart/${userId}`);
//     console.log("cart items cart component",response.data.items)
//     dispatch(setCartItems(response.data.items));
//   };
// const continueShoping=()=>{
//   Router.push('/')
// }


//   return (
//     <div className="  py-8">
//       <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
//       <div className="  ">
//       <div className={`flex flex-col md:flex-row gap-2`}>
//           {/* Cart Items Section */}
//           <div className={`w-full md:w-[60vw]`}>
//             {cartItems.length > 0 ? (
//               cartItems.map((item) => <CartItem key={item.id} item={item} />)
//             ) : (
//               <div className="flex flex-col justify-center items-center min-h-screen">
//                 <Image
//                   src={emptyCart}
//                   alt="Empty Wishlist"
//                   className="mb-4 max-w-xs md:max-w-sm lg:max-w-md h-auto"
//                 />
//                 <button
//                   onClick={() => window.history.back()}
//                   className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
//                 >
//                   Back to Shopping
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Cart Summary Section */}
//           <div className={`w-full md:w-[40vw]`}>
//             {cartItems.length > 0 && <CartSummary />}
//           </div>
//         </div>



        
//       </div>
//     </div>
//   );
// };

// export default Cart;



import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import { setCartItems, selectCartCount } from "../store/slices/cartSlice";
import CartItem from "../components/Cart/CartItem";
import CartSummary from "../components/Cart/CartSummary";
import { fetchCartApi } from "@/api/cartApi"; // Abstracted API call
import emptyCart from "../Utility/icons/emptyCart.jpg";

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = useSelector(selectCartCount);
  const user = useSelector((state) => state.user.user);

  const userId = user?._id;

  // Fetch cart data on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (userId) {
          const cartData = await fetchCartApi(userId);
          dispatch(setCartItems(cartData.items));
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, [dispatch, userId]);

  const continueShopping = () => {
    router.push("/");
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <div className="flex flex-col md:flex-row gap-2">
        {/* Cart Items Section */}
        <div className="w-full md:w-[60vw]">
          {cartItems.length > 0 ? (
            cartItems.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <div className="flex flex-col justify-center items-center min-h-screen">
              <Image
                src={emptyCart}
                alt="Empty Cart"
                className="mb-4 max-w-xs md:max-w-sm lg:max-w-md h-auto"
              />
              <button
                onClick={continueShopping}
                className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
                aria-label="Continue Shopping"
              >
                Back to Shopping
              </button>
            </div>
          )}
        </div>

        {/* Cart Summary Section */}
        <div className="w-full md:w-[40vw]">
          {cartItems.length > 0 && <CartSummary />}
        </div>
      </div>
    </div>
  );
};

export default Cart;
