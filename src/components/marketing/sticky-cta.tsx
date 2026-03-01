"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function StickyCta() {
  const t = useTranslations("nav");
  const price = useTranslations("price");
  const trust = useTranslations("trust");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-400 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      }`}
    >
      {/* Gradient shadow above for visual separation */}
      <div className="h-6 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />

      <div className="border-t bg-background/95 backdrop-blur-xl px-4 pb-[env(safe-area-inset-bottom,8px)] pt-3">
        {/* Full-width CTA — large thumb target */}
        <Link
          href="/app/subscribe"
          className="block"
          onClick={() =>
            trackEvent("cta_click", { location: "sticky_mobile" })
          }
        >
          <Button
            size="lg"
            className="btn-shimmer group h-[52px] w-full bg-charcoal text-[15px] font-semibold text-cream hover:bg-charcoal/90"
          >
            {t("subscribe")} — {price("total")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>

        {/* Trust micro-copy below button */}
        <p className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-warmgray/50 pb-1">
          <Shield className="h-2.5 w-2.5" />
          {trust("cancelAnytime")} · {trust("secureCheckout")}
        </p>
      </div>
    </div>
  );
}
