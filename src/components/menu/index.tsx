"use client";

import React, { useCallback, useMemo } from "react";
import IconStats from "../icons/icon-stats";
import IconPortfolio from "../icons/icon-portfolio";
import { usePathname, useRouter } from "next/navigation";
import classNames from "@/utils/class-name";
import Link from "next/link";
import IconLaunch from "../icons/icon-launch";
import IconArrowLink from "../icons/icon-arrow-link";
import Image from "next/image";
import Button from "../button";
import IconRoadmap from "../icons/icon-roadmap";
import { useSolana } from "@/context/solana";
import { useWallet } from "@solana/wallet-adapter-react";

const Menu: React.FC = () => {
  const navigate = useRouter();
  const wallet = useWallet();
  const { setOpenConnect } = useSolana();
  const pathname = usePathname();

  const isActive = useCallback(
    (route: string) => {
      if (pathname === route) return true;
    },
    [pathname]
  );

  const menuRoutes = useMemo(() => {
    return [
      {
        title: "Stats",
        route: "/",
        icon: IconStats,
        action: () => navigate.push("/"),
      },
      {
        title: "My Portfolio",
        route: "/my-portfolio",
        icon: IconPortfolio,
        action: () =>
          !wallet.connected
            ? setOpenConnect(true)
            : navigate.push("/my-portfolio"),
      },
      {
        title: "Roadmap",
        route: "/roadmap",
        icon: IconRoadmap,
        action: () => navigate.push("/roadmap"),
      },
    ];
  }, [navigate, setOpenConnect, wallet.connected]);

  return (
    <div className="w-full h-full flex flex-col justify-between border-r border-[#FFFFFF14] pt-9">
      <ul className="w-full pr-5">
        {menuRoutes.map((item, index) => (
          <Button
            onClick={item.action}
            key={index}
            className={classNames(
              isActive(item.route) && "bg-[#151E33]",
              "hover:bg-[#151E33] transition-1s mb-3"
            )}
          >
            <li
              className={classNames(
                "flex items-center w-full h-10 cursor-pointer px-3"
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
          </Button>
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
