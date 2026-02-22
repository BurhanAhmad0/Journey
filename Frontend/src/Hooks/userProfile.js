import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  getUserByUsername,
  uploadProfileImage,
} from "../Services/userService.js";
import { useAuth } from "../Api/AuthContext.jsx";

export const useProfile = () => {
  const { user } = useAuth();

  const [userProfile, setUserProfile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast.error("Only images allowed");
    }

    if (file.size > 2 * 1024 * 1024) {
      return toast.error("Max size is 2MB");
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      await uploadProfileImage(formData, (data) => {
        setProgress(Math.round((data.loaded * 100) / data.total));
      });

      toast.success("Profile image updated successfully!");
      setImageFile(null);
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  const fetchUser = async (username) => {
    try {
      const { data } = await getUserByUsername(username);
      // console.log("Fetched User Data:", data);
      setUserProfile(data.user);
    } catch (error) {
      console.error("Fetch User Error:", error);
    }
  };

  return {
    userProfile,
    progress,
    imageFile,
    imagePreview,
    fetchUser,
    setImagePreview,
    setImageFile,
    handleChange,
    handleUpload,
  };
};
