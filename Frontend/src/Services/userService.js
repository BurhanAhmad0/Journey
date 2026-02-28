import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URI;

export const getUserByUsername = (username) =>
  axios.get(`${API}/user/${username}`, { withCredentials: true });

export const uploadProfileImage = (formData, onUploadProgress) =>
  axios.post(`${API}/profile/upload`, formData, {
    withCredentials: true,
    onUploadProgress,
  });

export const updateProfileService = (data) =>
  axios.post(`${API}/profile/update`, data, {
    withCredentials: true,
  });
