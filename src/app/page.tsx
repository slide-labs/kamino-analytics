"use serve";

import { fetchTvl } from "@/repository/strategies";
import StatsTemplate from "@/templates/stats";
import React from "react";

export const metadata = {
  title: "Stats | Kamino Analytics",
};

const Stats: React.FC = async () => {
  const tvl = await fetchTvl()
  console.log(tvl)

  return <StatsTemplate />;
};

export default Stats;

