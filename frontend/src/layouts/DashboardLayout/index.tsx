import React, { useState, Fragment } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useWindowSize } from "usehooks-ts";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";

import Support from "components/Support";
import ContactUs from "components/UserDashboard/ContactUs";
import Plan from "components/Settings/Plan";
import Image from "next/image";
import { useAskRafiqSupportChat } from "api/useAskRafiqSupportChat";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { width } = useWindowSize();
  const [open, setOpen] = useState<boolean>(width > 1023 ? true : false);
  const [openSupport, setOpenSupport] = useState<boolean>(false);
  const [openContact, setOpenContact] = useState<boolean>(false);
  const [openPlans, setOpenPlans] = useState<boolean>(false);
  const supportChatBotMessages = useAskRafiqSupportChat();

  const handleToggleSupport = () => {
    setOpenSupport(!openSupport);
  };

  const handleToggleMenu = () => {
    setOpen(!open);
  };

  const handleToggleContact = () => {
    setOpenContact(!openContact);
  };

  const handleTogglePlans = () => {
    setOpenPlans(!openPlans);
  };

  return (
    <Fragment>
      <div className="flex">
        <Sidebar
          open={open}
          onOpen={setOpen}
          onContact={handleToggleContact}
          onPlans={handleTogglePlans}
        />
        <div className="bg-[#f8f8f8] dark:bg-black w-full min-h-full lg:w-contentTablet xl:w-content">
          <Header
            onOpen={handleToggleMenu}
            onContact={handleToggleContact}
            onPlans={handleTogglePlans}
          />
          <div className="p-[10px] sm:p-[20px] xl:p-[30px] box-border overflow-hidden mt-[80px] min-h-content">
            <div className="bg-white dark:bg-dark overflow-hidden dark:text-white">
              {children}
            </div>
          </div>

          {/* get support */}
          <Popover
            placement="top-end"
            open={openSupport}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
          >
            <PopoverHandler onClick={handleToggleSupport}>
              <button
                onClick={handleToggleSupport}
                className="fixed bottom-[45px] right-[45px] z-100 items-center 
                  justify-center text-white dark:text-[#263238] font-medium font-Satoshi capitalize text-12px] leading-[16px]  
                  flex flex-col box-border"
              >
                <Image
                  src={"./supportFace.png"}
                  className="absolute bottom-6"
                  alt="Face"
                  width={70}
                  height={70}
                />
                <div className="bg-[#263238] rounded-[54px] dark:bg-white py-[8px] px-[18px] flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 001.28.53l4.184-4.183a.39.39 0 01.266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0012 2.25zM8.25 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm2.625 1.125a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Ask RAFIQ
                </div>
              </button>
            </PopoverHandler>
            <PopoverContent className="p-0 border-0 shadow-none">
              <Support
                chatBotMessages={supportChatBotMessages}
                onClose={handleToggleSupport}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <ContactUs open={openContact} onClose={handleToggleContact} />
      <Plan open={openPlans} onClose={handleTogglePlans} />
    </Fragment>
  );
};

export default DashboardLayout;
