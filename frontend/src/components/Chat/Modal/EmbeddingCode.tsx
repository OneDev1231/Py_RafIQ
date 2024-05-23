import Image from "next/image";
import React, { useState } from "react";

import { Button } from "components";

import copy from "assets/img/chatbot/copyWhite.png";
import {
  generateHTML,
  generateJavscript,
  generateCSS,
} from "components/Chat/Modal/generateEmbeddingCode";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const EmbeddingCode = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const copys = async (text: string) => {
    await navigator.clipboard.writeText(text)
    toast.success("Copied", {hideProgressBar: true})
  };
  if (!router.isReady) return <></>

  return (
    <div className="w-full">
      <div>
        <div className="max-w-[327px] max-sm:max-w-[252px] max-xl:max-w-[381px] mr-auto font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[15px] max-xl:leading-[20px] text-[#26323880] dark:text-[#ffffff80]">
          To add a chat bubble to{" "}
          <span className="text-[#263238] dark:text-white">
            the bottom right
          </span>{" "}
          of your website, add this code in your website. (by adding this on
          your site, the messages they send will be sent from your question
          credit and any user can have access to your account)
        </div>
        <div className="flex flex-row items-start w-full mt-[29px] max-xl:mt-[34px] mb-[12px] max-sm:mt-[28px]">
          <div className="max-w-[327px] max-sm:max-w-[252px] max-xl:max-w-[381px] mr-auto font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[15px] max-xl:leading-[20px] text-[#26323880] dark:text-[#ffffff80]">
            HTML
          </div>
          <Button
            onClick={() => void copys(generateHTML())}
            variant="contained"
            className="w-[83px] ml-[10px] font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[15px] max-xl:leading-[20px] text-[#FDFDFD] h-[28px] max-sm:h-[28px] max-xl:h-[33px]"
          >
            <Image src={copy} alt="" className="w-[16px] h-auto mr-[5px]" />
            Copy
          </Button>
        </div>
        <div className="mb-[10px] overflow-auto text-[#263238] dark:text-white border-[1.5px] border-solid border-[#00000014] dark:border-[#FFFFFF14] px-[19px] pb-[4px] pt-[19px] h-[130px] rounded-[8px]">
          <pre>{generateHTML()}</pre>
        </div>

        <div className="flex flex-row items-start w-full mt-[29px] max-xl:mt-[34px] mb-[12px] max-sm:mt-[28px]">
          <div className="max-w-[327px] max-sm:max-w-[252px] max-xl:max-w-[381px] mr-auto font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[15px] max-xl:leading-[20px] text-[#26323880] dark:text-[#ffffff80]">
            CSS
          </div>
          <Button
            onClick={() => void copys(generateCSS())}
            variant="contained"
            className="w-[83px] ml-[10px] font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[15px] max-xl:leading-[20px] text-[#FDFDFD] h-[28px] max-sm:h-[28px] max-xl:h-[33px]"
          >
            <Image src={copy} alt="" className="w-[16px] h-auto mr-[5px]" />
            Copy
          </Button>
        </div>
        <div className="mb-[10px] overflow-auto text-[#263238] dark:text-white border-[1.5px] border-solid border-[#00000014] dark:border-[#FFFFFF14] px-[19px] pb-[4px] pt-[19px] h-[130px] rounded-[8px]">
          <pre>{generateCSS()}</pre>
        </div>

        <div className="flex flex-row items-start w-full mt-[29px] max-xl:mt-[34px] mb-[12px] max-sm:mt-[28px]">
          <div className="max-w-[327px] max-sm:max-w-[252px] max-xl:max-w-[381px] mr-auto font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[15px] max-xl:leading-[20px] text-[#26323880] dark:text-[#ffffff80]">
            Javascript
          </div>
          <Button
            onClick={() => void copys(generateJavscript({
              roomId: roomId
                ? Array.isArray(roomId)
                  ? roomId[0]
                  : roomId
                : "",
              token: localStorage.getItem("token"),
              }))}
            variant="contained"
            className="w-[83px] ml-[10px] font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[15px] max-xl:leading-[20px] text-[#FDFDFD] h-[28px] max-sm:h-[28px] max-xl:h-[33px]"
          >
            <Image src={copy} alt="" className="w-[16px] h-auto mr-[5px]" />
            Copy
          </Button>
        </div>
        <div className="mb-[10px] overflow-auto text-[#263238] dark:text-white border-[1.5px] border-solid border-[#00000014] dark:border-[#FFFFFF14] px-[19px] pb-[4px] pt-[19px] h-[130px] rounded-[8px]">
          <pre>
            {generateJavscript({
              roomId: roomId
                ? Array.isArray(roomId)
                  ? roomId[0]
                  : roomId
                : "",
              token: localStorage.getItem("token"),
            })}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default EmbeddingCode;
