import { auth } from "@/lib/auth";
import { getSubscriptionStatus, isActiveSubscription } from "@/lib/subscription";
import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ReferralClient } from "./referral-client";

export default async function ReferralsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  if (!session?.user) return null;

  const t = await getTranslations({ locale, namespace: "app.referrals" });
  const subData = await getSubscriptionStatus(session.user.id);

  if (!isActiveSubscription(subData.status)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center py-16">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold">{t("lockedTitle")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("lockedDesc")}
            </p>
            <Link href="/app/subscribe">
              <Button className="mt-4">Subscribe</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <ReferralClient locale={locale} />;
}
