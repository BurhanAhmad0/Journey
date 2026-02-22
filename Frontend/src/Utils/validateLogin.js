export const validateLogin = ({ email, password }) => {
  const errors = {};

  if (!email.includes("@")) {
    errors.email = "Enter a valid email";
  }

  if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};
