import React from "react";
import { OverViewCardProps } from "./OverViewCard.types";
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import Image from "next/image";

export const OverViewCard: React.FC<OverViewCardProps> = ({
  img,
  label,
  value,
  unit,
  percent,
  ...props
}) => {
  return (
    <div className="p-3 rounded-lg border border-gray/30 dark:bg-white/10" {...props}>
      <div className="flex space-x-2 items-center min-h-[38px]">
        <Image alt="" src={img} width={25} height={25} />
        <div className="text-[#7C7B7C] dark:text-[#999999] lg:text-base">{label}</div>
      </div>
      <div className="flex space-x-4 items-center mt-4">
        <div className="text-[#263238] dark:text-white text-2xl lg:text-3xl">
          {unit}
          {value?.toLocaleString("en-US")}
        </div>
        <div
          className={classNames(
            percent! > 0 ? "text-[#1BB492]" : "text-[#FF6F6F]",
            "text-sm lg:text-base flex items-center space-x-1"
          )}
        >
          {percent! > 0 && <ArrowUpRightIcon className="w-3 h-3" />}
          {percent! < 0 && <ArrowDownRightIcon className="w-3 h-3" />}
          <div>{Math.abs(percent!) + "%"}</div>
        </div>
      </div>
    </div>
  );
};
