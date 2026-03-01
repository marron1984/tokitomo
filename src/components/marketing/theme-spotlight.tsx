"use client";

import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";
import Image from "next/image";

export function ThemeSpotlight() {
  const t = useTranslations("home");
  const locale = useLocale();

  const isJa = locale === "ja";
  const isFr = locale === "fr";
  const isEs = locale === "es";

  // Locale-specific date format
  const dateLabel = isJa ? "2026年3月" : isFr ? "Mars 2026" : isEs ? "Marzo 2026" : "March 2026";

  return (
    <section className={`bg-cream ${isJa ? "py-20 md:py-48" : "py-16 md:py-40"}`}>
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <ScrollReveal>
          <div className="text-center">
            {isFr ? (
              <div className="mx-auto mb-6 flex items-center justify-center gap-6 md:mb-8">
                <div className="h-px w-12 bg-charcoal/15" />
                <div className="h-px w-12 bg-charcoal/15" />
              </div>
            ) : (
              <div className="divider-ornament mx-auto mb-6 max-w-xs text-xs tracking-[0.3em] text-warmgray/40 md:mb-8">&#x2022;</div>
            )}
            <h2 className={`font-serif text-charcoal ${
              isJa ? "text-2xl md:text-3xl" : "text-2xl font-semibold md:text-4xl"
            }`}>
              {t("themeSpotlight")}
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className={`-mx-5 mt-10 overflow-hidden border-y bg-card shadow-sm md:mx-auto md:mt-16 md:max-w-5xl md:border ${
            isFr
              ? "border-charcoal/8 md:rounded-none"
              : isJa
              ? "border-border/40 md:rounded-3xl"
              : "border-border/60 md:rounded-2xl"
          }`}>
            <div className="grid md:grid-cols-2">
              {/* Photo */}
              <div className={`relative overflow-hidden ${
                isJa ? "min-h-[260px] md:min-h-[460px]" : "min-h-[240px] md:min-h-[420px]"
              }`}>
                <Image
                  src="/hero-flatlay.png"
                  alt="Stationery spread with ink bottles, washi tape, pens, and notebooks"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Text */}
              <div className={`flex flex-col justify-center ${
                isJa ? "p-8 md:p-16" : isFr ? "p-7 md:p-14" : "p-6 md:p-14"
              }`}>
                <p className={`font-medium uppercase text-warmgray/70 ${
                  isJa ? "text-[10px] tracking-[0.3em]" :
                  isFr ? "text-[10px] tracking-[0.35em]" :
                  "text-[10px] tracking-[0.2em] md:text-xs"
                }`}>
                  {dateLabel}
                </p>
                <h3 className={`font-serif text-charcoal ${
                  isJa ? "mt-4 text-xl md:mt-5 md:text-2xl" :
                  isFr ? "mt-4 text-2xl font-medium md:mt-5 md:text-3xl" :
                  "mt-3 text-2xl font-semibold md:mt-4 md:text-3xl"
                }`}>
                  {t("themeTitle")}
                </h3>
                <p className={`text-warmgray ${
                  isJa ? "mt-4 text-sm leading-loose md:mt-6" :
                  "mt-3 text-sm leading-relaxed md:mt-5 md:text-base"
                }`}>
                  {t("themeDesc")}
                </p>
                <div className={`flex flex-wrap gap-1.5 md:gap-2 ${isJa ? "mt-6 md:mt-10" : "mt-5 md:mt-8"}`}>
                  {["Letter Set", "Washi Tape", "Ink Bottles", "Fountain Pens", "Stickers"].map((tag) => (
                    <span
                      key={tag}
                      className={`font-medium text-warmgray/80 transition-colors duration-500 hover:text-charcoal ${
                        isFr
                          ? "border border-charcoal/10 bg-transparent px-3 py-1 text-[10px] md:text-xs"
                          : isJa
                          ? "rounded-full bg-cream/80 px-3 py-1.5 text-[10px] md:text-xs"
                          : "rounded-full bg-cream px-2.5 py-1 text-[10px] md:px-3 md:py-1.5 md:text-xs"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
