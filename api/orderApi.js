import axios from "axios";
import { url } from "@/constant";

export const fetchOrderApi = async (id) => {
  const response = await axios.get(`${url}api/orders/${id}`);
  return response.data;
};

export const fetchUserOrdersApi = async (userId) => {
    const response = await axios.get(`${url}api/orders/user/${userId}`);
    return response.data;
  };

  export const createOrderApi = async ({ userId, items, address, paymentResponse }) => {
    return axios.post(`${url}api/orders/create`, {
      userId,
      items,
      address,
      paymentResponse
    });
  };

  // export const createRazorpayOrderApi = async ({ amount, currency = 'INR' }) => {
  //   const response = await axios.post(`${url}api/payment/razorpay/create-order`, {
  //     amount,
  //     currency
  //   });
  //   return response.data;
  // };

  export const createRazorpayOrderApi = async () => {
    try {
      const token = localStorage.getItem('token'); // Or use cookies if that's your method
  
      const res = await axios.post(
        `${url}api/payment/razorpay/create-order`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return res.data;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw error;
    }
  };
  
  // export const verifyRazorpayPaymentApi = async (paymentData) => {
  //   const response = await axios.post(`${url}api/payment/razorpay/verify-payment`, paymentData);
  //   return response.data;
  // };

  // api/orderApi.js (or wherever it’s defined)
export const verifyRazorpayPaymentApi = async (paymentData) => {
  const token = localStorage.getItem('token');

  const res = await axios.post(
    `${url}api/payment/razorpay/verify-payment`,
    paymentData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
