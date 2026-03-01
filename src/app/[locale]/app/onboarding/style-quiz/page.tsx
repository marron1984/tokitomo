"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Minus, Leaf, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const STYLES = [
  { value: "kawaii", icon: Sparkles, color: "bg-pink-50 border-pink-300" },
  { value: "minimal", icon: Minus, color: "bg-gray-50 border-gray-300" },
  { value: "traditional", icon: Leaf, color: "bg-amber-50 border-amber-300" },
  { value: "study", icon: BookOpen, color: "bg-blue-50 border-blue-300" },
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
    <div className="flex min-h-[60vh] items-center justify-center py-16">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t("quizTitle")}</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("quizSubtitle")}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {STYLES.map((style) => (
              <button
                key={style.value}
                onClick={() => setSelected(style.value)}
                className={cn(
                  "flex flex-col items-center rounded-lg border-2 p-4 transition-all",
                  style.color,
                  selected === style.value
                    ? "ring-2 ring-primary ring-offset-2"
                    : "opacity-70 hover:opacity-100"
                )}
              >
                <style.icon className="h-8 w-8" />
                <span className="mt-2 text-sm font-medium">
                  {t(`style${style.value.charAt(0).toUpperCase() + style.value.slice(1)}` as "styleKawaii")}
                </span>
                <span className="mt-1 text-xs text-muted-foreground">
                  {t(`style${style.value.charAt(0).toUpperCase() + style.value.slice(1)}Desc` as "styleKawaiiDesc")}
                </span>
              </button>
            ))}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!selected || loading}
            className="w-full"
            size="lg"
          >
            {loading ? "..." : t("continue")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
