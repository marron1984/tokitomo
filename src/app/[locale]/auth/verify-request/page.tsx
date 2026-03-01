"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function VerifyRequestPage() {
  const t = useTranslations("auth");

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="w-full max-w-md animate-fade-up text-center">
        <div className="rounded-2xl border border-border bg-card p-10 shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cream">
            <Mail className="h-7 w-7 text-dustyrose" />
          </div>
          <h1 className="mt-6 font-serif text-2xl font-semibold text-charcoal">
            {t("verifyTitle")}
          </h1>
          <p className="mt-3 text-warmgray">{t("verifySubtitle")}</p>
          <p className="mt-2 text-sm text-warmgray/70">{t("verifyNote")}</p>
          <Link href="/" className="mt-6 inline-block">
            <Button variant="outline" className="border-charcoal/20 text-charcoal hover:bg-charcoal/5">
              {t("backToHome")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
