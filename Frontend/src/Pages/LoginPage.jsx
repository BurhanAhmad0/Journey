import Login from "../Components/Login/Login.jsx";
import { useLoginForm } from "../Hooks/useLoginForm.js";

const LoginPage = () => {
  const { loginForm, errors, handleChange, handleSubmit } = useLoginForm();

  return (
    <Login
      loginForm={loginForm}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default LoginPage;
