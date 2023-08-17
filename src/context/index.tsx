import React from "react";

import { SolanaProvider } from "./solana";

interface Props {
  children: JSX.Element;
}

const AppProvider: React.FC<Props> = ({ children }) => (
  <SolanaProvider>{children}</SolanaProvider>
);

export default AppProvider;
