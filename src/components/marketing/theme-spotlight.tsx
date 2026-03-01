"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";
import Image from "next/image";

export function ThemeSpotlight() {
  const t = useTranslations("home");

  return (
    <section className="bg-cream py-16 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <ScrollReveal>
          <div className="text-center">
            <div className="divider-ornament mx-auto mb-6 max-w-xs text-xs tracking-[0.3em] text-warmgray/40 md:mb-8">&#x2022;</div>
            <h2 className="font-serif text-2xl font-semibold text-charcoal md:text-4xl">
              {t("themeSpotlight")}
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {/* Card — edge-to-edge on mobile */}
          <div className="-mx-5 mt-10 overflow-hidden border-y border-border/60 bg-card shadow-sm md:mx-auto md:mt-16 md:max-w-5xl md:rounded-2xl md:border">
            <div className="grid md:grid-cols-2">
              {/* Photo — shorter on mobile */}
              <div className="relative min-h-[240px] overflow-hidden md:min-h-[420px]">
                <Image
                  src="/hero-flatlay.png"
                  alt="Stationery spread with ink bottles, washi tape, pens, and notebooks at a cherry blossom hanami"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Text — tighter padding on mobile */}
              <div className="flex flex-col justify-center p-6 md:p-14">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-warmgray/70 md:text-xs">
                  March 2026
                </p>
                <h3 className="mt-3 font-serif text-2xl font-semibold text-charcoal md:mt-4 md:text-3xl">
                  {t("themeTitle")}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-warmgray md:mt-5 md:text-base">
                  {t("themeDesc")}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5 md:mt-8 md:gap-2">
                  {["Letter Set", "Washi Tape", "Ink Bottles", "Fountain Pens", "Stickers"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-cream px-2.5 py-1 text-[10px] font-medium text-warmgray/80 transition-colors duration-500 hover:text-charcoal md:px-3 md:py-1.5 md:text-xs"
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
