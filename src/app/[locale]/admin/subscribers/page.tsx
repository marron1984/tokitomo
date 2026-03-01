import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export default async function SubscribersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin" });

  const users = await prisma.user.findMany({
    include: {
      subscription: true,
      addresses: { take: 1, orderBy: { createdAt: "desc" } },
      fulfillmentFlags: true,
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-3xl font-bold">{t("subscriberList")}</h1>

        <Card className="mt-8">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-secondary/30">
                  <tr>
                    <th className="px-4 py-3">{t("email")}</th>
                    <th className="px-4 py-3">{t("status")}</th>
                    <th className="px-4 py-3">{t("style")}</th>
                    <th className="px-4 py-3">{t("country")}</th>
                    <th className="px-4 py-3">{t("joined")}</th>
                    <th className="px-4 py-3">{t("flags")}</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            user.subscription?.status === "active"
                              ? "success"
                              : user.subscription?.status === "past_due"
                                ? "warning"
                                : "secondary"
                          }
                        >
                          {user.subscription?.status ?? "none"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        {user.preferenceStyle ?? "-"}
                      </td>
                      <td className="px-4 py-3">
                        {user.addresses[0]?.country ?? "-"}
                      </td>
                      <td className="px-4 py-3">
                        {formatDate(user.createdAt, locale)}
                      </td>
                      <td className="px-4 py-3">
                        {user.fulfillmentFlags.map((f) => (
                          <Badge key={f.id} variant="outline" className="mr-1">
                            {f.flagType}
                          </Badge>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
