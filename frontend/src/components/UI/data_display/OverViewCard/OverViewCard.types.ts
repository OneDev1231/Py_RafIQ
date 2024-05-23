import React, { ReactNode } from "react";

type BaseProps = {
  img: string;
  label?: string;
  value?: number;
  unit?: string;
  percent?: number;
};

// export type InputProps = BaseProps &
//   React.DetailedHTMLProps<
//     React.InputHTMLAttributes<HTMLInputElement>,
//     HTMLInputElement
//   > & {
//     resize?: never;
//   };

export type OverViewCardProps = BaseProps;
