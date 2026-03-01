"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="py-16">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">{t("yourCode")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <code className="flex-1 rounded-md bg-secondary px-4 py-3 text-center text-lg font-bold tracking-widest">
                {data.code}
              </code>
              <Button onClick={handleCopy} variant="outline" size="icon">
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("shareLink")} <span className="break-all text-xs">{shareUrl}</span>
            </p>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">{t("howItWorks")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Badge variant="outline" className="shrink-0">
                  1
                </Badge>
                {t("step1")}
              </li>
              <li className="flex items-start gap-2">
                <Badge variant="outline" className="shrink-0">
                  2
                </Badge>
                {t("step2")}
              </li>
              <li className="flex items-start gap-2">
                <Badge variant="outline" className="shrink-0">
                  3
                </Badge>
                {t("step3")}
              </li>
              <li className="flex items-start gap-2">
                <Badge variant="outline" className="shrink-0">
                  4
                </Badge>
                {t("step4")}
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">{t("stats")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Users className="mx-auto h-6 w-6 text-muted-foreground" />
                <p className="mt-1 text-2xl font-bold">{data.totalReferred}</p>
                <p className="text-xs text-muted-foreground">
                  {t("totalReferred")}
                </p>
              </div>
              <div>
                <Gift className="mx-auto h-6 w-6 text-muted-foreground" />
                <p className="mt-1 text-2xl font-bold">{data.totalPaid}</p>
                <p className="text-xs text-muted-foreground">
                  {t("totalPaid")}
                </p>
              </div>
              <div>
                <Star className="mx-auto h-6 w-6 text-muted-foreground" />
                <p className="mt-1 text-2xl font-bold">{data.totalPaid}</p>
                <p className="text-xs text-muted-foreground">
                  {t("bonusesEarned")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
