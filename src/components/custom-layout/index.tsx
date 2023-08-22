"use client";

import React from "react";
import NextProgress from "../next-progress";
import Header from "../header";
import classNames from "@/utils/class-name";
import { usePathname } from "next/navigation";
import Menu from "../menu";

interface Props {
  children: React.ReactNode;
}

const CustomLayout: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="w-full min-h-screen flex-1 flex flex-col bg-kamino-blue-dark">
      <NextProgress />
      <Header />
      <div
        className={classNames(
          "container-main w-full flex !mt-[72px] min-h-[calc(100vh-72px)]",
          pathname !== "/roadmap" && "gap-x-[32px]"
        )}
      >
        <div className="relative w-[220px] min-w-[220px] min-h-full">
          <div className="fixed w-[220px] min-w-[220px] h-full max-h-[calc(100vh-72px)]">
            <Menu />
          </div>
        </div>

        <div
          className={classNames(
            "w-full max-w-[calc(100%-220px)] min-h-full pr-3",
            pathname !== "/roadmap" && "pt-10"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomLayout;
