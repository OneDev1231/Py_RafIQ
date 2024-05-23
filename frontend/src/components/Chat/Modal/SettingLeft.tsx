import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useTheme } from "next-themes";

type Props = {
  setColorUser: any;
  setColorChat: any;
};

export default function SettingLeft({setColorUser, setColorChat} : Props) {
  const [colorMessage, setColorMessage] = useState("#EB996E");
  const [colorBubble, setColorBubble] = useState("#66B6FF");
  const { theme, setTheme } = useTheme();
  const mode = localStorage.getItem("theme") || "light";
  const [enabled, setEnabled] = useState<boolean>(
    mode === "dark" ? true : false
  );

  function onChangeValue1(event: React.ChangeEvent<HTMLInputElement>) {
    setColorMessage(event.target.value);
    setColorUser(event.target.value)
  }

  function onChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
    setColorBubble(event.target.value);
    setColorChat(event.target.value)
  }

  const handleChangeTheme = () => {
    setEnabled(!enabled);
  };

  return (
    <div className="p-[27px] bg-white dark:bg-[#373636] max-sm:dark:bg-black max-sm:p-[12px]">
      <div>
        <label className="dark:text-[#FFFFFF] opacity-50 font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[14.6957px] max-xl:leading-[20px] text-[#263238] ">
          Chat Name
        </label>
        <input
          type="text"
          placeholder="Chat Name"
          defaultValue="Implant Dentistry"
          className="placeholder:text-[#263238] placeholder:opacity-40 dark:placeholder:text-[#fff] dark:border-[#FFFFFF2E] dark:text-[#fff] w-full border-[1.7px] border-solid border-[#00000014] rounded-[8px] px-[19px] py-[13px] mt-[10px] font-Satoshi not-italic font-[500] text-[14px] leading-[19px] max-md:text-[14px] max-md:leading-[19px] max-xl:text-[16px] max-xl:leading-[21px] text-[#263238]"
        />
      </div>

      <div className="mt-[25px] max-sm:mt-[25px] max-xl:mt-[27px]">
        <label className="dark:text-[#FFFFFF] opacity-50 font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[14.6957px] max-xl:leading-[20px] text-[#263238] ">
          Visibility
        </label>
        <div className="relative w-full mt-[10px]">
          <select className="w-full dark:bg-[#373636] dark:border-[#FFFFFF26] dark:text-white font-[Satoshi] not-italic font-[500] text-[14px] leading-[19px] text-[#263238] block appearance-none bg-white rounded-[8px] border-[1.5px] border-solid border-[#00000014] px-[19px] py-[14px]">
            <option
              value="1"
              className="text-[#263238] dark:text-white font-[500] text-[14px] leading-[19px] "
            >
              Public
            </option>
            <option
              value="2"
              className="text-[#263238] dark:text-white font-[500] text-[14px] leading-[19px] "
            >
              Private
            </option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:!text-white">
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
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="mt-[25px] max-sm:mt-[25px] max-xl:mt-[27px]">
        <label className="dark:text-[#FFFFFF] opacity-50 font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[14.6957px] max-xl:leading-[20px] text-[#263238] ">
          Initial Message (optional)
        </label>
        <input
          type="text"
          placeholder="Initial Message (optional)"
          defaultValue="Hi, How can i help you?"
          className="placeholder:text-[#263238] placeholder:opacity-40 dark:placeholder:text-[#fff] dark:border-[#FFFFFF2E] dark:text-[#fff] w-full border-[1.7px] border-solid border-[#00000014] rounded-[8px] px-[19px] py-[13px] mt-[10px] font-Satoshi not-italic font-[500] text-[14px] leading-[19px] max-md:text-[14px] max-md:leading-[19px] max-xl:text-[16px] max-xl:leading-[21px] text-[#263238]"
        />
      </div>
      <hr className="bg-[#000000] opacity-10 my-[30px] h-[2px]" />
      <div>
        <label className="dark:text-[#FFFFFF] opacity-50 font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[14.6957px] max-xl:leading-[20px] text-[#263238] ">
          User Message Color:
        </label>
        <div className="relative">
          <div className="placeholder:text-[#263238] dark:placeholder:text-[#fff] dark:border-[#FFFFFF2E] dark:text-[#fff] w-full border-[1.7px] border-solid border-[#00000014] rounded-[8px] px-[19px] py-[13px] mt-[10px] font-Satoshi not-italic font-[500] text-[14px] leading-[19px] max-md:text-[14px] max-md:leading-[19px] max-xl:text-[16px] max-xl:leading-[21px] text-[#263238]">
            {colorMessage}
          </div>
          <input
            type="color"
            id="head"
            name="head"
            value={colorMessage}
            onChange={onChangeValue1}
            className="absolute top-[12px] right-[10px] w-[23px] h-[27px] rounded-[4px] dark:bg-[#373636] bg-white p-0"
          />
        </div>
      </div>
      <div className="mt-[25px]">
        <label className="dark:text-[#FFFFFF] opacity-50 font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[14.6957px] max-xl:leading-[20px] text-[#263238] ">
          chat bubble color:
        </label>
        <div className="relative">
          <div className="placeholder:text-[#263238] dark:placeholder:text-[#fff] dark:border-[#FFFFFF2E] dark:text-[#fff] w-full border-[1.7px] border-solid border-[#00000014] rounded-[8px] px-[19px] py-[13px] mt-[10px] font-Satoshi not-italic font-[500] text-[14px] leading-[19px] max-md:text-[14px] max-md:leading-[19px] max-xl:text-[16px] max-xl:leading-[21px] text-[#263238]">
            {colorBubble}
          </div>
          <input
            type="color"
            id="head"
            name="head"
            value={colorBubble}
            onChange={onChangeValue}
            className="absolute top-[12px] right-[10px] w-[23px] h-[27px] rounded-[4px] dark:bg-[#373636] bg-white p-0"
          />
        </div>
      </div>
      <div className="mt-[25px] flex flex-row items-center max-sm:mb-[10px]">
        <div>
          <div className="font-Satoshi not-italic font-[700] text-[16px] leading-[22px] max-md:text-[16px] max-md:leading-[22px] max-xl:text-[18px] max-xl:leading-[24px] text-[#000000] dark:text-white">
            <p>
              RAFIQ.ai <span className="font-[400]">Branding</span>
            </p>
            <p className="text-[#7C7B7C] font-[400] text-[12px] leading-[16px] mt-[5px]">
              Pro plan and above only{")"}
            </p>
          </div>
        </div>
        <div className="ml-auto">
          <Switch
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
          </Switch>
        </div>
      </div>
    </div>
  );
}
