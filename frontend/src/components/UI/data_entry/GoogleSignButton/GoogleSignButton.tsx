import Image from "next/image";
import React from "react";
import queryString from "query-string";
import google from "assets/img/icons/google.svg";
import { useRouter } from "next/router";

type Props = {
  label: string;
};

const stringifiedParams = queryString.stringify({
  client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
  scope: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ].join(" "), // space seperated string
  response_type: "code",
  access_type: "offline",
  prompt: "consent",
});

const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

export const GoogleSignButton: React.FC<Props> = ({ label }) => {
  const router = useRouter();

  return (
    <button
      className="w-full rounded-md p-3 font-semibold text-sm border border-semiblack dark:border-gray dark:border-opacity-[0.12] border-opacity-[0.12] flex justify-center gap-2 hover:bg-[#EEEEEE] dark:hover:bg-[#2B2B2B]"
      onClick={(e) => {
        e.preventDefault();
        window.open(googleLoginUrl, "_self");
      }}
    >
      <Image alt="Google" src={google.src} width={18} height={18} />
      {label}
    </button>
  );
};
