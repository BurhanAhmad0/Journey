import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loginUser } from "../Services/authService.js";
import { validateLogin } from "../Utils/validateLogin.js";
import { useAuth } from "../Api/AuthContext.jsx";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLogin(loginForm);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { data } = await loginUser(loginForm);

      setUser(data.user);
      toast.success("Logged in successfully");
      console.log(data?.user?.username);
      console.log(typeof data?.user?.username);
      navigate(`/${data?.user?.username}`);

      setLoginForm({ email: "", password: "" });
    } catch (error) {
      setUser(null);

      const message = error?.response?.data?.message || "Invalid credentials";

      toast.error(message);
    }
  };

  return {
    loginForm,
    errors,
    handleChange,
    handleSubmit,
  };
};
