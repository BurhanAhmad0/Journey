import Register from "../Components/Register/Register.jsx";
import { useRegisterForm } from "../Hooks/useRegisterForm.js";

const RegisterPage = () => {
  const { registerForm, errors, handleChange, handleSubmit } =
    useRegisterForm();

  return (
    <Register
      registerForm={registerForm}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default RegisterPage;
