"use client";

import classNames from "@/app/utils/class-name";
import React, { useMemo } from "react";
import IconSearch from "../icons/icon-search";

interface Props {
  className?: string;
}

const Input: React.FC<Props> = ({ className }) => {
  const blockStyles = useMemo(
    () => (
      <>
        <div className="input-block-top-left -top-[1px] -left-[1px] rotate-90" />
        <div className="input-cut-corner-left" />

        <div className="input-block-custom block-top-right -top-[1px] -right-[1px]" />
        <div className="input-block-custom block-bottom-left -bottom-[1px] -left-[1px]" />
        <div className="input-block-bottom-right -bottom-[1px] -right-[1px] -rotate-90" />
        <div className="input-cut-corner-right" />
      </>
    ),
    []
  );

  return (
    <div
      className={classNames(
        className,
        "w-full bg-[#182133] border border-[#242b3b] relative input-block-main-custom h-[40px]"
      )}
    >
      {blockStyles}

      <div className="bg-[#182133] relative z-[1] h-full flex items-center">
        <input className="h-full w-full px-4 text-sm text-white placeholder:text-[#FFFFFF33]" type="text" placeholder="Search whirpools, strategies, tokens..." />
        <IconSearch className="absolute right-4" />
      </div>
    </div>
  );
};

export default Input;
