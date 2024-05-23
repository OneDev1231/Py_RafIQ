import React from "react";

import DashboardLayout from "layouts/DashboardLayout";
import MyCredits from "components/MyCredits";
import Stats from "components/MyCredits/Stats";
import Filters from "components/UserDashboard/Filters";
import Subscription from "components/Settings/Subscription";

const Credits = () => {
  return (
    <DashboardLayout>
      <div className="px-[16px] xl:px-[30px] pt-4 xl:pt-[25px]">
        <Filters title="Overview" />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <Stats title="Total Chatbots" value={24} />
          </div>
          <div>
            <Stats title="Total documents" value={18} />
          </div>
          <div>
            <Stats title="Total Pages" value={2234} />
          </div>
          <div>
            <Stats title="Total Questions" value={78} />
          </div>
        </div>
      </div>
      <MyCredits />
      <div className="px-4 lg:px-[30px]">
        <Subscription />
      </div>
    </DashboardLayout>
  );
};

export default Credits;
