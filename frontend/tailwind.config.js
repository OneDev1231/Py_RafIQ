/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = {
  darkMode: "class",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      SFProDisplay: ["SF Pro Display", "sans-serif"],
      Satoshi: ["Satoshi", "sans-serif"],
      Inter: ["Inter", "sans-serif"],
    },
    colors: {
      gray: "#999999",
      semiblack: "#181519",
      white: "#FFFFFF",
      black: "#000000",
      red: "#F87171",
      cyan: "#00ADB5",
      dark: "#1A1A1A",
      yellow: "#EBAD00",
    },
    minHeight: {
      content: "calc(100vh - 80px)",
      chatbot: "calc(100vh - 140px)",
      screen: "100vh",
    },
    backgroundImage: {
      search:
        "linear-gradient(180deg, rgba(255, 255, 255, 0) 13.94%, #FFFFFF 54.73%)",
    },
    extend: {
      gridTemplateColumns: {
        sidebar: "270px auto",
        sidebarTablet: "234px auto",
      },
      gridTemplateRows: {
        header: "80px auto",
      },
      colors: {
        sidebar: "rgba(0, 0, 0, 0.1)",
        menu: "#7C7B7C",
        "menu-active": "#00ADB5",
        drawer: "rgba(0, 0, 0, 0.55)",
      },
      width: {
        content: "calc(100% - 270px)",
        contentTablet: "calc(100% - 234px)",
      },
      height: {
        content: "calc(100vh - 80px)",
        chat: "calc(100vh - 80px - 73px - 104px)",
      },
      
    },
  },
  plugins: [],
};
