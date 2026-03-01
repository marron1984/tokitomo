"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Gift, Users, Star } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function ReferralClient({ locale }: { locale: string }) {
  const t = useTranslations("app.referrals");
  const [data, setData] = useState<{
    code: string;
    totalReferred: number;
    totalPaid: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/app/referral")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const handleCopy = () => {
    if (!data) return;
    const url = `${window.location.origin}/${locale}/app/subscribe?ref=${data.code}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    trackEvent("referral_share");
    setTimeout(() => setCopied(false), 2000);
  };

  if (!data) return null;

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/${locale}/app/subscribe?ref=${data.code}`
    : "";

  return (
    <div className="py-20">
      <div className="mx-auto max-w-2xl px-6">
        <h1 className="font-serif text-3xl font-semibold text-charcoal">{t("title")}</h1>
        <p className="mt-2 text-warmgray">{t("subtitle")}</p>

        {/* Referral Code */}
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-serif text-lg font-semibold text-charcoal">{t("yourCode")}</h2>
          <div className="mt-4 flex items-center gap-3">
            <code className="flex-1 rounded-lg bg-cream px-4 py-3 text-center font-serif text-lg font-bold tracking-widest text-charcoal">
              {data.code}
            </code>
            <Button
              onClick={handleCopy}
              variant="outline"
              size="icon"
              className="border-charcoal/20 hover:bg-charcoal/5"
            >
              {copied ? (
                <Check className="h-4 w-4 text-sage" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="mt-3 text-sm text-warmgray">
            {t("shareLink")}{" "}
            <span className="break-all text-xs text-dustyrose">{shareUrl}</span>
          </p>
        </div>

        {/* How it works */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-serif text-lg font-semibold text-charcoal">{t("howItWorks")}</h2>
          <ol className="mt-4 space-y-3 text-sm">
            {[t("step1"), t("step2"), t("step3"), t("step4")].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <Badge variant="outline" className="shrink-0 rounded-full bg-cream text-charcoal">
                  {i + 1}
                </Badge>
                <span className="text-warmgray">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Stats */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-serif text-lg font-semibold text-charcoal">{t("stats")}</h2>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div className="rounded-xl bg-cream p-4">
              <Users className="mx-auto h-5 w-5 text-warmgray" />
              <p className="mt-2 font-serif text-2xl font-bold text-charcoal">{data.totalReferred}</p>
              <p className="text-xs text-warmgray">{t("totalReferred")}</p>
            </div>
            <div className="rounded-xl bg-cream p-4">
              <Gift className="mx-auto h-5 w-5 text-warmgray" />
              <p className="mt-2 font-serif text-2xl font-bold text-charcoal">{data.totalPaid}</p>
              <p className="text-xs text-warmgray">{t("totalPaid")}</p>
            </div>
            <div className="rounded-xl bg-cream p-4">
              <Star className="mx-auto h-5 w-5 text-warmgray" />
              <p className="mt-2 font-serif text-2xl font-bold text-charcoal">{data.totalPaid}</p>
              <p className="text-xs text-warmgray">{t("bonusesEarned")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
