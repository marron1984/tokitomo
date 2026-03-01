"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trackEvent } from "@/lib/analytics";
import Image from "next/image";

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
    <div className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="w-full max-w-md animate-fade-up">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
          <div className="mb-6 flex justify-center">
            <Image src="/logo.png" alt="TOKI & TOMO" width={60} height={60} className="rounded-sm" />
          </div>
          <h1 className="text-center font-serif text-2xl font-semibold text-charcoal">
            {t("signInTitle")}
          </h1>
          <p className="mt-2 text-center text-sm text-warmgray">
            {t("signInSubtitle")}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-charcoal">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                required
                className="mt-1.5 border-border bg-cream/50 focus:border-dustyrose"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-charcoal text-cream hover:bg-charcoal/90"
              disabled={loading}
            >
              {loading ? "..." : t("sendLink")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
