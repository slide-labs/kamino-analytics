export interface PnlShareholderStrategy {
  strategy: string;
  pnlUsd: number;
}

export interface HistoryTransactions {
  createdOn: string;
  numberOfShares: string;
  sharePrice: string;
  solPrice: string;
  strategy: string;
  timestamp: number;
  tokenA: string;
  tokenAAmount: string;
  tokenAPrice: string;
  tokenB: string;
  tokenBAmount: string;
  tokenBPrice: string;
  transactionName: string;
  transactionSignature: string;
  usdValue: string;
}

export interface Balances {
  totalDeposit: number;
  totalWithdraw: number;
  vaultsUsed: number;
  lastDeposit: number;
}
