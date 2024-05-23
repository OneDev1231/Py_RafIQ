import React, { useContext, useEffect } from "react";
import AuthLayout from "layouts/AuthLayout";
import Link from "next/link";
import { Input, InputPassword, GoogleSignButton } from "@/UI";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaAuthLogin } from "schemas";
import { useRouter } from "next/router";
import { API } from "api";
import { DispatchContext } from "context";
import { ActionType } from "state/types";

interface ILoginFormInputs {
  email: string;
  password: string;
}

export const LoginContainer = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<ILoginFormInputs>({
    mode: "onBlur",
    resolver: yupResolver(schemaAuthLogin()),
  });
  const router = useRouter();
  const { c_dispatch } = useContext(DispatchContext);

  useEffect(() => {
    clearErrors();
  }, [clearErrors]);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async (data: ILoginFormInputs) => {
    const { token, user } = await API.login(data.email, data.password);

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
      setError("email", {
        type: "manual",
        message: "    ",
      });
      setError("password", {
        type: "manual",
        message: "Email or password is wrong!",
      });
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-xl bg-white dark:bg-dark shadow-xl p-[30px] flex flex-col gap-[30px] w-96">
          <div className="text-center">
            <p className="text-xl font-semibold mb-1">
              Login Into Your Account
            </p>
            <p className="text-gray text-sm">
              Please enter your details to login.
            </p>
          </div>
          <Input
            label="Email"
            placeholder="Enter your email"
            {...register("email")}
            message={{ error: errors.email?.message }}
            onKeyDown={handleKeyDown}
          />
          <InputPassword
            label="Password"
            placeholder="Enter your password"
            forgotPassword={true}
            {...register("password")}
            message={{ error: errors.password?.message }}
            onKeyDown={handleKeyDown}
          />
          <div>
            <button type="submit" className="btn-primary">
              Log In
            </button>
            <GoogleSignButton label="Sign in with Google" />
          </div>
          <div className="text-center">
            <span className="text-gray text-xs">
              Don’t have an account?&nbsp;&nbsp;
            </span>
            <Link
              href={"/auth/signup"}
              className="text-xs font-bold text-black dark:text-white hover:text-[#555555] dark:hover:text-[#DDDDDD] hover:no-underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};
