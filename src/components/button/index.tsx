import classNames from "@/utils/class-name";
import React, { useMemo } from "react";

interface Props {
  children: JSX.Element;
  className: string;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ children, className, onClick }) => {
  const blockStyles = useMemo(
    () => (
      <>
        <div className="button-block-top-left -top-[1px] -left-[1px] rotate-90" />

        <div className="button-block-bottom-right -bottom-[1px] -right-[1px] -rotate-90" />
      </>
    ),
    []
  );
  return (
    <div
      onClick={onClick}
      className={classNames(
        className,
        "w-full relative button-block-main-custom h-[40px]"
      )}
    >
      {blockStyles}

      <div className="relative z-[1] h-full w-full">{children}</div>
    </div>
  );
};

export default Button;
