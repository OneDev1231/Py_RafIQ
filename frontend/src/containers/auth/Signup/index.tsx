import React, { useContext } from "react";
import AuthLayout from "layouts/AuthLayout";
import Link from "next/link";
import { Input, InputPassword, GoogleSignButton } from "@/UI";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaAuthRegister } from "schemas";
import { useNotify } from "hooks";
import { API } from "api";
import { useRouter } from "next/router";
import { DispatchContext } from "context";
import { ActionType } from "state/types";

interface ISignupFormInputs {
  fullName: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const SignupContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupFormInputs>({
    mode: "onBlur",
    resolver: yupResolver(schemaAuthRegister()),
  });

  const { notifyError } = useNotify();
  const router = useRouter();
  const { c_dispatch } = useContext(DispatchContext);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async (data: ISignupFormInputs) => {
    const { token, user } = await API.createUser(
      data.email,
      data.password,
      data.fullName
    );

    // Set context account.
    if (user) {
      c_dispatch({
        type: ActionType.SetUser,
        payload: {
          user,
        },
      });
    }

    // Save token in localstorage
    if (token) {
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } else {
      localStorage.removeItem("token");
      notifyError("Something went wrong!");
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-xl bg-white dark:bg-dark shadow-xl p-[30px] flex flex-col gap-[25px] w-96">
          <div className="text-center">
            <p className="text-xl font-semibold mb-1">Create Your Account</p>
            <p className="text-gray text-sm">
              Please enter your details to create your account.
            </p>
          </div>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register("fullName")}
            message={{ error: errors.fullName?.message }}
            onKeyDown={handleKeyDown}
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            {...register("email")}
            message={{ error: errors.email?.message }}
            onKeyDown={handleKeyDown}
          />
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
              Continue
            </button>
            <GoogleSignButton label="Sign up with Google" />
          </div>
          <div className="text-center">
            <span className="text-gray text-xs">
              Already have an account?&nbsp;&nbsp;
            </span>
            <Link
              href={"/auth/login"}
              className="text-xs font-bold text-black dark:text-white hover:text-[#555555] dark:hover:text-[#DDDDDD] hover:no-underline"
            >
              Log In
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};
