"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";
import Image from "next/image";

export function ThemeSpotlight() {
  const t = useTranslations("home");

  return (
    <section className="bg-cream py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="text-center">
            <div className="divider-ornament mx-auto mb-8 max-w-xs text-xs tracking-[0.3em] text-warmgray/40">&#x2022;</div>
            <h2 className="font-serif text-3xl font-semibold text-charcoal md:text-4xl">
              {t("themeSpotlight")}
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
            <div className="grid md:grid-cols-2">
              {/* Photo side — real flatlay */}
              <div className="relative min-h-[320px] overflow-hidden md:min-h-[420px]">
                <Image
                  src="/hero-flatlay.png"
                  alt="Stationery spread with ink bottles, washi tape, pens, and notebooks at a cherry blossom hanami"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Text side */}
              <div className="flex flex-col justify-center p-10 md:p-14">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-warmgray/70">
                  March 2026
                </p>
                <h3 className="mt-4 font-serif text-3xl font-semibold text-charcoal">
                  {t("themeTitle")}
                </h3>
                <p className="mt-5 leading-relaxed text-warmgray">
                  {t("themeDesc")}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {["Letter Set", "Washi Tape", "Ink Bottles", "Fountain Pens", "Stickers"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-cream px-3 py-1.5 text-xs font-medium text-warmgray/80 transition-colors duration-500 hover:text-charcoal"
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
