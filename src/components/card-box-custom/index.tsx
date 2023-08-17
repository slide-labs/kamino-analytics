"use client";

import classNames from "@/utils/class-name";
import React, { useMemo } from "react";

interface Props {
  title?: string;
  children: JSX.Element;
  className?: string;
}

const CardBoxCustom: React.FC<Props> = ({ title, children, className }) => {
  const blockStyles = useMemo(
    () => (
      <>
        <div className="block-top-left -top-[1px] -left-[1px] rotate-90" />
        <div className="cut-corner-left" />

        <div className="block-custom block-top-right -top-[1px] -right-[1px]" />
        <div className="block-custom block-bottom-left -bottom-[1px] -left-[1px]" />
        <div className="block-bottom-right -bottom-[1px] -right-[1px] -rotate-90" />
        <div className="cut-corner-right" />
      </>
    ),
    []
  );

  return (
    <div
      className={classNames(
        className,
        "w-full bg-kamino-midnight-blue border border-[#242b3b] relative card-box-custom"
      )}
    >
      {blockStyles}

      <div className="bg-kamino-midnight-blue relative z-[1] pt-6 pb-0 h-full">
        {title && (
          <span className="text-xl font-medium text-white flex mb-6 px-6">
            {title}
          </span>
        )}

        <div className="w-full px-4">{children}</div>
      </div>
    </div>
  );
};

export default CardBoxCustom;
