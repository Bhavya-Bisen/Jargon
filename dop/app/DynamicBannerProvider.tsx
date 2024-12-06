"use client";

import React, { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./(Template)/Header";

const bannerMap: Record<string, string> = {
  "/LocatePO": "/LocatePO.png",
  "/TrackNTrace": "/TrackNTrace.png",
};

export const DynamicBannerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname(); // Works only in Client Components
  const bannerSrc = bannerMap[pathname] || "/Banner1.png";

  return (
    <>
      <Header bannerSrc={bannerSrc} />
      {children}
    </>
  );
};
