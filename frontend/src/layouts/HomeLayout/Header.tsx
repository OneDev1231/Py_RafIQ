import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import rafigLogo from "assets/img/logo-white.svg";
import LogoBlack from "assets/img/logo-black.svg";
import menuIcon from "assets/img/icons/hambergermenu.svg";
import menuBlackIcon from "assets/img/icons/hambergermenu-black.svg";
import moonIcon from "assets/img/icons/moon.svg";
import sunIcon from "assets/img/icons/sun.svg";

import { scrollToTop } from "utils";

const Header = () => {
  const [isMenuShow, setIsMenuShow] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <>
      <nav className="sticky top-0 z-[100] bg-[#F2F0F0] dark:bg-black shadow-md w-[100vw] lg:w-[99.1vw] flex justify-center border border-b border-black border-opacity-10 lg:border-0 font-Satoshi dark:text-white text-xs lg:text-base">
        <div className="flex justify-between items-center h-[10vh] w-[90vw] lg:w-[76vw]">
          <div className="flex space-x-3 items-center">
            <button
              className="lg:hidden mb-1"
              onClick={() => setIsMenuShow(!isMenuShow)}
            >
              <Image
                alt="Menu"
                src={theme === "dark" ? menuIcon : menuBlackIcon}
                width={screen.width >= 1024 ? 35 : 25}
                height={screen.width >= 1024 ? 35 : 25}
              />
            </button>
            <Image
              alt="Rafiq"
              src={theme === "dark" ? rafigLogo : LogoBlack}
              width={screen.width >= 1024 ? 88 : 65}
              height={screen.width >= 1024 ? 31 : 25}
            />
          </div>
          <div className="flex space-x-16">
            <div className="hidden lg:flex items-center space-x-16">
              <Link
                href={"/"}
                onClick={() =>
                  scrollToTop(document.getElementById("scroll1")?.offsetTop)
                }
                className="transition duration-300 text-black hover:text-[#666666] dark:text-white dark:hover:text-[#DDDDDD] hover:no-underline"
              >
                About
              </Link>
              <Link
                href={"/"}
                onClick={() =>
                  scrollToTop(document.getElementById("scroll2")?.offsetTop)
                }
                className="transition duration-300 text-black hover:text-[#666666] dark:text-white dark:hover:text-[#DDDDDD] hover:no-underline"
              >
                Features
              </Link>
              <Link
                href={"/"}
                onClick={() =>
                  scrollToTop(document.getElementById("scroll3")?.offsetTop)
                }
                className="transition duration-300 text-black hover:text-[#666666] dark:text-white dark:hover:text-[#DDDDDD] hover:no-underline"
              >
                Pricing
              </Link>
              <Link
                href={"/"}
                className="transition duration-300 text-black hover:text-[#666666] dark:text-white dark:hover:text-[#DDDDDD] hover:no-underline"
              >
                Affiliate
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-5">
            <Link
              href={"/auth/login"}
              className="transition duration-300 text-black hover:text-[#666666] dark:text-white dark:hover:text-[#DDDDDD] hover:no-underline"
            >
              Login
            </Link>
            <button
              className="rounded-xl text-black dark:text-white bg-[#00ADB5] py-3 px-5 hover:bg-[#009CA4]"
              onClick={() => router.push("/auth/signup")}
            >
              Try It For Free
            </button>
            <button
              className="rounded-full bg-black hover:bg-[#444444] dark:bg-white p-3 dark:hover:bg-gray"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Image
                alt="Dark"
                src={theme === "dark" ? sunIcon : moonIcon}
                width={18}
                height={18}
              />
            </button>
          </div>
          <div className="flex lg:hidden items-center space-x-3">
            <Link
              href={"/auth/login"}
              className="transition duration-300 text-black hover:text-[#666666] dark:text-white dark:hover:text-[#DDDDDD]"
            >
              Login
            </Link>
            <button
              onClick={() => router.push("/auth/signup")}
              className="rounded-lg lg:rounded-xl text-white bg-black dark:bg-[#00ADB5] lg:text-black dark:text-white lg:bg-[#00ADB5] py-2 lg:py-3 px-5 lg:hover:bg-[#009CA4]"
            >
              Try It For Free
            </button>
            <button
              className="rounded-full bg-black hover:bg-[#444444] dark:bg-white p-2 dark:hover:bg-gray"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Image
                alt="Dark"
                src={theme === "dark" ? sunIcon : moonIcon}
                width={14}
                height={14}
              />
            </button>
          </div>
        </div>
      </nav>
      {isMenuShow && (
        <div className="fixed inset-0 bg-gray text-white z-30">
          <div className="flex flex-col space-y-6 px-6">
            <div className="flex space-x-3 items-center py-6">
              <button
                className="lg:hidden mb-1"
                onClick={() => setIsMenuShow(!isMenuShow)}
              >
                <Image alt="Menu" src={menuIcon.src} width={35} height={35} />
              </button>
              <Image alt="Rafiq" src={rafigLogo.src} width={88} height={31} />
            </div>
            <Link
              href={"/"}
              className="font-medium transition duration-300 !-mt-2 px-4 text-white hover:text-[#DDDDDD] hover:no-underline"
              onClick={() => {
                setIsMenuShow(!isMenuShow);
                scrollToTop(document.getElementById("scroll1")?.offsetTop);
              }}
            >
              About
            </Link>
            <Link
              href={"/"}
              className="font-medium transition duration-300 px-4 text-white hover:text-[#DDDDDD] hover:no-underline"
              onClick={() => {
                setIsMenuShow(!isMenuShow);
                scrollToTop(document.getElementById("scroll2")?.offsetTop);
              }}
            >
              Features
            </Link>
            <Link
              href={"/"}
              className="font-medium transition duration-300 px-4 text-white hover:text-[#DDDDDD] hover:no-underline"
              onClick={() => {
                setIsMenuShow(!isMenuShow);
                scrollToTop(document.getElementById("scroll3")?.offsetTop);
              }}
            >
              Pricing
            </Link>
            <Link
              href={"/"}
              className="font-medium transition duration-300 px-4 text-white hover:text-[#DDDDDD] hover:no-underline"
            >
              Affiliate
            </Link>
            <hr />
            <Link
              href={"/auth/login"}
              className="font-medium transition duration-300 px-4 text-white hover:text-[#DDDDDD] hover:no-underline"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
