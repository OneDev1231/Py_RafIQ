import React from "react";
import { InputTextareaProps } from "./Input.types";

export const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputTextareaProps
>(({ label, placeholder, message, className, id, ...props }, ref) => {
  return (
    <div>
      <div className="font-medium text-sm mb-[6px]">{label}</div>
      <input
        /*@ts-ignore*/
        ref={ref}
        className="w-full rounded-md border border-semiblack border-opacity-[0.12] p-3 text-sm"
        placeholder={placeholder}
        {...props}
      />
      {message?.error && <span className="text-red text-sm">{message.error}</span>}
    </div>
  );
});
