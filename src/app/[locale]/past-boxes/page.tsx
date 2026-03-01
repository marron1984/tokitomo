"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ArrowRight } from "lucide-react";

export default function PastBoxesPage() {
  const t = useTranslations("pastBoxes");

  const teaserItems = [
    { emoji: "🌸", title: "Sakura Letters", month: "April 2025", color: "from-dustyrose/20 to-cream" },
    { emoji: "🎋", title: "Tanabata Dreams", month: "July 2025", color: "from-sage/20 to-cream" },
    { emoji: "🍂", title: "Autumn Brush", month: "October 2025", color: "from-gold/20 to-cream" },
    { emoji: "❄️", title: "Winter Calm", month: "January 2026", color: "from-muted to-cream" },
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
