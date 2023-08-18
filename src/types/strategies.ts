export enum TypePeriod {
  "24h" = "24h",
  "7d" = "7d",
  "30d" = "30d",
  "all" = "all"
}

export interface PoolAndKaminoVolumes {
  kaminoVolume: Volume[];
  poolVolume: Volume[];
}

export interface Volume {
  period: TypePeriod;
  amount: number;
}

export interface GeneralStats {
  tvl: number;
  allTimeFees: number;
}
