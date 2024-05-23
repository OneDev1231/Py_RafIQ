import React from "react";
import { Fragment, useRef, useState } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { useTheme } from "next-themes";

import { Button } from "components";
import FilePreview from "./FilePreview";

import iconTick from "assets/img/settings/Vector.png";
import iconTickDark from "assets/img/settings/VectorDark.png";

type Props = {
  open: boolean;
  onClose: () => void;
};

const ModalFilePreview = ({ open, onClose }: Props) => {
  const cancelButtonRef = useRef(null);
  const { theme, setTheme } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);

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

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center h-screen max-sm:pr-[60px] text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative h-full overflow-hidden text-left transition-all transform bg-white dark:bg-[#1A1A1A] 
                shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                <FilePreview isModal={true} onClose={onClose} documents={[]} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalFilePreview;
