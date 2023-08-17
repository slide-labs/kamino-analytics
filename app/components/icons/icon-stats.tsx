"use client";

import React from "react";

interface Props {
  active?: boolean;
}

const IconStats: React.FC<Props> = ({ active }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_12729_2158)">
        <path
          d="M1.37001 18.615H19.315C19.694 18.615 20 18.925 20 19.308C20.0008 19.4906 19.9291 19.666 19.8007 19.7957C19.6722 19.9255 19.4976 19.9989 19.315 20H0.685007C0.502446 19.9989 0.327767 19.9255 0.199333 19.7957C0.0708987 19.666 -0.000791384 19.4906 6.59093e-06 19.308V0.692C6.59093e-06 0.31 0.306007 0 0.685007 0C1.06301 0 1.36901 0.31 1.36901 0.692V18.615H1.37001ZM2.83601 17.4L5.58901 11.83L8.34301 13.222L11.785 9.043L14.539 11.133L18.67 4.865V17.4H2.83701H2.83601Z"
          fill={active ? "#49AFE9" : "#FFFFFF"}
        />
      </g>
      <defs>
        <clipPath id="clip0_12729_2158">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconStats;
