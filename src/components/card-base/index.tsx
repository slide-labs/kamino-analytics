"use client";

import React from "react";

interface Props {
  data: {
    title: string;
    value: string | number;
  };
}

const CardBase: React.FC<Props> = ({ data }) => {
  return (
    <div className="px-6 py-5 bg-kamino-midnight-blue">
      <span className="text-sm font-semibold text-kamino-steel-blue mb-2.5 flex">
        {data.title}
      </span>
      <span className="text-3xl font-medium text-white">{data.value}</span>
    </div>
  );
};

export default CardBase;
