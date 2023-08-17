"use client";

import React from "react";
import IconLogo from "../icons/icon-logo";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-[72px] bg-kamino-blue-dark border-b border-[#FFFFFF14] z-20">
      <div className="container-main w-full h-full flex items-center justify-between">
        <div className="flex items-center">
          <IconLogo />
          <span className="text-[#5F7183] text-xs tracking-[0.48px] ml-2 mt-1">Analytics</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
 