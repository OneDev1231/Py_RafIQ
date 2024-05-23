import React from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition, Tab } from "@headlessui/react";

import AddData from "./AddData";
import AllDocuments from "./AllDocuments";
import Image from "next/image";
import { useTheme } from "next-themes";

import iconTick from "assets/img/settings/Vector.png";
import iconTickDark from "assets/img/settings/VectorDark.png";
import arrowsquareleft from "assets/img/settings/arrowsquareleft.png";
import arrowsquareleftDark from "assets/img/settings/arrowsquareleftDark.png";

type Props = {
  documents: any;
  open: boolean;
  onClose: () => void;
};

const DataSource = ({ open, onClose, documents }: Props) => {
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

        <div className="fixed inset-0 z-10 overflow-y-auto max-sm:bg-white max-sm:dark:bg-black">
          <div className="flex items-center justify-center min-h-screen max-sm:min-h-0 p-4 max-sm:p-0 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white dark:bg-[#373636] sm:my-8 max-sm:w-full sm:w-[590px] lg:max-w-[506px] h-full">
                <div className="flex flex-row p-[24px] max-xl:p-[20px] items-center">
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
                      d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                    />
                  </svg>
                  <h1 className=" mr-auto font-Satoshi not-italic font-[700] text-[20px] leading-[27px] text-[#000000] dark:text-[#FFFFFF] capitalize max-xl:text-[17px] max-xl:leading-[23px] max-sm:ml-auto max-sm:pr-[20px]">
                    Data Source
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
                <Tab.Group
                  selectedIndex={selectedIndex}
                  onChange={setSelectedIndex}
                >
                  <Tab.List className="border-b-[1px] border-[#0000001f]  px-[20px] max-sm:px-0">
                    <Tab
                      className={`px-[10px] py-3 font-Satoshi font-medium text-sm leading-[19px] border-b-[2px] border-white dark:border-[#373636] max-sm:w-[50%] max-sm:text-[12px]
                      ${
                        selectedIndex === 0
                          ? "text-black dark:text-[#FFFFFF] !border-black dark:!border-[#FFFFFF]"
                          : "text-[#7C7B7C]"
                      } capitalize`}
                    >
                      All Documents
                    </Tab>
                    <Tab
                      className={`px-[10px] py-3 font-Satoshi font-medium text-sm leading-[19px] border-b-[2px] border-white dark:border-[#373636] max-sm:w-[50%] max-sm:text-[12px]
                      ${
                        selectedIndex === 1
                          ? "text-black dark:text-[#FFFFFF] !border-black dark:!border-[#FFFFFF]"
                          : "text-[#7C7B7C]"
                      } capitalize`}
                    >
                      Add Data
                    </Tab>
                  </Tab.List>
                  <Tab.Panels className="p-5 max-sm:p-[12px] dark:max-sm:bg-[#000000]">
                    <Tab.Panel>
                      <AllDocuments documents={documents} />
                    </Tab.Panel>
                    <Tab.Panel>
                      <AddData />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default DataSource;
