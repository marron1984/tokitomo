"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";

export default function SignInPage() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    trackEvent("login_start", { method: "email" });

    await signIn("resend", {
      email,
      callbackUrl: `/${locale}/app/account`,
      redirect: false,
    });

    window.location.href = `/${locale}/auth/verify-request`;
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t("signInTitle")}</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("signInSubtitle")}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">{t("emailPlaceholder")}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "..." : t("sendLink")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
