"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent, getVariant } from "@/lib/analytics";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize variant on mount
    getVariant();
  }, []);

  useEffect(() => {
    trackEvent("page_view", { path: pathname });
  }, [pathname]);

  return <>{children}</>;
}
