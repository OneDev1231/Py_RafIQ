import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useTheme } from "next-themes"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export default function AnalyticsChartJS() {
  const { theme } = useTheme();

  const options = {
    responsive: true,
    showLine: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
      },
    },
    scales: {
      x: {
        // border: {
        //   color: 'red',
        // },
        // label: {
        //   color: 'red',
        // },
        // ticks: {
        //   fontColor: "red",
        // },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : '#E9E9E9',
        },
      },
      y: {
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : '#E9E9E9',
        },
      },
    
    }
  };


const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
];

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 70 })),
        backgroundColor: "rgba(27, 180, 146, 0.25)",
        borderColor: [
          "#1BB492",
        ],
        borderWidth: 1,
        // borderColor: "#1BB492",
        // border: "1px ",
        // borderStyle: "solid",
      },
    ],
  };




  return (
    <div className="px-[20px]">
      <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:gap-[13px]  gap-[16px] py-[25px]">
        <div className="bg-[#F8F9F9] dark:bg-[#F8F9F91f] dark:text-white px-[20px] py-[22px] rounded-[4px] w-[170px] max-md:w-full max-xl:w-[170px] font-Satoshi font-[700] text-[28px] leading-[38px] text-[#000000] capitalize">
          <p className="font-[500] text-[12px] leading-[16px] opacity-60 mb-[10px]">
            Total Pages
          </p>
          <p>1835</p>
        </div>
        <div className="bg-[#F8F9F9] dark:bg-[#F8F9F91f] dark:text-white mx-auto px-[20px] py-[22px] rounded-[4px] w-[170px] max-md:w-full max-xl:w-[193px] font-Satoshi font-[700] text-[28px] leading-[38px] text-[#000000] capitalize">
          <p className="font-[500] text-[12px] leading-[16px] opacity-60 mb-[10px]">
            Total Files
          </p>
          <p>7</p>
        </div>
        <div className="bg-[#F8F9F9] dark:bg-[#F8F9F91f] dark:text-white mx-auto px-[20px] py-[22px] rounded-[4px] w-[170px] max-md:w-full max-xl:w-[193px] font-Satoshi font-[700] text-[28px] leading-[38px] text-[#000000] capitalize">
          <p className="font-[500] text-[12px] leading-[16px] opacity-60 mb-[10px]">
            Total views
          </p>
          <p>3890</p>
        </div>
        <div className="bg-[#F8F9F9] dark:bg-[#F8F9F91f] dark:text-white px-[20px] ml-[auto] py-[22px] rounded-[4px] w-[170px] max-md:w-full max-xl:w-[193px] font-Satoshi font-[700] text-[28px] leading-[38px] text-[#000000] capitalize">
          <p className="font-[500] text-[12px] leading-[16px] opacity-60 mb-[10px]">
            Total Questions
          </p>
          <p>877</p>
        </div>
      </div>
      <div className="max-md:overflow-x-scroll">
        <div className="border-[1px] border-solid border-[#0000001f] dark:border-[#ffffff10] p-[10px] h-[350px] max-md:w-[730px]">
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
}
