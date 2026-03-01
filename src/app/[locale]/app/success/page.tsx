"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function SuccessPage() {
  const t = useTranslations("app.success");

  useEffect(() => {
    trackEvent("checkout_success");
  }, []);

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-16">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="mt-4 text-2xl">{t("title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{t("subtitle")}</p>
          <div className="rounded-md bg-secondary/50 px-3 py-2 text-sm">
            {t("step")}
          </div>
          <Link href="/app/onboarding/style-quiz">
            <Button size="lg" className="w-full">
              {t("nextStep")}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
