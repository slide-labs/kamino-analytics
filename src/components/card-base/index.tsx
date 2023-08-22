"use client";

import React from "react";

interface Props {
  data: {
    title: string;
    value: string | number;
  };
  textSizeValue?: number;
  textSizeTitle?: number;
  mb?: number;
}

const CardBase: React.FC<Props> = ({
  data,
  textSizeValue,
  textSizeTitle,
  mb,
}) => {
  return (
    <div className="px-6 py-4 bg-kamino-midnight-blue">
      <span
        style={{ fontSize: textSizeTitle, marginBottom: mb }}
        className="text-sm font-semibold text-kamino-steel-blue mb-1.5 flex"
      >
        {data.title}
      </span>
      <span
        style={{ fontSize: textSizeValue }}
        className="text-3xl font-medium text-white leading-5"
      >
        {data.value}
      </span>
    </div>
  );
};

export default CardBase;
