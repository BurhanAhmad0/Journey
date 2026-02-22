import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URI;

export const loginUser = (data) =>
  axios.post(`${API}/auth/login`, data, { withCredentials: true });

export const registerUser = (data) =>
  axios.post(`${API}/auth/register`, data, { withCredentials: true });

export const forgotPassword = (email) =>
  axios.post(
    `${import.meta.env.VITE_BACKEND_URI}/auth/forgot-password`,
    { email },
    { withCredentials: true },
  );

export const resetPassword = (token, password) =>
  axios.post(
    `${import.meta.env.VITE_BACKEND_URI}/auth/reset-password/${token}`,
    { password },
  );
