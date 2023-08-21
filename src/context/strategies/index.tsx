"use client";

import {
  KaminoTransaction,
  PoolAndKaminoVolumes,
  TYPE_PERIOD,
  VolPerPeriod,
  Volume,
  VolumeHistoryChart,
} from "@/types/strategies";
import api from "@/utils/api-service";
import { network, provider } from "@/utils/constants";
import {
  Idl,
  Program,
  AnchorProvider,
  BorshInstructionCoder,
  BorshAccountsCoder,
} from "@project-serum/anchor";
import * as borsh from "@project-serum/borsh";
import moment from "moment";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSolana } from "../solana";
import { getConfigByCluster } from "@hubbleprotocol/hubble-config";
import { KAMINO_IDL } from "@hubbleprotocol/hubble-idl";
import {
  Keypair,
  PartiallyDecodedInstruction,
  Transaction,
} from "@solana/web3.js";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";

interface Props {
  children: JSX.Element;
}

export type ContextValue = {
  historyVolume: VolumeHistoryChart[];
  allTimeFees: number;
  tvl: number;
  volPerPeriod: VolPerPeriod | undefined;
  fetchHistoryVolume: (period: TYPE_PERIOD) => Promise<void>;
  fetchAllTimeFees: () => Promise<void>;
  fetchTvl: () => Promise<void>;
  fetchVolume: () => Promise<void>;
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
  const { connection } = useSolana();
  const [allTransactions, setAllTransactions] = useState<KaminoTransaction[]>(
    []
  );

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

      const kaminoVol = volume.data.map(
        (item: PoolAndKaminoVolumes) => item.kaminoVolume
      );

      const data: { [key: string]: Volume } = {};

      kaminoVol.forEach((kaminoItem: Volume[]) => {
        kaminoItem.forEach((item: Volume) => {
          const period = item.period;
          const convertVolToNumber = Number(item.amount);

          if (!data[period]) {
            data[period] = {
              period: period,
              amount: 0,
            };
          }

          data[period].amount += convertVolToNumber;
        });
      });

      setVolPerPeriod(data);
    } catch {
      throw new Error("Failed in fetchVolume");
    }
  }, []);

  const fetchTransactions = useCallback(async () => {
    try {
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
            limit: 10,
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

          if (instruction.programId.toBase58() !== KAMINO_PROGRAM_ID.toBase58())
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
            type: decodedBs58Instruction.name,
            tokenAAmount: 0,
            tokenBAmount: 0,
            vaultName: "",
            vaultAddress: "",
            timestamp: 0,
          });

          instruction.accounts.forEach((account, index) => {
            console.log(account.toBase58());
            console.log(accounts[index]);
            console.log("-----");
          });
        });
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const value = useMemo(
    () => ({
      historyVolume,
      allTimeFees,
      tvl,
      volPerPeriod,
      fetchHistoryVolume,
      fetchAllTimeFees,
      fetchTvl,
      fetchVolume,
    }),
    [
      historyVolume,
      allTimeFees,
      tvl,
      volPerPeriod,
      fetchHistoryVolume,
      fetchAllTimeFees,
      fetchTvl,
      fetchVolume,
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
