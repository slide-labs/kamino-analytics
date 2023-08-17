"use client";

import classNames from "@/utils/class-name";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { ibm_mono } from "@/utils/fonts";
import { truncateWallet } from "@/utils/truncate";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSolana } from "@/context/solana";

interface Props {
  className?: string;
}

const ConnectWallet: React.FC<Props> = ({ className }) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const { setOpenConnect } = useSolana();
  const [openDropdown, setOpenDropdown] = useState(false);
  const wallet = useWallet();

  const handleClickConnect = useCallback(() => {
    if (wallet.connected) {
      setOpenDropdown(true);
      return;
    }

    setOpenConnect(true);
  }, [setOpenConnect, wallet.connected]);

  const blockStyles = useMemo(
    () => (
      <>
        <div className="button-block-top-left -top-[1px] -left-[1px] rotate-90" />

        <div className="button-block-bottom-right -bottom-[1px] -right-[1px] -rotate-90" />
      </>
    ),
    []
  );

  return (
    <div
      ref={filterRef}
      className={classNames(
        className,
        "w-[165px] bg-kamino-blue-light border border-[#242b3b] relative button-block-main-custom h-[40px]",
        !wallet.connected ? "bg-kamino-blue-light" : "bg-[#222b3c]" 
      )}
    >
      {blockStyles}

      <div
        onBlur={() => setOpenDropdown(false)}
        onClick={handleClickConnect}
        style={ibm_mono.style}
        className={classNames(
          "relative z-[1] h-full flex items-center justify-center cursor-pointer",
          !wallet.connected ? "bg-kamino-blue-light" : "bg-[#222b3c]" 
        )}
      >
        <span className="text-white text-sm font-bold uppercase flex items-center">
          {wallet.connected ? (
            <>
              <Image
                className="mr-2"
                width={21}
                height={21}
                src={wallet.wallet?.adapter.icon || ""}
                alt="wallet_icon"
              />
              {truncateWallet(wallet.publicKey?.toBase58(), 10)}
            </>
          ) : (
            "Connect wallet"
          )}
        </span>
      </div>
    </div>
  );
};

export default ConnectWallet;
