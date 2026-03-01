import { auth } from "@/lib/auth";
import { getSubscriptionStatus, isActiveSubscription } from "@/lib/subscription";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
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
      <div className="flex min-h-[60vh] items-center justify-center py-20">
        <div className="w-full max-w-md text-center">
          <div className="rounded-2xl border border-border bg-card p-10 shadow-sm">
            <h2 className="font-serif text-xl font-semibold text-charcoal">{t("lockedTitle")}</h2>
            <p className="mt-2 text-sm text-warmgray">{t("lockedDesc")}</p>
            <Link href="/app/subscribe">
              <Button className="mt-6 bg-charcoal text-cream hover:bg-charcoal/90">Subscribe</Button>
            </Link>
          </div>
        </div>
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
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="font-serif text-3xl font-semibold text-charcoal">{t("title")}</h1>
        <p className="mt-2 text-warmgray">{t("subtitle")}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="card-hover group overflow-hidden rounded-2xl border border-border bg-card">
              <div className="flex h-40 items-center justify-center bg-gradient-to-br from-dustyrose/10 to-gold/10">
                <span className="text-4xl transition-transform duration-500 group-hover:scale-110">
                  {item.title.includes("Washi")
                    ? "🎀"
                    : item.title.includes("Pen")
                      ? "🖊️"
                      : item.title.includes("Paper") || item.title.includes("Letter")
                        ? "📝"
                        : "✨"}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif font-semibold text-charcoal">{item.title}</h3>
                <p className="mt-1 text-xs text-warmgray">{item.month}</p>
                <p className="mt-2 text-sm text-warmgray">{item.description}</p>
                <VaultActions
                  vaultItemId={item.id}
                  isWishlisted={wishlistIds.has(item.id)}
                  addLabel={t("addToWishlist")}
                  removeLabel={t("removeFromWishlist")}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
