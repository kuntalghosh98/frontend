// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import Image from "next/image";
// import { setCartItems, selectCartCount } from '../store/slices/cartSlice';
// import { setUser, isDataAvailable } from '../store/slices/userSlice';
// import { setWishlist } from "../store/slices/wishlistSlice";
// import emptyWishList from '../Utility/icons/emptyWish.png';
// import Router from 'next/router';
// import { useRouter } from "next/router";
// import { url } from '@/constant';
// import { fetchUserData } from '../commonFun/commonFunction';
// import ProductCard from '@/components/Product/ProductCard';
// function WishList() {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
//   const user = useSelector((state) => state.user.user);
//   const userId = user ? user._id : null;
//   const wishlistProducts = useSelector((state) => state.wishlist.items); // Get wishlist from Redux
//   console.log(wishlistProducts)


//   const fetchWishList = async () => {
//     try {
//       const response = await axios.get(`${url}api/wishlist/${userId}`);
//       console.log("Wishlist items:", response.data.items);
//       dispatch(setWishlist(response.data.items)); // Store wishlist in Redux
//     } catch (error) {
//       console.error("Error fetching wishlist:", error);
//     }
//   };
//   const handleRemove = async (productId) => {
//     try {
//       const response = await axios.delete(`${url}api/wishlist/remove/`, {
//         data: { userId: user._id, productId },
//       });

//       if (response.status === 200) {
//         fetchWishList();
//       }
//     } catch (error) {
//       console.error("Failed to remove item from wishlist:", error);
//     }
//   };
//   console.log("Final products state:", wishlistProducts); // Now this will log updated products after fetching

//   return (
//     <div className='mt-8'>

//       {wishlistProducts.length > 0 ? (<div className="p-4">
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
//           {wishlistProducts.map((product) => (
//             <ProductCard key={product._id} product={product.productId} callFrom="wishList" userId={user._id} id={product._id} handleRemove={handleRemove} />
//           ))}
//         </div>
//       </div>) : (<div className="flex flex-col justify-center items-center min-h-screen">
//   <Image 
//     src={emptyWishList} 
//     alt="Empty Wishlist" 
//     className="mb-4 max-w-xs md:max-w-sm lg:max-w-md h-auto" 
//   />
//   <button
//     onClick={() => window.history.back()} 
//     className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
//   >
//     Back to Shopping
//   </button>
// </div>
// )}
//     </div>
//   );
// };

// export default WishList;



// Optimized WishList.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ProductCard from '@/components/Product/ProductCard';
import emptyWishList from '../Utility/icons/emptyWish.png';

import { fetchWishlistItems, removeFromWishlist } from '@/api/wishlistApi';
import { setWishlist } from '@/store/slices/wishlistSlice';

const WishList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const wishlistProducts = useSelector((state) => state.wishlist.items);

  const userId = user?._id;

  useEffect(() => {
    if (userId) {
      loadWishlist();
    }
  }, [userId]);

  const loadWishlist = async () => {
    try {
      const items = await fetchWishlistItems(userId);
      dispatch(setWishlist(items));
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const removed = await removeFromWishlist(userId, productId);
      if (removed.success) {
        loadWishlist();
      }
    } catch (error) {
      console.error('Failed to remove item from wishlist:', error);
    }
  };

  return (
    <div className="mt-8">
      {wishlistProducts.length > 0 ? (
        <div className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {wishlistProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product.productId}
                callFrom="wishList"
                userId={userId}
                id={product._id}
                handleRemove={handleRemove}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-screen">
          <Image
            src={emptyWishList}
            alt="Empty Wishlist"
            className="mb-4 max-w-xs md:max-w-sm lg:max-w-md h-auto"
          />
          <button
            onClick={() => router.back()}
            className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Back to Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default WishList;

