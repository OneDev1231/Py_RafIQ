import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

export const schemaFieldEmail = () => {
  return { email: yup.string().label("Email").email().required() };
};

export const schemaFieldPassword = () => {
  return {
    password: yup.string().label("Password").required().min(6).max(50),
  };
};

export const schemaFieldFullName = () => {
  return {
    fullName: yup.string().label("Full name").required().min(3).max(100),
  };
};

export const schemaFieldPasswordValidation = () => {
  return {
    password: yup
      .string()
      .password()
      .minLowercase(0)
      .minUppercase(1, "Password must contain at least 1 upper case letter")
      .minNumbers(1, "Password must contain at least 1 number")
      .minSymbols(1, "Password must contain at least 1 special character")
      .label("Password")
      .required()
      .min(8)
      .max(50),
  };
};

export const schemaFieldPasswordConfirmation = () => {
  return {
    password_confirmation: yup
      .string()
      // @ts-ignore
      .oneOf([yup.ref('password'), null], "Passwords do not match"),
  };
};
