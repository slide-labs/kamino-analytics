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
  const volPeriod24h = await fetchVolume("24h" as TypePeriod);
  const volPeriod7d = await fetchVolume("7d" as TypePeriod);


  return (
    <StatsTemplate
      generalStats={generalStats}
      volPeriod24h={volPeriod24h}
      volPeriod7d={volPeriod7d}
    />
  );
};

export default Stats;
