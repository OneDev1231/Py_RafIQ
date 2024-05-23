import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useTheme } from "next-themes";
import classNames from "classnames";
import { AdminDashboardLayout } from "layouts";
import { CustomProvider, DatePicker } from "rsuite";
import {
  overviewCards,
  overviewSmallCards,
  chartLabels,
  avatars,
} from "allConstants";
import { OverViewCard, Table } from "components";
import { DeleteUser } from "components/Chat/Modal";
import { registerables, Chart } from "chart.js";
import Image from "next/image";
import { API } from "api";
import { useLoaderOverlay, useNotify } from "hooks";

Chart.register(...registerables);

const columns: any = [
  {
    key: "id",
    name: "#",
  },
  {
    key: "name",
    name: "Name",
  },
  {
    key: "email",
    name: "Email Address",
  },
  {
    key: "status",
    name: "Status",
  },
  {
    key: "transactions",
    name: "Total Transactions",
  },
  {
    key: "action",
    name: "Action",
  },
];

const txColumns: any = [
  {
    key: "id",
    name: "#",
  },
  {
    key: "name",
    name: "Name",
  },
  {
    key: "email",
    name: "Email Address",
  },
  {
    key: "date",
    name: "Date",
  },
  {
    key: "amount",
    name: "Amount",
  },
  {
    key: "status",
    name: "Status",
  },
];

const UserStatus = ({ status }: { status: number }) => {
  const type = status ? (status === 1 ? "Free" : "Paid") : "";
  return (
    <span
      className={classNames(
        status === 1 ? "bg-[#EBAD00]" : "bg-[#1BB492]",
        "rounded-[34px] px-[19px] py-[4px] text-white text-sm font-medium capitalize inline-flex items-center justify-center"
      )}
    >
      {type}
    </span>
  );
};

const TxStatus = ({ status }: { status: string }) => {
  return (
    <span
      className={classNames(
        status
          ? "bg-[#E0F5F6] text-[#00ADB5] dark:bg-[#00ADB5] dark:text-white"
          : // : status === "failed"
            "bg-[#FFEEEE] text-[#FF6F6F] dark:bg-[#FF6F6F] dark:text-white",
        //   : "bg-[#E8EBFD] text-[#3054EB] dark:bg-[#3054EB] dark:text-white",
        "rounded-[34px] w-[100px] py-[4px] text-sm font-medium capitalize inline-flex items-center justify-center"
      )}
    >
      {status ? "Paid" : "Failed"}
    </span>
  );
};

const calcPercent = (today: number | null, yesterday: number | null) => {
  if (today === null || yesterday === null || yesterday === 0) return "0";
  return Math.floor((today / yesterday) * 100);
};

const getChartData = (data: any, type: string, year: string) => {
  let chartdata = [];
  let labels =
    type === "YEARLY"
      ? [...Array(6)].map((_, index) =>
          (Number(year) - (6 - index - 1)).toString()
        )
      : [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
  let propsDate =
    type === "YEARLY"
      ? labels
      : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  let props = [
    "mmr",
    "paid_users",
    "free_users",
    "total_question_asked",
    "total_chatbots",
    "total_documents",
  ];
  for (let i = 0; i < props.length; i++) {
    let values = [""];
    for (let j = 0; j < propsDate.length; j++) {
      const val =
        i === 0 ? data.mmr[propsDate[j]].total : data[props[i]][propsDate[j]];
      values.push(val === null ? 0 : val);
      if (
        Number(year) === currentYear &&
        type === "MONTHLY" &&
        j >= currentMonth
      )
        break;
    }
    chartdata.push({
      labels: ["", ...labels],
      datasets: [
        {
          label: "",
          backgroundColor: "#00ADB5",
          borderColor: "#00ADB5",
          data: values,
        },
      ],
    });
  }

  return chartdata;
};

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

export const AdminDashboardContainer = () => {
  const [data, setData] = useState<any>([]);
  const [userLimit, setUserLimit] = useState(5);
  const [openDelete, setOpenDelete] = useState(-1);
  const [userType, setUserType] = useState("");
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [overviewDate, setOverviewDate] = useState<any>(new Date());
  const [overviewCardInfo, setOverviewCardInfo] = useState<any>([]);
  const [smallOverviewCardInfo, setSmallOverviewCardInfo] = useState<number[]>(
    []
  );
  const [yearForGraph, setYearForGraph] = useState("2023");
  const [typeForGraph, setTypeForGraph] = useState("MONTHLY");
  const [chartdata, setChartdata] = useState<any>([]);

  const [newSignups, setNewSignups] = useState<any>([]);
  const [transactionDate, setTransactionDate] = useState<any>(new Date());
  const [txData, setTxData] = useState<any>([]);
  const [txDataLimit, setTxDataLimit] = useState(5);

  const { theme } = useTheme();
  const { notifyError, notifySuccess } = useNotify();

  const onChangeTransactionDate = (date: any) => {
    setTransactionDate(date);
  };

  const getTransactionData = async () => {
    let date = new Date(transactionDate).toISOString().slice(0, 10);
    const { count, results } = await API.getAllTransactions(date);

    let txResults: any = [];
    for (let i = 0; i < count; i++) {
      const obj = {
        _id: results[i].id,
        id: i + 1,
        name: results[i].user.name,
        email: results[i].user.email,
        date,
        amount: results[i].amount,
        status: <TxStatus status={results[i].status} />,
      };
      txResults.push(obj);
    }
    setTxData(txResults);
  };

  const getOverviewGraph = async () => {
    setWaitingForResponse(true);
    const { status, data } = await API.getAnalyticsGraph(
      yearForGraph,
      typeForGraph
    );
    setWaitingForResponse(false);

    if (status === "ok") {
      setChartdata(getChartData(data, typeForGraph, yearForGraph));
    }
  };

  const onChangeOverviewDate = (date: any) => {
    setOverviewDate(date);
  };

  const handleToggleDelete = () => {
    setOpenDelete(-1);
  };

  const getOverviewData = async () => {
    let date = new Date(overviewDate).toISOString().slice(0, 10);

    const { today, yesterday } = await API.getAnalyticsOverview(date);

    setOverviewCardInfo([
      {
        value: today.mmr === null ? 0 : today.mmr,
        percent: calcPercent(today.mmr, yesterday.mmr),
      },
      {
        value: today.paid_users === null ? 0 : today.paid_users,
        percent: calcPercent(today.paid_users, yesterday.paid_users),
      },
      {
        value: today.free_users === null ? 0 : today.free_users,
        percent: calcPercent(today.free_users, yesterday.free_users),
      },
      {
        value:
          today.total_question_asked === null ? 0 : today.total_question_asked,
        percent: calcPercent(
          today.total_question_asked,
          yesterday.total_question_asked
        ),
      },
      {
        value: today.total_chatbots === null ? 0 : today.total_chatbots,
        percent: calcPercent(today.total_chatbots, yesterday.total_chatbots),
      },
      {
        value: today.total_documents === null ? 0 : today.total_documents,
        percent: calcPercent(today.total_documents, yesterday.total_documents),
      },
    ]);
    setSmallOverviewCardInfo([
      today.today_signup,
      today.today_chatbots,
      today.today_questions,
      today.today_transactions,
      today.today_documents,
    ]);
  };

  const handleDeleteUser = async () => {
    setWaitingForResponse(true);
    const { status, message } = await API.deleteUser(openDelete);
    setWaitingForResponse(false);
    if (status === "OK") {
      setData(data.filter((item: any) => item._id !== openDelete));
      setOpenDelete(-1);
      notifySuccess(message);
    } else {
      notifyError("Server error!");
    }
  };

  const initUserListData = async () => {
    const { count, results } = await API.getAllUsers();

    let _results: any = [];
    for (let i = 0; i < count; i++) {
      const obj = {
        _id: results[i].id,
        _status: results[i].userprofile.subscription_plan?.title,
        id: i + 1,
        name: results[i].name,
        email: results[i].email,
        status: (
          <>
            {results[i].userprofile.subscription_plan && (
              <UserStatus status={results[i].userprofile.subscription_plan} />
            )}
          </>
        ),
        transactions: results[i].total_transactions,
        action: (
          <div className="font-thin">
            <button
              onClick={() => setOpenDelete(results[i].id)}
              className="rounded-2xl border border-gray/50 bg-white dark:bg-[#242424] text-red hover:bg-[#EEEEEE] dark:hover:bg-[#353535] px-6 py-[2px] mr-2"
            >
              Delete
            </button>
          </div>
        ),
      };
      _results.push(obj);
    }
    setData(_results);
  };

  const initNewSignUpListData = async () => {
    const { results } = await API.getNewSignupUsers();
    setNewSignups(
      results.map((result: any) => {
        return {
          photo: result.userprofile.profile_photo,
          name: result.userprofile.name,
          time: Math.round(
            (Date.now() - Date.parse(result.userprofile.created_at)) / 60000
          ),
        };
      })
    );
  };

  useEffect(() => {
    initUserListData();
    initNewSignUpListData();
  }, []);

  useEffect(() => {
    getOverviewData();
  }, [overviewDate]);

  useEffect(() => {
    getOverviewGraph();
  }, [typeForGraph, yearForGraph]);

  useEffect(() => {
    getTransactionData();
  }, [transactionDate]);

  useLoaderOverlay(waitingForResponse);

  return (
    <AdminDashboardLayout>
      {/* Overview Section */}
      <div>
        <div className="flex justify-between items-center p-4 border-b border-gray/30 dark:bg-white/10">
          <div className="text-lg font-bold">Overview</div>
          <div className="text-sm text-[#999999] flex items-center">
            <div>Date:</div>
            <CustomProvider theme={theme === "dark" ? "dark" : "light"}>
              <DatePicker
                format="yyyy-MM-dd"
                placement="bottomEnd"
                className="ml-4 min-w-[150px] text-white"
                caretAs={undefined}
                onChange={onChangeOverviewDate}
                value={overviewDate}
              />
            </CustomProvider>
          </div>
        </div>
        <div className="p-3 lg:p-6 border-b border-gray/30 dark:bg-[#1A1A1A]">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            {overviewCards.map((card, index) => (
              <OverViewCard
                key={"overviewCard" + index}
                img={theme === "dark" ? card.darkImgUrl : card.imgUrl}
                label={card.title}
                value={overviewCardInfo[index]?.value}
                unit={card.unit}
                percent={overviewCardInfo[index]?.percent}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mt-4">
            {overviewSmallCards.map((card, index) => (
              <div
                key={"overviewSmallCard" + index}
                className={classNames(
                  index === 4 ? "col-span-2 lg:col-span-1" : "",
                  "p-3 lg:p-4 rounded-lg border border-gray/30 dark:bg-white/10"
                )}
              >
                <div className="text-sm text-[#7C7B7C] dark:text-[#999999] mb-2">
                  {card.title}
                </div>
                <div className="text-3xl text-[#263238] dark:text-white">
                  {smallOverviewCardInfo[index]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Analytics Section */}
      <div>
        <div className="flex justify-between items-center p-4 border-b border-gray/30 dark:bg-white/10">
          <div className="text-lg font-bold">Analytics</div>
          <div className="text-sm text-[#999999] flex items-center space-x-4">
            <div>Type:</div>
            <div className="w-40">
              <select
                onChange={(e) => setTypeForGraph(e.target.value)}
                defaultValue={"MONTHLY"}
                className="w-full text-[#263238] dark:text-[#CCCCCC] border-[1.7px] border-solid border-[#00000014] rounded-[8px] px-[9px] py-[9px]"
              >
                <option value="YEARLY">Yearly</option>
                <option value="MONTHLY">Monthly</option>
              </select>
            </div>
            <div className="pl-4">Year:</div>
            <div className="w-40">
              <select
                onChange={(e) => setYearForGraph(e.target.value)}
                defaultValue={currentYear}
                className="w-full text-[#263238] dark:text-[#CCCCCC] border-[1.7px] border-solid border-[#00000014] rounded-[8px] px-[9px] py-[9px]"
              >
                <option value={currentYear}>{currentYear}</option>
                <option value={currentYear - 1}>{currentYear - 1}</option>
                <option value={currentYear - 2}>{currentYear - 2}</option>
                <option value={currentYear - 3}>{currentYear - 3}</option>
                <option value={currentYear - 4}>{currentYear - 4}</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-3 lg:p-6 border-b border-gray/30 dark:bg-[#1A1A1A] overflow-x-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {chartdata.map((item: any, index: number) => (
              <div
                key={"chart" + index}
                className="bg-white dark:bg-[#242424] border border-gray/30 dark:border-0 rounded-lg p-4 xl:min-w-fit min-w-[900px]"
              >
                <Line
                  data={item}
                  options={{
                    plugins: {
                      legend: { display: false },
                      title: {
                        display: true,
                        text: chartLabels[index],
                        font: {
                          family: "Satoshi",
                          size: 20,
                          weight: "normal",
                        },
                        padding: { bottom: 20 },
                        color: theme === "dark" ? "#FFFFFF" : "#000000",
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          color: theme === "dark" ? "#F6F6F620" : "#F6F6F6FF",
                        },
                      },
                      y: {
                        grid: {
                          color: theme === "dark" ? "#F6F6F620" : "#F6F6F6FF",
                        },
                        beginAtZero: true,
                      },
                    },
                  }}
                  height="100px"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col xl:flex-row mt-10 font-thin space-y-10 xl:space-y-0 xl:space-x-4">
            <div className="flex flex-col space-y-6 border border-gray/30 rounded-lg py-6 dark:bg-[#242424] w-full lg:min-w-fit min-w-[1100px]">
              <div className="flex justify-between items-center px-6">
                <div className="text-xl font-bold text-black dark:text-white">
                  Users
                </div>
                <div className="text-sm text-[#999999] flex items-center space-x-4">
                  <div>Sort By:</div>
                  <div className="w-40">
                    <select
                      onChange={(e) => setUserType(e.target.value)}
                      defaultValue={""}
                      className="w-full text-[#263238] dark:text-[#CCCCCC] border-[1.7px] border-solid border-[#00000014] rounded-[8px] px-[9px] py-[9px]"
                    >
                      <option value="">All Users</option>
                      <option value="PAID">Free Users</option>
                      <option value="FREE">Paid Users</option>
                    </select>
                  </div>
                </div>
              </div>
              <Table
                columns={columns}
                data={data
                  .filter((item: any) => item._status !== userType)
                  .slice(0, userLimit)}
              />
              <div className="flex justify-between items-center text-base px-6">
                <div className="text-black/40 dark:text-white/40 font-thin">
                  Showing {userLimit > data.length ? data.length : userLimit} Of{" "}
                  {data.length}
                </div>
                <button
                  onClick={() =>
                    setUserLimit(
                      userLimit + 5 > data.length ? data.length : userLimit + 5
                    )
                  }
                  disabled={data.length <= userLimit}
                  className="rounded-2xl text-black border border-gray/50 dark:bg-[#242424] bg-white dark:text-white hover:bg-[#EEEEEE] dark:hover:bg-[#353535] px-10 py-1"
                >
                  Load More
                </button>
              </div>
            </div>
            <div className="border border-gray/30 rounded-lg dark:bg-[#242424] w-full xl:w-1/4 min-w-[250px]">
              <div className="p-6 text-lg font-bold border-b border-gray/30 text-black dark:text-white text-center xl:text-left">
                New Sign Ups
              </div>
              {newSignups.map((user: any, index: number) => (
                <div
                  key={"avatar" + index}
                  className={classNames(
                    index === 0 ? "p-3" : "mx-3 py-3 border-t border-gray/30",
                    "flex justify-between items-center"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <Image alt="" src={avatars[index]} width={35} height={35} />
                    <div className="text-base font-medium">{user.name}</div>
                  </div>
                  <div className="text-sm text-[#999999]">
                    {user.time} mint ago
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="my-10 lg:mt-16 flex flex-col space-y-6 border border-gray/30 rounded-lg py-6 dark:bg-[#242424] w-full lg:min-w-fit min-w-[1100px]">
            <div className="flex justify-between items-center px-6">
              <div className="text-xl font-bold text-black dark:text-white">
                Transactions
              </div>
              <div className="text-sm text-[#999999] flex items-center space-x-4">
                <div>Month:</div>
                <CustomProvider theme={theme === "dark" ? "dark" : "light"}>
                  <DatePicker
                    format="yyyy-MM-dd"
                    placement="bottomEnd"
                    className="ml-4 min-w-[150px] text-white"
                    caretAs={undefined}
                    onChange={onChangeTransactionDate}
                    value={transactionDate}
                  />
                </CustomProvider>
              </div>
            </div>
            <Table columns={txColumns} data={txData} />
            <div className="flex justify-between items-center text-base px-6">
              <div className="text-black/40 dark:text-white/40 font-thin">
                Showing{" "}
                {txDataLimit > txData.length ? txData.length : txDataLimit} Of{" "}
                {txData.length}
              </div>
              <button
                onClick={() =>
                  setTxDataLimit(
                    txDataLimit + 5 > txData.length
                      ? txData.length
                      : txDataLimit + 5
                  )
                }
                disabled={txData.length <= txDataLimit}
                className="rounded-2xl text-black border border-gray/50 dark:bg-[#242424] bg-white dark:text-white hover:bg-[#EEEEEE] dark:hover:bg-[#353535] px-10 py-1"
              >
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>

      <DeleteUser
        open={openDelete}
        onClose={handleToggleDelete}
        onDelete={handleDeleteUser}
      />
    </AdminDashboardLayout>
  );
};
