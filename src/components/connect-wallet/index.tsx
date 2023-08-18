"use client";

import classNames from "@/utils/class-name";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ibm_mono, ibm_sans } from "@/utils/fonts";
import { truncateWallet } from "@/utils/truncate";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSolana } from "@/context/solana";
import { copyToClipboard } from "@/utils/copy-to-clipboard";
import IconCopy from "../icons/icon-copy";
import IconChangeWallet from "../icons/icon-change-wallet";
import IconDisconnect from "../icons/icon-disconnect";

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
      setOpenDropdown(!openDropdown);
      return;
    }
    
    setOpenConnect(true);
  }, [openDropdown, setOpenConnect, wallet.connected]);

  const blockStyles = useMemo(
    () => (
      <>
        <div className="button-block-top-left -top-[1px] -left-[1px] rotate-90" />

        <div className="button-block-bottom-right -bottom-[1px] -right-[1px] -rotate-90" />
      </>
    ),
    []
  );

  const changeWallet = useCallback(() => {
    wallet.disconnect();
    setOpenDropdown(false);
    setOpenConnect(true);
  }, [wallet, setOpenConnect]);

  const disconnectWallet = useCallback(() => {
    wallet.disconnect();
    setOpenDropdown(false);
  }, [wallet]);

  const copyAddress = useCallback(() => {
    copyToClipboard(wallet?.publicKey?.toBase58());
    setOpenDropdown(false);
  }, [wallet]);

  const listDropdown = useMemo(() => {
    return [
      {
        title: "Copy address",
        icon: IconCopy,
        action: copyAddress,
      },
      {
        title: "Change wallet",
        icon: IconChangeWallet,
        action: changeWallet,
      },
      {
        title: "Disconnect",
        icon: IconDisconnect,
        action: disconnectWallet,
      },
    ];
  }, [changeWallet, copyAddress, disconnectWallet]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [filterRef]);

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

      <div
        className={classNames(
          "wallet-adapter-dropdown-list",
          openDropdown && "wallet-adapter-dropdown-list-active"
        )}
      >
        <div className="flex items-center mb-2 px-2.5 pointer-events-none">
          <Image
            className="mr-2"
            width={21}
            height={21}
            src={wallet.wallet?.adapter.icon || ""}
            alt="wallet_icon"
          />

          <span className="text-white text-sm font-medium flex pt-0.5">
            {wallet.wallet?.adapter.name}
          </span>
        </div>
        {listDropdown.map((item, index) => (
          <div
            style={ibm_sans.style}
            key={index}
            onClick={item.action}
            className="wallet-adapter-dropdown-list-item hover:bg-[#49afe926] hover:text-kamino-blue-light"
          >
            <div className="w-6">
              <item.icon />
            </div>
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectWallet;
