import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router"
import { useTheme } from "next-themes";
import { Button } from "components";
import NewChat from "./PopUp/NewChat";

import GridSvg from "assets/img/grid.svg";
import GridActSvg from "assets/img/grid-act.svg";
import GridActDarkSvg from "assets/img/grid-act-dark.svg";
import ListSvg from "assets/img/list.svg";
import ListActSvg from "assets/img/list-act.svg";
import ListActDarkSvg from "assets/img/list-act-dark.svg";

type Props = {
  title: string;
  isList?: boolean;
  onChatGPT?: () => void;
  onCreate?: () => void;
  onLayout?: () => void;
};

const Filters = ({ title, isList, onChatGPT, onCreate, onLayout }: Props) => {
  const router = useRouter();
  const { theme } = useTheme();
  const [openNew, setOpenNew] = useState<boolean>(false);

  const handleToggleNew = () => {
    setOpenNew(!openNew);
  };

  const handleChatGPT = () => {
    router.push("/chatgpt");
  }

  return (
    <div className="w-full pb-[15px] sm:pb-[25px] border-b-[1px] border-[#0000001f] dark:border-[#ffffff2b] mb-[30px]">
      <div className="flex items-center ">
        <h3 className="text-black dark:text-white font-Satoshi font-medium text-[20px] capitalize leading-[27px] mr-auto">
          {title}
        </h3>

        {isList !== undefined && (
          <div
            className={`bg-[#EEF0F4] dark:bg-[#4F5051] p-1 rounded-lg inline-flex items-center ml-auto`}
          >
            <button
              className={`p-[6px] box-border rounded-[6px] ${
                !isList ? "bg-white dark:bg-[#00ADB5]" : ""
              }`}
              onClick={onLayout}
            >
              <Image
                alt=""
                src={
                  !isList
                    ? theme === "dark"
                      ? GridActDarkSvg
                      : GridActSvg
                    : GridSvg
                }
                className="w-[18px] h-[18px]"
              />
            </button>
            <button
              className={`p-[6px] box-border rounded-[6px] ml-[3px]  ${
                isList ? "bg-white dark:bg-[#00ADB5]" : ""
              }`}
              onClick={onLayout}
            >
              <Image
                alt=""
                src={
                  isList
                    ? theme === "dark"
                      ? ListActDarkSvg
                      : ListActSvg
                    : ListSvg
                }
                className="w-[18px] h-[18px]"
              />
            </button>
          </div>
        )}

        <div className="hidden sm:inline-flex">
          <Button
            onClick={handleChatGPT}
            variant="outlined"
            className="text-sm bg-white dark:!text-white dark:bg-dark !text-[#263238] border-[#26323826] dark:border-[#ffffff26] px-[22px] py-[8px] mx-[10px]"
          >
            Chat GPT
          </Button>
          <Button
            onClick={handleToggleNew}
            variant="contained"
            className="text-sm text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-1 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Create new chatbot
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-[10px] sm:hidden mt-[15px]">
        <div className="col-span-2">
        <Button
          onClick={handleChatGPT}
          variant="outlined"
          className="text-sm bg-white !text-[#263238] border-[#26323826] px-[22px] py-[8px] w-full"
        >
          Chat GPT
        </Button>
        </div>
        <div className="col-span-3">
        <Button
          onClick={handleToggleNew}
          variant="contained"
          className="w-full text-sm text-white capitalize"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mr-1 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Create new chatbot
        </Button>
      </div>
      </div>

      <NewChat open={openNew} onClose={handleToggleNew} />
    </div>
  );
};

export default Filters;
