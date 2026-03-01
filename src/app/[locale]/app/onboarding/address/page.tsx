"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trackEvent } from "@/lib/analytics";
import { CheckCircle } from "lucide-react";

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
    <div className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="w-full max-w-md animate-fade-up">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
          <h1 className="text-center font-serif text-2xl font-semibold text-charcoal">
            {t("addressTitle")}
          </h1>
          <p className="mt-2 text-center text-sm text-warmgray">
            {t("addressSubtitle")}
          </p>

          {saved ? (
            <div className="py-10 text-center animate-scale-up">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage/20">
                <CheckCircle className="h-8 w-8 text-sage" />
              </div>
              <p className="mt-4 font-serif text-lg font-medium text-charcoal">
                {t("saved")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <Label htmlFor="country" className="text-sm font-medium text-charcoal">{t("country")}</Label>
                <Input id="country" name="country" required className="mt-1.5 bg-cream/50" />
              </div>
              <div>
                <Label htmlFor="line1" className="text-sm font-medium text-charcoal">{t("line1")}</Label>
                <Input id="line1" name="line1" required className="mt-1.5 bg-cream/50" />
              </div>
              <div>
                <Label htmlFor="line2" className="text-sm font-medium text-charcoal">{t("line2")}</Label>
                <Input id="line2" name="line2" className="mt-1.5 bg-cream/50" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city" className="text-sm font-medium text-charcoal">{t("city")}</Label>
                  <Input id="city" name="city" required className="mt-1.5 bg-cream/50" />
                </div>
                <div>
                  <Label htmlFor="state" className="text-sm font-medium text-charcoal">{t("state")}</Label>
                  <Input id="state" name="state" className="mt-1.5 bg-cream/50" />
                </div>
              </div>
              <div>
                <Label htmlFor="postalCode" className="text-sm font-medium text-charcoal">{t("postalCode")}</Label>
                <Input id="postalCode" name="postalCode" required className="mt-1.5 bg-cream/50" />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-charcoal text-cream hover:bg-charcoal/90"
                size="lg"
              >
                {loading ? "..." : t("save")}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
