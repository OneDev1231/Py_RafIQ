import React, { Fragment, useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";

import { toast } from "react-toastify";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { resetSaved, saveChatbot } from "redux/reducers/saved";

import { Button } from "components";

type Props = {
  open: boolean;
  onClose: () => void;
};

const SaveChat = ({ open, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(
    (state) => state.users
  );
  const { isSaved } = useAppSelector(
    (state) => state.saved
  );

  const router = useRouter();
  const { roomId } = router.query;
  const cancelButtonRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [name, setName] = useState<any>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleSave = () => {
    dispatch(saveChatbot({ user: user.id, name, bot_id: roomId }))
  }

  useEffect(() => {
    if(isSaved === true) {
      toast.success("Saved!");
      dispatch(resetSaved());
      setName("");
      onClose();
    }

    return () => {
      dispatch(resetSaved());
      setName("");
    }
  }, [isSaved])

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
          <div className="flex items-end justify-center min-h-[90%] max-sm:min-h-[70%] p-4 max-sm:p-[10px] text-center sm:items-center sm:p-0">
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
                <div className="flex items-center py-[18px] px-[20px] border-b-[1px] border-[#0000001f] dark:border-[#FFFFFF1F]">
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
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>

                  <h4 className="font-Satoshi font-[700] text-lg leading-[24px] ml-2 text-black dark:text-[#fff] capitalize">
                    Save Chat
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
                    <div>
                      <label className="dark:text-[#FFFFFF] opacity-50 font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[14.6957px] max-xl:leading-[20px] text-[#263238] ">
                        Name this chat
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={handleChange}
                        placeholder="Name this chat"
                        defaultValue="Lorem Ipsum"
                        className="placeholder:text-[#263238] placeholder:opacity-40 dark:placeholder:text-[#fff] dark:border-[#FFFFFF2E] dark:text-[#fff] w-full border-[1.7px] border-solid border-[#00000014] rounded-[8px] px-[19px] py-[13px] mt-[10px] font-Satoshi not-italic font-[500] text-[14px] leading-[19px] max-md:text-[14px] max-md:leading-[19px] max-xl:text-[16px] max-xl:leading-[21px] text-[#263238]"
                      />
                    </div>
                    <p className="mt-[12px] mb-[30px] capitalize dark:text-[#ffffff80]  font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[14.6957px] max-xl:leading-[20px] text-[#26323880] ">
                      chatbot: <span className="text-[#00ADB5]">lorem ispum</span>
                    </p>
                  </div>
                  <div className="w-full text-center">
                    <Button
                      variant="outlined"
                      className="w-[160px] h-[35px] max-sm:h-[35px] max-xl:h-[40px] mr-[10px] max-sm:w-[48%] text-sm bg-white dark:!text-white dark:bg-[#373636] !text-[#263238] border-[#26323826] dark:border-[#ffffff26] px-[22px] py-[8px]"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      className="w-[160px] h-[35px] max-sm:h-[35px] max-xl:h-[40px] max-sm:w-[48%] text-sm"
                      disabled={!name}
                      onClick={handleSave}
                    >
                      Save
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

export default SaveChat;
