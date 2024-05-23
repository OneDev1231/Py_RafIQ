import React from "react";
import Image from "next/image";

type Props = {
  message: string;
  isMe?: boolean;
  avatar: any;
  time: string;
  tags?: any;
};

const Message = ({ message, isMe, avatar, time, tags }: Props) => {
  return (
    <div
      className={`flex mb-[30px] w-full items-start ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      <div className="max-w-[701px] ">
        <div className="flex items-center mb-[5px]">
          {isMe && (
            <p className="text-[12px] font-Satoshi font-medium leading-[16px] text-[#00000094] dark:text-[#999] mr-auto">
              {time}
            </p>
          )}
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <Image alt="" src={avatar} className="w-full" />
          </div>
          {!isMe && (
            <p className="text-[12px] font-Satoshi font-medium leading-[16px] text-[#00000094] dark:text-[#999] ml-auto underline capitalize">
              {time}
            </p>
          )}
        </div>
        <div
          className={`px-4 py-3 text-sm font-medium font-Satoshi leading-[18px] rounded-[14px] border-[1px]
        ${
          isMe
            ? "rounded-tr-none bg-[#00ADB5] border-[#00ADB5] text-white"
            : "rounded-tl-none bg-white dark:bg-[#ffffff1c] border-[#0000001f] text-black dark:text-white"
        }`}
        >
          {message}
        </div>
        {tags && (
          <div className="mt-2">
            {tags.map((item: any, i: number) => (
              <span
                key={i}
                className="bg-[#00adb51f] border border-[#00ADB5] mr-2 rounded-[5px] py-2 px-3 inline-block mb-2
                  box-border text-[#263238] dark:text-white text-[12px] font-Satoshi font-medium leading-[16px] capitalize"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
