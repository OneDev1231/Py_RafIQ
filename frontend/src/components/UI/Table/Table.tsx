import React from "react";

type Props = {
  columns: [any];
  data: [any];
};

const Table = ({ columns, data }: Props) => {
  return (
    <div className="w-full max-sm:overflow-x-auto">
      <table className="min-w-full tableCustom">
        <thead
          className="bg-[#F9FAFC] dark:bg-[#414141] border-[1px] border-b-0 border-[#E5E5E5] 
          dark:border-[#e5e5e526] rounded-t-lg"
        >
          <tr>
            {columns &&
              columns.map((col, c) => (
                <th
                  key={c}
                  className="py-[15px] px-[20px] box-border text-base font-medium leading-[22px] text-[#7C7B7C] 
                    dark:text-[#999] opacity-70 text-left"
                >
                  {col.name}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="border-[1px] border-t-0 border-[#E5E5E5] dark:border-[#e5e5e526]">
          {data &&
            data.map((item, i) => (
              <tr key={i} className="">
                {columns &&
                  columns.map((col, c) => (
                    <td
                      key={c}
                      className="text-base dark:text-white font-medium text-black py-[15px] px-[20px] box-border 
                        border-t-[1px] border-[#E5E5E5] dark:border-[#e5e5e526] dark:bg-[#313131]"
                    >
                      {item[col.key.split("_")[0]]}
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
