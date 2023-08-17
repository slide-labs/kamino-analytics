"use client";

import React, { useCallback } from "react";
import IconStats from "../icons/icon-stats";
import IconPortfolio from "../icons/icon-portfolio";
import { usePathname } from "next/navigation";
import classNames from "@/utils/class-name";
import Link from "next/link";
import IconLaunch from "../icons/icon-launch";
import IconArrowLink from "../icons/icon-arrow-link";
import Image from "next/image";

const Menu: React.FC = () => {
  const pathname = usePathname();

  const isActive = useCallback(
    (route: string) => {
      if (pathname === route) return true;
    },
    [pathname]
  );

  return (
    <div className="w-full h-full flex flex-col justify-between border-r border-[#FFFFFF14] pt-9">
      <ul className="w-full pr-5">
        {menuRoutes.map((item, index) => (
          <Link key={index} href={item.route}>
            <li
              className={classNames(
                "flex items-center w-full h-10 hover:bg-[#151E33] cursor-pointer px-3 rounded-[10px] mb-3 transition-1s",
                isActive(item.route) && "bg-[#151E33]"
              )}
            >
              <div className="w-8">
                <item.icon active={isActive(item.route)} />
              </div>
              <span
                className={classNames(
                  "text-sm font-semibold",
                  isActive(item.route) ? "text-kamino-blue-light" : "text-white"
                )}
              >
                {item.title}
              </span>
            </li>
          </Link>
        ))}
      </ul>

      <div className="w-full">
        <Link
          href="https://app.kamino.finance/"
          className="w-full flex items-center h-9 mb-5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconLaunch />
          <span className="text-[#98B0C1] font-semibold text-sm ml-3 mr-1.5">
            Launch App
          </span>
          <IconArrowLink />
        </Link>

        <div className="w-[100%] flex items-center justify-center h-[67px] bg-[#161F32]">
          <span className="text-xs font-medium text-[#5F7183] mr-3">
            Powered by
          </span>
          <Link
            href="https://slidelabs.xyz/"
            className=""
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/img/logo-slidelabs.webp"
              alt="Slide_Labs"
              width={82}
              height={24}
              className="object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;

//
// utils
//

const menuRoutes = [
  {
    title: "Stats",
    route: "/",
    icon: IconStats,
  },
  {
    title: "My Portfolio",
    route: "/my-portfolio",
    icon: IconPortfolio,
  },
];
