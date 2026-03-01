"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function PastBoxesPage() {
  const t = useTranslations("pastBoxes");

  const teaserItems = [
    { emoji: "🌸", title: "Sakura Letters", month: "March 2026", color: "from-dustyrose/20 to-cream", hasPhoto: true },
    { emoji: "💌", title: "Love Letters", month: "February 2026", color: "from-dustyrose/30 to-cream", hasPhoto: false },
    { emoji: "✨", title: "New Beginnings", month: "January 2026", color: "from-gold/20 to-cream", hasPhoto: false },
    { emoji: "🌧️", title: "Rainy Day", month: "April 2026 (Coming)", color: "from-sage/20 to-cream", hasPhoto: false },
  ];

  return (
    <div className="py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <h1 className="text-center font-serif text-4xl font-semibold text-charcoal">
            {t("title")}
          </h1>
          <p className="mt-4 text-center text-warmgray">
            {t("subtitle")}
          </p>
        </ScrollReveal>

        {/* Featured box with real photo */}
        <ScrollReveal delay={0.1}>
          <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
            <div className="grid md:grid-cols-2">
              <div className="relative min-h-[280px]">
                <Image
                  src="/hero-flatlay.png"
                  alt="Sakura Letters box contents"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col justify-center p-10">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-warmgray/70">March 2026 — Current</p>
                <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal">Sakura Letters</h2>
                <p className="mt-4 leading-relaxed text-warmgray">
                  Handmade washi paper with pressed sakura petals, Pentel brush pens, foil-stamped stickers, and a spring notebook. Everything you need for the season of new beginnings.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teaserItems.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="card-hover group overflow-hidden rounded-2xl border border-border bg-card">
                <div className={`flex h-40 items-center justify-center bg-gradient-to-br ${item.color}`}>
                  <span className="text-5xl transition-transform duration-500 group-hover:scale-110">
                    {item.emoji}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-semibold text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-warmgray">{item.month}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-14 text-center">
            <Link href="/app/subscribe">
              <Button
                size="lg"
                className="btn-shimmer group bg-charcoal text-cream hover:bg-charcoal/90"
              >
                {t("cta")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
