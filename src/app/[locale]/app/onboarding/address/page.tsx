"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";

export default function AddressPage() {
  const t = useTranslations("app.onboarding");
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const body = {
      country: form.get("country"),
      line1: form.get("line1"),
      line2: form.get("line2") || null,
      city: form.get("city"),
      state: form.get("state") || null,
      postalCode: form.get("postalCode"),
    };

    const res = await fetch("/api/app/address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setSaved(true);
      trackEvent("address_completed");
      setTimeout(() => {
        router.push(`/${locale}/app/account`);
      }, 1500);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t("addressTitle")}</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("addressSubtitle")}
          </p>
        </CardHeader>
        <CardContent>
          {saved ? (
            <div className="py-8 text-center text-lg font-medium text-primary">
              {t("saved")}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="country">{t("country")}</Label>
                <Input id="country" name="country" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="line1">{t("line1")}</Label>
                <Input id="line1" name="line1" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="line2">{t("line2")}</Label>
                <Input id="line2" name="line2" className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city">{t("city")}</Label>
                  <Input id="city" name="city" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="state">{t("state")}</Label>
                  <Input id="state" name="state" className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="postalCode">{t("postalCode")}</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  required
                  className="mt-1"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? "..." : t("save")}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
