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
      {/* Ink wash atmospheric blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-dustyrose/8 animate-ink-dissolve" />
        <div className="absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-sage/6 animate-ink-dissolve stagger-3" />
        <div className="absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-gold/6 animate-ink-dissolve stagger-5" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-20 md:pb-36 md:pt-32">
        {/* 間 (ma) — Logo as the quiet centerpiece */}
        <div className={`flex justify-center ${mounted ? "animate-scale-up" : "opacity-0"}`}>
          <div className="relative">
            {/* Soft glow behind logo */}
            <div className="absolute -inset-16 rounded-full bg-gradient-to-br from-dustyrose/15 via-transparent to-gold/10 blur-3xl animate-breathe" />
            <div className="absolute -inset-8 rounded-full bg-cream/50 blur-2xl animate-breathe stagger-2" />

            {/* The logo — large, breathing, contemplative */}
            <div className="relative animate-breathe">
              <Image
                src="/logo.png"
                alt="TOKI & TOMO — Stationery from Japan"
                width={600}
                height={600}
                className="rounded-3xl drop-shadow-[0_20px_60px_rgba(44,40,37,0.08)]"
                priority
              />
            </div>
          </div>
        </div>

        {/* Ornamental divider */}
        <div className={`mx-auto mt-16 max-w-xs ${mounted ? "animate-fade-in stagger-2" : "opacity-0"}`}>
          <div className="divider-ornament text-xs tracking-[0.3em] text-warmgray/50">&#x2022;</div>
        </div>

        {/* Text content — centered, minimal, quiet */}
        <div className={`mt-12 text-center ${mounted ? "animate-fade-up stagger-3" : "opacity-0"}`}>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-warmgray/70">
            {t(`${heroKey}.eyebrow`)}
          </p>

          <h1 className="mx-auto mt-6 max-w-2xl font-serif text-4xl font-semibold leading-tight tracking-tight text-charcoal md:text-5xl lg:text-6xl">
            {t(`${heroKey}.title`)}
          </h1>

          <p className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-warmgray md:text-lg">
            {t(`${heroKey}.subtitle`)}
          </p>
        </div>

        {/* Price */}
        <div className={`mt-10 text-center ${mounted ? "animate-fade-in stagger-4" : "opacity-0"}`}>
          <p className="font-serif text-2xl font-semibold text-charcoal">
            {t("price.total")}
          </p>
          <p className="mt-1 text-sm text-warmgray/70">
            {t("price.breakdown")}
          </p>
        </div>

        {/* CTAs */}
        <div className={`mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row ${mounted ? "animate-fade-up stagger-5" : "opacity-0"}`}>
          <Link href="/app/subscribe" onClick={handleCtaClick}>
            <Button
              size="lg"
              className="btn-shimmer animate-pulse-glow min-w-[220px] bg-charcoal text-base text-cream hover:bg-charcoal/90"
            >
              {t(`${heroKey}.cta`)}
            </Button>
          </Link>
          <Link href="/how-it-works">
            <Button
              variant="outline"
              size="lg"
              className="min-w-[220px] border-charcoal/15 text-base text-charcoal hover:bg-charcoal/5"
            >
              {t(`${heroKey}.secondaryCta`)}
            </Button>
          </Link>
        </div>

        {/* Trust badges */}
        <div className={`mt-12 flex flex-wrap items-center justify-center gap-5 text-xs text-warmgray/60 ${mounted ? "animate-fade-in stagger-6" : "opacity-0"}`}>
          <span className="flex items-center gap-1.5 transition-colors duration-500 hover:text-warmgray">
            <Shield className="h-3.5 w-3.5" />
            {t("trust.cancelAnytime")}
          </span>
          <span className="flex items-center gap-1.5 transition-colors duration-500 hover:text-warmgray">
            <RefreshCw className="h-3.5 w-3.5" />
            {t("trust.replacementPolicy")}
          </span>
          <span className="flex items-center gap-1.5 transition-colors duration-500 hover:text-warmgray">
            <CreditCard className="h-3.5 w-3.5" />
            {t("trust.secureCheckout")}
          </span>
          <span className="flex items-center gap-1.5 transition-colors duration-500 hover:text-warmgray">
            <Globe className="h-3.5 w-3.5" />
            {t("trust.customsNote")}
          </span>
        </div>
      </div>

      {/* Marquee — slower, quieter */}
      <div className="overflow-hidden border-y border-charcoal/5 bg-charcoal/95 py-3.5">
        <div className="animate-marquee flex whitespace-nowrap">
          <span className="mx-10 text-[10px] font-medium uppercase tracking-[0.2em] text-cream/50">
            {t("marquee.items")}
          </span>
          <span className="mx-10 text-[10px] font-medium uppercase tracking-[0.2em] text-cream/50">
            {t("marquee.items")}
          </span>
        </div>
      </div>
    </section>
  );
}
