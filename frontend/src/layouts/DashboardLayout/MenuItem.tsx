import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

type MenuProps = {
  name: string;
  active: boolean;
  path: string;
  icon: any;
};

const MenuItem = ({ name, icon, path, active }: MenuProps) => {
  const router = useRouter();

  return (
    <div
      className={`w-full px-3 py-[9px] box-border mb-[10px] text-menu dark:text-[#999999] flex items-center cursor-pointer 
      hover:bg-[#00adb50f] ${active ? 'bg-[#00adb50f]' : ''} border-l-2 ${
        active ? "border-[#00ADB5]" : "border-white"
      } dark:hover:border-[#00ADB5] dark:border-dark hover:border-[#00ADB5]
      dark:hover:bg-[#00adb533] hover:text-[#00ADB5] ${active ? '!text-[#00ADB5]' : ''}`}
      onClick={() => router.push(path)}
    >
      <Image alt={name} src={icon} className="mr-4" />
      <h5 className="font-medium text-[15px] leading-[20px] capitalize">
        {name}
      </h5>
    </div>
  );
};

export default MenuItem;