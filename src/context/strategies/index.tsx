"use client";

import {
  PoolAndKaminoVolumes,
  TYPE_PERIOD,
  VaultsVolumes,
  VolPerPeriod,
  Volume,
  VolumeHistoryChart,
  VolumeWithStrategy,
} from "@/types/strategies";
import api from "@/utils/api-service";
import { network } from "@/utils/constants";
import { data } from "autoprefixer";
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
  filterVolumeVaults: (period: string) => VaultsVolumes[] | undefined;
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
  const [vaultsVolume, setVaultsVolume] = useState<PoolAndKaminoVolumes[]>();

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

  const filterVolumeVaults = useCallback(
    (period: string) => {
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

      return newData;
    },
    [vaultsVolume]
  );

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
      filterVolumeVaults,
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
      filterVolumeVaults,
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
