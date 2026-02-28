import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  getUserByUsername,
  uploadProfileImage,
} from "../Services/userService.js";
import { useAuth } from "../Api/AuthContext.jsx";
import axios from "axios";

export const useProfile = () => {
  const { setUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
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

  const handleFollowUnfollow = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/user/${userProfile._id}/follow`,
        {},
        { withCredentials: true },
      );
      if (response.data?.user?.following.includes(userProfile?._id)) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    userProfile,
    progress,
    imageFile,
    imagePreview,
    isFollowing,
    loading,
    fetchUser,
    setImagePreview,
    setImageFile,
    handleChange,
    handleUpload,
    handleFollowUnfollow,
  };
};
