import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/subscription";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const session = await auth();
  const { locale } = await params;

  if (!session?.user) {
    redirect(`/${locale}/auth/signin`);
  }

  if (!isAdmin(session.user.email)) {
    redirect(`/${locale}`);
  }

  return <>{children}</>;
}
