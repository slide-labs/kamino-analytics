import { useWallet } from "@solana/wallet-adapter-react";

import React, { useCallback, useMemo } from "react";
import classNames from "@/utils/class-name";
import Image from "next/image";
import { useSolana } from "@/context/solana";

const ModalConnect: React.FC = () => {
  const { setOpenConnect } = useSolana();
  const { wallets, select } = useWallet();

  const handleConnectPhantom = useCallback(
    (walletName: string) => {
      select(walletName as any);
      setOpenConnect(false);
    },
    [setOpenConnect, select]
  );

  // const options = useMemo(() => {
  //   const installedWallets = wallets.filter(
  //     (wallet) => wallet.readyState === "Installed"
  //   );

  //   return installedWallets;
  // }, [wallets]);

  return (
    <div className="h-full w-full flex items-center justify-center fixed top-0 left-0 z-[1050]">
      <div
        className="bg-[#000000B2] fixed top-0 w-full h-full"
        onClick={() => setOpenConnect(false)}
      />
      <div className="bg-[#10141f] md:w-[50%] w-[93%] max-w-[400px] rounded-[10px] overflow-y-auto min-h-[300px] max-h-[600px] py-4 relative">
        <button
          onClick={() => setOpenConnect(false)}
          className="bg-[#1a1f2e] absolute right-[18px] top-[18px] rounded-[50%] p-3 flex items-center justify-center close-social"
        >
          <svg width="14" height="14">
            <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z" />
          </svg>
        </button>
        <span className="text-white text-[24px] font-medium text-center mx-auto font-dm max-w-[250px] my-5 flex">
          Choose any option to continue
        </span>

        <div>
          {wallets.map((wallet) => (
            <div
              onClick={() => handleConnectPhantom(wallet.adapter.name)}
              key={wallet.adapter.name}
              className="flex items-center h-[48px] cursor-pointer hover:bg-[#1a1f2e] px-[24px]"
            >
              <Image
                className={classNames("w-[26px] h-[26px] mr-3")}
                src={wallet.adapter.icon}
                alt={wallet.adapter.name}
                width={24}
                height={24}
              />
              <span className="text-white text-base font-dm">
                {wallet.adapter.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalConnect;
