"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

export function StickyCta() {
  const t = useTranslations("nav");
  const price = useTranslations("price");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 p-3 backdrop-blur md:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm">
          <span className="font-bold">{price("total")}</span>
        </div>
        <Link
          href="/app/subscribe"
          onClick={() =>
            trackEvent("cta_click", { location: "sticky_mobile" })
          }
        >
          <Button size="sm">{t("subscribe")}</Button>
        </Link>
      </div>
    </div>
  );
}
