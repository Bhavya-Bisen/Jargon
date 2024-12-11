"use client";

import { Footer } from "./(Template)/Footer";
import { usePathname } from "next/navigation";

export const ConditionalFooter: React.FC = () => {
  const pathname = usePathname(); // Get the current route

  // Only render Footer if the route is not `/Login`
  if (pathname === "/Login") {
    return null;
  }

  return <Footer />;
};
