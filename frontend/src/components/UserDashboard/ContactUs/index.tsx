import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTheme } from "next-themes";

import Image from "next/image";

import iconTick from "assets/img/settings/Vector.png";
import iconTickDark from "assets/img/settings/VectorDark.png";
import arrowsquareleft from "assets/img/settings/arrowsquareleft.png";
import arrowsquareleftDark from "assets/img/settings/arrowsquareleftDark.png";

type Props = {
  open: boolean;
  onClose: () => void;
}

const ContactUs = ({ open, onClose }: Props) => {
  const { theme, setTheme } = useTheme();

  const cancelButtonRef = useRef(null);

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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center text-center sm:items-center sm:bg-[#0000008C]">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className=" relative transform overflow-hidden rounded-lg max-md:rounded-none bg-white dark:bg-[#373636] max-sm:dark:bg-[#1A1A1A] text-left shadow-xl transition-all  sm:my-8 w-[506px] max-xl:w-[572px] max-sm:w-full">
                <div className="flex flex-row p-[24px] max-xl:p-[20px] border-b-[1px] border-solid border-[#0000001F] dark:border-[#FFFFFF38]">
                  <button
                    type="button"
                    onClick={onClose}
                    ref={cancelButtonRef}
                    className="sm:hidden hover:opacity-70"
                  >
                    <Image
                      src={
                        theme === "dark" ? arrowsquareleftDark : arrowsquareleft
                      }
                      alt=""
                      className="h-auto w-[20px] "
                    />
                  </button>
                  <h1 className="max-md:font-[500] mr-auto font-Satoshi not-italic font-[700] text-[20px] leading-[27px] text-[#000000] dark:text-[#FFFFFF] capitalize max-xl:font-[700] max-xl:text-[17px] max-xl:leading-[23px] max-sm:ml-auto max-sm:pr-[20px]">
                    Contact us
                  </h1>
                  <button
                    type="button"
                    onClick={onClose}
                    ref={cancelButtonRef}
                    className="max-sm:hidden hover:opacity-70 "
                  >
                    <Image
                      src={theme === "dark" ? iconTickDark : iconTick}
                      alt=""
                      className="h-auto w-[20px ]"
                    />
                  </button>
                </div>

                <div className="px-[22px] py-[28px] max-sm:px-[10px] max-sm:py-[30px]">
                  <div>
                    <label className="dark:text-[#FFFFFF] opacity-50 font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[14.6957px] max-xl:leading-[20px] text-[#263238] ">
                      Your name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="dark:border-[#FFFFFF2E] dark:text-[#fff] max-sm:dark:bg-[#1A1A1A] w-full border-[1.7px] border-solid border-[#00000014] rounded-[8px] px-[19px] py-[13px] mt-[10px] font-Satoshi not-italic font-[500] text-[14px] leading-[19px] max-md:text-[14px] max-md:leading-[19px] max-xl:text-[16px] max-xl:leading-[21px] text-[#7C7B7C]"
                    />
                  </div>
                  <div className="mt-[12px] max-sm:mt-[20px]  ">
                    <label className="dark:text-[#FFFFFF] opacity-50 font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[14.6957px] max-xl:leading-[20px] text-[#263238] ">
                      Email Address
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your Email address"
                      className="dark:border-[#FFFFFF2E] dark:text-[#fff] max-sm:dark:bg-[#1A1A1A] w-full border-[1.7px] border-solid border-[#00000014] rounded-[8px] px-[19px] py-[13px] mt-[10px] font-Satoshi not-italic font-[500] text-[14px] leading-[19px] max-md:text-[14px] max-md:leading-[19px] max-xl:text-[16px] max-xl:leading-[21px] text-[#7C7B7C]"
                    />
                  </div>
                  <div className="mt-[12px] max-sm:mt-[20px]">
                    <label className="dark:text-[#FFFFFF] opacity-50 font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[14.6957px] max-xl:leading-[20px] text-[#263238] ">
                      Message
                    </label>
                    <textarea
                      rows={7}
                      placeholder="what do you have in mind?"
                      className="placeholder:text-[#7C7B7C] dark:border-[#FFFFFF2E] dark:text-[#fff] max-sm:dark:bg-[#1A1A1A] w-full border-[1.7px] border-solid border-[#00000014] rounded-[8px] px-[19px] py-[13px] mt-[10px] font-Satoshi not-italic font-[500] text-[14px] leading-[19px] max-md:text-[14px] max-md:leading-[19px] max-xl:text-[16px] max-xl:leading-[21px] text-[#7C7B7C]"
                    />
                  </div>
                  <div className="my-[30px]">
                    <div className="w-full flex mt-[30px] ">
                      <button className="dark:border-[#FFFFFF1F] dark:text-[#FFFFFF] p-[9px] rounded-[9px] w-[160px] max-xl:w-[180px] max-sm:w-[49%] ml-auto   border-[1.13px] border-solid border-[#0000001F] font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[16px] max-xl:leading-[21px] text-[#263238] capitalize hover:opacity-70">
                        Cancel
                      </button>
                      <button className="p-[9px] rounded-[9px] w-[160px] max-xl:w-[180px] max-sm:w-[49%] mr-auto ml-[11px] bg-[#00ADB5] border-b-[1.13px] border-solid border-[#00ADB5] font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[16px] max-xl:leading-[21px] text-[#FDFDFD] capitalize hover:opacity-70">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ContactUs;