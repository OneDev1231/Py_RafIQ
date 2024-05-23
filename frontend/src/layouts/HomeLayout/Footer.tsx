import Image from "next/image";
import React from "react";
import rafigLogo from "assets/img/logo-white.svg";
import facebook from "assets/img/icons/facebook.svg";
import twitter from "assets/img/icons/twitter.svg";
import linkedin from "assets/img/icons/linkedin.svg";
import mail from "assets/img/icons/mail.svg";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative z-50 bg-black text-white text-sm font-Inter">
      <div className="hidden lg:flex justify-between px-2 py-6 xl:px-16">
        <div className="flex items-center divide-x divide-white/60">
          <Image
            alt="Rafiq"
            src={rafigLogo.src}
            className="px-4"
            width={100}
            height={31}
          />
          <span className="px-4 py-1 text-xs">Copyright ©2023 RAFIQ.Ai</span>
        </div>
        <div className="flex items-center xl:space-x-10">
          <div className="flex items-center divide-x divide-white/60">
            <Link href={"/"} className="px-4 xl:px-6 transition duration-300 text-white hover:text-[#DDDDDD] hover:no-underline">
              Privacy Policy
            </Link>
            <Link href={"/"} className="px-4 xl:px-6 transition duration-300 text-white hover:text-[#DDDDDD] hover:no-underline">
              Terms & Conditions
            </Link>
            <Link href={"/"} className="px-4 xl:px-6 transition duration-300 text-white hover:text-[#DDDDDD] hover:no-underline">
              Affiliate
            </Link>
            <Link href={"/"} className="px-4 xl:px-6 transition duration-300 text-white hover:text-[#DDDDDD] hover:no-underline">
              Contact Us
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button className="rounded-full bg-white/20 p-[0.9rem] hover:bg-gray">
              <Image alt="Facebook" src={facebook.src} width={18} height={18} />
            </button>
            <button className="rounded-full bg-white/20 p-4 hover:bg-gray">
              <Image alt="Twitter" src={twitter.src} width={16} height={25} />
            </button>
            <button className="rounded-full bg-white/20 p-4 hover:bg-gray">
              <Image alt="Linkedin" src={linkedin.src} width={17} height={17} />
            </button>
            <button className="rounded-full bg-white/20 p-4 hover:bg-gray">
              <Image alt="Mail" src={mail.src} width={17} height={17} />
            </button>
          </div>
        </div>
      </div>
      <div className="lg:hidden px-1 py-10">
        <div className="flex justify-center divide-x divide-white/60 text-[0.7rem]">
          <Link href={"/"} className="px-3 transition duration-300 text-white hover:text-[#DDDDDD] hover:no-underline">
            Privacy Policy
          </Link>
          <Link href={"/"} className="px-3 transition duration-300 text-white hover:text-[#DDDDDD] hover:no-underline">
            Terms & Conditions
          </Link>
          <Link href={"/"} className="px-3 transition duration-300 text-white hover:text-[#DDDDDD] hover:no-underline">
            Affiliate
          </Link>
          <Link href={"/"} className="px-3 transition duration-300 text-white hover:text-[#DDDDDD] hover:no-underline">
            Contact Us
          </Link>
        </div>
        <div className="flex justify-center mt-12 mb-1">
          <Image
            alt="Rafiq"
            src={rafigLogo.src}
            className="px-4"
            width={110}
            height={35}
          />
        </div>
        <div className="px-5 opacity-50">
          <hr />
        </div>
        <div className="flex justify-between items-center px-5 mt-5">
          <span className="text-xs">Copyright ©2023 RAFIQ.Ai</span>
          <div className="flex space-x-3">
            <button className="rounded-full bg-white/20 p-2 hover:bg-gray">
              <Image alt="Facebook" src={facebook.src} width={12} height={12} />
            </button>
            <button className="rounded-full bg-white/20 p-2 hover:bg-gray">
              <Image alt="Twitter" src={twitter.src} width={12} height={12} />
            </button>
            <button className="rounded-full bg-white/20 p-2 hover:bg-gray">
              <Image alt="Linkedin" src={linkedin.src} width={13} height={13} />
            </button>
            <button className="rounded-full bg-white/20 p-2 hover:bg-gray">
              <Image alt="Mail" src={mail.src} width={13} height={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
