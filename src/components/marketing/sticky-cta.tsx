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

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 glass border-t p-3 transition-all duration-500 md:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm">
          <span className="font-serif font-semibold text-charcoal">{price("total")}</span>
          <span className="ml-2 text-xs text-warmgray">{price("breakdown")}</span>
        </div>
        <Link
          href="/app/subscribe"
          onClick={() =>
            trackEvent("cta_click", { location: "sticky_mobile" })
          }
        >
          <Button size="sm" className="bg-charcoal text-cream hover:bg-charcoal/90">
            {t("subscribe")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
