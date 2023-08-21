"use client";

import {
  FeesAndRewards,
  FeesAndRewardsChart,
  KaminoTransaction,
  PoolAndKaminoVolumes,
  TYPE_PERIOD,
  VaultsVolumes,
  VolPerPeriod,
  Volume,
  VolumeHistoryChart,
} from "@/types/strategies";
import api from "@/utils/api-service";
import { network, provider } from "@/utils/constants";
import { Idl, Program, BorshInstructionCoder } from "@project-serum/anchor";
import moment from "moment";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { getConfigByCluster } from "@hubbleprotocol/hubble-config";
import { KAMINO_IDL } from "@hubbleprotocol/hubble-idl";
import { PartiallyDecodedInstruction } from "@solana/web3.js";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { renderVaultName } from "@/utils/vaults";

interface Props {
  children: JSX.Element;
}

export type ContextValue = {
  historyVolume: VolumeHistoryChart[];
  allTimeFees: number;
  tvl: number;
  volPerPeriod: VolPerPeriod | undefined;
  feesAndRewards: FeesAndRewardsChart[];
  fetchHistoryVolume: (period: TYPE_PERIOD) => Promise<void>;
  fetchAllTimeFees: () => Promise<void>;
  fetchTvl: () => Promise<void>;
  fetchVolume: () => Promise<void>;
  filterVolumeVaults: (period: TYPE_PERIOD) => VaultsVolumes[] | undefined;
  fetchFeesAndRewards: (period: TYPE_PERIOD) => Promise<void>;
  allTransactions: KaminoTransaction[];
  fetchTransactions: (lastSignature?: string) => Promise<void>;
};

export const StrategiesContext = React.createContext<ContextValue | undefined>(
  undefined
);

export const StrategiesProvider: React.FC<Props> = ({ children, ...rest }) => {
  const [historyVolume, setHistoryVolume] = useState<VolumeHistoryChart[]>([]);
  const [allTimeFees, setAllTimeFees] = useState<number>(0);
  const [tvl, setTvl] = useState<number>(0);
  const [volPerPeriod, setVolPerPeriod] = useState<{
    [key: string]: Volume;
  }>();
  const [vaultsVolume, setVaultsVolume] = useState<PoolAndKaminoVolumes[]>([]);
  const [feesAndRewards, setFeesAndRewards] = useState<FeesAndRewardsChart[]>(
    []
  );
  const [allTransactions, setAllTransactions] = useState<KaminoTransaction[]>(
    []
  );
  const [loadingTransactions, setLoadingTransactions] =
    useState<boolean>(false);

  const fetchAllStrategies = useCallback(async () => {
    try {
      const response = await api.get(`/strategies?env=${network}&status=LIVE`);

      return response.data;
    } catch {}
  }, []);

  const fetchHistoryVolume = useCallback(
    async (period: TYPE_PERIOD) => {
      try {
        const strategies = await fetchAllStrategies();

        const dateToVolumeMap = new Map<number, number>();

        for (const { address } of strategies) {
          const metricsHistory = await api.get(
            `/strategies/${address}/metrics/history?env=${network}&period=${period}`
          );

          metricsHistory.data.forEach(
            ({ date, volume24hUsd }: VolumeHistoryChart) => {
              const convertDate = new Date(date);
              const timestamp = moment(convertDate).unix();

              dateToVolumeMap.set(
                timestamp,
                (dateToVolumeMap.get(timestamp) || 0) + Number(volume24hUsd)
              );
            }
          );
        }

        const newData: VolumeHistoryChart[] = Array.from(dateToVolumeMap).map(
          ([timestamp, volume24hUsd]) => ({
            date: timestamp,
            volume24hUsd,
          })
        );

        setHistoryVolume(newData);
      } catch {}
    },
    [fetchAllStrategies]
  );

  const fetchAllTimeFees = useCallback(async () => {
    try {
      const response = await api.get(
        `strategies/all-time-fees-and-rewards?env=${network}`
      );

      setAllTimeFees(Number(response.data.totalUsd));
    } catch {}
  }, []);

  const fetchTvl = useCallback(async () => {
    try {
      const response = await api.get(`/strategies/tvl?env=${network}`);

      setTvl(Number(response.data.tvl));
    } catch {}
  }, []);

  const fetchVolume = useCallback(async () => {
    try {
      const volume = await api.get(
        `/strategies/volume?env=${network}&status=LIVE`
      );

      const dataPerPeriod: { [key: string]: Volume } = {};
      const dataVaults: PoolAndKaminoVolumes[] = [];

      volume.data.forEach((item: PoolAndKaminoVolumes) => {
        const strategy = item.strategy;

        item.kaminoVolume.forEach((kaminoItem: Volume) => {
          const period = kaminoItem.period;
          const convertVolToNumber = Number(kaminoItem.amount);

          if (!dataPerPeriod[period]) {
            dataPerPeriod[period] = {
              period: period,
              amount: 0,
            };
          }

          dataPerPeriod[period].amount += convertVolToNumber;
        });

        dataVaults.push({
          strategy,
          kaminoVolume: item.kaminoVolume,
        });
      });

      setVaultsVolume(dataVaults);
      setVolPerPeriod(dataPerPeriod);
    } catch {
      throw new Error("Failed in fetchVolume");
    }
  }, []);

  const fetchTransactions = useCallback(
    async (lastSignature?: string) => {
      try {
        if (loadingTransactions) return;

        setLoadingTransactions(true);

        const data: KaminoTransaction[] = [];
        const coder = new BorshInstructionCoder(KAMINO_IDL as Idl);
        const program = new Program(
          KAMINO_IDL as Idl,
          KAMINO_PROGRAM_ID,
          provider
        );

        const confirmedSignatures =
          await program.provider.connection.getConfirmedSignaturesForAddress2(
            program.programId,
            {
              limit: 200,
              before: lastSignature,
            }
          );

        const transactions =
          await program.provider.connection.getParsedTransactions(
            confirmedSignatures.map((item) => item.signature),
            {
              maxSupportedTransactionVersion: 0,
            }
          );

        transactions.forEach((item) => {
          if (!item) return;

          item.transaction.message.instructions.forEach((i) => {
            const instruction = i as PartiallyDecodedInstruction;

            if (
              instruction.programId.toBase58() !== KAMINO_PROGRAM_ID.toBase58()
            )
              return;

            const decodedBs58Instruction = coder.decode(
              Buffer.from(bs58.decode(instruction.data))
            );

            if (
              !decodedBs58Instruction ||
              (decodedBs58Instruction.name !== "invest" &&
                decodedBs58Instruction.name !== "depositAndInvest" &&
                decodedBs58Instruction.name !== "deposit" &&
                decodedBs58Instruction.name !== "withdraw")
            )
              return;

            const accounts = KAMINO_IDL.instructions.find(
              (idlInstruction) =>
                idlInstruction.name === decodedBs58Instruction.name
            )?.accounts;

            if (!accounts) return;

            data.push({
              transactionType: decodedBs58Instruction.name,
              tx: item.transaction.signatures[0],
              vaultName: renderVaultName(instruction.accounts[1].toBase58()),
              vaultAddress: instruction.accounts[1].toBase58(),
              timestamp: item.blockTime || 0,
            });
          });
        });

        setAllTransactions((prev) => [...prev, ...data]);
      } catch {
      } finally {
        setLoadingTransactions(false);
      }
    },
    [loadingTransactions]
  );

  const filterVolumeVaults = useCallback(
    (period: TYPE_PERIOD) => {
      if (!vaultsVolume) return;

      const newData: VaultsVolumes[] = [];

      vaultsVolume.forEach((item: any) => {
        const strategy = item.strategy;

        const filter = item.kaminoVolume.filter(
          (kaminoVol: Volume) => kaminoVol.period === period
        )[0];

        newData.push({
          strategy,
          kaminoVolume: filter,
        });
      });

      newData.sort((a, b) => {
        const volA = Number(a.kaminoVolume.amount);
        const volB = Number(b.kaminoVolume.amount);

        if (volA > volB) {
          return -1;
        } else if (volA < volB) {
          return 1;
        } else {
          return 0;
        }
      });

      return newData.slice(0, 10);
    },
    [vaultsVolume]
  );

  const fetchFeesAndRewards = useCallback(async (period: TYPE_PERIOD) => {
    try {
      let newData: FeesAndRewardsChart[] = [];

      const response = await api.get(
        `/strategies/fees-and-rewards?status=LIVE&period=${period}`
      );
      const result: FeesAndRewards[] = response.data;

      result.forEach((item: FeesAndRewards) => {
        const calcFees =
          Number(item.feesAEarnedUsd) + Number(item.feesBEarnedUsd);
        const calcRewards =
          Number(item.rewards0EarnedUsd) +
          Number(item.rewards1EarnedUsd) +
          Number(item.rewards2EarnedUsd);
        const calcKaminoRewards =
          Number(item.kaminoRewards0EarnedUsd) +
          Number(item.kaminoRewards1EarnedUsd) +
          Number(item.kaminoRewards2EarnedUsd);

        newData.push({
          strategy: item.strategyPubkey,
          feesEarnedUsd: calcFees,
          rewardsEarnedUsd: calcRewards,
          kaminoRewards: calcKaminoRewards,
          totalUsd: Number(item.totalUsd),
        });
      });

      setFeesAndRewards(newData);
    } catch {}
  }, []);

  const value = useMemo(
    () => ({
      historyVolume,
      allTimeFees,
      tvl,
      volPerPeriod,
      feesAndRewards,
      allTransactions,
      fetchHistoryVolume,
      fetchAllTimeFees,
      fetchTvl,
      fetchVolume,
      filterVolumeVaults,
      fetchFeesAndRewards,
      fetchTransactions,
    }),
    [
      historyVolume,
      allTimeFees,
      tvl,
      volPerPeriod,
      feesAndRewards,
      allTransactions,
      fetchHistoryVolume,
      fetchAllTimeFees,
      fetchTvl,
      fetchVolume,
      filterVolumeVaults,
      fetchFeesAndRewards,
      fetchTransactions,
    ]
  );

  return (
    <StrategiesContext.Provider value={value} {...rest}>
      {children}
    </StrategiesContext.Provider>
  );
};

export const useStrategies = (): ContextValue => {
  const context = useContext(StrategiesContext);

  if (context === undefined) {
    throw new Error("useStrategies must be used within an StrategiesProvider");
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

const { kamino } = getConfigByCluster("mainnet-beta");
const KAMINO_PROGRAM_ID = kamino.programId;
