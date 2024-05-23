import React from "react";
import Image from "next/image";

type Props = {
  message: string;
  isMe?: boolean;
  avatar: any;
  colorUser?: any;
  colorChat?: any;
};
const Message = ({
  message,
  isMe,
  avatar,
  colorUser = "",
  colorChat = "",
}: Props) => {
  return (
    <div
      className={`flex mb-[34px] w-full items-start ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      {!isMe && (
        <div className="w-[26px] h-26px] rounded-full overflow-hidden mr-2">
          <Image alt="" src={avatar} />
        </div>
      )}
      <div
        className={`max-w-[218px] px-4 py-3 text-sm font-medium font-Satoshi leading-[18px] rounded-[14px] border-[1px]
        ${
          isMe
            ? "rounded-tr-none bg-[#00ADB5] border-[#00ADB5] text-white"
            : "rounded-tl-none bg-white dark:bg-[#ffffff1a] border-[#0000001f] text-black dark:text-white"
        }`}
        style={{
          backgroundColor: isMe ? colorUser : colorChat,
          borderColor: isMe ? colorUser : colorChat,
        }}
      >
        {message}
      </div>
      {isMe && (
        <div className="w-[26px] h-26px] rounded-full overflow-hidden ml-2">
          <Image alt="" src={avatar} />
        </div>
      )}
    </div>
  );
};

export default Message;
