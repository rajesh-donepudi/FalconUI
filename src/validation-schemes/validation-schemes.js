import * as yup from "yup";

export function LoginValidationScheme() {
  return yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });
}

export function ThemeColorFormValidationSchema() {
  return yup.object({
    primaryColor: yup
      .string("Select primary color.")
      .required("Primary color is required."),
    secondaryColor: yup
      .string("Select secondary color")
      .required("Secondary color is required."),
  });
}

export function SignupValidationSchema() {
  return yup.object({
    firstname: yup
      .string("Enter first name")
      .required("First name is required"),
    lastname: yup.string("Enter last name").required("Last name is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    username: yup.string("Enter username").required("Username is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
}

export function ForgotPasswordValidationScheme() {
  return yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
  });
}

export function CreateNewPolicyValidationScheme() {
  return yup.object({
    name: yup.string("Enter policy name").required("Name is required"),
  });
}
