import React, { useState, useEffect } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import MenuChatgpt from "components/chatgpt/menu";
import NewChatgpt from "components/chatgpt/new";
import { useTheme } from "next-themes";

import Message from "components/Chat/Message";
import Typing from "components/Chat/Typing";

import Avatar1 from "assets/img/user.svg";
import Avatar2 from "assets/img/avatar2.svg";
import { useChatGPT } from "api/useChatGPT";

const Chatgpt = () => {
  const router = useRouter();
  const { id } = router.query;
  const ChatGPTAPI = useChatGPT();

  useEffect(() => {
    if (id)
      ChatGPTAPI.changeRoomId(
        Array.isArray(id) ? parseInt(id[0]) : parseInt(id)
      );
  }, [id]);

  const [menu, setMenu] = useState(false);
  const [news, setNews] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleChangeMsg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    ChatGPTAPI.changeMessage(value);
  };

  const handleSend = () => {
    ChatGPTAPI.sendMessage();
  };

const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      handleSend();
    }
  };

  const onClickMenu = () => {
    setMenu(true);
    setNews(false);
  };
  const onClickLogMenu = () => {
    setMenu(false);
  };
  const onClickNew = () => {
    setNews(true);
    setMenu(false);
  };
  const onClickLogNew = () => {
    setNews(false);
  };

  return (
    <div className="w-full h-full relative dark:bg-[#343541]">
      <div className="grid grid-cols-6 ">
        <div className="h-full col-span-1 max-lg:hidden">
          <div className="bg-[#202123] py-[31px] px-[18px] h-full">
            <NewChatgpt chatGPTAPI={ChatGPTAPI} onClickLogNew={onClickLogNew} />
            <MenuChatgpt
              chatGPTAPI={ChatGPTAPI}
              onClickLogMenu={onClickLogMenu}
            />
          </div>
        </div>
        <div className="col-span-5 max-lg:col-span-6 bg-[#FFFFFF] dark:bg-[#343541]">
          <div className="lg:hidden flex flex-row w-full bg-[#343541] items-center px-[20px] text-[#FFFFFF] pt-[11px]">
            <button onClick={onClickMenu} className="hover:opacity-70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            <p className="mx-auto">New chat</p>
            <button onClick={onClickNew}>
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
            </button>
          </div>

          {ChatGPTAPI.roomMessages.results.length > 0 ? (
            <div
              className="p-5 oveflow-auto chatScroller  overflow-y-scroll"
              style={{ height: "calc(100vh - 136px)" }}
            >
              {ChatGPTAPI.roomMessages.results.map((item, i) => {
                return (
                  <>
                    <Message
                      key={`${Math.random()}`}
                      message={item.query || ""}
                      isMe={true}
                      avatar={Avatar2}
                      time={
                        item.created_at
                          ? moment(item.created_at).format("hh:mm A")
                          : ""
                      }
                    />
                    {item.response && (
                      <Message
                        key={`${Math.random()}`}
                        message={item.response || ""}
                        time=""
                        // time="pages: 2,5,6"
                        avatar={Avatar1}
                        tags={[]}
                      />
                    )}
                  </>
                );
              })}
              {ChatGPTAPI.isTyping && <Typing />}
            </div>
          ) : (
            <div
              className="max-w-[768px] mx-auto max-lg:mt-0 mb-[10px] max-lg:mb-[20px] pt-[100px] max-lg:pt-[50px]"
            >
              <h1 className="font-Inter not-italic font-[500] text-[36px] leading-[40px] text-[#343541] dark:text-[#FFFFFF] text-center mb-[64px] max-lg:mb-[40px]">
                ChatGPT Plus
              </h1>
              <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-[14px] max-lg:gap-[34px] max-lg:px-[24px]">
                <div className="text-center font-sans not-italic font-[400] text-[14px] leading-[20px] text-[#343541] dark:text-[#FFFFFF]">
                  <div className="max-lg:flex max-lg:flex-row max-lg:items-center max-lg:mb-[16px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mx-auto max-lg:ml-auto max-lg:mr-[12px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                    </svg>

                    <p className="mt-[8px] mb-[14px] text-[18px] leading-[28px] max-lg:mr-auto max-lg:my-0">
                      Examples
                    </p>
                  </div>
                  <div className="bg-[#F7F7F8] dark:bg-[#3E3F4B] mb-[14px] pt-[11.5px] pr-[16.9719px] pb-[12.5px] pl-[17.1641px] rounded-[6px] max-lg:p-[11px]">
                    "Explain quantum computing in simple terms" →
                  </div>
                  <div className="bg-[#F7F7F8] dark:bg-[#3E3F4B] mb-[14px] pt-[11.5px] pr-[16.9719px] pb-[12.5px] pl-[17.1641px] rounded-[6px] max-lg:p-[11px]">
                    "Got any creative ideas for a 10 year old’s birthday?" →
                  </div>
                  <div className="bg-[#F7F7F8] dark:bg-[#3E3F4B] pt-[11.5px] pr-[16.9719px] pb-[12.5px] pl-[17.1641px] rounded-[6px]">
                    "How do I make an HTTP request in Javascript?" →
                  </div>
                </div>
                <div className="text-centerfont-sans not-italic font-[400] text-[14px] leading-[20px] text-[#343541] dark:text-[#FFFFFF]">
                  <div className="max-lg:flex max-lg:flex-row max-lg:items-center max-lg:mb-[16px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mx-auto max-lg:ml-auto max-lg:mr-[12px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                      />
                    </svg>
                    <p className="mt-[8px] mb-[14px] text-[18px] leading-[28px] max-lg:mr-auto max-lg:my-0">
                      Capabilities
                    </p>
                  </div>
                  <div className="bg-[#F7F7F8] dark:bg-[#3E3F4B] mb-[14px] pt-[11.5px] pr-[16.9719px] pb-[12.5px] pl-[17.1641px] rounded-[6px] max-lg:p-[11px]">
                    Remembers what user said earlier in the conversation{" "}
                  </div>
                  <div className="bg-[#F7F7F8] dark:bg-[#3E3F4B] mb-[14px] pt-[11.5px] pr-[16.9719px] pb-[12.5px] pl-[17.1641px] rounded-[6px] max-lg:p-[11px]">
                    Allows user to provide follow-up corrections{" "}
                  </div>
                  <div className="bg-[#F7F7F8] dark:bg-[#3E3F4B] pt-[11.5px] pr-[16.9719px] pb-[12.5px] pl-[17.1641px] rounded-[6px]">
                    Trained to decline inappropriate requests{" "}
                  </div>
                </div>
                <div className="text-center font-sans not-italic font-[400] text-[14px] leading-[20px] text-[#343541] dark:text-[#FFFFFF]">
                  <div className="max-lg:flex max-lg:flex-row max-lg:items-center max-lg:mb-[16px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mx-auto max-lg:ml-auto max-lg:mr-[12px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                    <p className="mt-[8px] mb-[14px] text-[18px] leading-[28px] max-lg:mr-auto max-lg:my-0">
                      Limitations
                    </p>
                  </div>
                  <div className="bg-[#F7F7F8] dark:bg-[#3E3F4B] mb-[14px] pt-[11.5px] pr-[16.9719px] pb-[12.5px] pl-[17.1641px] rounded-[6px] max-lg:p-[11px]">
                    May occasionally generate incorrect information{" "}
                  </div>
                  <div className="bg-[#F7F7F8] dark:bg-[#3E3F4B] mb-[14px] pt-[11.5px] pr-[16.9719px] pb-[12.5px] pl-[17.1641px] rounded-[6px] max-lg:p-[11px]">
                    May occasionally produce harmful instructions or biased
                    content{" "}
                  </div>
                  <div className="bg-[#F7F7F8] dark:bg-[#3E3F4B] pt-[11.5px] pr-[16.9719px] pb-[12.5px] pl-[17.1641px] rounded-[6px] max-lg:p-[11px]">
                    Limited knowledge of world and events after 2021{" "}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className={`${theme === "dark" ? "bg-[#343541]" : "bg-search"
              } dark:max-lg:py-[39px] max-lg:border-t-[1px] border-solid border-[#D9D9E3] max-w-[1024px] mx-auto pt-[16px] pb-[20px] max-xl:pb-[68px] max-lg:pt-[6px] max-lg:pb-[12px]  max-lg:px-[10px]`}
          >
            <div className="max-w-[768px]  max-xl:max-w-[672px] max-sm:max-w-full mx-auto relative">
              <input
                value={ChatGPTAPI.message}
                onChange={handleChangeMsg}
                onKeyDown={handleKeyDown}
                placeholder="Send a message..."
                className="dark:bg-[#40414F] dark:text-[#FFFFFF] dark:placeholder:text-[#FFFFFF] w-full rounded-[6px] px-[17px] py-[13px] border-[1px] border-solid border-[#0000001A] font-sans not-italic font-[400] text-[16px] leading-[24px] text-[#000000] placeholder:text-[#000000] placeholder:opacity-70"
              />
              <div
                onClick={handleSend}
                className="dark:text-[#FFFFFF] text-[#000000] absolute right-[15px] top-[17px] origin-center rotate-45 cursor-pointer"
              >
                <div className="origin-center rotate-90">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 origin-center rotate-180"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <p
              className={`lg:hidden mt-[8px] font-sans not-italic font-[400] text-[12px] leading-[16px] text-[#00000080] text-center ${theme === "dark" ? "hidden" : ""
                }`}
            >
              ChatGPT Mar 14 Version. Free Research Preview. Our goal is to make
              AI systems more natural and safe to interact with. Your feedback
              will help us improve.
            </p>
          </div>
        </div>
      </div>
      {menu ? (
        <div className="w-full absolute bg-[#0000006f] top-0 h-full">
          <div className="max-w-[243px] h-full">
            <MenuChatgpt
              chatGPTAPI={ChatGPTAPI}
              onClickLogMenu={onClickLogMenu}
            />
          </div>
        </div>
      ) : (
        ""
      )}
      {news ? (
        <div className="w-full absolute bg-[#0000006f] top-0 h-full">
          <div className="max-w-[243px] h-full ml-auto">
            <NewChatgpt chatGPTAPI={ChatGPTAPI} onClickLogNew={onClickLogNew} />{" "}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Chatgpt;
