import React, { useEffect } from "react";
import { Fragment, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";

import { toast } from "react-toastify";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { resetChatbot, deleteChatbot } from "redux/reducers/chatbots";

import { Button } from "components";

type Props = {
  open: boolean;
  onClose: () => void;
};

const DeleteChat = ({ open, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const { isDeleted } = useAppSelector(
    (state) => state.chatbots
  );

  const router = useRouter();
  const { roomId } = router.query;
  const cancelButtonRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tickValue, setTickValue] = useState<any>(false);

  const tickSave = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTickValue(!tickValue);
  };

  const handleDelete = () => {
    dispatch(deleteChatbot({ roomId }));
  }

  useEffect(() => {
    setTickValue(false);
  }, [open]);

  useEffect(() => {
    if(isDeleted === true) {
      toast.success("Deleted!");
      router.push("/dashboard");
      onClose();
    }

    return () => {
      dispatch(resetChatbot());
    }
  }, [isDeleted]);

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
          <div className="flex items-end justify-center min-h-[90%] ma-sm:min-h-[70%] p-4 max-sm:p-[10px] text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white dark:bg-[#373636] shadow-xl sm:my-8 max-sm:w-full sm:w-[590px] lg:max-w-[506px]">
                <div className="flex items-center py-[18px] px-[20px] border-b-[1px] border-[#0000001f] dark:border-[#FFFFFF1F] text-[#FF4646]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>

                  <h4 className="font-Satoshi font-bold text-lg leading-[24px] ml-2 text-[#FF4646] capitalize">
                    Delete Chatbot
                  </h4>
                  <button className="ml-auto" onClick={onClose}>
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
                <div className="p-5 max-xl:p-[23px] max-sm:p-[17px]">
                  <div>
                    <div className="mb-[27px] max-xl:mb-[32px] max-sm:mb-[25px] mt-[12px] max-sm:mt-[15px] w-full flex flex-row items-start">
                      <input
                        onChange={tickSave}
                        value={tickValue}
                        type="checkbox"
                        className="checkbox:w-[14.25px] h-auto"
                      />
                      <div className="mt-[-6px] ml-[12px]">
                        <p className="font-Satoshi not-italic font-[500] text-[16px] leading-[22px] max-md:text-[16px] max-md:leading-[22px] max-xl:text-[19px] max-xl:leading-[25px] text-[#000000] dark:text-white">
                          Are you sure you want to delete your chatbot with all
                          of its content?{" "}
                          <span className="text-[#999999]">
                            (This action can not be undone)
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full text-center">
                    <Button
                      variant="outlined"
                      className="w-[160px] h-[35px] max-sm:h-[35px] max-xl:h-[40px] mr-[10px] max-sm:w-[48%] text-sm bg-white dark:!text-white dark:bg-[#373636] !text-[#263238] border-[#26323826] dark:border-[#ffffff26] px-[22px] py-[8px]"
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={!tickValue}
                      onClick={handleDelete}
                      variant="contained"
                      className="w-[160px] h-[35px] max-sm:h-[35px] max-xl:h-[40px] max-sm:w-[48%] text-sm disabled:opacity-70"
                    >
                      Delete
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

export default DeleteChat;
