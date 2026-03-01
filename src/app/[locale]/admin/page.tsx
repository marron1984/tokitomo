import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminFulfillmentForm } from "./admin-fulfillment-form";

export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin" });

  // Subscriber stats
  const totalSubscribers = await prisma.subscription.count();
  const activeSubscribers = await prisma.subscription.count({
    where: { status: "active" },
  });
  const canceledSubscribers = await prisma.subscription.count({
    where: { status: "canceled" },
  });

  // CRO Funnel
  const funnelEvents = ["page_view", "cta_click", "start_checkout", "checkout_success", "address_completed"];
  const funnelCounts: Record<string, number> = {};
  for (const event of funnelEvents) {
    funnelCounts[event] = await prisma.analyticsEvent.count({
      where: { eventName: event },
    });
  }

  // CRO by locale
  const localeBreakdown = await prisma.analyticsEvent.groupBy({
    by: ["locale", "eventName"],
    _count: true,
    where: { eventName: { in: funnelEvents } },
  });

  // CRO by variant
  const variantBreakdown = await prisma.analyticsEvent.groupBy({
    by: ["variant", "eventName"],
    _count: true,
    where: { eventName: { in: funnelEvents }, variant: { not: null } },
  });

  // Subsidy analytics
  const fulfillmentCosts = await prisma.fulfillmentCost.findMany({
    include: {
      order: {
        include: {
          user: {
            include: { addresses: { take: 1 } },
          },
        },
      },
    },
  });

  const avgShippingCost =
    fulfillmentCosts.length > 0
      ? fulfillmentCosts.reduce((sum, c) => sum + c.actualShippingCostUSD, 0) /
        fulfillmentCosts.length
      : 0;

  const totalSubsidy = fulfillmentCosts.reduce(
    (sum, c) => sum + Math.max(0, c.actualShippingCostUSD - 10),
    0
  );

  // Group by country
  const countrySubsidy: Record<string, { total: number; count: number }> = {};
  for (const fc of fulfillmentCosts) {
    const country =
      fc.order.user.addresses[0]?.country ?? "Unknown";
    if (!countrySubsidy[country]) {
      countrySubsidy[country] = { total: 0, count: 0 };
    }
    countrySubsidy[country].total += Math.max(
      0,
      fc.actualShippingCostUSD - 10
    );
    countrySubsidy[country].count++;
  }

  const topSubsidyCountries = Object.entries(countrySubsidy)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 5);

  // Gross margin estimate
  const totalRevenue = activeSubscribers * 50; // $50 membership per active subscriber per month
  const grossMargin = totalRevenue - totalSubsidy;

  const conversionRate =
    funnelCounts["page_view"] > 0
      ? ((funnelCounts["checkout_success"] / funnelCounts["page_view"]) * 100).toFixed(2)
      : "0";

  return (
    <div className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <a
            href="/api/admin/export/csv"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {t("exportCsv")}
          </a>
        </div>

        {/* Subscriber Stats */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold">{totalSubscribers}</p>
              <p className="text-sm text-muted-foreground">
                {t("totalSubscribers")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-green-600">
                {activeSubscribers}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("activeSubscribers")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-red-500">
                {canceledSubscribers}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("canceledSubscribers")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CRO Funnel */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{t("croFunnel")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-5">
              {funnelEvents.map((event) => {
                const labelKey = event === "page_view" ? "pageViews"
                  : event === "cta_click" ? "ctaClicks"
                  : event === "start_checkout" ? "startCheckout"
                  : event === "checkout_success" ? "checkoutSuccess"
                  : "addressCompleted";
                return (
                  <div key={event} className="text-center">
                    <p className="text-2xl font-bold">
                      {funnelCounts[event]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t(labelKey)}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-center text-sm">
              {t("conversionRate")}: <strong>{conversionRate}%</strong>
            </p>

            {/* By Locale */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold">{t("byLocale")}</h4>
              <div className="mt-2 space-y-1 text-xs">
                {localeBreakdown.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Badge variant="outline">{item.locale}</Badge>
                    <span>{item.eventName}:</span>
                    <strong>{item._count}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* By Variant */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold">{t("byVariant")}</h4>
              <div className="mt-2 space-y-1 text-xs">
                {variantBreakdown.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Badge variant="outline">
                      Variant {item.variant}
                    </Badge>
                    <span>{item.eventName}:</span>
                    <strong>{item._count}</strong>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subsidy Analytics */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{t("subsidyAnalytics")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <p className="text-2xl font-bold">
                  ${avgShippingCost.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t("avgShippingCost")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-500">
                  ${totalSubsidy.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t("totalSubsidy")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  ${grossMargin.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t("grossMargin")}*
                </p>
              </div>
            </div>

            {topSubsidyCountries.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold">
                  {t("topSubsidyCountries")}
                </h4>
                <div className="mt-2 space-y-1 text-sm">
                  {topSubsidyCountries.map(([country, data]) => (
                    <div
                      key={country}
                      className="flex items-center justify-between"
                    >
                      <span>{country}</span>
                      <span className="text-muted-foreground">
                        ${data.total.toFixed(2)} ({data.count} orders)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="mt-4 text-xs text-muted-foreground">
              * Gross margin = (active subscribers x $50) - total shipping subsidy.
              Does not include COGS, packaging, or operational costs.
            </p>
          </CardContent>
        </Card>

        {/* Record Fulfillment Cost */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{t("recordCost")}</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminFulfillmentForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
