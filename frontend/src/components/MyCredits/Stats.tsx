import React from "react";
import { Chart } from "react-google-charts";
import { useWindowSize } from "usehooks-ts";

type Props = {
  title: string;
  value: number;
};

const Stats = ({ title, value }: Props) => {
  const { width } = useWindowSize();

  const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 5],
    ["Commute", 7],
  ];

  const options = {
    // chartArea:{left:10,top:20,width:"100%",height:"100%"},
    title: "",
    pieHole: 0.7,
    is3D: false,
    legend: "none",
    pieSliceText: "none",
    tooltip: { trigger: "none" },
    slices: {
      0: {
        color: "#FFC101",
      },
      1: {
        color: "#FF8585",
      },
      2: {
        color: "#000000",
      },
    },
  };

  return (
    <div className="w-full border-[1px] border-[#0000001a] p-5 box-border rounded-lg overflow-hidden dark:bg-[#ffffff10]">
      <div className="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-1">
        <div className="md:col-span-2">
          <p className="text-sm text-[#7C7B7C] dark:text-[#999] capitalize font-medium font-Satoshi leading-[19px] mb-[8px]">
            {title}
          </p>
          <h4 className="text-[32px] text-black dark:text-white font-bold font-Satoshi leading-[43px] xl:mb-4">
            {value ? value.toLocaleString() : 0}
          </h4>
        </div>
        <div className="md:col-span-3">
          <div
            className={`pieChart w-full ${
              width > 480 ? "h-[160px]" : "h-[100px]"
            } overflow-hidden flex items-center justify-center xl:justify-center md:justify-start`}
          >
            <Chart
              chartType="PieChart"
              width={width > 870 ? "250px" : width > 480 ? "200px" : "160px"}
              height={width > 870 ? "250px" : width > 480 ? "200px" : "160px"}
              data={data}
              options={options}
              className="pieChart"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
