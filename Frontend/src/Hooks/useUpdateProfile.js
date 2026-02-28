import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfileService } from "../Services/userService.js";
import { useAuth } from "../Api/AuthContext.jsx";
import { toast } from "react-hot-toast";

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const updateProfile = async (data) => {
    try {
      setLoading(true);

      const response = await updateProfileService(data);
      // console.log(response.data.user);

      setUser(response?.data?.user);
      navigate(`/${response?.data?.user?.username}`);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Error! Updating profile");
      console.error(error?.response?.data || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading };
};
