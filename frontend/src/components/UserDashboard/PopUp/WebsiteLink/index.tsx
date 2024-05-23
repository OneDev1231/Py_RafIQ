import React, { useState } from "react";

type Props = {
  onChangeLink: (value: string) => void
}

export default function WebsiteLink({ onChangeLink } : Props) {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChangeLink(value);
    setValue(value);
  }

  return (
    <div>
      <label className="dark:text-[#fff] opacity-50  font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[14.6957px] max-xl:leading-[20px] text-[#263238] ">
        Website Link
      </label>
      <input
        value={value}
        onChange={handleChange}
        type="text"
        placeholder="Ex: https://www.domain.com"
        className="dark:border-[#FFFFFF2E] dark:text-[#fff] w-full border-[1.7px] border-solid border-[#00000014] rounded-[8px] px-[19px] py-[13px] mt-[10px] font-Satoshi not-italic font-[500] text-[14px] leading-[19px] max-md:text-[14px] max-md:leading-[19px] max-xl:text-[16px] max-xl:leading-[21px] text-[#7C7B7C]"
      />
    </div>
  );
}
