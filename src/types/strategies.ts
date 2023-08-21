export interface Strategie {
  address: string;
  type: TYPE_STRATEGY;
  shareMint: string;
  status: STATUS_STRATEGY;
  tokenAMint: string;
  tokenBMint: string;
}

export interface KaminoTransaction {
  type: string;
  tokenAAmount: number;
  tokenBAmount: number;
  vaultName: string;
  vaultAddress: string;
  timestamp: number;
}

export interface PoolAndKaminoVolumes {
  kaminoVolume: Volume[];
  poolVolume?: Volume[];
  strategy: string;
}

export interface VaultsVolumes {
  kaminoVolume: Volume;
  strategy: string;
}

export interface Volume {
  period: TYPE_PERIOD;
  amount: number;
}

export interface VolumeHistory {
  date: string;
  feesAndRewards24hUsd: string;
  volume24hUsd: string;
  cumulativeFeesAndRewardsUsd: string;
  apy24h: string;
}

export interface VolPerPeriod {
  [key: string]: Volume;
}

export interface VolumeWithStrategy extends Volume {
  strategy: string;
}

export interface VolumeHistoryChart {
  date: number;
  volume24hUsd: number;
}

export type TYPE_PERIOD = "24h" | "7d" | "30d";

export type TYPE_STRATEGY = "NON_PEGGED" | "PEGGED";

export type STATUS_STRATEGY =
  | "LIVE"
  | "STAGING"
  | "SHADOW"
  | "IGNORED"
  | "DEPRECATED";
