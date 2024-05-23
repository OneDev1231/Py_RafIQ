import * as yup from "yup";
import {
  schemaFieldEmail,
  schemaFieldPassword,
  schemaFieldFullName,
  schemaFieldPasswordValidation,
  schemaFieldPasswordConfirmation,
} from "./user.schema";

export const schemaAuthLogin = () => {
  return yup
    .object()
    .shape({ ...schemaFieldEmail(), ...schemaFieldPassword() });
};

export const schemaAuthRegister = () => {
  return yup.object().shape({
    ...schemaFieldFullName(),
    ...schemaFieldEmail(),
    ...schemaFieldPasswordValidation(),
    ...schemaFieldPasswordConfirmation(),
  });
};

export const schemaAuthForgotpassword = () => {
  return yup.object().shape({ ...schemaFieldEmail() });
};

export const schemaAuthResetPassword = () => {
  return yup.object().shape({
    ...schemaFieldPasswordValidation(),
    ...schemaFieldPasswordConfirmation(),
  });
};
