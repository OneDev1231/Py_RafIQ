import React, { useState } from "react";
import Image from "next/image";
import documentIcon from "assets/img/settings/documenttext.png";
import trash from "assets/img/settings/trash.png";
import TickImg from "../tickImg";

type Props = {
  onUpload?: (files: any) => void;
};

export default function UploadDocument({ onUpload }: Props) {
  const [docs, setDocs] = useState<any>([]);

  const handleUploadFiles = (files: any) => {
    setDocs(files);
    onUpload && onUpload(files);
  };

  const handleRemoveFile = (index: number) => {
    let results: any = [];

    docs.forEach((file: any, i: number) => {
      if (i !== index) {
        results.push(file);
      }
    });
    setDocs(results);
  };

  return (
    <div>
      <div className="mt-[30px]">
        <label className="dark:text-[#fff] opacity-40 font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[14.6957px] max-xl:leading-[20px] text-[#263238] ">
          Upload Document
        </label>
        <div className="mt-[10px] mb-[30px]">
          <TickImg
            onUpdate={handleUploadFiles}
            types={["pdf", "doc", "docx", "msword", "csv", "txt", "plain"]}
          />
        </div>
      </div>
      <div>
        {docs &&
          docs.length > 0 &&
          docs.map((item: any, i: number) => (
            <div
              key={i}
              className="mt-[10px] flex flex-row items-center w-full border-b-[1px] border-solid pb-[8px] border-[#DDDDDD] dark:border-[#DDDDDD66]"
            >
              <Image src={documentIcon} alt="" className="w-[20px] h-auto" />
              <p className="dark:text-[#fff] mr-auto ml-[14px] font-Satoshi not-italic font-[500] text-[12px] leading-[15px] max-md:text-[12px] max-md:leading-[15px] max-xl:text-[16px] max-xl:leading-[19px] text-[#263238]">
                {item.name}
              </p>
              <button onClick={() => handleRemoveFile(i)}>
                <Image src={trash} alt="" className="w-[20px] h-auto" />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
