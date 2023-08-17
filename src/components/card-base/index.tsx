"use client";

import React from "react";

interface Props {
  data: {
    title: string;
    value: string;
  };
}

const CardBase: React.FC<Props> = ({ data }) => {
  return (
    <div className="px-6 py-4 bg-kamino-midnight-blue">
      <span className="text-xs font-semibold text-kamino-steel-blue mb-1.5 flex">
        {data.title}
      </span>
      <span className="text-[26px] font-medium text-white leading-5">{data.value}</span>
    </div>
  );
};

export default CardBase;
