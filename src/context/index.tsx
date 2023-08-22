"use client";

import React from "react";
import { SolanaProvider } from "./solana";
import { StrategiesProvider } from "./strategies";
import { ShareholderProvider } from "./shareholder";

interface Props {
  children: JSX.Element;
}

const AppProvider: React.FC<Props> = ({ children }) => (
  <SolanaProvider>
    <StrategiesProvider>
      <ShareholderProvider>{children}</ShareholderProvider>
    </StrategiesProvider>
  </SolanaProvider>
);

export default AppProvider;
