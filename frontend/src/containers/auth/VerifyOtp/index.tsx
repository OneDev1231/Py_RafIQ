import React, { useEffect, useState } from "react";
import AuthLayout from "layouts/AuthLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import PinInput from "react-pin-input";
import { useTheme } from "next-themes";
import { API } from "api";
import { useNotify } from "hooks";

export const VerifyotpContainer = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const { theme } = useTheme();
  const { notifyError, notifySuccess } = useNotify();

  useEffect(() => {
    if (!localStorage.getItem("reset-email-token")) {
      router.push("/auth/login");
    }
  }, [router]);

  useEffect(() => {
    code.length === 4 && verifyOtp();
  }, [code]);

  const verifyOtp = async () => {
    const { status, token } = await API.verifyOtp(code);

    if (status === "ERROR") {
      notifyError("OTP is invalid");
    } else {
      notifySuccess("Email is verified!");
      localStorage.removeItem("reset-email-token");
      localStorage.setItem("otp-token", token!);
      router.push("/auth/resetpassword");
    }
  };

  return (
    <AuthLayout>
      <div className="rounded-xl bg-white dark:bg-dark shadow-xl p-[30px] flex flex-col gap-[30px] w-96">
        <div className="text-center">
          <p className="text-xl font-semibold mb-1">Verify Otp</p>
          <p className="text-gray text-sm">
            Please enter otp to reset password.
          </p>
        </div>
        <div className="text-center">
          <PinInput
            length={4}
            focus
            style={{ padding: "10px" }}
            inputStyle={{
              borderColor: theme === "dark" ? "#888888" : "#cccccc",
              marginRight: "10px",
              fontSize: "20px",
            }}
            inputFocusStyle={{
              borderColor: theme === "dark" ? "#ffffff" : "#555555",
            }}
            type="numeric"
            onChange={setCode}
          />
        </div>
        <div className="text-center -mt-4">
          <Link
            href={"/auth/forgotpassword"}
            className="text-sm text-gray hover:text-[#555555] hover:no-underline"
          >
            {"Back to email"}
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};
