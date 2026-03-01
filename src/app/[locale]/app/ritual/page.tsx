import { auth } from "@/lib/auth";
import { getSubscriptionStatus, isActiveSubscription } from "@/lib/subscription";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="py-16">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>

        <div className="mt-6 flex items-center gap-4">
          <div>
            <span className="text-sm text-muted-foreground">
              {t("streak")}:
            </span>
            <span className="ml-2 text-2xl font-bold">{streak}</span>
            <span className="ml-1 text-sm text-muted-foreground">
              {t("weeks")}
            </span>
          </div>
          <Progress value={completedWeeks.size} max={prompts.length} className="flex-1" />
        </div>

        <div className="mt-4">
          <Badge variant="secondary">
            {t("currentTheme")}: Sakura Letters
          </Badge>
        </div>

        <div className="mt-8 space-y-4">
          {prompts.map((prompt) => {
            const isCompleted = completedWeeks.has(prompt.weekNumber);
            return (
              <Card key={prompt.id} className={isCompleted ? "opacity-70" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      Week {prompt.weekNumber}: {prompt.title}
                    </CardTitle>
                    {isCompleted && (
                      <Badge variant="success">{t("completed")}</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {prompt.promptText}
                  </p>
                  {!isCompleted && (
                    <RitualAction weekNumber={prompt.weekNumber} label={t("markComplete")} />
                  )}
                </CardContent>
              </Card>
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
