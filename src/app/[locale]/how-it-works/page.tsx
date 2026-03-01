import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Package, Sparkles, Heart } from "lucide-react";

export default function HowItWorksPage() {
  const t = useTranslations("howItWorks");

  const steps = [
    { icon: Package, title: t("step1Title"), desc: t("step1Desc") },
    { icon: Sparkles, title: t("step2Title"), desc: t("step2Desc") },
    { icon: Heart, title: t("step3Title"), desc: t("step3Desc") },
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="text-center text-4xl font-bold md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-center text-lg text-muted-foreground">
          {t("subtitle")}
        </p>

        <div className="mt-16 space-y-12">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-6 md:flex-row"
            >
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <step.icon className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{step.title}</h2>
                <p className="mt-2 text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/app/subscribe">
            <Button size="lg">{t("cta")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
