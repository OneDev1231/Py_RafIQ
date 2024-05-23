import React from "react";
import Image from "next/image";

import { Button } from "components";

import iconDelete from "assets/img/chat/trash.png";

const allDocuments = [
  {
    id: 1,
    name: "File number #1",
    text: "Size: 182.88 MB",
  },
  {
    id: 2,
    name: "File number #2",
    text: "Size: 182.88 MB",
  },
  {
    id: 3,
    name: "File number #3",
    text: "Size: 182.88 MB",
  },
  {
    id: 10,
    name: "Apple",
    text: "www.apple.com",
  },
  {
    id: 4,
    name: "File number #4",
    text: "Size: 182.88 MB",
  },
  {
    id: 5,
    name: "File number #5",
    text: "Size: 182.88 MB",
  },
];

type Props = {
  documents: any;
}

const AllDocuments = ({ documents }: Props) => {
  return (
    <div className="w-full">
      <div className="">
        {documents.length > 0 && documents.map((item: any, e: any) => {
          return (
            <div
              key={e}
              className="grid grid-cols-3 items-center w-full font-Satoshi not-italic py-[15px] max-sm:py-[10px] border-b-[1px] border-solid border-[#0000000F]"
            >
              <div className="col-span-2 flex flex-row max-sm:flex-col">
                <div className="font-[500] text-[14px] leading-[19px] text-[#000000] dark:text-white capitalize truncate pr-[30px]">
                {item.name ? item.name : ""}
                </div>
                <div className="align-left font-[400] text-[12px] leading-[16px] text-[#000000] dark:text-white opacity-60 ml-auto max-sm:ml-0 max-sm:mt-[2px] min-w-[60px]">
                  {item.file_size ? Number(item.file_size).toFixed(2) : 0} mb
                </div>
              </div>
              <div className="w-full flex ">
                <button className="ml-auto hover:opacity-70">
                  <Image src={iconDelete} alt="" className="w-[20px] h-auto" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* <div className="w-full text-center">
        <Button
          variant="outlined"
          className="w-[160px] mr-[10px] text-sm bg-white dark:!text-white dark:bg-dark !text-[#263238] border-[#26323826] dark:border-[#ffffff26] px-[22px] py-[8px] mx-[10px]"
        >
          Cancel
        </Button>
        <Button variant="contained" className="w-[160px] mr-[10px] text-sm">
          Save
        </Button>
      </div> */}
    </div>
  );
};

export default AllDocuments;
