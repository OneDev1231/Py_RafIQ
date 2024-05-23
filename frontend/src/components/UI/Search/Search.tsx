import React from "react";
import Image from "next/image";
import { useTheme } from 'next-themes'

import SearchSvg from "assets/img/layouts/search.svg";
import SearchDarkSvg from "assets/img/layouts/search-dark.svg";

interface Props {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ value, onChange }: Props) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center sm:border-b border-[#CAC9CA] box-border relative sm:min-w-[176px]">
      <div className="w-[18px] h-[18px] sm:mr-[13px] sm:absolute left-0">
        <Image alt="" src={theme === 'dark' ? SearchDarkSvg : SearchSvg} />
      </div>
      <input
        value={value}
        onChange={onChange}
        placeholder="Search anything"
        className="hidden sm:inline-block dark:bg-dark text-menu placeholder:text-[#CAC9CA] dark:placeholder:text-[#999999] 
        font-Satoshi font-normal text-sm 
        leading-[19px] py-[11px] px-[16px] pl-[30px]"
      />
    </div>
  );
};

export default Search;
