import { auth } from "@/lib/auth";
import { getSubscriptionStatus, isActiveSubscription } from "@/lib/subscription";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { RitualAction } from "./ritual-action";

export default async function RitualPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  if (!session?.user) return null;

  const t = await getTranslations({ locale, namespace: "app.ritual" });
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

  const prompts = await prisma.ritualPrompt.findMany({
    where: { locale, themeMonth: "sakura-letters" },
    orderBy: { weekNumber: "asc" },
  });

  const progress = await prisma.ritualProgress.findMany({
    where: { userId: session.user.id },
  });

  const completedWeeks = new Set(progress.map((p) => p.weekNumber));
  const streak = calculateStreak(progress);

  return (
    <div className="py-20">
      <div className="mx-auto max-w-2xl px-6">
        <h1 className="font-serif text-3xl font-semibold text-charcoal">{t("title")}</h1>
        <p className="mt-2 text-warmgray">{t("subtitle")}</p>

        <div className="mt-8 flex items-center gap-4">
          <div>
            <span className="text-sm text-warmgray">{t("streak")}:</span>
            <span className="ml-2 font-serif text-2xl font-bold text-charcoal">{streak}</span>
            <span className="ml-1 text-sm text-warmgray">{t("weeks")}</span>
          </div>
          <Progress value={completedWeeks.size} max={prompts.length} className="flex-1" />
        </div>

        <div className="mt-4">
          <Badge variant="secondary" className="bg-cream text-warmgray">
            {t("currentTheme")}: Sakura Letters
          </Badge>
        </div>

        <div className="mt-8 space-y-4">
          {prompts.map((prompt) => {
            const isCompleted = completedWeeks.has(prompt.weekNumber);
            return (
              <div
                key={prompt.id}
                className={`rounded-2xl border border-border bg-card p-6 shadow-sm transition-opacity ${
                  isCompleted ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-semibold text-charcoal">
                    Week {prompt.weekNumber}: {prompt.title}
                  </h3>
                  {isCompleted && (
                    <Badge variant="success">{t("completed")}</Badge>
                  )}
                </div>
                <p className="mt-2 text-sm text-warmgray">{prompt.promptText}</p>
                {!isCompleted && (
                  <RitualAction weekNumber={prompt.weekNumber} label={t("markComplete")} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function calculateStreak(
  progress: { weekNumber: number; completedAt: Date }[]
): number {
  if (progress.length === 0) return 0;
  const sorted = [...progress].sort((a, b) => b.weekNumber - a.weekNumber);
  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i - 1].weekNumber - sorted[i].weekNumber === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}
