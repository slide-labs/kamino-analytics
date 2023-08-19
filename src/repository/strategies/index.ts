import {
  GeneralStats,
  PoolAndKaminoVolumes,
  TYPE_PERIOD,
  Volume,
  VolumeHistoryChart,
} from "@/types/strategies";
import api from "@/utils/api-service";
import { network } from "@/utils/constants";

export const fetchAllStrategies = async () => {
  try {
    const response = await api.get(`/strategies??env=${network}&status=LIVE`);

    return response.data;
  } catch {
    throw new Error("Failed in fetchAllStrategies");
  }
};

export const fetchGeneralStats = async () => {
  try {
    const tvl = await api.get(`/strategies/tvl?env=${network}`);
    const allTimeFees = await api.get(
      `strategies/all-time-fees-and-rewards?env=${network}`
    );

    const data: GeneralStats = {
      tvl: Number(tvl.data.tvl),
      allTimeFees: Number(allTimeFees.data.totalUsd),
    };

    return data;
  } catch {
    throw new Error("Failed in fetchGeneralStats");
  }
};

export const fetchVolume = async () => {
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

    return data;
  } catch {
    throw new Error("Failed in fetchVolume");
  }
};

export const fetchHistoryVolume = async (period: TYPE_PERIOD) => {
  try {
    const strategies = await fetchAllStrategies();

    const newData: VolumeHistoryChart[] = [];
    let volUsd = 0;

    for (const { address } of strategies) {
      const metricsHistory = await api.get(
        `/strategies/${address}/metrics/history?env=${network}&period=${period}`
      );

      metricsHistory.data.forEach(
        ({ date, volume24hUsd }: VolumeHistoryChart) => {
          volUsd += Number(volume24hUsd);
          newData.push({
            date: date,
            volume24hUsd: volUsd,
          });
        }
      );
    }

    return newData;
  } catch {
    throw new Error("Failed in fetchHistoryVolume");
  }
};
