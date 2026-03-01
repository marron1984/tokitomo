"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";

export function ThemeSpotlight() {
  const t = useTranslations("home");

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <h2 className="text-center font-serif text-3xl font-semibold text-charcoal md:text-4xl">
            {t("themeSpotlight")}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
            <div className="grid md:grid-cols-2">
              {/* Visual side */}
              <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-dustyrose/20 via-cream to-gold/20 p-12">
                {/* Floating decorative elements */}
                <div className="absolute left-4 top-4 h-20 w-20 rounded-full bg-dustyrose/10 animate-drift" />
                <div className="absolute bottom-6 right-6 h-16 w-16 rounded-full bg-sage/10 animate-drift stagger-2" />
                <div className="text-center">
                  <div className="animate-float text-7xl">🌸</div>
                  <p className="mt-4 font-serif text-sm font-medium text-charcoal/70">
                    {t("themeTitle")}
                  </p>
                </div>
              </div>

              {/* Text side */}
              <div className="flex flex-col justify-center p-10">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-warmgray">
                  March 2026
                </p>
                <h3 className="mt-3 font-serif text-3xl font-semibold text-charcoal">
                  {t("themeTitle")}
                </h3>
                <p className="mt-4 leading-relaxed text-warmgray">
                  {t("themeDesc")}
                </p>
                <div className="mt-6 flex gap-2">
                  {["Letter Set", "Washi Tape", "Gel Pen", "Stickers"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-warmgray"
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
