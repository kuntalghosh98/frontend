import axios from "axios";
import { url } from "@/constant";

export const fetchProductDetailsApi = async (id) => {
  const response = await axios.get(`${url}api/products/${id}`);
  return response.data;
};


export const fetchProductById= async (id) => {
  const response = await axios.get(`${url}api/products/${id}`); 
  if (response.status === 200) {
    return response.data; 
  }
}

export const addToWishlistApi = async (data) => {
  const response = await axios.post(`${url}api/wishlist/add`, data);
  return response.data;
};