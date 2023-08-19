"use client";

import classNames from "@/utils/class-name";
import React from "react";

interface Props {
  data: {
    value: string
  }[];
  currentValue: string;
  setCurrentValue?: React.Dispatch<React.SetStateAction<string>>;
}

const Filter: React.FC<Props> = ({ data, currentValue, setCurrentValue }) => {
  return (
    <div className="flex items-center">
      {data.map((item, index) => (
        <div
          key={index}
          onClick={() => setCurrentValue && setCurrentValue(item.value)}
          className={classNames(
            "text-xs font-medium px-2 flex leading-[12px] items-center uppercase justify-center hover:text-kamino-blue-light border-r border-[#242F42] last-of-type:border-0 cursor-pointer first-of-type:pl-1 last-of-type:pr-0",
            item.value === currentValue
              ? "text-kamino-blue-light"
              : "text-kamino-steel-blue"
          )}
        >
          {item.value}
        </div>
      ))}
    </div>
  );
};

export default Filter;
