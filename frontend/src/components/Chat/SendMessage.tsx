import React, { useState, useEffect } from "react";

type Props = {
  onSend?: (msg: string) => void;
  isSent?: boolean;
};

const SendMessage = ({ onSend, isSent }: Props) => {
  const [msg, setMsg] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(event.target.value);
  };

  const handleSend = () => {
    if (msg && onSend) {
      onSend(msg);
    }
  };

  useEffect(() => {
    if (isSent === true) {
      setMsg("");
    }
  }, [isSent]);

  return (
    <div className="relative flex items-center">
      <input
        placeholder="Type here your question"
        className="text-sm font-medium py-[12px] px-5 box-border rounded-[40px] border-[1px] border-[#0000001f] w-full
          dark:bg-[#ffffff10] dark:border-[#ffffff38]"
        value={msg}
        onChange={handleChange}
      />

      <button
        className="absolute z-10 right-3 text-[#00ADB5]"
        onClick={handleSend}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      </button>
    </div>
  );
};

export default SendMessage;
