import React, { useState, Fragment, useEffect } from "react";
import Image from "next/image";
import classNames from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTheme } from "next-themes";

import { useAppSelector, useAppDispatch } from "redux/hooks";
import { getProfile } from "redux/reducers/users";
import { Menu, Transition } from "@headlessui/react";

import { Search } from "components";

import AvatarImg from "assets/img/layouts/avatar.png";
import Logo from "assets/img/logo-black.svg";
import LogoWhite from "assets/img/logo-light.png";
import SignOutIcon from "assets/img/icons/outdoor.svg";
import { API } from "api";

const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const { user, isUpdated } = useAppSelector((state) => state.users);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    }
  }, []);

  return (
    <nav
      className={classNames({
        "bg-white dark:bg-[#1A1A1A] fixed right-0 left-0 text-zinc-500 dark:border-b-[1px] dark:border-[#0000001a]":
          true, // colors
        "flex items-center box-border": true, // layout
        "z-10 px-4 shadow-sm h-[66px] sm:h-[80px]": true, //positioning & styling
      })}
    >
      <div className="flex items-center space-x-8">
        <Link href="/" className="w-[70px] ml-2 inline-flex">
          <Image alt="" src={theme === "dark" ? LogoWhite : Logo} />
        </Link>

        <div className="hidden lg:inline-block h-8 my-auto w-0.5 self-stretch bg-gray opacity-50" />
        <div className="hidden lg:inline-block">
          <h3 className="text-black dark:text-white text-xl leading-[32px] capitalize font-Satoshi">
            Admin Dashboard
          </h3>
          <p className="text-menu dark:text-[#999999] font-medium text-sm leading-[19px] font-Satoshi">
            Good Morning, {(user && user.name) || ""}
          </p>
        </div>
      </div>
      <div className="flex-grow"></div>
      <button
        className="lg:inline-flex lg:items-center lg:justify-center hidden border text-black border-[#00000010] 
          rounded-full p-[7px] w-[32px] h-[32px] dark:bg-white/10"
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
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 14.25C9.68944 14.25 10.3721 14.1142 11.0091 13.8504C11.646 13.5865 12.2248 13.1998 12.7123 12.7123C13.1998 12.2248 13.5865 11.646 13.8504 11.0091C14.1142 10.3721 14.25 9.68944 14.25 9C14.25 8.31056 14.1142 7.62787 13.8504 6.99091C13.5865 6.35395 13.1998 5.7752 12.7123 5.28769C12.2248 4.80018 11.646 4.41347 11.0091 4.14963C10.3721 3.8858 9.68944 3.75 9 3.75C7.60761 3.75 6.27226 4.30312 5.28769 5.28769C4.30312 6.27226 3.75 7.60761 3.75 9C3.75 10.3924 4.30312 11.7277 5.28769 12.7123C6.27226 13.6969 7.60761 14.25 9 14.25ZM9 17.22C8.5875 17.22 8.25 16.9125 8.25 16.5V16.44C8.25 16.0275 8.5875 15.69 9 15.69C9.4125 15.69 9.75 16.0275 9.75 16.44C9.75 16.8525 9.4125 17.22 9 17.22ZM14.355 15.105C14.16 15.105 13.9725 15.03 13.8225 14.8875L13.725 14.79C13.6556 14.7206 13.6005 14.6381 13.5629 14.5474C13.5253 14.4567 13.506 14.3594 13.506 14.2612C13.506 14.1631 13.5253 14.0658 13.5629 13.9751C13.6005 13.8844 13.6556 13.8019 13.725 13.7325C13.7944 13.6631 13.8769 13.608 13.9676 13.5704C14.0583 13.5328 14.1556 13.5135 14.2537 13.5135C14.3519 13.5135 14.4492 13.5328 14.5399 13.5704C14.6306 13.608 14.7131 13.6631 14.7825 13.7325L14.88 13.83C14.9842 13.9343 15.0552 14.0671 15.0841 14.2116C15.113 14.3562 15.0985 14.5061 15.0423 14.6424C14.9862 14.7788 14.891 14.8954 14.7687 14.9777C14.6464 15.06 14.5024 15.1043 14.355 15.105ZM3.645 15.105C3.45 15.105 3.2625 15.03 3.1125 14.8875C3.04297 14.8181 2.98781 14.7357 2.95018 14.645C2.91254 14.5542 2.89317 14.457 2.89317 14.3588C2.89317 14.2605 2.91254 14.1633 2.95018 14.0725C2.98781 13.9818 3.04297 13.8994 3.1125 13.83L3.21 13.7325C3.27944 13.6631 3.36187 13.608 3.45259 13.5704C3.54332 13.5328 3.64055 13.5135 3.73875 13.5135C3.83695 13.5135 3.93418 13.5328 4.02491 13.5704C4.11563 13.608 4.19806 13.6631 4.2675 13.7325C4.33694 13.8019 4.39202 13.8844 4.4296 13.9751C4.46717 14.0658 4.48652 14.1631 4.48652 14.2612C4.48652 14.3594 4.46717 14.4567 4.4296 14.5474C4.39202 14.6381 4.33694 14.7206 4.2675 14.79L4.17 14.8875C4.0275 15.03 3.8325 15.105 3.645 15.105ZM16.5 9.75H16.44C16.0275 9.75 15.69 9.4125 15.69 9C15.69 8.5875 16.0275 8.25 16.44 8.25C16.8525 8.25 17.22 8.5875 17.22 9C17.22 9.4125 16.9125 9.75 16.5 9.75ZM1.56 9.75H1.5C1.0875 9.75 0.75 9.4125 0.75 9C0.75 8.5875 1.0875 8.25 1.5 8.25C1.9125 8.25 2.28 8.5875 2.28 9C2.28 9.4125 1.9725 9.75 1.56 9.75ZM14.2575 4.4925C14.0625 4.4925 13.875 4.4175 13.725 4.275C13.6555 4.20561 13.6003 4.1232 13.5627 4.03247C13.525 3.94174 13.5057 3.84448 13.5057 3.74625C13.5057 3.64802 13.525 3.55076 13.5627 3.46003C13.6003 3.3693 13.6555 3.28689 13.725 3.2175L13.8225 3.12C13.8919 3.05056 13.9744 2.99548 14.0651 2.9579C14.1558 2.92033 14.2531 2.90098 14.3512 2.90098C14.4494 2.90098 14.5467 2.92033 14.6374 2.9579C14.7281 2.99548 14.8106 3.05056 14.88 3.12C14.9494 3.18944 15.0045 3.27187 15.0421 3.36259C15.0797 3.45332 15.099 3.55055 15.099 3.64875C15.099 3.74695 15.0797 3.84418 15.0421 3.93491C15.0045 4.02563 14.9494 4.10806 14.88 4.1775L14.7825 4.275C14.64 4.4175 14.4525 4.4925 14.2575 4.4925ZM3.7425 4.4925C3.5475 4.4925 3.36 4.4175 3.21 4.275L3.1125 4.17C3.04306 4.10056 2.98798 4.01813 2.9504 3.92741C2.91283 3.83668 2.89348 3.73945 2.89348 3.64125C2.89348 3.54305 2.91283 3.44582 2.9504 3.35509C2.98798 3.26437 3.04306 3.18194 3.1125 3.1125C3.18194 3.04306 3.26437 2.98798 3.35509 2.9504C3.44582 2.91283 3.54305 2.89348 3.64125 2.89348C3.73945 2.89348 3.83668 2.91283 3.92741 2.9504C4.01813 2.98798 4.10056 3.04306 4.17 3.1125L4.2675 3.21C4.56 3.5025 4.56 3.975 4.2675 4.2675C4.125 4.4175 3.93 4.4925 3.7425 4.4925ZM9 2.28C8.5875 2.28 8.25 1.9725 8.25 1.56V1.5C8.25 1.0875 8.5875 0.75 9 0.75C9.4125 0.75 9.75 1.0875 9.75 1.5C9.75 1.9125 9.4125 2.28 9 2.28Z"
              fill="#00ADB5"
            />
          </svg>
        )}
      </button>
      <div className="flex-grow"></div>
      <div className="inline-flex items-center">
        <Search value={search} onChange={handleChangeSearch} />

        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="flex text-sm text-left rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <Image
                alt=""
                src={AvatarImg}
                className="w-[38px] h-[38px] mr-[9px]"
              />
              <div className="hidden lg:block">
                <h4 className="text-sm text-black dark:text-white font-Satoshi">
                  {(user && user.name) || ""}
                </h4>
                <p className="text-[12px] text-black dark:text-[#999999] opacity-60 font-medium font-Satoshi">
                  {(user && user.email) || ""}
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
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-black hover:text-[#222222] hover:no-underline dark:text-white dark:hover:text-[#DDDDDD]"
                    )}
                    onClick={() => {
                      router.push("/dashboard/settings");
                    }}
                  >
                    Settings
                  </a>
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
          rounded-full p-[7px] w-[32px] h-[32px] dark:bg-white/10"
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
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 14.25C9.68944 14.25 10.3721 14.1142 11.0091 13.8504C11.646 13.5865 12.2248 13.1998 12.7123 12.7123C13.1998 12.2248 13.5865 11.646 13.8504 11.0091C14.1142 10.3721 14.25 9.68944 14.25 9C14.25 8.31056 14.1142 7.62787 13.8504 6.99091C13.5865 6.35395 13.1998 5.7752 12.7123 5.28769C12.2248 4.80018 11.646 4.41347 11.0091 4.14963C10.3721 3.8858 9.68944 3.75 9 3.75C7.60761 3.75 6.27226 4.30312 5.28769 5.28769C4.30312 6.27226 3.75 7.60761 3.75 9C3.75 10.3924 4.30312 11.7277 5.28769 12.7123C6.27226 13.6969 7.60761 14.25 9 14.25ZM9 17.22C8.5875 17.22 8.25 16.9125 8.25 16.5V16.44C8.25 16.0275 8.5875 15.69 9 15.69C9.4125 15.69 9.75 16.0275 9.75 16.44C9.75 16.8525 9.4125 17.22 9 17.22ZM14.355 15.105C14.16 15.105 13.9725 15.03 13.8225 14.8875L13.725 14.79C13.6556 14.7206 13.6005 14.6381 13.5629 14.5474C13.5253 14.4567 13.506 14.3594 13.506 14.2612C13.506 14.1631 13.5253 14.0658 13.5629 13.9751C13.6005 13.8844 13.6556 13.8019 13.725 13.7325C13.7944 13.6631 13.8769 13.608 13.9676 13.5704C14.0583 13.5328 14.1556 13.5135 14.2537 13.5135C14.3519 13.5135 14.4492 13.5328 14.5399 13.5704C14.6306 13.608 14.7131 13.6631 14.7825 13.7325L14.88 13.83C14.9842 13.9343 15.0552 14.0671 15.0841 14.2116C15.113 14.3562 15.0985 14.5061 15.0423 14.6424C14.9862 14.7788 14.891 14.8954 14.7687 14.9777C14.6464 15.06 14.5024 15.1043 14.355 15.105ZM3.645 15.105C3.45 15.105 3.2625 15.03 3.1125 14.8875C3.04297 14.8181 2.98781 14.7357 2.95018 14.645C2.91254 14.5542 2.89317 14.457 2.89317 14.3588C2.89317 14.2605 2.91254 14.1633 2.95018 14.0725C2.98781 13.9818 3.04297 13.8994 3.1125 13.83L3.21 13.7325C3.27944 13.6631 3.36187 13.608 3.45259 13.5704C3.54332 13.5328 3.64055 13.5135 3.73875 13.5135C3.83695 13.5135 3.93418 13.5328 4.02491 13.5704C4.11563 13.608 4.19806 13.6631 4.2675 13.7325C4.33694 13.8019 4.39202 13.8844 4.4296 13.9751C4.46717 14.0658 4.48652 14.1631 4.48652 14.2612C4.48652 14.3594 4.46717 14.4567 4.4296 14.5474C4.39202 14.6381 4.33694 14.7206 4.2675 14.79L4.17 14.8875C4.0275 15.03 3.8325 15.105 3.645 15.105ZM16.5 9.75H16.44C16.0275 9.75 15.69 9.4125 15.69 9C15.69 8.5875 16.0275 8.25 16.44 8.25C16.8525 8.25 17.22 8.5875 17.22 9C17.22 9.4125 16.9125 9.75 16.5 9.75ZM1.56 9.75H1.5C1.0875 9.75 0.75 9.4125 0.75 9C0.75 8.5875 1.0875 8.25 1.5 8.25C1.9125 8.25 2.28 8.5875 2.28 9C2.28 9.4125 1.9725 9.75 1.56 9.75ZM14.2575 4.4925C14.0625 4.4925 13.875 4.4175 13.725 4.275C13.6555 4.20561 13.6003 4.1232 13.5627 4.03247C13.525 3.94174 13.5057 3.84448 13.5057 3.74625C13.5057 3.64802 13.525 3.55076 13.5627 3.46003C13.6003 3.3693 13.6555 3.28689 13.725 3.2175L13.8225 3.12C13.8919 3.05056 13.9744 2.99548 14.0651 2.9579C14.1558 2.92033 14.2531 2.90098 14.3512 2.90098C14.4494 2.90098 14.5467 2.92033 14.6374 2.9579C14.7281 2.99548 14.8106 3.05056 14.88 3.12C14.9494 3.18944 15.0045 3.27187 15.0421 3.36259C15.0797 3.45332 15.099 3.55055 15.099 3.64875C15.099 3.74695 15.0797 3.84418 15.0421 3.93491C15.0045 4.02563 14.9494 4.10806 14.88 4.1775L14.7825 4.275C14.64 4.4175 14.4525 4.4925 14.2575 4.4925ZM3.7425 4.4925C3.5475 4.4925 3.36 4.4175 3.21 4.275L3.1125 4.17C3.04306 4.10056 2.98798 4.01813 2.9504 3.92741C2.91283 3.83668 2.89348 3.73945 2.89348 3.64125C2.89348 3.54305 2.91283 3.44582 2.9504 3.35509C2.98798 3.26437 3.04306 3.18194 3.1125 3.1125C3.18194 3.04306 3.26437 2.98798 3.35509 2.9504C3.44582 2.91283 3.54305 2.89348 3.64125 2.89348C3.73945 2.89348 3.83668 2.91283 3.92741 2.9504C4.01813 2.98798 4.10056 3.04306 4.17 3.1125L4.2675 3.21C4.56 3.5025 4.56 3.975 4.2675 4.2675C4.125 4.4175 3.93 4.4925 3.7425 4.4925ZM9 2.28C8.5875 2.28 8.25 1.9725 8.25 1.56V1.5C8.25 1.0875 8.5875 0.75 9 0.75C9.4125 0.75 9.75 1.0875 9.75 1.5C9.75 1.9125 9.4125 2.28 9 2.28Z"
                fill="#00ADB5"
              />
            </svg>
          )}
        </button>
        <Image
          alt=""
          src={SignOutIcon}
          className="hidden lg:block lg:ml-4 cursor-pointer"
          onClick={() => {
            API.signOut();
            localStorage.removeItem("token");
            router.push("/auth/login");
          }}
        />
      </div>
    </nav>
  );
};
export default Header;
