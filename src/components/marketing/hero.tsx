"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Shield, RefreshCw, CreditCard, Globe, ArrowRight } from "lucide-react";
import { getVariant, trackEvent } from "@/lib/analytics";
import Image from "next/image";

export function Hero() {
  const t = useTranslations();
  const locale = useLocale();
  const [variant, setVariant] = useState<"A" | "B">("A");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setVariant(getVariant() as "A" | "B");
    setMounted(true);
  }, []);

  const heroKey = variant === "B" ? "hero.variantB" : "hero.variantA";
  const handleCtaClick = () => trackEvent("cta_click", { location: "hero", variant });

  const isJa = locale === "ja";
  const isFr = locale === "fr";
  const isEs = locale === "es";

  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="relative mx-auto max-w-7xl px-5 pb-6 pt-6 md:px-6 md:pb-20 md:pt-20">

        {/* Mobile: Product photo FIRST */}
        <div className={`relative mb-6 md:hidden ${mounted ? "animate-scale-up" : "opacity-0"}`}>
          <div className="relative mx-auto aspect-[4/3] max-w-sm overflow-hidden rounded-2xl">
            <Image
              src="/hero-box.png"
              alt="TOKI & TOMO subscription box"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            {/* ES: warm gradient overlay on photo */}
            {isEs && <div className="absolute inset-0 bg-gradient-to-t from-[hsl(12_42%_58%/0.1)] to-transparent" />}
          </div>
        </div>

        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Text + CTA */}
          <div className={`max-w-xl ${mounted ? "animate-fade-up" : "opacity-0"}`}>
            {/* JA: Vertical decorative text */}
            {isJa && (
              <div className="mb-4 text-[10px] tracking-[0.5em] text-warmgray/30 md:mb-6 md:text-xs">
                ― 日本の文具、毎月届く ―
              </div>
            )}

            {/* FR: Thin rule above eyebrow */}
            {isFr && <div className="mb-5 h-px w-16 bg-charcoal/15 md:mb-6" />}

            <p className={`font-medium uppercase text-warmgray/70 ${
              isJa ? "text-[10px] tracking-[0.3em] md:text-xs" :
              isFr ? "text-[10px] tracking-[0.35em] md:text-xs" :
              "text-[10px] tracking-[0.25em] md:text-xs"
            }`}>
              {t(`${heroKey}.eyebrow`)}
            </p>

            <h1 className={`font-serif leading-[1.15] tracking-tight text-charcoal ${
              isJa ? "mt-4 text-2xl md:mt-6 md:text-4xl lg:text-5xl" :
              isFr ? "mt-4 text-3xl font-medium md:mt-6 md:text-5xl lg:text-[3.5rem]" :
              isEs ? "mt-3 text-3xl font-bold md:mt-5 md:text-5xl lg:text-6xl" :
              "mt-3 text-3xl font-semibold md:mt-5 md:text-5xl lg:text-6xl"
            }`}>
              {t(`${heroKey}.title`)}
            </h1>

            <p className={`leading-relaxed text-warmgray ${
              isJa ? "mt-5 text-sm md:mt-8 md:max-w-md md:text-base" :
              "mt-4 text-sm md:mt-6 md:max-w-md md:text-lg"
            }`}>
              {t(`${heroKey}.subtitle`)}
            </p>

            {/* Price */}
            <div className={isJa ? "mt-6 md:mt-10" : "mt-5 md:mt-8"}>
              <p className="font-serif text-2xl font-semibold text-charcoal">
                {t("price.total")}
              </p>
              <p className="mt-0.5 text-xs text-warmgray/70 md:mt-1 md:text-sm">
                {t("price.breakdown")}
              </p>
            </div>

            {/* CTAs — locale-specific styles */}
            <div className={`flex flex-col gap-2.5 md:flex-row md:gap-3 ${isJa ? "mt-6 md:mt-10" : "mt-5 md:mt-8"}`}>
              <Link href="/app/subscribe" onClick={handleCtaClick} className="w-full md:w-auto">
                <Button
                  size="lg"
                  className={`h-14 w-full text-base font-semibold md:h-12 md:min-w-[200px] md:w-auto ${
                    isFr
                      ? "rounded-none border-2 border-charcoal bg-transparent text-charcoal hover:bg-charcoal hover:text-cream"
                      : isJa
                      ? "rounded-full bg-charcoal/90 text-cream hover:bg-charcoal"
                      : isEs
                      ? "btn-shimmer animate-pulse-glow rounded-xl bg-[hsl(12_42%_58%)] text-cream hover:bg-[hsl(12_42%_52%)]"
                      : "btn-shimmer animate-pulse-glow bg-charcoal text-cream hover:bg-charcoal/90"
                  }`}
                >
                  {t(`${heroKey}.cta`)}
                  {isEs && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </Link>
              <Link href="/how-it-works" className="w-full md:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className={`h-12 w-full text-base text-charcoal md:min-w-[200px] md:w-auto ${
                    isFr ? "rounded-none border-charcoal/20 hover:border-charcoal/50" :
                    isJa ? "rounded-full border-charcoal/10 hover:bg-charcoal/5" :
                    "border-charcoal/15 hover:bg-charcoal/5"
                  }`}
                >
                  {t(`${heroKey}.secondaryCta`)}
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-warmgray/60 md:text-xs ${isJa ? "mt-6 md:mt-10" : "mt-5 md:mt-8"}`}>
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

          {/* Desktop: Product box photo */}
          <div className={`relative hidden md:block ${mounted ? "animate-scale-up stagger-2" : "opacity-0"}`}>
            <div className={`relative aspect-square overflow-hidden ${
              isFr ? "rounded-none" : isEs ? "rounded-[2rem]" : "rounded-3xl"
            }`}>
              <Image
                src="/hero-box.png"
                alt="TOKI & TOMO subscription box"
                fill
                className="object-cover"
                priority
                sizes="50vw"
              />
              {isEs && <div className="absolute inset-0 bg-gradient-to-t from-[hsl(12_42%_58%/0.08)] to-transparent" />}
            </div>
            {/* EN/ES: decorative glow. FR: no glow. JA: subtle */}
            {!isFr && (
              <div className={`pointer-events-none absolute -inset-8 -z-10 rounded-full blur-3xl ${
                isJa ? "bg-gradient-to-br from-dustyrose/8 via-transparent to-gold/5" :
                isEs ? "bg-gradient-to-br from-[hsl(12_42%_58%/0.15)] via-transparent to-[hsl(32_58%_60%/0.12)]" :
                "bg-gradient-to-br from-dustyrose/15 via-transparent to-gold/10"
              }`} />
            )}
          </div>
        </div>
      </div>

      {/* Lifestyle banner */}
      <div className={`relative mt-2 h-[220px] overflow-hidden md:mt-10 md:h-[480px] ${mounted ? "animate-fade-in stagger-4" : "opacity-0"}`}>
        <Image
          src="/hero-lifestyle.png"
          alt="Writing under cherry blossoms in Kyoto"
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/40 to-transparent" />
      </div>

      {/* Marquee — hidden for JA (too busy), visible for others */}
      {!isJa ? (
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
      ) : (
        /* JA: Clean divider instead of marquee */
        <div className="h-px bg-charcoal/8" />
      )}
    </section>
  );
}
