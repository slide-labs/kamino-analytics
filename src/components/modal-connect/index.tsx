import { useWallet } from "@solana/wallet-adapter-react";

import React, { useCallback } from "react";
import classNames from "@/utils/class-name";
import Image from "next/image";
import { useSolana } from "@/context/solana";
import CardBoxCustom from "../card-box-custom";
import IconClose from "../icons/icon-close";

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

  return (
    <div className="h-full w-full flex items-center justify-center fixed top-0 left-0 z-[1050]">
      <div
        className="bg-[#00000073] fixed top-0 w-full h-full"
        onClick={() => setOpenConnect(false)}
      />
      <CardBoxCustom className="w-[320px] max-w-[320px]">
        <>
        <button
          onClick={() => setOpenConnect(false)}
          className="absolute right-3 top-3.5 w-5"
        >
          <IconClose />
        </button>
        <div className="w-full overflow-y-auto min-h-[300px] max-h-[700px] relative pb-6 pt-1">
          <span className="text-white font-medium text-xl text-center font-dm mb-6 flex justify-center items-center">
            Select your wallet
          </span>

          <div>
            {wallets.map((wallet) => (
              <div
                onClick={() => handleConnectPhantom(wallet.adapter.name)}
                key={wallet.adapter.name}
                className="flex items-center h-[40px] cursor-pointer px-4 text-white justify-between hover:bg-[#49afe926] hover:text-kamino-blue-light"
              >
                <span className="text-base font-medium">{wallet.adapter.name}</span>
                <Image
                  className={classNames("w-[26px] h-[26px]")}
                  src={wallet.adapter.icon}
                  alt={wallet.adapter.name}
                  width={24}
                  height={24}
                />
              </div>
            ))}
          </div>
        </div>
        </>
      </CardBoxCustom>
    </div>
  );
};

export default ModalConnect;
