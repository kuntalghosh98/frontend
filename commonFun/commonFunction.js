
import axios from 'axios';
// import { url } from '@/constant';

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
  