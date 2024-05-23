import { Switch } from "@headlessui/react";
import type { ChatGPTAPIInterface } from "api/useChatGPT";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

type Props = {
  onClickLogMenu: () => void;
  chatGPTAPI: ChatGPTAPIInterface;
};
export default function MenuChatgpt({ onClickLogMenu, chatGPTAPI }: Props) {
  const mode = localStorage.getItem("theme") || "light";
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (mode) {
      setTheme(mode);
    }
  }, [mode]);

  const handleChangeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="max-lg:bg-[#202123] max-lg:py-[31px] max-lg:px-[18px] max-lg:h-full">
      <div className="w-full text-left   lg:hidden">
        <button
          className="mb-[20px] hover:opacity-70 text-[#FFFFFF]"
          onClick={onClickLogMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
      <div
        onClick={() => {
          chatGPTAPI.deleteConversations();
        }}
        className="flex flex-row items-center w-full p-[12px] gap-3 mb-[5px] rounded-[6px] hover:opacity-70 hover:cursor-pointer"
      >
        <div className="text-[#FFFFFF]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
        <p className="truncate font-Satoshi not-italic font-[400] text-[14px] leading-[20px] text-[#FFFFFF]">
          Clear conversations
        </p>
      </div>
      <div
        onClick={handleChangeTheme}
        className="flex flex-row items-center w-full p-[12px] gap-3 mb-[5px] rounded-[6px] hover:opacity-70 hover:cursor-pointer"
      >
        <div className="text-[#FFFFFF]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        </div>
        <p className="truncate font-Satoshi not-italic font-[400] text-[14px] leading-[20px] text-[#FFFFFF]">
          Dark mode
        </p>
      </div>

      {/* <Switch
                checked={enabled}
                onChange={handleChangeTheme}
                className={`${
                  enabled ? "bg-[#00ADB5]" : "bg-[#CDCCCD]"
                } relative inline-flex h-[18px] w-[34px] items-center rounded-full ml-auto`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    enabled ? "translate-x-[18px]" : "translate-x-[2px]"
                  } inline-block h-[14px] w-[14px] transform rounded-full bg-white transition`}
                />
              </Switch> */}
      <div className="flex flex-row items-center w-full p-[12px] gap-3 mb-[5px] rounded-[6px] hover:opacity-70 hover:cursor-pointer">
        <div className="text-[#FFFFFF]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        </div>
        <p className="truncate font-Satoshi not-italic font-[400] text-[14px] leading-[20px] text-[#FFFFFF]">
          Log out
        </p>
      </div>
    </div>
  );
}
