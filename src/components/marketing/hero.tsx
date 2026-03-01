"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Shield, RefreshCw, CreditCard, Globe } from "lucide-react";
import { getVariant, trackEvent } from "@/lib/analytics";

export function Hero() {
  const t = useTranslations();
  const [variant, setVariant] = useState<"A" | "B">("A");

  useEffect(() => {
    setVariant(getVariant() as "A" | "B");
  }, []);

  const heroKey = variant === "B" ? "hero.variantB" : "hero.variantA";

  const handleCtaClick = () => {
    trackEvent("cta_click", { location: "hero", variant });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-pink-50 to-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          {t(`${heroKey}.title`)}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          {t(`${heroKey}.subtitle`)}
        </p>

        <div className="mt-4 text-center">
          <p className="text-2xl font-bold">{t("price.total")}</p>
          <p className="text-sm text-muted-foreground">
            {t("price.breakdown")}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/app/subscribe" onClick={handleCtaClick}>
            <Button size="lg" className="min-w-[200px] text-base">
              {t(`${heroKey}.cta`)}
            </Button>
          </Link>
          <Link href="/how-it-works">
            <Button variant="outline" size="lg" className="min-w-[200px] text-base">
              {t(`${heroKey}.secondaryCta`)}
            </Button>
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground md:gap-6">
          <span className="flex items-center gap-1.5">
            <Shield className="h-4 w-4" />
            {t("trust.cancelAnytime")}
          </span>
          <span className="flex items-center gap-1.5">
            <RefreshCw className="h-4 w-4" />
            {t("trust.replacementPolicy")}
          </span>
          <span className="flex items-center gap-1.5">
            <CreditCard className="h-4 w-4" />
            {t("trust.secureCheckout")}
          </span>
          <span className="flex items-center gap-1.5">
            <Globe className="h-4 w-4" />
            {t("trust.customsNote")}
          </span>
        </div>
      </div>
    </section>
  );
}
