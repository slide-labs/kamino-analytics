export interface Strategy {
  address: string;
  type: TYPE_STRATEGY;
  shareMint: string;
  status: STATUS_STRATEGY;
  tokenAMint: string;
  tokenBMint: string;
}

export interface KaminoTransaction {
  transactionType: string;
  tx: string;
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

export interface FeesAndRewards {
  strategyPubkey: string;
  feesAEarned: string;
  feesBEarned: string;
  rewards0Earned: string;
  rewards1Earned: string;
  rewards2Earned: string;
  kaminoRewards0Earned: string;
  kaminoRewards1Earned: string;
  kaminoRewards2Earned: string;
  feesAEarnedUsd: string;
  feesBEarnedUsd: string;
  rewards0EarnedUsd: string;
  rewards1EarnedUsd: string;
  rewards2EarnedUsd: string;
  kaminoRewards0EarnedUsd: string;
  kaminoRewards1EarnedUsd: string;
  kaminoRewards2EarnedUsd: string;
  totalUsd: string;
  lastCalculated: string;
}

export interface FeesAndRewardsChart {
  strategy: string;
  feesEarnedUsd: number;
  rewardsEarnedUsd: number;
  kaminoRewards: number;
  totalUsd: number;
}

export type TYPE_PERIOD = "24h" | "7d" | "30d";

export type TYPE_STRATEGY = "NON_PEGGED" | "PEGGED";

export type STATUS_STRATEGY =
  | "LIVE"
  | "STAGING"
  | "SHADOW"
  | "IGNORED"
  | "DEPRECATED";
