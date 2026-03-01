"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function SuccessPage() {
  const t = useTranslations("app.success");

  useEffect(() => {
    trackEvent("checkout_success");
  }, []);

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="w-full max-w-md animate-scale-up text-center">
        <div className="rounded-2xl border border-border bg-card p-10 shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage/20">
            <CheckCircle className="h-8 w-8 text-sage" />
          </div>
          <h1 className="mt-6 font-serif text-2xl font-semibold text-charcoal">
            {t("title")}
          </h1>
          <p className="mt-3 text-warmgray">{t("subtitle")}</p>
          <div className="mt-4 rounded-lg bg-cream px-4 py-2 text-sm text-warmgray">
            {t("step")}
          </div>
          <Link href="/app/onboarding/style-quiz" className="mt-6 block">
            <Button
              size="lg"
              className="btn-shimmer group w-full bg-charcoal text-cream hover:bg-charcoal/90"
            >
              {t("nextStep")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
