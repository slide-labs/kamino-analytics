import classNames from "@/utils/class-name";
import { ibm_mono, ibm_sans } from "@/utils/fonts";
import React from "react";

interface Props {
  tooltipMessage: string;
  children: React.ReactNode;
  direction: "top" | "bottom" | "left" | "right";
  className?: string;
  styleMessage?: string;
}

const Tooltip: React.FC<Props> = ({
  children,
  tooltipMessage,
  direction = "bottom",
  className,
  styleMessage,
}) => {
  const message =
    tooltipMessage.length > 170
      ? tooltipMessage.substring(0, 170) + "..."
      : tooltipMessage;

  return (
    <div
      className={classNames(
        "tooltip relative cursor-pointer flex justify-center w-fit",
        className
      )}
    >
      <div className="w-full h-full flex">{children}</div>

      {message && (
        <div
          style={{ border: "0.5px solid #FFFFFF12" }}
          className={classNames(
            styleMessage,
            direction,
            "tooltip-content pointer-events-none flex opacity-0 text-sm items-center justify-center rounded-[4px] absolute max-w-[400px] min-w-max py-[7px] px-[14px] text-white z-10 bg-[#222b3c]"
          )}
        >
          <span className="max-w-[400px]">{message}</span>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
