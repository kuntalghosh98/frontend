// filepath: c:\website\frontend\api\addressApi.js
import axios from "axios";
import { url } from "@/constant";

export const fetchAddresses = async (userId) => {
  const response = await axios.get(`${url}api/address/${userId}`);
  return response.data;
};

export const addAddressApi = async (address) => {
  const response = await axios.post(`${url}api/address/add`, address);
  return response.data;
};

export const editAddressApi = async (address, addressId) => {
  const response = await axios.put(
    `${url}api/address/update/${addressId}`,
    address
  );
  return response.data;
};

export const deleteAddressApi = async (addressId) => {
  const response = await axios.delete(`${url}api/address/delete/${addressId}`);
  return response.data;
};