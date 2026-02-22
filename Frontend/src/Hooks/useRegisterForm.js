import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../Services/authService.js";
import { validateRegister } from "../Utils/validateRegister.js";
import { useAuth } from "../Api/AuthContext.jsx";

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [registerForm, setRegisterForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegister(registerForm);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { data } = await registerUser(registerForm);

      setUser(data.user);
      toast.success("User registered successfully");
      navigate(`/${data?.user?.username}`);

      setRegisterForm({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });

      setErrors({});
    } catch (error) {
      setUser(null);

      const message = error?.response?.data?.message || "Registration failed";

      toast.error(message);
    }
  };

  return {
    registerForm,
    errors,
    handleChange,
    handleSubmit,
  };
};
