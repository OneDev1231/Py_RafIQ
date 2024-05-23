import React from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { Button } from "components";

import { useTheme } from "next-themes";

import iconTick from "assets/img/settings/Vector.png";
import iconTickDark from "assets/img/settings/VectorDark.png";
import arrowsquareleft from "assets/img/settings/arrowsquareleft.png";
import arrowsquareleftDark from "assets/img/settings/arrowsquareleftDark.png";
import Image from "next/image";
import SettingLeft from "./SettingLeft";
import SettingRight from "./SettingRight";

type Props = {
  open: boolean;
  onClose: () => void;
};

const Setting = ({ open, onClose }: Props) => {
  const cancelButtonRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [colorUser, setColorUser] = useState<any>("#EB996E");
  const [colorChat, setColorChat] = useState<any>("#66B6FF");

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

        <div className="fixed inset-0 z-10 overflow-y-auto max-sm:bg-white max-sm:dark:bg-black">
          <div className="flex items-end justify-center min-h-full max-sm:min-h-0 p-4 max-sm:p-0 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className=" relative overflow-hidden text-left transition-all transform bg-white dark:bg-[#373636] sm:my-8 max-sm:w-full sm:w-[810px] lg:max-w-[778px]">
                <div className="flex flex-row items-center p-[24px] max-xl:p-[20px] border-b-[1px] border-solid border-[#0000001A] dark:border-[#FFFFFF]">
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
                    className="w-5 h-5 mr-[8px] max-sm:hidden"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <h1 className=" mr-auto font-Satoshi not-italic text-[20px] leading-[27px] text-[#000000] dark:text-[#FFFFFF] capitalize font-[700] max-xl:text-[17px] max-xl:leading-[23px] max-sm:ml-auto max-sm:pr-[20px]">
                    Settings
                  </h1>
                  <button
                    type="button"
                    onClick={onClose}
                    ref={cancelButtonRef}
                    className="max-sm:hidden hover:opacity-70"
                  >
                    <Image
                      className="w-[20px] h-auto"
                      src={theme === "dark" ? iconTickDark : iconTick}
                      alt=""
                    />
                  </button>
                </div>
                <div>
                  <div className="grid grid-cols-2 max-md:grid-cols-1">
                    <div>
                      <SettingLeft setColorUser={setColorUser} setColorChat={setColorChat}/>
                    </div>
                    <div>
                      <SettingRight colorUser={colorUser} colorChat={colorChat} />
                    </div>
                  </div>
                  <div className="w-full text-center py-[15px] max-sm:py-[40px] dark:border-t-[1px] boder-solid dark:border-[#FFFFFF1F]">
                    <Button
                      variant="outlined"
                      className="w-[160px] mr-[10px] max-sm:w-[40%] text-sm bg-white dark:!text-white dark:bg-[#373636] !text-[#263238] border-[#26323826] dark:border-[#ffffff26] px-[22px] py-[8px]"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      className="w-[160px] max-sm:w-[40%] text-sm"
                    >
                      Save Changes
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

export default Setting;
