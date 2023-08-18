import {
  GeneralStats,
  PoolAndKaminoVolumes,
  TypePeriod,
  Volume,
} from "@/types/strategies";
import api from "@/utils/api-service";
import { network } from "@/utils/constants";

export const fetchVolume = async (time: TypePeriod) => {
  const volume = await api.get(`/strategies/volume?env=${network}&status=LIVE`);

  const kaminoVol = volume.data.map(
    (item: PoolAndKaminoVolumes) => item.kaminoVolume
  );

  let sum = 0;

  kaminoVol.forEach((kaminoItem: Volume[]) => {
    const filter = kaminoItem.filter((item: Volume) => item.period === time);
    if (filter.length > 0) {
      const convertVolToNumber = Number(filter[0].amount);
      sum += convertVolToNumber;
    }
  });

  const data: Volume = {
    period: time,
    amount: sum,
  };

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
