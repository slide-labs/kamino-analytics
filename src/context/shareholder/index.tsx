"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import api from "@/utils/api-service";
import { useWallet } from "@solana/wallet-adapter-react";
import { Balances, HistoryTransactions } from "@/types/shareholder";
import { network } from "@/utils/constants";

interface Props {
  children: JSX.Element;
}

export type ContextValue = {
  historyTransactions: HistoryTransactions[];
  fetchHistoryByShareholder: () => Promise<void>;
  balances: Balances;
};

export const ShareholderContext = React.createContext<ContextValue | undefined>(
  undefined
);

export const ShareholderProvider: React.FC<Props> = ({ children, ...rest }) => {
  const wallet = useWallet();
  const [historyTransactions, setHistoryTransactions] = useState<
    HistoryTransactions[]
  >([]);
  const [balances, setBalances] = useState({
    totalDeposit: 0,
    totalWithdraw: 0,
    vaultsUsed: 0,
    lastDeposit: 0,
  });

  const calcTotalDeposit = useCallback((data: HistoryTransactions[]) => {
    const filterDepositAndInvest = data.filter(
      (item) =>
        item.transactionName === "depositAndInvest" ||
        item.transactionName === "deposit"
    );

    const calc: TotalDepositOrWithdraw = {
      usdValue: 0,
    };

    filterDepositAndInvest.forEach((item) => {
      const convertToValue = Number(item.usdValue);
      calc.usdValue += convertToValue;
    });

    setBalances((prev) => ({
      ...prev,
      totalDeposit: calc.usdValue,
      lastDeposit: Number(filterDepositAndInvest[0].usdValue),
    }));
  }, []);

  const calcTotalWithdraw = useCallback((data: HistoryTransactions[]) => {
    const filterWithdraw = data.filter(
      (item) => item.transactionName === "withdraw"
    );

    const calc: TotalDepositOrWithdraw = {
      usdValue: 0,
    };

    filterWithdraw.forEach((item) => {
      const convertToValue = Number(item.usdValue);
      calc.usdValue += convertToValue;
    });

    setBalances((prev) => ({
      ...prev,
      totalWithdraw: calc.usdValue,
    }));
  }, []);

  const calcTotalUsedVaults = useCallback((data: HistoryTransactions[]) => {
    const vaultsData: any = [];

    data.forEach((item) => {
      vaultsData.push({
        vault: item.tokenA + "-" + item.tokenB,
      });
    });

    const uniqueVaultNames = new Set();

    const filteredVaultsData = vaultsData.filter((item: VaultsData) => {
      if (!uniqueVaultNames.has(item.vault)) {
        uniqueVaultNames.add(item.vault);
        return true;
      }
      return false;
    });

    setBalances((prev) => ({
      ...prev,
      vaultsUsed: filteredVaultsData.length,
    }));
  }, []);

  const fetchHistoryByShareholder = useCallback(async () => {
    const pubkey = wallet.publicKey?.toBase58();

    try {
      const response = await api.get(
        `/shareholders/${pubkey}/transactions?env=${network}`
      );

      const history: HistoryTransactions[] = response.data.transactions;

      history.sort((a, b) => {
        const dateA = new Date(a.createdOn);
        const dateB = new Date(b.createdOn);

        if (dateA > dateB) {
          return -1;
        } else if (dateA < dateB) {
          return 1;
        } else {
          return 0;
        }
      });

      setHistoryTransactions(history);
      calcTotalDeposit(history);
      calcTotalWithdraw(history);
      calcTotalUsedVaults(history);
    } catch {}
  }, [
    calcTotalDeposit,
    calcTotalUsedVaults,
    calcTotalWithdraw,
    wallet.publicKey,
  ]);

  //   const fetchPnlByShareholder = useCallback(async () => {
  //     const pubkey = wallet.publicKey?.toBase58();

  //     try {
  //       const strategiesData = await fetchAllStrategies();

  //       const newData: PnlShareholderStrategy[] = [];

  //       for (const { address } of strategiesData) {
  //         const pnlHistoryByStrategy = await api.get(
  //           `/strategies/${address}/shareholders/${pubkey}/pnl/history?env=mainnet-beta&start=2023-01-01&end=2023-08-21`
  //         );

  //         newData.push({
  //           strategy: pnlHistoryByStrategy.data.strategy,
  //           pnlUsd: Number(pnlHistoryByStrategy.data.totalPnl.usd),
  //         });
  //       }

  //       newData.sort((a, b) => {
  //         const pnlA = a.pnlUsd;
  //         const pnlB = b.pnlUsd;

  //         if (pnlA > pnlB) {
  //           return -1;
  //         } else if (pnlA < pnlB) {
  //           return 1;
  //         } else {
  //           return 0;
  //         }
  //       });

  //       console.log(newData);
  //       setHighestPnl(newData[0].pnlUsd);

  //       let x: any = {};
  //       newData.forEach((item) => {
  //         x = {
  //           pnlUsd: 0,
  //         };

  //         x.pnlUsd += item.pnlUsd;
  //       });

  //       console.log({ x });
  //     } catch {}
  //   }, [fetchAllStrategies, wallet.publicKey]);

  useEffect(() => {
    const checkUserWallet = () => {
      if (!wallet.publicKey) {
        setTimeout(checkUserWallet, 100);
      } else {
        fetchHistoryByShareholder();
      }
    };

    checkUserWallet();
  }, [fetchHistoryByShareholder, wallet.publicKey]);

  const value = useMemo(
    () => ({
      balances,
      historyTransactions,
      fetchHistoryByShareholder,
    }),
    [balances, historyTransactions, fetchHistoryByShareholder]
  );

  return (
    <ShareholderContext.Provider value={value} {...rest}>
      {children}
    </ShareholderContext.Provider>
  );
};

export const useShareholder = (): ContextValue => {
  const context = useContext(ShareholderContext);

  if (context === undefined) {
    throw new Error(
      "useShareholder must be used within an ShareholderProvider"
    );
  }

  return context;
};

//
// utils
//

interface TotalDepositOrWithdraw {
  usdValue: number;
}

interface VaultsData {
  vault: string;
}
