import React, { useState } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";

import Avatar1 from "assets/img/avatar1.svg";
import Avatar2 from "assets/img/avatar2.svg";
import { useAskRafiqSupportChat } from "api/useAskRafiqSupportChat";
import Typing from "components/Chat/Typing";

type Props = {
  onClose: () => void;
  chatBotMessages: {
    isLoading: boolean;
    data:
    | {
      query: string;
      response?: string | undefined;
    }
    | undefined;
    previousMessages: {
      query: string;
      response?: string | undefined;
    }[];
    mutateAsync: ({ message }: { message: string }) => Promise<any>;
  };
};

const Support = ({ onClose, chatBotMessages }: Props) => {
  const [message, changeMessage] = useState("");

  return (
    <div className="w-full sm:w-[380px] h-[450px] box-border shadow-lg rounded overflow-hidden">
      <div className="bg-[#263238] rounded-t-xl dark:bg-[#00ADB5] p-3 box-border text-white flex items-center">
        <h4 className="font-Satoshi font-bold text-lg leading-[24px] capitalize">
          Ask Rafiq
        </h4>
        <button className="ml-auto" onClick={onClose}>
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
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
      {chatBotMessages.previousMessages.length == 0 && (
        <div className="flex h-full items-center justify-center">
          Send a message to start conversation
        </div>
      )}

      <div className="w-full dark:bg-[#454545] max-h-[400px] py-[25px] box-border flex items-end">
        <div className="mb-7 w-full overflow-y-auto px-5 max-h-[300px]">
          {chatBotMessages.previousMessages.length > 0 &&
            chatBotMessages.previousMessages.map((message) => {
              return (
                <>
                  <Message
                    key={`${Math.random()}`}
                    avatar={Avatar1}
                    message={message.query}
                    isMe={true}
                    colorUser=""
                    colorChat=""
                  />
                  {message.response && (
                    <Message
                      key={`${Math.random()}`}
                      avatar={Avatar2}
                      message={message.response}
                      colorUser=""
                      colorChat=""
                    />
                  )}
                </>
              );
            })}

          {chatBotMessages.isLoading && <Typing />}
        </div>

        <div className="absolute z-10 bottom-0 left-0 right-0 px-5 bg-white dark:bg-[#454545] py-4">
          <SendMessage
            changeMessage={changeMessage}
            submit={() => {
              if (chatBotMessages.isLoading) return;
              chatBotMessages.mutateAsync({ message });
              changeMessage("");
            }}
            message={message}
          />
        </div>
      </div>
    </div>
  );
};

export default Support;
