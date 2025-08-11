import axios from 'axios';
import { url } from '@/constant';

export const getUserProfile = async (token) => {
  try {
    console.log('Fetching user profile with token:', token);
    const response = await axios.get(`${url}api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('User profile fetched:');
    return response.status === 200 ? response.data : false;
  } catch (error) {
    console.error('Error fetching user profile:', error);
   
  }
};

export const getCart = async (userId) => {
  try {
    const response = await axios.get(`${url}api/cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
   
  }
};

export const getAddress = async (userId) => {
  try {
    const response = await axios.get(`${url}api/address/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching address:', error);
   
  }
};
export const verifyEmailOtp = async ({ email, otp }) => {
  const response = await axios.post(`${url}api/users/otp/verify-email-otp`, {
    email,
    otp,
  });
  return response.data;
};

// utils/api/userApi.js

export const updateUserProfile = async (userId, userData, token) => {
  const res = await fetch(`${url}api/users/profile/update-profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId,   // Pass userId here
      ...userData
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to update profile');
  }

  return await res.json();
};
