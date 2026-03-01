export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/subscription";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    include: {
      subscription: true,
      addresses: { take: 1, orderBy: { createdAt: "desc" } },
      fulfillmentFlags: true,
      referral: {
        include: { redemptions: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const headers = [
    "user_id",
    "email",
    "name",
    "style",
    "subscription_status",
    "stripe_subscription_id",
    "current_period_end",
    "cancel_at_period_end",
    "country",
    "line1",
    "line2",
    "city",
    "state",
    "postal_code",
    "referral_code",
    "referrals_count",
    "fulfillment_flags",
    "created_at",
  ];

  const rows = users.map((u) => {
    const addr = u.addresses[0];
    const flags = u.fulfillmentFlags
      .map((f) => `${f.flagType}:${f.month}`)
      .join("|");

    return [
      u.id,
      u.email,
      u.name ?? "",
      u.preferenceStyle ?? "",
      u.subscription?.status ?? "none",
      u.subscription?.stripeSubscriptionId ?? "",
      u.subscription?.currentPeriodEnd?.toISOString() ?? "",
      u.subscription?.cancelAtPeriodEnd ? "true" : "false",
      addr?.country ?? "",
      addr?.line1 ?? "",
      addr?.line2 ?? "",
      addr?.city ?? "",
      addr?.state ?? "",
      addr?.postalCode ?? "",
      u.referral?.code ?? "",
      u.referral?.redemptions?.length?.toString() ?? "0",
      flags,
      u.createdAt.toISOString(),
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(",");
  });

  const csv = [headers.join(","), ...rows].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="tokitomo-export-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
