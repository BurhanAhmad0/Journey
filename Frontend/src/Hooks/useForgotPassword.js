import { useState } from "react";
import toast from "react-hot-toast";
import { forgotPassword } from "../Services/authService.js";

export const useForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await forgotPassword(email);
      toast.success("Reset link sent to your email");
      setEmail("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return {
    email,
    handleChange,
    handleSubmit,
  };
};
