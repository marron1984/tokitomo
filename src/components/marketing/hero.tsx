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
      <div className="relative mx-auto max-w-7xl px-5 pb-6 pt-6 md:px-6 md:pb-20 md:pt-20">

        {/* Mobile: Product photo FIRST — visual hook before text */}
        <div className={`relative mb-6 md:hidden ${mounted ? "animate-scale-up" : "opacity-0"}`}>
          <div className="relative mx-auto aspect-[4/3] max-w-sm overflow-hidden rounded-2xl">
            <Image
              src="/hero-box.png"
              alt="TOKI & TOMO subscription box with fountain pen and cherry blossoms"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </div>

        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Text + CTA */}
          <div className={`max-w-xl ${mounted ? "animate-fade-up" : "opacity-0"}`}>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-warmgray/70 md:text-xs">
              {t(`${heroKey}.eyebrow`)}
            </p>

            <h1 className="mt-3 font-serif text-3xl font-semibold leading-[1.15] tracking-tight text-charcoal md:mt-5 md:text-5xl lg:text-6xl">
              {t(`${heroKey}.title`)}
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-warmgray md:mt-6 md:max-w-md md:text-lg">
              {t(`${heroKey}.subtitle`)}
            </p>

            {/* Price — prominent on mobile */}
            <div className="mt-5 md:mt-8">
              <p className="font-serif text-2xl font-semibold text-charcoal md:text-2xl">
                {t("price.total")}
              </p>
              <p className="mt-0.5 text-xs text-warmgray/70 md:mt-1 md:text-sm">
                {t("price.breakdown")}
              </p>
            </div>

            {/* CTAs — full width on mobile */}
            <div className="mt-5 flex flex-col gap-2.5 md:mt-8 md:flex-row md:gap-3">
              <Link href="/app/subscribe" onClick={handleCtaClick} className="w-full md:w-auto">
                <Button
                  size="lg"
                  className="btn-shimmer animate-pulse-glow h-14 w-full text-base font-semibold bg-charcoal text-cream hover:bg-charcoal/90 md:h-12 md:min-w-[200px] md:w-auto"
                >
                  {t(`${heroKey}.cta`)}
                </Button>
              </Link>
              <Link href="/how-it-works" className="w-full md:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 w-full border-charcoal/15 text-base text-charcoal hover:bg-charcoal/5 md:min-w-[200px] md:w-auto"
                >
                  {t(`${heroKey}.secondaryCta`)}
                </Button>
              </Link>
            </div>

            {/* Trust badges — horizontal scroll on mobile */}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-warmgray/60 md:mt-8 md:text-xs">
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3 md:h-3.5 md:w-3.5" />
                {t("trust.cancelAnytime")}
              </span>
              <span className="flex items-center gap-1">
                <RefreshCw className="h-3 w-3 md:h-3.5 md:w-3.5" />
                {t("trust.replacementPolicy")}
              </span>
              <span className="flex items-center gap-1">
                <CreditCard className="h-3 w-3 md:h-3.5 md:w-3.5" />
                {t("trust.secureCheckout")}
              </span>
              <span className="flex items-center gap-1">
                <Globe className="h-3 w-3 md:h-3.5 md:w-3.5" />
                {t("trust.customsNote")}
              </span>
            </div>
          </div>

          {/* Desktop: Product box photo (hidden on mobile — shown above) */}
          <div className={`relative hidden md:block ${mounted ? "animate-scale-up stagger-2" : "opacity-0"}`}>
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              <Image
                src="/hero-box.png"
                alt="TOKI & TOMO subscription box with fountain pen and cherry blossoms"
                fill
                className="object-cover"
                priority
                sizes="50vw"
              />
            </div>
            <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-gradient-to-br from-dustyrose/15 via-transparent to-gold/10 blur-3xl" />
          </div>
        </div>
      </div>

      {/* Lifestyle banner — shorter on mobile */}
      <div className={`relative mt-2 h-[220px] overflow-hidden md:mt-10 md:h-[480px] ${mounted ? "animate-fade-in stagger-4" : "opacity-0"}`}>
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
      <div className="overflow-hidden border-y border-charcoal/5 bg-charcoal/95 py-2.5 md:py-3.5">
        <div className="animate-marquee flex whitespace-nowrap">
          <span className="mx-10 text-[9px] font-medium uppercase tracking-[0.2em] text-cream/50 md:text-[10px]">
            {t("marquee.items")}
          </span>
          <span className="mx-10 text-[9px] font-medium uppercase tracking-[0.2em] text-cream/50 md:text-[10px]">
            {t("marquee.items")}
          </span>
        </div>
      </div>
    </section>
  );
}
