import axios from "axios";
import { url } from "@/constant";

// Google Login API
export const googleLoginApi = () => {
  return `${url}api/users/auth/google`;
};

// Request OTP API
export const requestOtpApi = async (email) => {
  const response = await axios.post(`${url}api/users/otp/request-email-otp`, {
    email,
  });
  return response.data;
};

