import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function VerifyRequestPage() {
  const t = useTranslations("auth");

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-16">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="mt-4 text-2xl">{t("verifyTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{t("verifySubtitle")}</p>
          <p className="text-sm text-muted-foreground">{t("verifyNote")}</p>
          <Link href="/">
            <Button variant="outline">{t("backToHome")}</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
