import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { ChatGPTAPIInterface } from "api/useChatGPT";

type Props = {
  onClickLogNew: () => void;
  chatGPTAPI: ChatGPTAPIInterface;
};

const splitString = ({ str, wordlimit = 4 }: { str: string; wordlimit?: number }) => {
  const allWords = str.split(" ")
  if (allWords.length <= wordlimit) return str
  return new Array(wordlimit).fill("").map((_, i) => allWords[i] || "").join(" ") + "..."
};

const NewChatGPT: React.FC<Props> = ({ onClickLogNew, chatGPTAPI }) => {
  const router = useRouter();

  const [data, setData] = useState([]);

  return (
    <div className="max-lg:bg-[#202123] max-lg:py-[31px] max-lg:px-[18px] max-lg:h-full">
      <div className="w-full text-right lg:hidden">
        <button
          className="mb-[20px] hover:opacity-70 text-[#FFFFFF]"
          onClick={onClickLogNew}
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
          chatGPTAPI.createNewChat();
        }}
        className="flex flex-row items-center w-full p-[12px] gap-3 mb-[5px] border-[#ffffff33] h-[46px] border-[1px] border-solid rounded-[6px] hover:opacity-70 hover:cursor-pointer"
      >
        <div className="text-[#FFFFFF]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
        <p className="truncate font-Satoshi not-italic font-[400] text-[14px] leading-[20px] text-[#FFFFFF]">
          New chat
        </p>
      </div>
      <div className="border-b-[1px] border-solid max-h-[200px] overflow-y-auto border-[#FFFFFF33] mb-[25px] mt-[12px]">
        {chatGPTAPI.allMessages.results.length > 0 &&
          chatGPTAPI.allMessages.results.map((item, i) => {
            const roomId = item.id;

            return (
              <div
                key={`${i}`}
                className="flex flex-row items-center w-full p-[12px] gap-3 mb-[5px]"
              >
                <div className="text-[#ECECF1]">
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
                      d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                  </svg>
                </div>
                <div
                  onClick={() => {
                    chatGPTAPI.changeRoomId(roomId);
                  }}
                >
                  <span className="text-white hover:cursor-pointer">
                    {item.chat[0].query
                      ? splitString({ str: item.chat[0].query || "" })
                      : ""}
                  </span>
                </div>
              </div>
            );
          })}
        <div className="w-full mb-[30px] flex justify-center">
          <button className="border-[1px] border-solid border-[#565869] bg-[#343541] py-[5px] px-[9px] mx-auto rounded-[4px] font-sans not-italic font-[400] text-[14px] leading-[20px] text-[#FFFFFF]">
            Show more
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewChatGPT;
