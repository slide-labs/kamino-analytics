"use serve";

import { fetchGeneralStats, fetchVolume } from "@/repository/strategies";
import StatsTemplate from "@/templates/stats";
import { TypePeriod } from "@/types/strategies";
import React, { useMemo } from "react";

export const metadata = {
  title: "Stats | Kamino Analytics",
};

const Stats: React.FC = async () => {
  const generalStats = await fetchGeneralStats();
  const volumePerPeriod = await fetchVolume();


  return (
    <StatsTemplate
      generalStats={generalStats}
      volumePerPeriod={volumePerPeriod}
    />
  );
};

export default Stats;
