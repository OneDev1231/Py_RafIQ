import React from "react";

type Props = {
  page: number;
  total: number;
  limit: number;
  onNext?: () => void;
  onPrev?: () => void;
  onPage: (page: number) => void;
};

const Pagination = ({ page, total, limit, onNext, onPrev, onPage }: Props) => {
  const totalPages = Math.ceil(total / limit);

  const renderPage = () => {
    let results = [];
    for (let i = 1; i < totalPages + 1; i++) {
      results.push(
        <li key={i}>
          <a
            onClick={() => onPage(i)}
            href="#"
            className={`w-[31px] h-[31px] rounded-full text-[12px] font-Satoshi font-medium capitalize text-[#7C7B7C] 
            inline-flex items-center justify-center border-[1px] border-[#00000014] mx-1 hover:text-[#9E9D9E] hover:no-underline cursor-pointer ${
              page === i ? "text-white bg-[#00ADB5] border-[#00ADB5] hover:bg-[#009CA4] hover:no-underline cursor-pointer" : ""
            }`}
          >
            {i}
          </a>
        </li>
      );
    }

    return results;
  };

  return (
    <nav
      aria-label="Page navigation example"
      className="w-full mt-4 mx-auto text-center"
    >
      <ul className="inline-flex items-center -space-x-px mx-auto">
        <li>
          <a
            onClick={onPrev}
            href="#"
            className="w-[31px] h-[31px] rounded-full text-[12px] font-Satoshi font-medium capitalize text-[#000] 
            dark:text-white inline-flex items-center justify-center mx-1"
          >
            <span className="sr-only">Previous</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </li>

        {totalPages > 0 && renderPage()}

        <li>
          <a
            href="#"
            onClick={onNext}
            className="w-[31px] h-[31px] rounded-full text-[12px] font-Satoshi font-medium capitalize text-[#000] 
            dark:text-white inline-flex items-center justify-center mx-1"
          >
            <span className="sr-only">Next</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
