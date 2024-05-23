import UploadDocument from "../UploadDocument";

type Props = {
  onUpload?: (files: any) => void;
}

export default function Files({ onUpload }: Props) {
  const file = [
    {
      id: 1,
      text: "Chat with any type of files (pdf, DOC, DOCx, CSV, TXT)",
    },
    {
      id: 2,
      text: "Make sure that the text is OCR’d. i.e. you can copy it.",
    },
    {
      id: 3,
      text: "Not handwritten or scanned.",
    },
    {
      id: 4,
      text: "Not password protected.",
    },
    {
      id: 5,
      text: "Maximum size: 1 TB.",
    },
  ];

  return (
    <div>
      <div className="my-[20px]">
        {file.map((e) => {
          return (
            <div
              key={e.id}
              className="flex flex-row items-center w-full mb-[10px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mr-[5px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
              <p className="dark:text-[#FFFFFF] font-Satoshi not-italic font-[500] text-[14px] leading-[17px] max-md:text-[15px] max-md:leading-[20px] max-xl:text-[16px] max-xl:leading-[19px] text-[#263238]">
                {e.text}
              </p>
            </div>
          );
        })}
      </div>
      <UploadDocument onUpload={onUpload} />
    </div>
  );
}
