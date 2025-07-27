// filepath: c:\website\frontend\api\cartApi.js
import axios from "axios";
import { url } from "@/constant";

export const fetchCartApi = async (userId) => {
  const response = await axios.get(`${url}api/cart/${userId}`);
  return response.data;
};
export const addToCartApi = async (data) => {
  const response = await axios.post(`${url}api/cart/`, data);
  return response.data;
};


export const clearCartApi = async (userId) => {
  return axios.delete(`${url}api/cart/clear`, { data: { userId } });
};