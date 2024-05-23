import React, { useRef, useState, useEffect } from "react";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { useOnClickOutside } from "usehooks-ts";
import { Button } from "components";
import { Switch } from "@headlessui/react";
import ContactUs from "components/UserDashboard/ContactUs";
import Plan from "components/Settings/Plan";
import MenuItem from "./MenuItem";
import Menus from "./Menus";
import { menus, support } from "./data";

import Logo from "assets/img/logo-black.svg";
import LogoWhite from "assets/img/logo-light.png";

import ChatbotsSvg from "assets/img/layouts/menu-chatbots.svg";
import SavedSvg from "assets/img/layouts/menu-saved.svg";
import WalletSvg from "assets/img/layouts/menu-wallet.svg";
import BillingSvg from "assets/img/layouts/menu-dollarcircle.svg";
import SettingSvg from "assets/img/layouts/menu-setting.svg";
import UsersSvg from "assets/img/layouts/menu-users.svg";
import ContactSvg from "assets/img/layouts/menu-contact.svg";
import DarkSvg from "assets/img/layouts/dark.svg";
import LogoutSvg from "assets/img/layouts/logout.svg";
import KeyImg from "assets/img/layouts/key.png";

type Props = {
  open: Boolean;
  onOpen: (value: boolean) => void;
  onContact?: () => void;
  onPlans?: () => void;
};

const Sidebar = ({ open, onOpen, onContact, onPlans }: Props) => {
  const ref = useRef<HTMLDivElement | any>(null);
  const router = useRouter();
  const mode = localStorage.getItem(('theme')) || 'light';
  const { theme, setTheme } = useTheme();
  const [enabled, setEnabled] = useState<boolean>(
    mode === "dark" ? true : false
  );
  const [openContact, setOpenContact] = useState<boolean>(false);
  const [openPlans, setOpenPlans] = useState<boolean>(false);

  useEffect(() => {
    if(mode) {
      setTheme(mode);
      setEnabled(mode === "dark" ? true : false)
    }
  }, [mode])

  useOnClickOutside(ref, (e) => {
    onOpen(false);
  });

  const handleChangeTheme = () => {
    setEnabled(!enabled);
    setTheme(!enabled ? "dark" : "light");
  };

  const handleToggleContact = () => {
    setOpenContact(!openContact);
  };

  const handleTogglePlans = () => {
    setOpenPlans(!openPlans);
  };

  const handleSupport = (path: string) => {
    if(path === '/contact') {
      handleToggleContact();
    }
  }

  return (
    <div
      ref={ref}
      className={classNames({
        "flex flex-col justify-start border-r border-sidebar": true, // layout
        "bg-white dark:bg-[#1A1A1A] text-zinc-50": true, // colors
        "lg:sticky lg:z-0 top-0 z-20 fixed": true, // positioning
        "lg:h-screen h-screen w-[234px] xl:w-[270px]": true, // for height and width
        "transition-transform .3s ease-in-out lg:translate-x-0": true, //animations
        // "min-h-screen border-r border-sidebar px-[32px] py-[26px] box-border":
        //   true,
        "-translate-x-full ": !open, //hide sidebar to the left when closed
      })}
    >
      <Menus onContact={onContact} onPlans={onPlans} />
    </div>
  );
};

export default Sidebar;
