import {
  GeneralStats,
  PoolAndKaminoVolumes,
  TypePeriod,
  Volume,
} from "@/types/strategies";
import api from "@/utils/api-service";
import { network } from "@/utils/constants";

export const fetchVolume = async () => {
  const volume = await api.get(`/strategies/volume?env=${network}&status=LIVE`);

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
    throw new Error("Failed to fetch data");
  }
};
