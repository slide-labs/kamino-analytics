"use client";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  BackpackWalletAdapter,
  BraveWalletAdapter,
  Coin98WalletAdapter,
  GlowWalletAdapter,
  LedgerWalletAdapter,
  MathWalletAdapter,
  NightlyWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter,
  SolongWalletAdapter,
  TorusWalletAdapter,
  WalletConnectWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { Connection } from "@solana/web3.js";
import React, { useContext, useMemo, useState } from "react";
// import HELIUS_API from "@/app/utils/helius";

interface Props {
  children: JSX.Element;
}

export type ContextValue = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectCrypto: React.Dispatch<React.SetStateAction<CryptoSelect>>;
  selectCrypto: CryptoSelect;
  connection: Connection;
  openConnect: boolean;
  setOpenConnect: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SolanaContext = React.createContext<ContextValue | undefined>(
  undefined
);

export const SolanaProvider: React.FC<Props> = ({ children, ...rest }) => {
  const [openConnect, setOpenConnect] = useState(false);
  const [selectCrypto, setSelectCrypto] = useState<CryptoSelect>(
    {} as CryptoSelect
  );
  const [loading, setLoading] = useState(false);

  const connection = useMemo(
    () =>
      new Connection(
        "https://rpc.helius.xyz/?api-key=dabd2486-2df4-4bcf-b1ce-66510cfc2773"
      ),
    []
  );

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new BackpackWalletAdapter(),
      new LedgerWalletAdapter(),
      new BraveWalletAdapter(),
      new NightlyWalletAdapter(),
      new WalletConnectWalletAdapter("mainnet-beta" as any),
      new GlowWalletAdapter(),
      new SolletWalletAdapter(),
      new Coin98WalletAdapter(),
      new TorusWalletAdapter(),
      new SolongWalletAdapter(),
      new MathWalletAdapter()
    ],
    []
  );

  const value = useMemo(
    () => ({
      loading,
      setLoading,
      selectCrypto,
      setSelectCrypto,
      connection,
      openConnect,
      setOpenConnect,
    }),
    [
      loading,
      setLoading,
      selectCrypto,
      setSelectCrypto,
      connection,
      openConnect,
      setOpenConnect,
    ]
  );

  return (
    <SolanaContext.Provider value={value} {...rest}>
      <ConnectionProvider
        endpoint={
          "https://rpc.helius.xyz/?api-key=dabd2486-2df4-4bcf-b1ce-66510cfc2773"
        }
      >
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </SolanaContext.Provider>
  );
};

export const useSolana = (): ContextValue => {
  const context = useContext(SolanaContext);

  if (context === undefined) {
    throw new Error("useSolana must be used within an SolanaProvider");
  }

  return context;
};

//
// Utils
//

export interface CryptoSelect {
  icon: string;
  name: string;
  token: string;
}
