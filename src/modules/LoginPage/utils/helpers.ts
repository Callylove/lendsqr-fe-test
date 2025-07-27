import { LoginFormValues } from "../types";

export const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

export const validate = (values: LoginFormValues) => {
  const errors: Partial<LoginFormValues> = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

export const handleForgotPassword = () => {
  console.log("Forgot password clicked");
};
