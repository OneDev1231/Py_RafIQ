import React from "react";
import AuthLayout from "layouts/AuthLayout";
import Link from "next/link";
import { Input } from "@/UI";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaAuthForgotpassword } from "schemas";
import { useNotify } from "hooks";
import { useRouter } from "next/router";
import { API } from "api";

interface IForgotpasswordFormInputs {
  email: string;
}

export const ForgotpasswordContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotpasswordFormInputs>({
    mode: "onBlur",
    resolver: yupResolver(schemaAuthForgotpassword()),
  });

  const { notifyError, notifySuccess } = useNotify();
  const router = useRouter();

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async (data: IForgotpasswordFormInputs) => {
    const { status, token, message } = await API.resetEmail(data.email);

    if (status === "ERROR") {
      notifyError("Invalid email address");
    } else {
      notifySuccess("OTP is sended to registered email");
      localStorage.setItem("reset-email-token", token!);
      router.push("/auth/verifyotp");
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-xl bg-white dark:bg-dark shadow-xl p-[30px] flex flex-col gap-[30px] w-96">
          <div className="text-center">
            <p className="text-xl font-semibold mb-1">Forgot Password?</p>
            <p className="text-gray text-sm">
              No worries, we'll send you resent instructions
            </p>
          </div>
          <Input
            label="Email"
            placeholder="Enter your email"
            {...register("email")}
            message={{ error: errors.email?.message }}
            onKeyDown={handleKeyDown}
          />
          <div>
            <button type="submit" className="btn-primary">
              Continue
            </button>
          </div>
          <div className="text-center -mt-4">
            <Link
              href={"/auth/login"}
              className="text-sm text-gray hover:text-[#DDDDDD] hover:no-underline"
            >
              {"Back to log in"}
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};
