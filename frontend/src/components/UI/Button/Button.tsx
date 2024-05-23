import React from "react";

interface Props {
  variant: string; // contained, outlined
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: any;
}

const Button = ({ children, variant, className, disabled, onClick, type }: Props) => {
  if (variant === "contained") {
    return (
      <button
        type={type || "button"}
        disabled={disabled}
        onClick={onClick}
        className={`inline-flex items-center justify-center bg-[#00ADB5] font-Satoshi border border-[#00ADB5] rounded-lg p-2 text-[12px] text-[#FDFDFD] font-medium ${
          className || ""
        }`}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      type={type || "button"}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center bg-none font-Satoshi rounded-lg p-2 text-[12px] 
        text-[#FF4646] dark:text-[#FF6F6F] border border-[rgba(255, 70, 70, 0.13)] font-medium ${className || ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
