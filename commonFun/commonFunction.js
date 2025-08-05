
import axios from 'axios';
import { url } from '@/constant';

import { useDispatch, useSelector } from 'react-redux';
import { setUser,isDataAvailable } from '../store/slices/userSlice';

export const fetchUserData = async (url,dispatch,setUser,callFrom='',setCartItems) => {
    
    const token = localStorage.getItem('token');
    let userId=""
    try {
        
      console.log("home page token", token)
      const response = await axios.get(`${url}api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    //   dispatch(setUser(response.data));
      
    //   setUserId(response.data._id);
    userId=response.data
      console.log('User data:', response.data._id);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    return userId
  };
export const fetchCart = async (url) => {
    try {
        console.log('User data:',userId)
      const response = await axios.get(`${url}api/cart/${userId}`);
      console.log("cart items", response.data.items)

      dispatch(setCartItems(response.data.items));
    } catch (e) {
      console.log("cart is empty 11111")
    }

  };
  export const fetchWishList = async (url) => {
    try {
        console.log('User data:',userId)
      const response = await axios.get(`${url}api/wishlist/${userId}`);
      console.log("wishlist items", response.data.items)

      // dispatch(setCartItems(response.data.items));
    } catch (e) {
      console.log("wishlist is empty 11111")
    }

  };
  
  export const mergeCartOnLogin = async (userId, token) => {
    const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
  console.log("guestCart------------------------")
  console.log(guestCart);
  console.log(userId);
    if (guestCart.length === 0) return;
  
    // Send items one-by-one or batched to backend
    for (const item of guestCart) {
      try {
        await axios.post(`${url}api/cart`, {
          userId,
          productId: item.productId,
          size: item.size,
          variantColor: item.variantColor,
          quantity: item.quantity,
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.error("Failed to merge cart item:", item, err);
      }
    }
  
    localStorage.removeItem("guestCart");
    localStorage.removeItem("guestCartRedux");
  };
  

  export const mergeWishlistOnLogin = async (userId, token) => {
    const guestWishlist = JSON.parse(localStorage.getItem("guestWishlist") || "[]");
  console.log("guestWishlist------------------------");
  console.log(guestWishlist);
  console.log(userId);
    if (guestWishlist.length === 0) return;
  
    for (const product of guestWishlist) {
      try {
        await axios.post(`${url}api/wishlist/add`, {
          userId,
          productId: product
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.error("Failed to merge wishlist item:", product, err);
      }
    }
  
    localStorage.removeItem("guestWishlist");
    localStorage.removeItem("guestWishlistRedux");
  };
  