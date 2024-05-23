import React, { useState, Fragment, useEffect } from "react";
import Image from "next/image";
import classNames from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTheme } from "next-themes";

import { useAppSelector, useAppDispatch } from 'redux/hooks'
import { getProfile } from "redux/reducers/users"

import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";

import { Search, Drawer } from "components";
import Menus from "./Menus";

import AvatarImg from "assets/img/layouts/avatar.png";
import Logo from "assets/img/logo-black.svg";
import LogoWhite from "assets/img/logo-light.png";
import { API } from "api";

type Props = {
  onOpen(): void;
  onContact?: () => void;
  onPlans?: () => void;
};

const links = [
  { href: "/account-settings", label: "Account settings" },
  { href: "/support", label: "Support" },
  { href: "/license", label: "License" },
  { href: "/sign-out", label: "Sign out" },
];

const Header = ({ onOpen, onContact, onPlans }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isUpdated } = useAppSelector(state => state.users);

  const mode = localStorage.getItem(('theme')) || 'light';
  const { theme, setTheme } = useTheme();
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleToggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleContact = () => {
    handleToggleMenu();
    onContact && onContact()
  }

  const handlePlans = () => {
    handleToggleMenu();
    onPlans && onPlans();
  }

  useEffect(() => {
    if(mode) {
      setTheme(mode);
    }
  }, [mode])

  useEffect(() => {
    if(!user) {
      dispatch(getProfile());
    }
  }, [])

  return (
    <nav
      className={classNames({
        "bg-white dark:bg-[#1A1A1A] fixed right-0 left-0 lg:left-[234px] xl:left-[270px] text-zinc-500 dark:border-b-[1px] dark:border-[#0000001a]":
          true, // colors
        "flex items-center box-border": true, // layout
        "z-10 px-4 shadow-sm h-[66px] sm:h-[80px]": true, //positioning & styling
      })}
    >
      <button className="lg:hidden sm:mr-2" onClick={handleToggleMenu}>
        <Bars3Icon className="w-6 h-6 dark:text-white" />
      </button>

      <Link href="/" className="lg:hidden w-[70px] ml-2 inline-flex">
        <Image alt="" src={theme === 'dark' ? LogoWhite : Logo} />
      </Link>

      <div className="hidden lg:inline-block">
        <h3 className="text-black dark:text-white font-bold text-2xl leading-[32px] capitalize font-Satoshi">
          dashboard
        </h3>
        <p className="text-menu dark:text-[#999999] font-medium text-sm leading-[19px] font-Satoshi">
          Good Morning, {user && user.name || ""}
        </p>
      </div>

      <div className="flex-grow"></div>
      <div className="inline-flex items-center">
        <Search value={search} onChange={handleChangeSearch} />

        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="flex text-sm text-left bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <Image
                alt=""
                width={38}
                height={38}
                src={user && user.userprofile && user.userprofile.profile_photo ? user.userprofile.profile_photo : "https://placehold.co/40x40"}
                className="w-[38px] h-[38px] mr-[9px] rounded-full overflow-hidden"
              />
              <div className="hidden lg:block">
                <h4 className="text-sm text-black dark:text-white font-Satoshi">{user && user.name || ""}</h4>
                <p className="text-[12px] text-black dark:text-[#999999] opacity-60 font-medium font-Satoshi">
                  {user && user.email || ""}
                </p>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 w-44 py-1 mt-2 origin-top-right bg-white dark:bg-[#454545] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/dashboard"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-black hover:text-[#222222] hover:no-underline dark:text-white dark:hover:text-[#DDDDDD]"
                    )}
                  >
                    Dashboard
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-black hover:text-[#222222] hover:no-underline dark:text-white dark:hover:text-[#DDDDDD]"
                    )}
                    onClick={() => {
                      API.signOut();
                      localStorage.removeItem("token");
                      router.push("/auth/login");
                    }}
                  >
                    Sign out
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>

        <button
          className="inline-flex items-center justify-center lg:hidden border text-black border-[#00000010] 
          rounded-full p-[7px] w-[32px] h-[32px] dark:text-[#00ADB5] dark:bg-[#ffffff10]"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
            </svg>
          )}
        </button>
      </div>

      <Drawer open={openMenu} onClose={handleToggleMenu}>
        <Menus isDrawer={true} onContact={handleContact} onPlans={handlePlans} />
      </Drawer>
    </nav>
  );
};
export default Header;
