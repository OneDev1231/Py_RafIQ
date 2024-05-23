import React, { useState } from "react";
import Header from "./Header";

const ChatLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const handleToggleMenu = () => {};

  return (
    <div className="w-full pt-[66px] sm:pt-[80px]">
      <Header onOpen={handleToggleMenu} />

      <div className="w-full overflow-hidden h-content">{children}</div>
    </div>
  );
};

export default ChatLayout;
