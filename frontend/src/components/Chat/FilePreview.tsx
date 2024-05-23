import React from "react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { useTheme } from "next-themes";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import icon from "assets/img/chat/Vector.png";
import iconTick from "assets/img/settings/Vector.png";
import iconTickDark from "assets/img/settings/VectorDark.png";

type IconProps = {
  id: number;
  open: number;
};

function Icon({ id, open }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

type Props = {
  isModal?: boolean;
  onClose?: () => void;
  documents: any;
};

const FilePreview = ({ isModal, onClose, documents = [] }: Props) => {
  const [open, setOpen] = useState<any>(null);
  const { theme, setTheme } = useTheme();
  // const [value, setValue] = useState<any>(null);
  const handleOpen = (value: any) => {
    // setValue(value);
    setOpen(open === value ? null : value);
  };

  const onDocumentLoadSuccess = (value: any) => {
    console.log("value pdf: ", value);
  };

  return (
    <div
      className={`w-full overflow-y-auto dark:bg-dark chatScroller ${
        isModal ? "h-full" : "h-content"
      }`}
    >
      <h1
        className="font-Satoshi h-[73px] font-[700] text-[24px] leading-[32px] text-[#000000] dark:text-[#FFFFFF] 
        capitalize w-full px-[28px] py-[19.5px] border-b-[1px] border-solid border-[#E5E5E5] dark:border-[#e5e5e526] 
        max-xl:text-[21px] max-sm:text-[24px] flex"
      >
        File Preview
        {isModal && (
          <button
            type="button"
            onClick={onClose}
            // ref={cancelButtonRef}
            className="ml-auto"
          >
            <Image
              className="w-[20px] h-auto"
              src={theme === "dark" ? iconTickDark : iconTick}
              alt=""
            />
          </button>
        )}
      </h1>
      <div className="pb-[30px] px-[28px]">
        <Fragment>
          {documents &&
            documents.length > 0 &&
            documents.map((item: any, i: number) => {
              return (
                <Accordion
                  key={i}
                  open={open === i}
                  icon={<Icon id={1} open={open} />}
                >
                  <AccordionHeader
                    onClick={() => handleOpen(i)}
                    className="border-none pt-0 py-[20px]"
                  >
                    <div className="flex flex-row items-center">
                      <p className="font-Satoshi not-italic font-[500] text-[18px] leading-[24px] text-[#000000] dark:text-[#fff] capitalize">
                        Document #{i + 1}
                      </p>
                      <div>
                        <Image
                          src={icon}
                          alt=""
                          className="w-[14px] h-auto] justify-start ml-[10px]"
                        />
                      </div>
                    </div>
                  </AccordionHeader>
                  <AccordionBody className="p-0">
                    <div className="font-Satoshi not-italic font-[500] text-[14px] leading-[19px] text-[#0000008c] dark:text-[#ffffff8c] capitalize">
                      {/* {item.document && (
                        <object
                          data={item.document}
                          type="application/pdf"
                          width="100%"
                          height="100%"
                        >
                          <p>
                            Alternative text - include a link{" "}
                            <a href={item.document}>to the PDF!</a>
                          </p>
                        </object>
                      )} */}

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris consectetur faucibus sem vel molestie. Duis
                        semper imperdiet scelerisque. Nulla et volutpat sapien.
                        Sed ut ornare nibh, at rutrum nisl. Class aptent taciti
                        sociosqu ad litora torquent per conubia nostra, per
                        inceptos himenaeos. Nullam erat odio, mollis ut nisl
                        quis, imperdiet sollicitudin metus.
                      </p>
                      <p className="my-[30px]">
                        Ut vestibulum metus eget dapibus placerat. Duis sed elit
                        eget diam scelerisque elementum.{" "}
                        <span className="text-[#EBAD00]">
                          Nulla mollis ante ut egestas finibus. Praesent a
                          eleifend sem. Praesent id felis vel turpis ultricies
                          porta.
                        </span>
                      </p>
                      <p className="mb-[30px]">
                        Praesent ac blandit nisl. Etiam molestie volutpat
                        interdum. Ut laoreet nisl in nisi tincidunt, tincidunt
                        tempus sem posuere. Mauris sed sollicitudin urna, vitae
                        aliquam turpis.
                      </p>
                      <p>
                        Praesent egestas turpis vel lectus ornare, ut dictum
                        metus facilisis. Ut ac nibh a diam placerat porta mattis
                        nec tellus. Phasellus molestie massa.
                      </p>
                    </div>
                  </AccordionBody>
                </Accordion>
              );
            })}
        </Fragment>
      </div>
    </div>
  );
};

export default FilePreview;
