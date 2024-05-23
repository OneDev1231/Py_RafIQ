import React, { useEffect } from "react";
import AuthLayout from "layouts/AuthLayout";
import { InputPassword } from "@/UI";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaAuthResetPassword } from "schemas";
import { useNotify } from "hooks";
import { useRouter } from "next/router";
import { API } from "api";

interface IResetpasswordFormInputs {
  password: string;
  password_confirmation: string;
}

export const ResetpasswordContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetpasswordFormInputs>({
    mode: "onBlur",
    resolver: yupResolver(schemaAuthResetPassword()),
  });

  const { notifyError, notifySuccess } = useNotify();
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("otp-token")) {
      router.push("/auth/login");
    }
  }, [router]);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async (data: IResetpasswordFormInputs) => {
    const { status } = await API.resetPassword(data.password);

    if (status === "ERROR") {
      notifyError("Something went wrong!");
    } else {
      notifySuccess("Password changed successfully");
      localStorage.removeItem("otp-token");
      router.push("/auth/login");
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-xl bg-white dark:bg-dark shadow-xl p-[30px] flex flex-col gap-[25px] w-96">
          <div className="text-center">
            <p className="text-xl font-semibold mb-1">Create New Password</p>
            <p className="text-gray text-sm">
              Your new password must be different from previous used passwords
            </p>
          </div>
          <InputPassword
            label="Create Password"
            placeholder="Enter your password"
            {...register("password")}
            message={{ error: errors.password?.message }}
            onKeyDown={handleKeyDown}
          />
          <InputPassword
            label="Confirm Password"
            placeholder="Repeat password"
            {...register("password_confirmation")}
            message={{ error: errors.password_confirmation?.message }}
            onKeyDown={handleKeyDown}
          />
          <div>
            <button type="submit" className="btn-primary">
              Reset Password
            </button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};
