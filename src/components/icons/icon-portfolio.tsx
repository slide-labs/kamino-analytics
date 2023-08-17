"use client";

import React from "react";

interface Props {
  active?: boolean;
}

const IconPortfolio: React.FC<Props> = ({ active }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_12729_2148"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="1"
        y="0"
        width="19"
        height="20"
      >
        <path
          d="M15.8333 8.33333H7.5V11.6667H15.8333V8.33333ZM13.3333 2.5H7.5V5.83333H13.3333V2.5ZM18.3333 14.1667H7.5V17.5H18.3333V14.1667Z"
          fill={active ? "#49AFE9" : "#FFFFFF"}
          stroke={active ? "#49AFE9" : "#FFFFFF"}
          strokeWidth="1.66667"
          strokeLinejoin="round"
        />
        <path
          d="M7.0835 4.16669H2.0835M7.0835 10H2.0835M7.0835 15.8334H2.0835M2.0835 18.3334V1.66669"
          stroke={active ? "#49AFE9" : "#FFFFFF"}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask0_12729_2148)">
        <path d="M0 0H20V20H0V0Z" fill={active ? "#49AFE9" : "#FFFFFF"} />
      </g>
    </svg>
  );
};

export default IconPortfolio;
