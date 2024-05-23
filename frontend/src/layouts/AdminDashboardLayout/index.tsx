import React from "react";
import Header from "./Header";

const AdminDashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex">
      <div className="bg-[#f8f8f8] dark:bg-black w-full min-h-full font-Satoshi">
        <Header />
        <div className="sm:p-[20px] box-border overflow-hidden mt-[80px]">
          <div className="bg-white dark:bg-dark overflow-hidden dark:text-white">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
