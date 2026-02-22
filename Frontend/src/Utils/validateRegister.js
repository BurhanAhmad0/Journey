export const validateRegister = (form) => {
  const errors = {};

  if (!form.first_name.trim()) {
    errors.first_name = "First name is required";
  }

  if (!form.email.includes("@")) {
    errors.email = "Enter a valid email";
  }

  if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};
