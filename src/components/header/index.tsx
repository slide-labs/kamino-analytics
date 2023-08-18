"use client";

import React, { useEffect, useState } from "react";
import IconLogo from "../icons/icon-logo";
import Input from "../input";
import ConnectWallet from "../connect-wallet";
import ModalConnect from "../modal-connect";
import { useSolana } from "@/context/solana";

const Header: React.FC = () => {
  const { openConnect } = useSolana();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full h-[72px] bg-kamino-blue-dark border-b border-[#FFFFFF14] z-20">
      <div className="container-main w-full h-full flex items-center justify-between">
        <div className="flex items-center">
          <IconLogo />
          <span className="text-[#5F7183] text-xs tracking-[0.48px] ml-2 mt-1">
            Analytics
          </span>
        </div>

        <div className="w-[360px]">
          <Input />
        </div>

        {isClient && <ConnectWallet />}
      </div>

      {openConnect && <ModalConnect />}
    </header>
  );
};

export default Header;
