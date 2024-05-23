import overviewMMRIcon from "assets/img/icons/admin-dashboard-overview-MMR.svg";
import overviewPaidUsersIcon from "assets/img/icons/admin-dashboard-overview-paidusers.svg";
import overviewFreeUsersIcon from "assets/img/icons/admin-dashboard-overview-freeusers.svg";
import overviewQuestionsIcon from "assets/img/icons/admin-dashboard-overview-questions.svg";
import overviewChatbotsIcon from "assets/img/icons/admin-dashboard-overview-chatbots.svg";
import overviewFilesIcon from "assets/img/icons/admin-dashboard-overview-files.svg";

import overviewMMRDarkIcon from "assets/img/icons/admin-dashboard-overview-MMR-dark.svg";
import overviewPaidUsersDarkIcon from "assets/img/icons/admin-dashboard-overview-paidusers-dark.svg";
import overviewFreeUsersDarkIcon from "assets/img/icons/admin-dashboard-overview-freeusers-dark.svg";
import overviewQuestionsDarkIcon from "assets/img/icons/admin-dashboard-overview-questions-dark.svg";
import overviewChatbotsDarkIcon from "assets/img/icons/admin-dashboard-overview-chatbots-dark.svg";
import overviewFilesDarkIcon from "assets/img/icons/admin-dashboard-overview-files-dark.svg";

import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar5 from "assets/img/avatars/avatar5.png";
import avatar6 from "assets/img/avatars/avatar6.png";
import avatar7 from "assets/img/avatars/avatar7.png";

export const overviewCards = [
  {
    imgUrl: overviewMMRIcon.src,
    darkImgUrl: overviewMMRDarkIcon.src,
    title: "MMR",
    value: 6891,
    unit: "$",
    percent: 41,
  },
  {
    imgUrl: overviewPaidUsersIcon.src,
    darkImgUrl: overviewPaidUsersDarkIcon.src,
    title: "Total Paid Users",
    value: 2891,
    percent: 18,
  },
  {
    imgUrl: overviewFreeUsersIcon.src,
    darkImgUrl: overviewFreeUsersDarkIcon.src,
    title: "Total Free Users",
    value: 9215,
    percent: -0.91,
  },
  {
    imgUrl: overviewQuestionsIcon.src,
    darkImgUrl: overviewQuestionsDarkIcon.src,
    title: "Total Questions Asked",
    value: 1452,
    percent: 27,
  },
  {
    imgUrl: overviewChatbotsIcon.src,
    darkImgUrl: overviewChatbotsDarkIcon.src,
    title: "Total Chatbots",
    value: 2132,
    percent: 27,
  },
  {
    imgUrl: overviewFilesIcon.src,
    darkImgUrl: overviewFilesDarkIcon.src,
    title: "Total Files Uploaded",
    value: 2891,
    percent: 41,
  },
];

export const overviewSmallCards = [
  {
    title: "Daily Sign Ups",
    value: 812,
  },
  {
    title: "Daily Chatbots Created",
    value: 251,
  },
  {
    title: "Daily Questions Asked",
    value: 632,
  },
  {
    title: "Daily Transactions",
    value: 102,
  },
  {
    title: "Daily Files Uploaded",
    value: 973,
  },
];

const labels = [
  "",
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

export const chartdata = {
  labels: labels,
  datasets: [
    {
      label: "",
      backgroundColor: "#00ADB5",
      borderColor: "#00ADB5",
      data: [
        1200, 2000, 3400, 3200, 4100, 4700, 4300, 3800, 4000, 5200, 6100, 5900,
        6800,
      ],
    },
  ],
};

export const chartLabels = [
  "MMR Overview",
  "Paid Users Overview",
  "Free Users Overview",
  "Chatbots Overview",
  "Questions Asked Overview",
  "Files Uploaded Overview",
];

export const avatars = [
  avatar1.src,
  avatar2.src,
  avatar3.src,
  avatar4.src,
  avatar5.src,
  avatar6.src,
  avatar7.src,
];
