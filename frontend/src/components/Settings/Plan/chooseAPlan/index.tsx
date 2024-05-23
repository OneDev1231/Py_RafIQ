import React, { useState } from "react";
import Image from "next/image";

import tick from "assets/img/settings/tick.png";
import { API } from "api";
import { useLoaderOverlay, useNotify } from "hooks";

type Props = {
  id: number;
  title: string;
  price: string;
  time: string;
  list: any;
};

const ChooseAPlan = ({ id, title, price, time, list }: Props) => {
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const { notifyError, notifySuccess } = useNotify();

  const handleChoosePlan = async (e: any) => {
    e.preventDefault();
    
    setWaitingForResponse(true);
    const {status, message} = await API.updateSubscripton(id);
    setWaitingForResponse(false);

    if(status === "error") {
      notifyError("Something went wrong");
    } else {
      notifySuccess(message);
    }
  }

  useLoaderOverlay(waitingForResponse);

  return (
    <div className="p-0 sm:p-[28px] w-full mx-auto">
      <h1 className="font-Satoshi not-italic font-[500] text-[20px] leading-[127%] text-[#000000] dark:text-[#FFFFFF] max-xl:text-[17px] max-sm:text-[20px]">
        {title}
      </h1>
      <h2 className="mt-[8px] mb-[19px] max-xl:mt-[6px] max-xl:mb-[16px] font-Satoshi not-italic font-[500] text-[36px] leading-[140%] text-[#000000] dark:text-[#FFFFFF] max-xl:text-[31px] max-sm:text-[36px]">
        {price}
        <span className="font-Satoshi not-italic font-[400] text-[14px] leading-[150%] text-[#263238] dark:text-[#FFFFFF] max-xl:text-[12px] max-sm:text-[14px]">
          / {time}
        </span>
      </h2>
      <p className="font-Satoshi not-italic font-[400] text-[14px] leading-[150%] text-[#263238] dark:text-[#FFFFFF] tracking-[.02em] max-xl:text-[12px] max-sm:text-[14px]">
        For most businesses that want to optiimize web queries
      </p>
      <div className="mt-[20px] mb-[27px] max-xl:mt-[17px] max-xl:mb-[23px]">
        {list.map((items: any) => {
          return (
            <div
              className="flex flex-row items-center mb-[14px] max-xl:mb-[12px]"
              key={items.id}
            >
              <Image
                src={tick}
                alt=""
                className="w-[15px] h-auto max-xl:w-[13px] max-sm:w-[15px]"
              />
              <p className="ml-[12px] max-xl:ml-[10px] max-sm:ml-[12px] font-Satoshi not-italic font-[500] text-[14px] leading-[150%] text-[#263238] dark:text-[#FFFFFF] tracking-[.02em] capitalize max-xl:text-[12px] max-sm:text-[14px]">
                {items.list}
              </p>
            </div>
          );
        })}
      </div>
      <button onClick={handleChoosePlan} className=" max-sm:dark:bg-[#00ADB5] p-[14.67px] w-full rounded-[12px] border-[0.92px] border-solid border-[#00ADB5] font-Satoshi not-italic font-[600] text-[14px] max-xl:text-[12px] max-sm:text-[14px] leading-[150%] text-[#00ADB5] max-sm:dark:text-[#FFFFFF]  tracking-[.02em] hover:opacity-70">
        Choose Plan
      </button>
    </div>
  );
};

export default ChooseAPlan;
