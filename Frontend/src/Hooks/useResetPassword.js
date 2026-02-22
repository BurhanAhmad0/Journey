import { useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPassword } from "../Services/authService.js";

export const useResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await resetPassword(token, password);
      toast.success("Password reset successful");
      setPassword("");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return {
    password,
    handleChange,
    handleSubmit,
  };
};
