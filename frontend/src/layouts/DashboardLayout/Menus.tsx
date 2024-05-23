import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { useOnClickOutside } from "usehooks-ts";
import { Button } from "components";
import { Switch } from "@headlessui/react";
import MenuItem from "./MenuItem";
import { menus, support } from "./data";

import Logo from "assets/img/logo-black.svg";
import LogoWhite from "assets/img/logo-light.png";
import DarkSvg from "assets/img/layouts/dark.svg";
import LogoutSvg from "assets/img/layouts/logout.svg";
import KeyImg from "assets/img/layouts/key.png";
import { API } from "api";

type Props = {
  isDrawer?: boolean;
  onContact?: () => void;
  onPlans?: () => void;
};

const Menus = ({ isDrawer, onContact, onPlans }: Props) => {
  const router = useRouter();
  const mode = localStorage.getItem("theme") || "light";
  const { theme, setTheme } = useTheme();
  const [enabled, setEnabled] = useState<boolean>(
    mode === "dark" ? true : false
  );

  useEffect(() => {
    if (mode) {
      setTheme(mode);
      setEnabled(mode === "dark" ? true : false);
    }
  }, [mode]);

  const handleChangeTheme = () => {
    setEnabled(!enabled);
    setTheme(!enabled ? "dark" : "light");
  };

  const handleSupport = (path: string) => {
    if (path === "/contact") {
      onContact && onContact();
    }
  };

  return (
    <div>
      <nav
        className={`top-0 lg:sticky  box-border ${
          isDrawer ? "px-0 pb-[26px]" : "px-[20px] xl:px-[32px] py-[26px]"
        }`}
      >
        <div
          className={
            isDrawer
              ? "text-left mb-6 px-5 py-4 border-b border-sidebar"
              : "text-center mb-[50px] h-[29px]"
          }
        >
          <Image
            alt=""
            src={theme === "dark" ? LogoWhite : Logo}
            className={`${isDrawer ? "" : "mx-auto"} w-[80px]`}
          />
        </div>

        <div className={`w-full ${isDrawer ? "px-5" : ""}`}>
          <h4 className="font-medium text-[15px] leading-[20px] text-[#263238] dark:text-white uppercase mb-4 px-3 opacity-[.35]">
            Menu
          </h4>

          <div>
            {menus.map((item, i) => (
              <MenuItem
                key={i}
                name={item.name}
                icon={item.icon}
                path={item.path}
                active={item.path === router.pathname}
              />
            ))}

            <div className="w-full px-3 py-[9px] box-border mb-[10px] text-menu flex items-center">
              <Image alt="mode" src={DarkSvg} className="mr-4" />
              <h5 className="font-medium text-[15px] leading-[20px] capitalize">
                Dark mode
              </h5>

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

          <div className="w-full h-[1px] bg-black dark:bg-white opacity-[.13] my-7" />

          <h4 className="font-medium text-[15px] leading-[20px] text-[#263238] dark:text-white uppercase mb-4 px-3 opacity-[.35]">
            Support
          </h4>

          <div>
            {support.map((item, i) => (
              <div
                key={i}
                className={`w-full px-3 py-[9px] box-border mb-[10px] text-menu dark:text-[#999999] flex items-center cursor-pointer 
              hover:bg-[#00adb50f] ${
                item.active ? "bg-[#00adb50f]" : ""
              } border-l-2 ${
                  item.active ? "border-[#00ADB5]" : "border-white"
                } dark:hover:border-[#00ADB5] dark:border-dark hover:border-[#00ADB5]
              dark:hover:bg-[#00adb533] hover:text-[#00ADB5] ${
                item.active ? "!text-[#00ADB5]" : ""
              }`}
                onClick={() => handleSupport(item.path)}
              >
                <Image alt={item.name} src={item.icon} className="mr-4" />
                <h5 className="font-medium text-[15px] leading-[20px] capitalize">
                  {item.name}
                </h5>
              </div>
            ))}
          </div>
        </div>
      </nav>
      <div className="px-[20px] mt-auto">
        <div className="w-full rounded-[12px] bg-[#F9F9FC] dark:bg-[#f9f9fc10] p-[18px] box-border mb-[12px]">
          <div className="mt-[-36px]">
            <Image alt="" src={KeyImg} className="w-[52px] h-[52px]" />
          </div>
          <h3 className="text-[#263238] dark:text-white font-Satoshi font-medium text-[17px] leading-[23px] mb-[18px] mt-[10px]">
            Upgrade your plan
          </h3>
          <Button
            variant="contained"
            onClick={onPlans}
            className="!w-full text-[14px]"
          >
            Upgrade now
          </Button>
        </div>

        <div
          className="w-full px-3 py-[9px] box-border mb-[10px] text-[#FF4646] flex items-center cursor-pointer"
          onClick={() => {
            API.signOut();
            localStorage.removeItem("token");
            router.push("/auth/login");
          }}
        >
          <Image alt="mode" src={LogoutSvg} className="mr-4" />
          <h5 className="font-medium text-[15px] leading-[20px] capitalize">
            Log out
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Menus;
