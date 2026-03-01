import { auth } from "@/lib/auth";
import { getSubscriptionStatus, isActiveSubscription } from "@/lib/subscription";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { AccountActions } from "./account-actions";
import { EmailPreferences } from "./email-preferences";

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  if (!session?.user) return null;

  const t = await getTranslations({ locale, namespace: "app.account" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const subData = await getSubscriptionStatus(session.user.id);
  const address = await prisma.address.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { preferenceStyle: true, email: true, name: true },
  });

  const statusVariant =
    subData.status === "active"
      ? "success"
      : subData.status === "past_due"
        ? "warning"
        : "secondary";

  const statusLabel =
    subData.status === "active"
      ? t("active")
      : subData.status === "past_due"
        ? t("pastDue")
        : subData.status === "canceled"
          ? t("canceled")
          : t("inactive");

  return (
    <div className="py-20">
      <div className="mx-auto max-w-2xl px-6">
        <h1 className="font-serif text-3xl font-semibold text-charcoal">{t("title")}</h1>

        <div className="mt-10 space-y-6">
          {/* Profile */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-serif text-lg font-semibold text-charcoal">{t("profile")}</h2>
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="text-warmgray">Email:</span>{" "}
                <span className="text-charcoal">{user?.email}</span>
              </p>
              <p>
                <span className="text-warmgray">{t("style")}:</span>{" "}
                <span className="text-charcoal capitalize">{user?.preferenceStyle ?? t("noStyle")}</span>
                {!user?.preferenceStyle && (
                  <Link
                    href="/app/onboarding/style-quiz"
                    className="ml-2 text-dustyrose underline"
                  >
                    {t("takeQuiz")}
                  </Link>
                )}
              </p>
            </div>
          </div>

          {/* Subscription */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-serif text-lg font-semibold text-charcoal">{t("subscription")}</h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-warmgray">{t("status")}:</span>
                <Badge variant={statusVariant}>{statusLabel}</Badge>
              </div>

              {subData.subscription?.currentPeriodEnd && (
                <p className="text-sm text-warmgray">
                  {subData.subscription.cancelAtPeriodEnd ? t("endsOn") : t("renewsOn")}:{" "}
                  {formatDate(subData.subscription.currentPeriodEnd, locale)}
                </p>
              )}

              {subData.status === "none" && (
                <Link href="/app/subscribe">
                  <Button className="bg-charcoal text-cream hover:bg-charcoal/90">
                    {nav("subscribe")}
                  </Button>
                </Link>
              )}

              {isActiveSubscription(subData.status) && subData.stripeCustomerId && (
                <AccountActions locale={locale} hasStripeCustomer={true} />
              )}
            </div>
          </div>

          {/* Email Preferences */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-serif text-lg font-semibold text-charcoal">Email Preferences</h2>
            <p className="mt-1 text-xs text-warmgray">Choose which emails you&apos;d like to receive</p>
            <EmailPreferences />
          </div>

          {/* Address */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-serif text-lg font-semibold text-charcoal">{t("address")}</h2>
            <div className="mt-4">
              {address ? (
                <div className="space-y-1 text-sm text-warmgray">
                  <p>{address.line1}</p>
                  {address.line2 && <p>{address.line2}</p>}
                  <p>
                    {address.city}
                    {address.state ? `, ${address.state}` : ""} {address.postalCode}
                  </p>
                  <p>{address.country}</p>
                  <Link href="/app/onboarding/address">
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 border-charcoal/20 text-charcoal hover:bg-charcoal/5"
                    >
                      {t("editAddress")}
                    </Button>
                  </Link>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-warmgray">{t("noAddress")}</p>
                  <Link href="/app/onboarding/address">
                    <Button size="sm" className="mt-3 bg-charcoal text-cream hover:bg-charcoal/90">
                      {t("addAddress")}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
