import Image from "next/image";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import img from "assets/img/chatbot/image.png";

type Props = {
  onUpdate?: (files: any) => void;
  multiple?: boolean;
  preview?: boolean;
  types?: any;
};
export default function TickImg({
  onUpdate,
  multiple = true,
  preview = false,
  types = ["png", "jpeg", "jpg"],
}: Props) {
  const [files, setFiles] = useState<any>(null);

  const handleChange = (files: any) => {
    setFiles(files);
    onUpdate && onUpdate(multiple ? Array.from(files) : files);
  };

  return (
    <div className="relative w-full">
      <div className="opacity-0  absolute top-[5px] w-full">
        <FileUploader
          multiple={multiple}
          handleChange={handleChange}
          name="file"
          maxSize={30}
          types={types}
        />
      </div>
      {/* <input
        type="file"
        multiple={true}
        handleChange={handleChange}
        name="file"
      /> */}
      <div className=" border-[1.5px] border-dashed border-[#00ADB5] rounded-[8px] bg-[#00adb50f] p-[19px]">
        {files && preview ? (
          <div className="w-full text-center font-Satoshi not-italic font-[400] text-[14px] leading-[17px] text-[#263238]">
            {`${multiple ? files[0] && files[0].name : files.name}`}
          </div>
        ) : (
          <NoFile />
        )}
      </div>
    </div>
  );
}

const NoFile = () => {
  return (
    <div className="flex flex-row items-center">
      <Image src={img} alt="" className="ml-auto h-[17px] w-auto" />
      <p className="ml-[12px] mr-auto font-Satoshi not-italic font-[400] text-[14px] leading-[17px] text-[#263238] dark:text-[#fff]">
        Drag & drop your file or, <span className="text-[#00ADB5]">Browse</span>
      </p>
    </div>
  );
};
