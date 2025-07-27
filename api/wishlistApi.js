import axios from 'axios';
import { url } from '@/constant';

export const fetchWishlistItems = async (userId) => {
  const response = await axios.get(`${url}api/wishlist/${userId}`);
  return response.data.items;
};

export const removeFromWishlist = async (userId, productId) => {
  const response = await axios.delete(`${url}api/wishlist/remove/`, {
    data: { userId, productId },
  });
  return response.data;
};
