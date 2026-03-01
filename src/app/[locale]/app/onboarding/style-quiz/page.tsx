"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Sparkles, Minus, Leaf, BookOpen, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const STYLES = [
  { value: "kawaii", icon: Sparkles, color: "border-dustyrose/40 bg-dustyrose/5 hover:bg-dustyrose/10" },
  { value: "minimal", icon: Minus, color: "border-warmgray/40 bg-warmgray/5 hover:bg-warmgray/10" },
  { value: "traditional", icon: Leaf, color: "border-gold/40 bg-gold/5 hover:bg-gold/10" },
  { value: "study", icon: BookOpen, color: "border-sage/40 bg-sage/5 hover:bg-sage/10" },
] as const;

export default function StyleQuizPage() {
  const t = useTranslations("app.onboarding");
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selected) return;
    setLoading(true);

    await fetch("/api/app/style-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ style: selected }),
    });

    router.push(`/${locale}/app/onboarding/address`);
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="w-full max-w-lg animate-fade-up">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
          <h1 className="text-center font-serif text-2xl font-semibold text-charcoal">
            {t("quizTitle")}
          </h1>
          <p className="mt-2 text-center text-sm text-warmgray">
            {t("quizSubtitle")}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {STYLES.map((style) => (
              <button
                key={style.value}
                onClick={() => setSelected(style.value)}
                className={cn(
                  "flex flex-col items-center rounded-xl border-2 p-5 transition-all duration-300",
                  style.color,
                  selected === style.value
                    ? "ring-2 ring-charcoal ring-offset-2 scale-[1.02]"
                    : "opacity-70 hover:opacity-100"
                )}
              >
                <style.icon className="h-8 w-8 text-charcoal/70" />
                <span className="mt-3 text-sm font-medium text-charcoal">
                  {t(`style${style.value.charAt(0).toUpperCase() + style.value.slice(1)}` as "styleKawaii")}
                </span>
                <span className="mt-1 text-xs text-warmgray">
                  {t(`style${style.value.charAt(0).toUpperCase() + style.value.slice(1)}Desc` as "styleKawaiiDesc")}
                </span>
              </button>
            ))}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!selected || loading}
            className="mt-8 btn-shimmer group w-full bg-charcoal text-cream hover:bg-charcoal/90"
            size="lg"
          >
            {loading ? "..." : t("continue")}
            {!loading && (
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
