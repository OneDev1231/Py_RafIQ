import React, { useState } from "react";
import { InputTextareaProps } from "./InputPassword.types";
import Link from "next/link";
import { useTheme } from "next-themes";
import eyeOpen from "assets/img/icons/eyeopen.svg";
import eyeClose from "assets/img/icons/eyeclose.svg";
import eyeOpenDark from "assets/img/icons/eyeopen-dark.svg";
import eyeCloseDark from "assets/img/icons/eyeclose-dark.svg";
import Image from "next/image";

export const InputPassword = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputTextareaProps
>(
  (
    {
      label,
      placeholder,
      message,
      forgotPassword = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const { theme } = useTheme();

    return (
      <div className="relative">
        <div className="font-medium text-sm mb-[6px]">{label}</div>
        <input
          /*@ts-ignore*/
          ref={ref}
          className="w-full rounded-md border border-semiblack border-opacity-[0.12] p-3 text-sm mb-[9px]"
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          {...props}
        />
        <div className="absolute right-3 top-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowPassword((prevState) => !prevState);
            }}
          >
            {!showPassword ? (
              <Image
                alt="EyeOpen"
                src={theme === "dark" ? eyeOpenDark : eyeOpen}
                width={18}
                height={18}
              />
            ) : (
              <Image
                alt="EyeClose"
                src={theme === "dark" ? eyeCloseDark : eyeClose}
                width={18}
                height={18}
              />
            )}
          </button>
        </div>
        {message?.error && <p className="text-red text-sm">{message.error}</p>}
        {forgotPassword && (
          <Link
            href={"/auth/forgotpassword"}
            className="float-right font-medium text-xs text-gray hover:text-[#555555] hover:no-underline"
          >
            Forgot Password?
          </Link>
        )}
      </div>
    );
  }
);
