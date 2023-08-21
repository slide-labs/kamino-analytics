import { AnchorProvider } from "@project-serum/anchor";
import { Connection, Keypair, Transaction } from "@solana/web3.js";
import HELIUS_API from "./helius";

export const network = "mainnet-beta";

export type Network = "mainnet-beta" | "devnet";

export const provider = new AnchorProvider(
  new Connection(HELIUS_API),
  {
    publicKey: Keypair.generate().publicKey,
    signAllTransactions: async (txs: Transaction[]) => txs,
    signTransaction: async (txs: Transaction) => txs,
  },
  { commitment: "confirmed" }
);
