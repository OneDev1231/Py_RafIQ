import React, { Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { Menu, Transition, Popover } from "@headlessui/react";

import icon from "assets/img/saved/iconMenu.png";
import img2 from "assets/img/saved/img2.png";

const solutions = [
  // { name: "Remove", href: "#" },
  { name: "Edit", href: "#" },
  { name: "share", href: "#" },
  { name: "Settings", href: "#" },
  { name: "analytics", href: "#" },
];

type Props = {
  id: number | any;
  image: string | any;
  title: string;
  description?: string;
  createdAt: string;
  documents: number;
  status: string;
  onDelete: (id: any) => void;
};

const ChatbotItem = ({
  id,
  title,
  image,
  description,
  createdAt,
  documents,
  status,
  onDelete
}: Props) => {
  const router = useRouter();

  const handleView = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <div className="p-[10px] rounded-[8px] border-[1px] border-solid border-[#0000001A] w-full dark:bg-[#ffffff10]">
      <div className="relative mb-[15px]">
        <Image src={image} alt={title} width={200} height={120} className="!w-full !h-[170px] object-cover" />
        <button
          className="absolute bottom-[15px] left-[12px] bg-[#1F8A70] px-[16px] py-[6px] rounded-[34px] 
          text-[#FFFFFF] font-[500] text-[10px] leading-[14px] capitalize hover:cursor-pointer hover:opacity-70"
        >
          {status}
        </button>
      </div>
      <div className="flex flex-row items-center w-full">
        <p className="text-[#000000] dark:text-white font-[500] font-Satoshi text-[16px] leading-[25px] capitalize mr-auto">
          {title}
        </p>

        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="flex text-sm focus:outline-none focus:ring-2 focus:ring-white 
              focus:ring-offset-2 focus:ring-offset-gray-800 border rounded-[5px] p-[1px]">
              <span className="sr-only">Open user menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>

              {/* <Image
                aria-hidden="true"
                src={icon}
                alt=""
                className="w-[18px] h-auto"
              /> */}
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
            <Menu.Items
              className="w-[105px] rounded-[3px] py-[9px] shadow-[0px 20px 43px rgba(0, 0, 0, 0.25)] absolute 
              right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white dark:bg-[#454545] py-1 shadow-lg ring-1 
              ring-black ring-opacity-5 focus:outline-none"
            >
              {solutions &&
                solutions.map((item, i) => (
                  <Menu.Item key={i}>
                    {({ active }) => (
                      <Link
                        key={i}
                        href={item.href}
                        className="block px-[18px] py-[9px] text-[12px] font-[500] leading-[16px] capitalize "
                      >
                        {item.name}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="my-[5px]">
        {description && (
          <div className="text-[#00ADB5] dark:text-[#999] font-[500] text-[13px] leading-[25px] capitalize truncate">
            {description}
          </div>
        )}
        <p className="mt-[5px] mb-[10px] text-[#000000] dark:text-[#999] font-[400] text-[12px] leading-[16px] 
          capitalize opacity-[0.6] dark:opacity-90">
          Created at: {createdAt}
        </p>
        <p className=" text-[#000000] dark:text-[#999] font-[400] text-[12px] leading-[16px] capitalize opacity-[0.6] dark:opacity-90">
          Documents: {documents}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-[10px] w-full mt-[10px]">
        <button
          className="w-full bg-[#fff] dark:bg-[#282828] text-[#FF4646] dark:text-[#FF6F6F] font-[500] text-[12px] leading-[16px] 
          capitalize border-[1px] border-solid border-[#FF464621] dark:border-[#ffffff21] rounded-[8px] px-[19px] py-[8px] 
          hover:opacity-70"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
        <button
          onClick={handleView}
          className="w-full bg-[#00ADB5] text-[#fff] font-[500] text-[12px] leading-[16px] capitalize border-[1px] 
            border-solid border-[#00ADB5] rounded-[8px] px-[19px] py-[8px] hover:opacity-70"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default ChatbotItem;
