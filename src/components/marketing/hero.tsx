"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Shield, RefreshCw, CreditCard, Globe } from "lucide-react";
import { getVariant, trackEvent } from "@/lib/analytics";
import Image from "next/image";

export function Hero() {
  const t = useTranslations();
  const [variant, setVariant] = useState<"A" | "B">("A");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setVariant(getVariant() as "A" | "B");
    setMounted(true);
  }, []);

  const heroKey = variant === "B" ? "hero.variantB" : "hero.variantA";

  const handleCtaClick = () => {
    trackEvent("cta_click", { location: "hero", variant });
  };

  return (
    <section className="relative overflow-hidden bg-cream">
      {/* Decorative floating shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-dustyrose/10 animate-drift" />
        <div className="absolute -left-10 bottom-10 h-60 w-60 rounded-full bg-sage/10 animate-drift stagger-3" />
        <div className="absolute bottom-1/3 right-1/4 h-40 w-40 rounded-full bg-gold/10 animate-drift stagger-5" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left: Text content */}
          <div className={`space-y-6 ${mounted ? "animate-fade-up" : "opacity-0"}`}>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-warmgray">
              {t(`${heroKey}.eyebrow`)}
            </p>

            <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-charcoal md:text-5xl lg:text-6xl">
              {t(`${heroKey}.title`)}
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-warmgray md:text-lg">
              {t(`${heroKey}.subtitle`)}
            </p>

            <div>
              <p className="font-serif text-2xl font-semibold text-charcoal">
                {t("price.total")}
              </p>
              <p className="mt-1 text-sm text-warmgray">
                {t("price.breakdown")}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/app/subscribe" onClick={handleCtaClick}>
                <Button
                  size="lg"
                  className="btn-shimmer animate-pulse-glow min-w-[200px] bg-charcoal text-base text-cream hover:bg-charcoal/90"
                >
                  {t(`${heroKey}.cta`)}
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-[200px] border-charcoal/20 text-base text-charcoal hover:bg-charcoal/5"
                >
                  {t(`${heroKey}.secondaryCta`)}
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 pt-2 text-xs text-warmgray">
              <span className="flex items-center gap-1.5 transition-colors hover:text-charcoal">
                <Shield className="h-3.5 w-3.5" />
                {t("trust.cancelAnytime")}
              </span>
              <span className="flex items-center gap-1.5 transition-colors hover:text-charcoal">
                <RefreshCw className="h-3.5 w-3.5" />
                {t("trust.replacementPolicy")}
              </span>
              <span className="flex items-center gap-1.5 transition-colors hover:text-charcoal">
                <CreditCard className="h-3.5 w-3.5" />
                {t("trust.secureCheckout")}
              </span>
              <span className="flex items-center gap-1.5 transition-colors hover:text-charcoal">
                <Globe className="h-3.5 w-3.5" />
                {t("trust.customsNote")}
              </span>
            </div>
          </div>

          {/* Right: Logo / visual */}
          <div className={`flex items-center justify-center ${mounted ? "animate-fade-in stagger-3" : "opacity-0"}`}>
            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-dustyrose/20 to-gold/20 blur-2xl" />
              <div className="relative animate-float">
                <Image
                  src="/logo.png"
                  alt="TOKI & TOMO — Stationery from Japan"
                  width={400}
                  height={400}
                  className="rounded-2xl shadow-2xl shadow-charcoal/10"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee banner */}
      <div className="overflow-hidden border-y border-charcoal/10 bg-charcoal py-3">
        <div className="animate-marquee flex whitespace-nowrap">
          <span className="mx-8 text-xs font-medium uppercase tracking-[0.15em] text-cream/80">
            {t("marquee.items")}
          </span>
          <span className="mx-8 text-xs font-medium uppercase tracking-[0.15em] text-cream/80">
            {t("marquee.items")}
          </span>
        </div>
      </div>
    </section>
  );
}
