import React from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { Button } from "components";
import AnalyticsChartJS from "./AnalyticsChartJS";
import Image from "next/image";
import { useTheme } from "next-themes";

import arrowsquareleft from "assets/img/settings/arrowsquareleft.png";
import arrowsquareleftDark from "assets/img/settings/arrowsquareleftDark.png";

type Props = {
  open: boolean;
  onClose: () => void;
};

const Analytics = ({ open, onClose }: Props) => {
  const cancelButtonRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme, setTheme } = useTheme();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-[#0000008c] bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 h-full overflow-y-auto max-sm:bg-white max-sm:dark:bg-black">
          <div className="flex items-end justify-center min-h-full p-4 text-center max-sm:min-h-0 max-sm:p-0 sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white dark:bg-[#373636] sm:my-8 w-[770px] max-xl:w-[874px] max-sm:w-full">
                <div className="flex flex-row p-[24px] max-xl:p-[20px] items-center py-[18px] px-[20px] border-b-[1px] border-[#0000001f] dark:border-[#FFFFFF1F] text-black dark:text-white">
                  <button
                    type="button"
                    onClick={onClose}
                    ref={cancelButtonRef}
                    className="sm:hidden hover:opacity-70"
                  >
                    <Image
                      className="w-[20px] h-auto"
                      src={
                        theme === "dark" ? arrowsquareleftDark : arrowsquareleft
                      }
                      alt=""
                    />
                  </button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 max-sm:hidden mr-[8px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                    />
                  </svg>

                  <h1 className="mr-auto font-Satoshi not-italic font-[700] text-[20px] leading-[27px] text-[#000000] dark:text-[#FFFFFF] capitalize max-xl:text-[17px] max-xl:leading-[23px] max-sm:ml-auto max-sm:pr-[20px]">
                    Analytics
                  </h1>
                  <button className="ml-auto max-sm:hidden" onClick={onClose}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <div className="max-md:relative flex flex-row max-md:flex-col max-md:items-start items-center bg-[#455a641f] dark:bg-[#455a6452] py-[14px] px-[25px] max-md:px-[12px] font-Satoshi text-[black] font-[500] text-[14px] leading-[19px] capitalize ">
                    <div className="dark:text-white dark:border-[#FFFFFF2f] pr-[20px] border-r-[1px] border-solid border-[#0000001f] max-md:border-b-[1px] max-md:border-r-0 max-md:pb-[18px] max-md:w-full">
                      Filters
                    </div>
                    <div className="flex flex-row items-center mx-auto max-md:flex-col max-md:items-start">
                      <div className="flex flex-row items-center max-md:my-[16px]">
                        <p className="text-[13px] leading-[18px] opacity-40 mr-[13px] dark:text-[#ffffff6e]">
                          Range:
                        </p>
                        <input
                          type="date"
                          className="w-[120px] bg-[#FFFFFF] dark:bg-[#646464] dark:text-white rounded-[5px] py-[6px] px-[8px]"
                          defaultValue="2023-04-16"
                        />
                        <div className="h-[2px] w-[10px] mx-[13px] bg-[#263238] dark:bg-white opacity-30" />

                        <input
                          type="date"
                          className="w-[120px] bg-[#FFFFFF] dark:bg-[#646464] dark:text-white rounded-[5px] py-[6px] px-[8px]"
                          defaultValue="2023-04-16"
                        />
                      </div>
                      <div className="flex flex-row items-center ml-[34px] max-md:ml-0">
                        <p className="text-[13px] leading-[18px] opacity-40 mr-[13px] dark:text-[#ffffff6e]">
                          Data Type:
                        </p>
                        <div className="relative w-[120px] max-md:w-[255px]">
                          <select className="w-full dark:bg-[#646464] dark:text-white font-[Satoshi] not-italic font-[500] text-[14px] leading-[19px] text-[#263238] block appearance-none bg-white rounded-[5px] px-[8px] py-[6px]">
                            <option
                              value="1"
                              className="text-[#263238] dark:text-white font-[500] text-[14px] leading-[19px] "
                            >
                              Page View
                            </option>
                            <option
                              value="2"
                              className="text-[#263238] dark:text-white font-[500] text-[14px] leading-[19px] "
                            >
                              Questions
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
                    </div>
                    <div className="max-md:absolute max-md:top-[10px] max-md:right-[12px] text-[13px] leading-[18px] text-[#FF4646]">
                      Clear all
                    </div>
                  </div>

                  <AnalyticsChartJS />

                  <div className="w-full text-center py-[26px]">
                    <Button
                      variant="contained"
                      className="max-sm:w-[85%] max-sm:mx-auto w-[338px] mr-[10px] text-white bg-[#00ADB5] rounded-[9px] capitalize border-[#00ADB5] "
                    >
                      Download all answers and questions
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Analytics;
