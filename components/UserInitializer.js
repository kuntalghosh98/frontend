// components/UserInitializer.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/userSlice';
import { setCartItems } from '@/store/slices/cartSlice';
import { setAddresses } from '@/store/slices/addressSlice';
import { setWishlist } from "../store/slices/wishlistSlice";
import axios from 'axios';
import { url } from '@/constant';

const UserInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const fetchUserData = async () => {
        try {
          // Fetch user profile
          const response = await axios.get(`${url}api/users/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch(setUser(response.data));
          const userId = response.data._id;
          console.log("_app initializer", userId);

          // Fetch Cart
          const cartRes = await axios.get(`${url}api/cart/${userId}`);
          dispatch(setCartItems(cartRes.data.items));

          // Fetch Address
          const addressRes = await axios.get(`${url}api/address/${userId}`);
          dispatch(setAddresses(addressRes.data));

          // You can also fetch wishlist here if needed
          const wishlist = await axios.get(`${url}api/wishlist/${userId}`);
          dispatch(setWishlist(wishlist.data.items));
        } catch (err) {
          console.error("Error fetching user-specific data", err);
        }
      };

      fetchUserData();
    }
  }, []);

  return null; // Doesn't render anything visible
};

export default UserInitializer;
