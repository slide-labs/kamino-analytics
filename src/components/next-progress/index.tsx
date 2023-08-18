"use client";

import React, { useEffect } from "react";
import NProgress from "nprogress";
import NextNProgress from "nextjs-progressbar";
import { usePathname, useSearchParams } from "next/navigation";

const NextProgress: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.start();
  }, [pathname]);

  useEffect(() => {
    NProgress.done();
  }, [searchParams]);

  return (
    <NextNProgress
      color="#49AFE9"
      startPosition={0.4}
      stopDelayMs={200}
      height={2}
      showOnShallow={true}
      options={{ easing: "ease", speed: 500 }}
    />
  );
};

export default NextProgress;
