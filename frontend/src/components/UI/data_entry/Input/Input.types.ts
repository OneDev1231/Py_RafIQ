import React, { ReactNode } from "react";

type BaseProps = {
  label?: string;
  placeholder?: string;
  message?: {
    info?: ReactNode;
    error?: ReactNode;
  };
};

export type InputProps = BaseProps &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    resize?: never;
  };

export type InputTextareaProps = InputProps;
