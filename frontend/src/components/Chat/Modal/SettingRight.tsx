import Message from "components/Support/Message";
import { useState } from "react";

import Avatar1 from "assets/img/avatar1.svg";
import Avatar2 from "assets/img/avatar2.svg";

type Props = {
  colorUser: any;
  colorChat: any;
};

export default function SettingRight({ colorUser, colorChat }: Props) {
  return (
    <div className="p-[35px] bg-[#EFF3F6] dark:bg-[#eff3f61c] max-sm:dark:bg-[#1f] max-sm:px-[40px]">
      <p className="mb-[12px] font-Satoshi not-italic font-[500] text-[10px] leading-[14px] text-[#000000] opacity-60 dark:text-[#FFFFFF] capitalize max-xl:text-[11px] max-xl:leading-[15px]">
        Colour preview
      </p>
      <div className="p-[25px] bg-[#FFFFFF] dark:bg-[#eff3f626] max-sm:dark:bg-[#0000001f] rounded-[5px] border border-solid border-[#0000001F]">
        <div className="mb-[30px] w-full">
          <Message
            colorUser={colorUser}
            colorChat={colorChat}
            avatar={Avatar1}
            message="Hi, how can i help you?"
          />
          <Message
            colorUser={colorUser}
            colorChat={colorChat}
            avatar={Avatar2}
            message="What is the colour of the sun"
            isMe={true}
          />
          <Message
            colorUser={colorUser}
            colorChat={colorChat}
            avatar={Avatar1}
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
          <Message
            colorUser={colorUser}
            colorChat={colorChat}
            avatar={Avatar2}
            message="Which plant is the largest?"
            isMe={true}
          />
        </div>
      </div>
      <div className="mt-[35px] mb-[127px] max-sm:mt-[21px] max-sm:mb-[54px] flex flex-row items-center">
        <p className="mr-auto font-Satoshi not-italic font-[500] text-[10px] leading-[14px] text-[#000000] opacity-60 dark:text-[#FFFFFF] capitalize max-xl:text-[11px] max-xl:leading-[15px]">
          chat bubble preview
        </p>
        <button
          className="bg-[#66B6FF] rounded-[54px] z-100 inline-flex items-center 
                  justify-center text-white dark:text-[#263238] font-medium font-Satoshi capitalize text-12px] leading-[16px] px-[18px] 
                  py-[8px] box-border"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 001.28.53l4.184-4.183a.39.39 0 01.266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0012 2.25zM8.25 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm2.625 1.125a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
              clipRule="evenodd"
            />
          </svg>
          Get Support
        </button>
      </div>
      <div className=" w-full text-right font-Satoshi not-italic font-[500] text-[10px] leading-[14px] text-[#0000004d] dark:text-[#ffffff4d] capitalize max-xl:text-[11px] max-xl:leading-[15px]">
        Powered by <span className="text-black dark:text-white">RAFIQ.AI</span>
      </div>
    </div>
  );
}
