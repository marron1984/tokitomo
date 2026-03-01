import { useTranslations } from "next-intl";
import { Package, Sparkles, Heart } from "lucide-react";

export function HowItWorksSection() {
  const t = useTranslations("home");

  const steps = [
    { icon: Package, title: t("step1Title"), desc: t("step1Desc") },
    { icon: Sparkles, title: t("step2Title"), desc: t("step2Desc") },
    { icon: Heart, title: t("step3Title"), desc: t("step3Desc") },
  ];

  return (
    <section className="bg-secondary/20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl font-bold md:text-4xl">
          {t("howItWorks")}
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
