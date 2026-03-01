import { auth } from "@/lib/auth";
import { getSubscriptionStatus, isActiveSubscription } from "@/lib/subscription";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { AccountActions } from "./account-actions";

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
    <div className="py-16">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="text-3xl font-bold">{t("title")}</h1>

        <div className="mt-8 space-y-6">
          {/* Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("profile")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <span className="text-muted-foreground">Email:</span>{" "}
                {user?.email}
              </p>
              <p>
                <span className="text-muted-foreground">{t("style")}:</span>{" "}
                {user?.preferenceStyle ?? t("noStyle")}
                {!user?.preferenceStyle && (
                  <Link
                    href="/app/onboarding/style-quiz"
                    className="ml-2 text-primary underline"
                  >
                    {t("takeQuiz")}
                  </Link>
                )}
              </p>
            </CardContent>
          </Card>

          {/* Subscription */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("subscription")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {t("status")}:
                </span>
                <Badge variant={statusVariant}>{statusLabel}</Badge>
              </div>

              {subData.subscription?.currentPeriodEnd && (
                <p className="text-sm text-muted-foreground">
                  {subData.subscription.cancelAtPeriodEnd
                    ? t("endsOn")
                    : t("renewsOn")}
                  :{" "}
                  {formatDate(subData.subscription.currentPeriodEnd, locale)}
                </p>
              )}

              {subData.status === "none" && (
                <Link href="/app/subscribe">
                  <Button>{nav("subscribe")}</Button>
                </Link>
              )}

              {isActiveSubscription(subData.status) && subData.stripeCustomerId && (
                <AccountActions locale={locale} hasStripeCustomer={true} />
              )}
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("address")}</CardTitle>
            </CardHeader>
            <CardContent>
              {address ? (
                <div className="space-y-1 text-sm">
                  <p>{address.line1}</p>
                  {address.line2 && <p>{address.line2}</p>}
                  <p>
                    {address.city}
                    {address.state ? `, ${address.state}` : ""}{" "}
                    {address.postalCode}
                  </p>
                  <p>{address.country}</p>
                  <Link href="/app/onboarding/address">
                    <Button variant="outline" size="sm" className="mt-2">
                      {t("editAddress")}
                    </Button>
                  </Link>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-destructive">{t("noAddress")}</p>
                  <Link href="/app/onboarding/address">
                    <Button size="sm" className="mt-2">
                      {t("addAddress")}
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
