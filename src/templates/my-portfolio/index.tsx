"use client";

import React, { useMemo } from "react";
import CardBase from "@/components/card-base";

const MyPortfolioTemplate: React.FC = () => {
  const generalStats = useMemo(() => {
    return [
      {
        title: "TVL",
        value: "$279.2M",
      },
      {
        title: "Volume 24H",
        value: "$456K",
      },
      {
        title: "Volume 7D",
        value: "$5.25M",
      },
      {
        title: "Total Fees",
        value: "$200K",
      },
      {
        title: "Total Users",
        value: "5.000",
      },
    ];
  }, []);

  return (
    <div>
      <h1 className="text-white font-semibold text-[28px] mb-[30px]">Stats</h1>

      <div className="w-full grid grid-cols-5 gap-x-[7px] mb-3">
        {generalStats.map((item, index) => (
          <CardBase key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default MyPortfolioTemplate;
