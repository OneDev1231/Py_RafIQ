import Image from "next/image";
import React from "react";
import { useTheme } from "next-themes";
import rafigLogo from "assets/img/logo-black.svg";
import LogoWhite from "assets/img/logo-light.png";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-[#F8F8F8] dark:bg-black">
      <nav className="flex justify-center items-center h-20 bg-white dark:bg-dark border-b border-black border-opacity-10">
        <Image
          alt="Rafiq"
          src={theme === "dark" ? LogoWhite : rafigLogo}
          width={88}
          height={31}
        />
      </nav>
      <div
        style={{ minHeight: "calc(100vh - 160px)" }}
        className="p-[30px] flex flex-col items-center justify-center dark:text-white"
      >
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
