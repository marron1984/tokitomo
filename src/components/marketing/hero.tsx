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
      <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-12 md:pb-20 md:pt-20">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">

          {/* Left — Text + CTA */}
          <div className={`max-w-xl ${mounted ? "animate-fade-up" : "opacity-0"}`}>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-warmgray/70">
              {t(`${heroKey}.eyebrow`)}
            </p>

            <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.15] tracking-tight text-charcoal md:text-5xl lg:text-6xl">
              {t(`${heroKey}.title`)}
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-warmgray md:text-lg">
              {t(`${heroKey}.subtitle`)}
            </p>

            {/* Price */}
            <div className="mt-8">
              <p className="font-serif text-2xl font-semibold text-charcoal">
                {t("price.total")}
              </p>
              <p className="mt-1 text-sm text-warmgray/70">
                {t("price.breakdown")}
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
                  className="min-w-[200px] border-charcoal/15 text-base text-charcoal hover:bg-charcoal/5"
                >
                  {t(`${heroKey}.secondaryCta`)}
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-warmgray/60">
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" />
                {t("trust.cancelAnytime")}
              </span>
              <span className="flex items-center gap-1.5">
                <RefreshCw className="h-3.5 w-3.5" />
                {t("trust.replacementPolicy")}
              </span>
              <span className="flex items-center gap-1.5">
                <CreditCard className="h-3.5 w-3.5" />
                {t("trust.secureCheckout")}
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" />
                {t("trust.customsNote")}
              </span>
            </div>
          </div>

          {/* Right — Product box photo */}
          <div className={`relative ${mounted ? "animate-scale-up stagger-2" : "opacity-0"}`}>
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              <Image
                src="/hero-box.png"
                alt="TOKI & TOMO subscription box with fountain pen and cherry blossoms"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-gradient-to-br from-dustyrose/15 via-transparent to-gold/10 blur-3xl" />
          </div>
        </div>
      </div>

      {/* Full-width lifestyle banner */}
      <div className={`relative mt-6 h-[340px] overflow-hidden md:mt-10 md:h-[480px] ${mounted ? "animate-fade-in stagger-4" : "opacity-0"}`}>
        <Image
          src="/hero-lifestyle.png"
          alt="Writing under cherry blossoms in Kyoto with TOKI & TOMO stationery"
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/40 to-transparent" />
      </div>

      {/* Marquee */}
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
