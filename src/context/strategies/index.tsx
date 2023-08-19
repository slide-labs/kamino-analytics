"use client";

import {
  PoolAndKaminoVolumes,
  TYPE_PERIOD,
  VolPerPeriod,
  Volume,
  VolumeHistoryChart,
} from "@/types/strategies";
import api from "@/utils/api-service";
import { network } from "@/utils/constants";
import moment from "moment";
import React, { useCallback, useContext, useMemo, useState } from "react";

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
