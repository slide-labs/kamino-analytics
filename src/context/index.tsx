"use client";

import React from "react";

import { SolanaProvider } from "./solana";
import { StrategiesProvider } from "./strategies";

interface Props {
  children: JSX.Element;
}

const AppProvider: React.FC<Props> = ({ children }) => (
  <SolanaProvider>
    <StrategiesProvider>{children}</StrategiesProvider>
  </SolanaProvider>
);

export default AppProvider;
