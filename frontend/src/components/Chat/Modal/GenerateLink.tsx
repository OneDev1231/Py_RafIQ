import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import { Button } from "components";

import copy from "assets/img/chatbot/copy.png";
import copyDark from "assets/img/chatbot/copyDark.png";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const getBaseUrl = () => {
  if (process.env.NODE_ENV == "production")
    return process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "";
  else return "http://localhost:3000/";
};
const splitString = ({ str, limit = 50 }: { str: string; limit?: number }) => {
  if (str.length <= limit) return str;
  return (
    new Array(limit)
      .fill("")
      .map((_, i) => str[i] || "")
      .join("") + "..."
  );
};

const GenerateLink = () => {
  const [link, changeLink] = useState("");
  const [requiredLogin, changeRequiredLogin] = useState(false);
  const router = useRouter();
  const copys = async () => {
    toast.success("Copied", { hideProgressBar: true });
    await navigator.clipboard.writeText(link);
  };

  const { theme, setTheme } = useTheme();

  const generateLink = () => {
    const { roomId } = router.query;
    const link = `${getBaseUrl()}chat/shared?roomId=${roomId}${
      !requiredLogin ? `&token=${localStorage.getItem("token")}` : ""
    }`;
    changeLink(link);
  };

  useEffect(() => {
    if (link == "") return;
    generateLink();
  }, [requiredLogin]);

  return (
    <div className="w-full">
      <div className="mb-[27px] max-xl:mb-[32px] max-sm:mb-[25px] mt-[23px] max-sm:mt-[15px] w-full flex flex-row items-start">
        <input
          type="checkbox"
          onClick={(e) => {
            changeRequiredLogin(e.currentTarget.checked);
          }}
          className="checkbox:w-[14.25px] h-auto"
        />
        <div className="mt-[-6px] ml-[12px]">
          <p className="mb-[19px] max-xl:mb-[24px] font-Satoshi not-italic font-[500] text-[16px] leading-[22px] max-md:text-[16px] max-md:leading-[22px] max-xl:text-[19px] max-xl:leading-[25px] text-[#000000] dark:text-white">
            Require login for someone to your chatbot{" "}
            <span className="text-[#999999]">
              (if you don’t require login, the messages they send will be sent
              from your question credit and they can have access to your
              account)
            </span>
          </p>
          <Button
            variant="contained"
            onClick={generateLink}
            className="w-[112px] mr-[10px] text-[13px] max-xl:text-[15px] max-md:text-[13px] h-[30px] max-xl:h-[34px] max-sm:h-[38px]"
          >
            Generate Link
          </Button>
        </div>
      </div>
      {link.length > 0 && (
        <button
          onClick={copys}
          className="flex flex-row items-center rounded-[8px] bg-[#00adb50f] dark:bg-[#00adb529] h-[48px] w-full px-[22px] max-sm:p-[19px] hover:opacity-70"
        >
          <div className="font-Satoshi not-italic font-[500] text-[14px] leading-[19px] max-md:text-[14px] max-md:leading-[19px] max-xl:text-[16px] max-xl:leading-[22px] text-[#000000] dark:text-white">
            {splitString({ str: link })}
          </div>
          <Image
            src={theme === "dark" ? copyDark : copy}
            alt=""
            className="w-[28px] h-auto ml-auto"
          />
        </button>
      )}
    </div>
  );
};

export default GenerateLink;
