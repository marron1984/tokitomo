"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";

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
          <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
            <div className="grid md:grid-cols-2">
              {/* Visual side — contemplative, breathing */}
              <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-gradient-to-br from-dustyrose/15 via-cream to-gold/15 p-14">
                {/* Slow ink-dissolve atmosphere */}
                <div className="absolute left-4 top-4 h-24 w-24 rounded-full bg-dustyrose/8 animate-ink-dissolve" />
                <div className="absolute bottom-6 right-6 h-20 w-20 rounded-full bg-sage/8 animate-ink-dissolve stagger-3" />
                <div className="absolute right-10 top-12 h-12 w-12 rounded-full bg-gold/6 animate-ink-dissolve stagger-5" />
                <div className="text-center">
                  <div className="animate-breathe text-8xl">🌸</div>
                  <p className="mt-6 font-serif text-sm font-medium text-charcoal/60">
                    {t("themeTitle")}
                  </p>
                </div>
              </div>

              {/* Text side — generous spacing */}
              <div className="flex flex-col justify-center p-12">
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
                  {["Letter Set", "Washi Tape", "Gel Pen", "Stickers"].map((tag) => (
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
