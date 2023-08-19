"use serve";

import { fetchGeneralStats, fetchHistoryVolume, fetchVolume } from "@/repository/strategies";
import StatsTemplate from "@/templates/stats";
import React from "react";

export const metadata = {
  title: "Stats | Kamino Analytics",
};

const Stats: React.FC = async () => {
  const generalStats = await fetchGeneralStats();
  const volumePerPeriod = await fetchVolume();
  const historyVolume = await fetchHistoryVolume("24h")

  return (
    <StatsTemplate
      generalStats={generalStats}
      volumePerPeriod={volumePerPeriod}
      historyVolume={historyVolume}
    />
  );
};

export default Stats;
