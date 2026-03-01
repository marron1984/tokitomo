export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const stripe = getStripe();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Idempotency check
  const existing = await prisma.webhookEvent.findUnique({
    where: { stripeEventId: event.id },
  });
  if (existing) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutComplete(
          event.data.object as Stripe.Checkout.Session
        );
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionUpsert(
          event.data.object as Stripe.Subscription
        );
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription
        );
        break;
      case "invoice.paid":
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;
      case "invoice.payment_failed":
        await handleInvoiceFailed(event.data.object as Stripe.Invoice);
        break;
    }

    // Record processed event
    await prisma.webhookEvent.create({
      data: {
        stripeEventId: event.id,
        type: event.type,
      },
    });
  } catch (error) {
    console.error(`Webhook handler error for ${event.type}:`, error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  if (!userId || !session.customer) return;

  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer.id;

  await prisma.stripeCustomer.upsert({
    where: { userId },
    update: { stripeCustomerId: customerId },
    create: { userId, stripeCustomerId: customerId },
  });

  if (session.subscription) {
    const subscriptionId =
      typeof session.subscription === "string"
        ? session.subscription
        : session.subscription.id;

    const sub = await getStripe().subscriptions.retrieve(subscriptionId);
    await prisma.subscription.upsert({
      where: { userId },
      update: {
        stripeSubscriptionId: sub.id,
        status: sub.status,
        currentPeriodEnd: new Date(sub.current_period_end * 1000),
        cancelAtPeriodEnd: sub.cancel_at_period_end,
      },
      create: {
        userId,
        stripeSubscriptionId: sub.id,
        status: sub.status,
        currentPeriodEnd: new Date(sub.current_period_end * 1000),
        cancelAtPeriodEnd: sub.cancel_at_period_end,
      },
    });
  }
}

async function handleSubscriptionUpsert(subscription: Stripe.Subscription) {
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;

  const stripeCustomer = await prisma.stripeCustomer.findUnique({
    where: { stripeCustomerId: customerId },
  });

  if (!stripeCustomer) return;

  await prisma.subscription.upsert({
    where: { userId: stripeCustomer.userId },
    update: {
      stripeSubscriptionId: subscription.id,
      status: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
    create: {
      userId: stripeCustomer.userId,
      stripeSubscriptionId: subscription.id,
      status: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;

  const stripeCustomer = await prisma.stripeCustomer.findUnique({
    where: { stripeCustomerId: customerId },
  });

  if (!stripeCustomer) return;

  await prisma.subscription.update({
    where: { userId: stripeCustomer.userId },
    data: {
      status: "canceled",
      cancelAtPeriodEnd: false,
    },
  });
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const customerId =
    typeof invoice.customer === "string"
      ? invoice.customer
      : invoice.customer
        ? (invoice.customer as Stripe.Customer).id
        : null;

  if (!customerId) return;

  const stripeCustomer = await prisma.stripeCustomer.findUnique({
    where: { stripeCustomerId: customerId },
  });

  if (!stripeCustomer) return;

  // Update subscription lastInvoiceStatus
  await prisma.subscription.updateMany({
    where: { userId: stripeCustomer.userId },
    data: { lastInvoiceStatus: "paid" },
  });

  // Check for referral bonus: if this user was referred and first invoice paid
  const redemption = await prisma.referralRedemption.findFirst({
    where: {
      redeemedByUserId: stripeCustomer.userId,
      firstInvoicePaidAt: null,
    },
    include: { referral: true },
  });

  if (redemption) {
    // Mark first invoice as paid
    await prisma.referralRedemption.update({
      where: { id: redemption.id },
      data: { firstInvoicePaidAt: new Date() },
    });

    // Create welcome bonus for the referred user
    const currentMonth = new Date().toISOString().slice(0, 7);
    await prisma.fulfillmentFlag.upsert({
      where: {
        userId_month_flagType: {
          userId: stripeCustomer.userId,
          month: currentMonth,
          flagType: "WELCOME_BONUS",
        },
      },
      update: {},
      create: {
        userId: stripeCustomer.userId,
        month: currentMonth,
        flagType: "WELCOME_BONUS",
        note: `Referred by ${redemption.referralCode}`,
      },
    });

    // Create referral bonus for the referrer
    await prisma.fulfillmentFlag.upsert({
      where: {
        userId_month_flagType: {
          userId: redemption.referral.ownerUserId,
          month: currentMonth,
          flagType: "REFERRAL_BONUS",
        },
      },
      update: {},
      create: {
        userId: redemption.referral.ownerUserId,
        month: currentMonth,
        flagType: "REFERRAL_BONUS",
        note: `Friend ${stripeCustomer.userId} paid first invoice`,
      },
    });
  }
}

async function handleInvoiceFailed(invoice: Stripe.Invoice) {
  const customerId =
    typeof invoice.customer === "string"
      ? invoice.customer
      : invoice.customer
        ? (invoice.customer as Stripe.Customer).id
        : null;

  if (!customerId) return;

  const stripeCustomer = await prisma.stripeCustomer.findUnique({
    where: { stripeCustomerId: customerId },
  });

  if (!stripeCustomer) return;

  await prisma.subscription.updateMany({
    where: { userId: stripeCustomer.userId },
    data: { lastInvoiceStatus: "failed" },
  });
}
