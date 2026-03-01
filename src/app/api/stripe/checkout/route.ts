import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createCheckoutSession } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const locale = typeof body.locale === "string" ? body.locale : "en";

    const stripeCustomer = await prisma.stripeCustomer.findUnique({
      where: { userId: session.user.id },
    });

    const checkoutSession = await createCheckoutSession({
      userId: session.user.id,
      email: session.user.email,
      locale,
      stripeCustomerId: stripeCustomer?.stripeCustomerId,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
