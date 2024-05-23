import React from "react";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  message: string;
  changeMessage: Dispatch<SetStateAction<string>>;
  submit: () => void
}
const SendMessage: React.FC<Props> = ({ message, changeMessage, submit }) => {
  return (
    <div className="">
      <form onSubmit={e => {
        e.preventDefault()
        submit()
      }}
      className="relative flex items-center"
      >
        <input
          placeholder="Type Here"
          onChange={(e) => changeMessage(e.target.value)}
          value={message}
          className="text-sm font-medium py-[12px] px-5 box-border rounded-[40px] border-[1px] border-[#0000001f] w-full
          dark:bg-[#454545] dark:border-[#ffffff38]"
        />

        <button type="submit" className="absolute z-10 right-3 text-[#00ADB5]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
