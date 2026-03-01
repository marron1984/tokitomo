import { prisma } from "./prisma";

export type SubStatus = "active" | "past_due" | "canceled" | "incomplete" | "none";

export async function getSubscriptionStatus(userId: string): Promise<{
  status: SubStatus;
  subscription: {
    stripeSubscriptionId: string;
    currentPeriodEnd: Date | null;
    cancelAtPeriodEnd: boolean;
    lastInvoiceStatus: string | null;
  } | null;
  stripeCustomerId: string | null;
  hasAddress: boolean;
}> {
  const [subscription, stripeCustomer, address] = await Promise.all([
    prisma.subscription.findUnique({ where: { userId } }),
    prisma.stripeCustomer.findUnique({ where: { userId } }),
    prisma.address.findFirst({ where: { userId } }),
  ]);

  if (!subscription) {
    return {
      status: "none",
      subscription: null,
      stripeCustomerId: stripeCustomer?.stripeCustomerId ?? null,
      hasAddress: !!address,
    };
  }

  const status = (["active", "past_due", "canceled", "incomplete"].includes(
    subscription.status
  )
    ? subscription.status
    : "none") as SubStatus;

  return {
    status,
    subscription: {
      stripeSubscriptionId: subscription.stripeSubscriptionId,
      currentPeriodEnd: subscription.currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      lastInvoiceStatus: subscription.lastInvoiceStatus,
    },
    stripeCustomerId: stripeCustomer?.stripeCustomerId ?? null,
    hasAddress: !!address,
  };
}

export function isActiveSubscription(status: SubStatus): boolean {
  return status === "active" || status === "past_due";
}

export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  const allowlist =
    process.env.ADMIN_EMAIL_ALLOWLIST?.split(",").map((e) => e.trim()) ?? [];
  return allowlist.includes(email);
}
