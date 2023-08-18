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
        <div className="block-top-left top-[1px] left-[1px]" />
        <div className="cut-corner top-0 left-0" />

        <div className="block-bottom-right bottom-[1px] right-[1px] rotate-180" />
        <div className="cut-corner bottom-0 right-0 rotate-180" />
      </>
    ),
    []
  );

  const blockLineBorders = useMemo(() => (
    <>
      <div className="absolute top-0 h-[1px] left-6 right-3 bg-[#222b3c] z-[11]" />
      <div className="absolute bottom-0 h-[1px] right-6 left-3 bg-[#222b3c] z-[11]" />
      <div className="absolute top-6 bottom-3 w-[1px] left-0 bg-[#222b3c] z-[11]" />
      <div className="absolute top-3 bottom-6 w-[1px] right-0 bg-[#222b3c] z-[11]" />
    </>
  ), [])

  const blockBorders = useMemo(() => (
    <>
      <div className="absolute w-3 h-3 left-0 bottom-0 border-l border-b border-[#464F66] z-[11]" />
      <div className="absolute w-3 h-3 right-0 top-0 border-r border-t border-[#464F66] z-[11]" />
    </>
  ), [])

  return (
    <div
      className={classNames(
        className,
        "w-full relative card-box-custom px-4"
      )}
    >
      {blockStyles}
      {blockLineBorders}
      {blockBorders}

      <div className="w-4 absolute bottom-0 left-0 top-4 bg-kamino-midnight-blue" />
      <div className="w-4 absolute top-0 right-0 bottom-4 bg-kamino-midnight-blue" />

      <div className="bg-kamino-midnight-blue relative z-[1] pt-6 pb-0 h-full">
        {title && (
          <span className="text-xl font-medium text-white flex mb-6 px-2">
            {title}
          </span>
        )}

        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default CardBoxCustom;
