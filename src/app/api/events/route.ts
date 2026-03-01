import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const VALID_EVENTS = [
  "page_view",
  "cta_click",
  "start_checkout",
  "checkout_success",
  "checkout_cancel",
  "login_start",
  "signup_complete",
  "address_completed",
  "referral_share",
  "referral_redeemed",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, locale, variant, eventName, props } = body;

    if (!sessionId || !eventName || !VALID_EVENTS.includes(eventName)) {
      return NextResponse.json({ error: "Invalid event" }, { status: 400 });
    }

    const session = await auth();
    const userId = session?.user?.id ?? null;

    await prisma.analyticsEvent.create({
      data: {
        userId,
        sessionId: String(sessionId).slice(0, 100),
        locale: String(locale || "en").slice(0, 5),
        variant: variant ? String(variant).slice(0, 2) : null,
        eventName: String(eventName).slice(0, 50),
        propsJson: props ? JSON.stringify(props) : null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Analytics event error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
