"use client";

import { TYPE_PERIOD, VolumeHistoryChart } from "@/types/strategies";
import api from "@/utils/api-service";
import { network } from "@/utils/constants";
import moment from "moment";
import React, { useCallback, useContext, useMemo, useState } from "react";

interface Props {
  children: JSX.Element;
}

export type ContextValue = {
  historyVolume: VolumeHistoryChart[];
  fetchHistoryVolume: (period: TYPE_PERIOD) => Promise<void>
};

export const StrategiesContext = React.createContext<ContextValue | undefined>(
  undefined
);

export const StrategiesProvider: React.FC<Props> = ({ children, ...rest }) => {
  const [historyVolume, setHistoryVolume] = useState<VolumeHistoryChart[]>([]);

  const fetchAllStrategies = useCallback(async () => {
    try {
      const response = await api.get(`/strategies?env=${network}&status=LIVE`);

      return response.data;
    } catch {
      throw new Error("Failed in fetchAllStrategies");
    }
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
              const convertDate = new Date(date)
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
      } catch {
        throw new Error("Failed in fetchHistoryVolume");
      }
    },
    [fetchAllStrategies]
  );

  const value = useMemo(
    () => ({
      historyVolume,
      fetchHistoryVolume
    }),
    [historyVolume, fetchHistoryVolume]
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
