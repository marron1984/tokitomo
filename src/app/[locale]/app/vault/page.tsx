import { auth } from "@/lib/auth";
import { getSubscriptionStatus, isActiveSubscription } from "@/lib/subscription";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { VaultActions } from "./vault-actions";

export default async function VaultPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  if (!session?.user) return null;

  const t = await getTranslations({ locale, namespace: "app.vault" });
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

  const items = await prisma.vaultItem.findMany({
    where: { locale },
    orderBy: { month: "desc" },
  });

  const wishlist = await prisma.wishlistItem.findMany({
    where: { userId: session.user.id },
    select: { vaultItemId: true },
  });

  const wishlistIds = new Set(wishlist.map((w) => w.vaultItemId));

  return (
    <div className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="flex h-40 items-center justify-center bg-gradient-to-br from-pink-50 to-amber-50">
                <span className="text-4xl">
                  {item.title.includes("Washi")
                    ? "🎀"
                    : item.title.includes("Pen")
                      ? "🖊️"
                      : item.title.includes("Paper") || item.title.includes("Letter")
                        ? "📝"
                        : "✨"}
                </span>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.month}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
                <VaultActions
                  vaultItemId={item.id}
                  isWishlisted={wishlistIds.has(item.id)}
                  addLabel={t("addToWishlist")}
                  removeLabel={t("removeFromWishlist")}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
